"use client"

import { Companion, Message } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button';
import { BiChevronLeft, BiEdit, BiTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import AiAvatar from './AiAvatar';
import { TbMessages } from "react-icons/tb";
import { useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FiMoreVertical } from 'react-icons/fi';
import { useToast } from './ui/use-toast';
import axios from 'axios';


interface ChatHeaderProps{
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
    const router = useRouter();
    const {user} = useUser();
    const { toast } = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companions/${companion.id}`);

            toast({
                description: "Success."
            });
        } catch (error) {
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
        <div className="flex gap-x-2 items-center">
            <Button onClick={() => router.back()} size="icon" variant={"ghost"}>
                <BiChevronLeft className="h-8 w-8" />
            </Button>
            <AiAvatar src={companion.src} />
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                <p>
                    {companion.name}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <TbMessages className="w-5 h-5 mr-1" />
                    {companion._count.messages}
                </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                  Created by {companion.userName}
                </p>
            </div>
          </div>
          {user?.id === companion.userId && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                        <FiMoreVertical size={22} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                        <BiEdit className="w-6 h-6 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <BiTrash className="w-6 h-6 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          )}
    </div>
  )
}

export default ChatHeader