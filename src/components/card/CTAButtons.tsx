import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { CardData } from "@/types/qrTypes";

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
      {/* Only show custom buttons */}
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
    </div>
  );
};
