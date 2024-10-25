import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Loader2, Watch, Smartphone } from "lucide-react";
import { useState } from "react";
import { addToAppleWallet, addToGoogleWallet, WalletPass } from "@/utils/walletIntegration";
import { CardData } from "@/hooks/useCardData";
import { Card } from "@/components/ui/card";

interface WalletActionsProps {
  cardData: CardData;
  qrCodeUrl: string;
}

export const WalletActions = ({ cardData, qrCodeUrl }: WalletActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const prepareWalletPass = (): WalletPass => ({
    name: cardData.name,
    title: cardData.title,
    company: cardData.company || "",
    phone: cardData.phone,
    email: cardData.email,
    website: cardData.website,
    qrCode: qrCodeUrl,
  });

  const handleAddToWallet = async (walletType: 'apple' | 'google') => {
    setIsLoading(true);
    const pass = prepareWalletPass();

    try {
      await (walletType === 'apple' 
        ? addToAppleWallet(pass) 
        : addToGoogleWallet(pass));

      toast({
        title: "Success!",
        description: `Your business card has been added to ${walletType === 'apple' ? 'Apple' : 'Google'} Wallet`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add card to ${walletType === 'apple' ? 'Apple' : 'Google'} Wallet`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="font-semibold">Quick Access on Your Devices</h3>
        <p className="text-sm text-muted-foreground">
          Add your business card to your digital wallet for easy sharing on your phone or smart watch
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => handleAddToWallet('apple')}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wallet className="h-4 w-4" />
            )}
            Add to Apple Wallet
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            <Watch className="h-4 w-4" />
            <span>iPhone & Apple Watch</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => handleAddToWallet('google')}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wallet className="h-4 w-4" />
            )}
            Add to Google Wallet
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            <Watch className="h-4 w-4" />
            <span>Android Phone & Watch</span>
          </div>
        </div>
      </div>
    </Card>
  );
};