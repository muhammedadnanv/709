import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Loader2 } from "lucide-react";
import { useState } from "react";
import { addToAppleWallet, addToGoogleWallet, WalletPass } from "@/utils/walletIntegration";
import { CardData } from "@/hooks/useCardData";

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
      const result = await (walletType === 'apple' 
        ? addToAppleWallet(pass) 
        : addToGoogleWallet(pass));

      toast({
        title: "Success!",
        description: `Card added to ${walletType === 'apple' ? 'Apple' : 'Google'} Wallet`,
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
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button
        variant="outline"
        className="flex-1 gap-2"
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
      <Button
        variant="outline"
        className="flex-1 gap-2"
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
    </div>
  );
};