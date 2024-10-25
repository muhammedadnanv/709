import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lock } from "lucide-react";

interface PremiumFeaturesProps {
  onUnlock: () => void;
}

const PremiumFeatures = ({ onUnlock }: PremiumFeaturesProps) => {
  const { toast } = useToast();
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    // In a real app, this would integrate with a payment gateway
    toast({
      title: "Payment Details",
      description: "UPI: adnanmuhammad4393@okicici - Please pay ₹699 to unlock premium features",
      duration: 10000,
    });
    setIsUnlocked(true);
    onUnlock();
  };

  return (
    <div className="mt-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full gap-2"
            disabled={isUnlocked}
          >
            <Lock className="h-4 w-4" />
            {isUnlocked ? "Wireless Connectivity (Unlocked)" : "Wireless Connectivity (Premium)"}
          </Button>
        </AlertDialogTrigger>
        {!isUnlocked && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlock Premium Features</AlertDialogTitle>
              <AlertDialogDescription>
                Unlock Wireless Connectivity for ₹699. This is a one-time payment.
                Please use UPI ID: adnanmuhammad4393@okicici
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUnlock}>Unlock Now</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
};

export default PremiumFeatures;