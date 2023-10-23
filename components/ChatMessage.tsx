"use client"

import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import AiAvatar from "@/components/AiAvatar";
import {BeatLoader} from "react-spinners"
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { IoCopyOutline } from "react-icons/io5";

export interface ChatMessageProps{
  role: "system" | "user",
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatMessage = ({role,content,isLoading,src}:ChatMessageProps) => {
  
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard"
    });

  }
  return (
    <div className={cn(
      "group flex items-center gap-x-3 py-4 w-full",
      role === "user" && "justify-end"
    )}>
      {role !== "user" && src && <AiAvatar src={src} />}
      <div className={content !== "" ?`rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10` : `rounded-md px-4 py-2 text-red-600 max-w-sm text-sm bg-primary/10`}>
        {isLoading  
          ? <BeatLoader
              size={5}
              color={theme === "light" ? "black" : "white"} />
          : (content !== "" ? content : "Try sending the Message again or refresh, somthing seems to be wrong with network")
        }
      </div>

      
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size={"icon"}
          variant={"ghost"}
        >
          <IoCopyOutline className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}

export default ChatMessage