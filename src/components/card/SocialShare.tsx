import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SocialShareProps {
  cardUrl: string;
  cardName: string;
}

export const SocialShare = ({ cardUrl, cardName }: SocialShareProps) => {
  const { toast } = useToast();

  const shareVia = async (platform: string) => {
    const text = `Check out my digital card: ${cardName}`;
    const url = encodeURIComponent(cardUrl);

    const platforms = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + "\n" + cardUrl)}`,
      instagram: `https://www.instagram.com/share?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    if (navigator.share && platform === "native") {
      try {
        await navigator.share({
          title: cardName,
          text,
          url: cardUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Your card has been shared.",
        });
      } catch (error) {
        window.open(platforms.whatsapp, "_blank");
      }
    } else {
      window.open(platforms[platform as keyof typeof platforms], "_blank");
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="h-5 w-5" />
        <h3 className="font-semibold">Share Your Card</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => shareVia("whatsapp")}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => shareVia("instagram")}
          >
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => shareVia("facebook")}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};