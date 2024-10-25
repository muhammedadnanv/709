import { Button } from "@/components/ui/button";
import { Globe, Mail, Phone, Calendar, UserPlus, Send } from "lucide-react";
import { CardData } from "@/hooks/useCardData";
import { useToast } from "@/hooks/use-toast";

interface CTAButtonsProps {
  cardData: CardData;
  textColor: string;
}

export const CTAButtons = ({ cardData, textColor }: CTAButtonsProps) => {
  const { toast } = useToast();

  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleAddContact = () => {
    // Create vCard format
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.title}
TEL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
END:VCARD`;

    // Create blob and download
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cardData.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Contact Downloaded",
      description: "The contact file has been downloaded to your device.",
    });
  };

  const handleScheduleCall = () => {
    const subject = `Meeting with ${cardData.name}`;
    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(subject)}`;
    window.open(url, '_blank');
  };

  const handleSendContact = () => {
    const subject = "Contact Information Request";
    const body = `Hi ${cardData.name},\n\nI'd like to connect with you. Could you please share your contact information?\n\nBest regards`;
    const mailtoUrl = `mailto:${cardData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        variant="outline"
        className="w-full gap-2"
        style={{ color: textColor, borderColor: textColor }}
        onClick={handleAddContact}
      >
        <UserPlus className="h-4 w-4" />
        Add to Contacts
      </Button>

      <Button
        variant="outline"
        className="w-full gap-2"
        style={{ color: textColor, borderColor: textColor }}
        onClick={handleScheduleCall}
      >
        <Calendar className="h-4 w-4" />
        Schedule a Call
      </Button>

      <Button
        variant="outline"
        className="w-full gap-2"
        style={{ color: textColor, borderColor: textColor }}
        onClick={handleSendContact}
      >
        <Send className="h-4 w-4" />
        Request Contact Info
      </Button>

      {cardData.website && (
        <Button
          variant="outline"
          className="w-full gap-2"
          style={{ color: textColor, borderColor: textColor }}
          onClick={() => handleClick(cardData.website)}
        >
          <Globe className="h-4 w-4" />
          Visit Website
        </Button>
      )}
      {cardData.email && (
        <Button
          variant="outline"
          className="w-full gap-2"
          style={{ color: textColor, borderColor: textColor }}
          onClick={() => handleClick(`mailto:${cardData.email}`)}
        >
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
      )}
      {cardData.phone && (
        <Button
          variant="outline"
          className="w-full gap-2"
          style={{ color: textColor, borderColor: textColor }}
          onClick={() => handleClick(`tel:${cardData.phone}`)}
        >
          <Phone className="h-4 w-4" />
          Call Now
        </Button>
      )}
    </div>
  );
};