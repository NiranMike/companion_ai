/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { Inter, Poppins } from "next/font/google";
import {HiSparkles} from "react-icons/hi"
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/ModeToggle";

import MobileSideBar from "./MobileSideBar";
import { useProModal } from "@/hooks/useProModal";
import Image from "next/image";
const font = Inter({
    weight: "600",
    subsets: ["latin"]
});

interface NavbarProps{
    isPro: boolean;
}

export const Navbar = ({isPro}:NavbarProps) => {
    const proModal = useProModal();

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSideBar isPro={isPro} />
                <Link href={"/"} >
                    <img className="hidden md:block w-[20] h-20" src="/logo.png" alt="" />
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {!isPro && (
                <Button onClick={proModal.onOpen} size="sm" variant="premium">
                    Upgrade
                    <HiSparkles className="h-4 w-4 fill-white text-white ml-2" />
                </Button>
                )}
                
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}