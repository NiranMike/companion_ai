import { StreamingTextResponse } from "ai";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";


import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(
    request: Request,
    {params}:{params: {chatId: string }}
) {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();

        if (!user || !user.firstName || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const identifier = request.url + "-" + user.id;
        const { success } = await rateLimit(identifier);

        if (!success) {
            return new NextResponse("Rate Limit exceeded", { status: 429 })
        }
        

        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id,
                    }
                } 
            }
        });

        if (!companion) {
            return new NextResponse("Companion not found", { status: 404 })
        }

        const name = companion.id;
        const companion_file_name = name + ".txt";

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: "llama2-13b",
        };

        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);

        if (records.length === 0) {
            await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey)
        }
  
        await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name,
        );

        let relevantHistory = "";

        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map((docs) => docs.pageContent).join("\n");
        }
        

        const model = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
            "role": "user",
            "content": `
                 ONLY generate plain sentences without prefix of who is speaking. DO NOT use "${name}:" prefix.

                 ${companion.instructions}

                 Below are the relevant details about ${name}'s past and the conversations you are in ${relevantHistory}

                 ${recentChatHistory}\n${name}
            `
            }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });

        const aiResponse = model.choices[0].message.content
        console.log(aiResponse)

        await memoryManager.writeToHistory("" + aiResponse!?.trim(), companionKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        
        s.push(aiResponse);
        s.push(null);

        if (aiResponse !== undefined && aiResponse!?.length > 1) {
            memoryManager.writeToHistory("" + aiResponse!?.trim(), companionKey);

            await prismadb.companion.update({
                where: {
                    id: params.chatId,
                },
                data: {
                    messages: {
                        create: {
                            content: aiResponse!?.trim(),
                            role: "system",
                            userId: user.id
                        }
                    }
                }
            })
        };

        

        return new StreamingTextResponse(s)
    } catch (error) {
        console.log("[CHAT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

