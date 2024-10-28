import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { useState } from "react";

interface CardActionsProps {
  qrCodeRef: React.RefObject<HTMLDivElement>;
  cardData: {
    name: string;
  };
}

export const CardActions = ({ qrCodeRef, cardData }: CardActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!qrCodeRef.current) {
      toast({
        title: "Error",
        description: "Could not generate card. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const canvas = await html2canvas(qrCodeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const url = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement("a");
      link.download = `${cardData.name || 'digital-card'}.png`;
      link.href = url;
      link.click();
      
      toast({
        title: "Success!",
        description: "Your card has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download card.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="w-full gap-2"
      variant="outline"
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isLoading ? "Downloading..." : "Download Card"}
    </Button>
  );
};