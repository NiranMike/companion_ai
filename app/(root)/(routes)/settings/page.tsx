import { SubscriptionButton } from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription"

const Settings = async () => {
    const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-2">
        <h3 className="text-lg font-medium">Settings</h3>
        <div className="text-muted-foreground text-sm">
            {isPro ? "You are currently using the Pro plan." : "You are currently using the free plan."}
          </div>
          <SubscriptionButton isPro={isPro} />
    </div>
  )
}

export default Settings