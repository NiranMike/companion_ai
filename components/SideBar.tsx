"use client";

import {AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import {FiSettings} from "react-icons/fi"
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation"
import { useProModal } from "@/hooks/useProModal";

interface SidebarPro{
    isPro: boolean;
};

export const SideBar = ({
    isPro
}: SidebarPro) => {
    const proModal = useProModal()
    const pathname = usePathname()
    const router = useRouter()
    const routes = [
        {
            icon: AiFillHome,
            href: "/",
            label: "Home",
            pro: false,
        },
        {
            icon: AiOutlinePlusSquare,
            href: "/companion/new",
            label: "Create",
            pro: true,
        },
        {
            icon: FiSettings,
            href: "/settings",
            label: "Settings",
            pro: false,
        },
    ];

    const onNavigate = (url: string, pro: boolean) =>{
        // TODO: Check if Pro
        if (pro && !isPro) {
            return proModal.onOpen()
        }
        return router.push(url)
    }
    return(
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="p-3 flex flex-1 justify-center">
                <div className="space-y-2">
                    {routes.map((route)=>(
                        <div onClick={()=> onNavigate(route.href, route.pro)} className={cn(
                            "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            pathname === route.href && "bg-primary/10 text-primary "
                        )} 
                        key={route.href}>
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5" />
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}