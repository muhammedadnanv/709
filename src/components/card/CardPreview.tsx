import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardData, VCardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Linkedin, Instagram, Facebook, Nfc, Clock, Calendar, MessageCircle } from "lucide-react";
import { format, addYears } from "date-fns";

interface CardPreviewProps {
  cardData: CardData;
  profileImage: string | null;
  vCardData: VCardData;
  qrStyle: {
    background: string;
    foreground: string;
  };
}

export const CardPreview = ({ cardData, profileImage, vCardData, qrStyle }: CardPreviewProps) => {
  const creationDate = new Date();
  const expirationDate = addYears(creationDate, 2);

  const handleWhatsAppClick = () => {
    if (cardData.phone) {
      const cleanPhone = cardData.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi, I got your contact from your digital business card.`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="mx-auto max-w-[336px] w-full aspect-[1/1.75] rounded-lg flex flex-col items-center justify-between p-4 border shadow-lg dark:bg-gray-800 dark:border-gray-700 sm:max-w-[504px] sm:p-6"
        style={{ 
          background: qrStyle.background,
          color: qrStyle.foreground,
        }}
      >
        <div className="text-center space-y-2 w-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              <AvatarImage src={profileImage || ""} alt={`${cardData.name}'s profile`} />
              <AvatarFallback className="text-base sm:text-lg dark:bg-gray-700 dark:text-gray-200">
                {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h4 className="font-semibold text-base sm:text-lg dark:text-gray-100">{cardData.name}</h4>
              {cardData.title && (
                <p className="text-sm sm:text-base opacity-80 dark:text-gray-300">{cardData.title}</p>
              )}
              {cardData.company && (
                <p className="text-sm sm:text-base opacity-80 dark:text-gray-300">{cardData.company}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 text-xs sm:text-sm opacity-70 mt-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Created {format(creationDate, 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Valid until {format(expirationDate, 'MMM d, yyyy')}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            {cardData.phone && (
              <button 
                onClick={handleWhatsAppClick}
                className="hover:opacity-80 dark:text-gray-200"
                title="Connect on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: qrStyle.foreground }} />
              </button>
            )}
            {cardData.linkedin && (
              <a href={cardData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.instagram && (
              <a href={cardData.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.facebook && (
              <a href={cardData.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: qrStyle.foreground }} />
              </a>
            )}
          </div>

          <div className="flex items-center justify-center py-4">
            <a href={vCardData.dataUrl} download={vCardData.downloadFilename}>
              <QRCodeSVG
                value={vCardData.vcard}
                size={Math.min(120, window.innerWidth * 0.25)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="M"
                includeMargin={false}
              />
            </a>
          </div>
          <p className="text-xs sm:text-sm dark:text-gray-300">Scan to save contact</p>
          
          <CTAButtons cardData={cardData} textColor={qrStyle.foreground} />
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="text-[10px] sm:text-xs opacity-70">Powered by: Splex</p>
            <Nfc className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: qrStyle.foreground }} />
          </div>
        </div>
      </div>
      
      <WalletActions 
        cardData={cardData}
        qrCodeUrl={vCardData.vcard}
      />
    </div>
  );
};