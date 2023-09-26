import { Navbar } from '@/components/Navbar';
import { SideBar } from "@/components/SideBar";
import { checkSubscription } from '@/lib/subscription';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout(
    {
        children
    }: {
        children:React.ReactNode
    }
) {
    const isPro = await checkSubscription()
  return (
    <div className={cn("h-full",inter.className)}>
        <Navbar isPro={isPro} />
        <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
            <SideBar isPro={isPro} />
        </div>
        <main className="md:pl-20 pt-16 h-full">
            {children}
        </main>
    </div>
  )
}
