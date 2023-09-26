"use client";

import { IoSparkles } from "react-icons/io5";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps{
    isPro: boolean;
};

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const onClick = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong."
            })
        } finally {
            setLoading(false)
        }

    }
    return (
        <Button onClick={onClick} disabled={loading} size={"sm"} variant={isPro ? "default" : "premium"}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <IoSparkles className="h-6 w-6 ml-2 fill-white"/>}
        </Button>
    )
}