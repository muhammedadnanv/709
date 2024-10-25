import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardActionsProps {
  qrCodeRef: React.RefObject<HTMLDivElement>;
  cardData: {
    id: string;
    name: string;
  };
}

export const CardActions = ({ cardData }: CardActionsProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/c/${cardData.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${cardData.name}'s Business Card`,
          text: 'Check out my digital business card!',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied!",
          description: "Share link has been copied to clipboard",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share the card",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleShare} 
      className="w-full gap-2"
      variant="outline"
    >
      <Share2 className="h-4 w-4" />
      Share Card
    </Button>
  );
};