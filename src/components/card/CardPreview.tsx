import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardData } from "@/hooks/useCardData";

interface CardPreviewProps {
  cardData: CardData;
  profileImage: string | null;
  vCardData: string;
  qrStyle: {
    background: string;
    foreground: string;
  };
}

export const CardPreview = ({ cardData, profileImage, vCardData, qrStyle }: CardPreviewProps) => {
  return (
    <div className="aspect-[3/4] rounded-lg flex flex-col items-center justify-between p-4 sm:p-8 border shadow-lg mx-auto max-w-sm"
      style={{ 
        background: qrStyle.background,
        color: qrStyle.foreground 
      }}
    >
      <div className="text-center space-y-4 w-full">
        {cardData.name && (
          <div className="space-y-2">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={profileImage || ""} alt="Profile" />
              <AvatarFallback className="text-xl">
                {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-semibold text-lg">{cardData.name}</h4>
            {cardData.title && (
              <p className="text-sm opacity-80">{cardData.title}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-3 w-full px-4">
          {cardData.phone && (
            <span className="text-sm truncate">{cardData.phone}</span>
          )}
          {cardData.email && (
            <span className="text-sm truncate">{cardData.email}</span>
          )}
          {cardData.website && (
            <span className="text-sm truncate">{cardData.website}</span>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {cardData.linkedin && (
            <span className="text-sm">LinkedIn</span>
          )}
          {cardData.instagram && (
            <span className="text-sm">Instagram</span>
          )}
          {cardData.facebook && (
            <span className="text-sm">Facebook</span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center py-4">
          <QRCodeSVG
            value={vCardData}
            size={Math.min(200, window.innerWidth * 0.4)}
            bgColor={qrStyle.background}
            fgColor={qrStyle.foreground}
            level="M"
            includeMargin={false}
          />
        </div>
        <p className="text-sm">Scan to Connect</p>
      </div>
    </div>
  );
};