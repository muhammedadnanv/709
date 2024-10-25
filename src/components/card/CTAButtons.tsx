import { Button } from "@/components/ui/button";
import { Globe, Mail, Phone, ExternalLink } from "lucide-react";
import { CardData } from "@/hooks/useCardData";

interface CTAButtonsProps {
  cardData: CardData;
  textColor: string;
}

export const CTAButtons = ({ cardData, textColor }: CTAButtonsProps) => {
  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Custom buttons */}
      {cardData.customButtons?.map((button) => (
        <Button
          key={button.id}
          variant="outline"
          className="w-full gap-2"
          style={{ color: textColor, borderColor: textColor }}
          onClick={() => handleClick(button.url)}
        >
          <ExternalLink className="h-4 w-4" />
          {button.label}
        </Button>
      ))}

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