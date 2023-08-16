import React from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import {SideBar} from "@/components/SideBar"
const MobileSideBar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <AiOutlineMenu size={25} className="block md:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
            <SideBar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar