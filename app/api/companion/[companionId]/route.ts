import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params: {companionId: string}}){
    try{
        const body = await req.json();
        const user = await currentUser();
        const { src, name, descriptions, instructions, seed, categoryId } = body;
        if (!params.companionId) {
            return new NextResponse("Companion ID is required", {status: 400 })
        }
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !descriptions || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        //  CHECK FOR SUBSCRIPTION

        const isPro = await checkSubscription();

        if (!isPro) {
            return new NextResponse("Pro subscription required", { status: 403 })
        }

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId,
                userId: user.id
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                descriptions,
                instructions,
                seed
            }
        });

        return NextResponse.json(companion)

    }catch(error){
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }


}

export async function DELETE(
    request: Request,
    {params}:{params: { companionId: string}}
) {
    try {
        const user = await currentUser()
        if (!user) {
            return new NextResponse("Unathorized", { status: 401 })
        }

        const companion = await prismadb.companion.delete({
            where: {
                userId: user.id,
                id: params.companionId,
            }
        });

        return NextResponse.json(companion)
    } catch (error) {
        console.log("[COMPANION_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}