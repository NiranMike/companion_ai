import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })
const ChatLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={cn("mx-auto max-w-4xl h-full w-full",inter.className)}>
            {children}
        </div>
    )
}

export default ChatLayout;