import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PremiumFeatureDialogProps {
  children: React.ReactNode;
}

export const PremiumFeatureDialog = ({ children }: PremiumFeatureDialogProps) => {
  const { toast } = useToast();
  const upiId = "adnanmuhammad4393@okicici";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied!",
      description: "You can now paste it in your payment app",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Premium Feature
          </DialogTitle>
          <DialogDescription>
            Unlock wireless connectivity features for ₹699
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Features included:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>WiFi QR Code Generation</li>
              <li>Bluetooth Connection Sharing</li>
              <li>Advanced Security Options</li>
              <li>Priority Support</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">Pay using UPI:</p>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <code className="text-sm flex-1">{upiId}</code>
              <Button variant="ghost" size="icon" onClick={handleCopyUPI}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};