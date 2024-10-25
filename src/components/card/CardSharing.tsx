import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

interface CardSharingProps {
  cardId: string;
  cardUrl: string;
}

export const CardSharing = ({ cardId, cardUrl }: CardSharingProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      toast({
        title: "Link copied!",
        description: "The card link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleEmailShare = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would send the email through your backend
    toast({
      title: "Shared!",
      description: `Card has been shared with ${email}`,
    });
    setEmail("");
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Share Your Card</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={cardUrl}
            readOnly
            className="bg-secondary"
          />
          <Button onClick={handleCopyLink} variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleEmailShare} variant="outline">
            <Mail className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.open(`mailto:?subject=My Digital Business Card&body=Check out my digital business card: ${cardUrl}`);
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.open(`https://wa.me/?text=Check out my digital business card: ${cardUrl}`);
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  );
};