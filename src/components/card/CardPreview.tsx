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
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-lg flex flex-col items-center justify-between p-4 border shadow-lg dark:bg-gray-800 dark:border-gray-700 sm:max-w-[504px] sm:p-6"
        style={{ 
          background: qrStyle.background,
          color: qrStyle.foreground,
        }}
      >
        <div className="text-center space-y-2 w-full">
          <div className="flex items-center justify-between">
            {cardData.name && (
              <div className="flex items-center gap-2">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarImage src={profileImage || ""} alt={`${cardData.name}'s profile`} />
                  <AvatarFallback className="text-sm sm:text-base dark:bg-gray-700 dark:text-gray-200">
                    {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h4 className="font-semibold text-sm sm:text-base dark:text-gray-100">{cardData.name}</h4>
                  {cardData.title && (
                    <p className="text-xs sm:text-sm opacity-80 dark:text-gray-300">{cardData.title}</p>
                  )}
                  {cardData.company && (
                    <p className="text-xs sm:text-sm opacity-80 dark:text-gray-300">{cardData.company}</p>
                  )}
                </div>
              </div>
            )}
            <Nfc className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
          </div>

          <div className="flex justify-center gap-4 text-[10px] sm:text-xs opacity-70 mt-1" style={{ color: qrStyle.foreground }}>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Created {format(creationDate, 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Valid until {format(expirationDate, 'MMM d, yyyy')}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            {cardData.phone && (
              <button 
                onClick={handleWhatsAppClick}
                className="hover:opacity-80 dark:text-gray-200"
                title="Connect on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </button>
            )}
            {cardData.linkedin && (
              <a href={cardData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.instagram && (
              <a href={cardData.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
            {cardData.facebook && (
              <a href={cardData.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 dark:text-gray-200">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </a>
            )}
          </div>

          <div className="flex items-center justify-center py-2">
            <a href={vCardData.dataUrl} download={vCardData.downloadFilename}>
              <QRCodeSVG
                value={vCardData.vcard}
                size={Math.min(80, window.innerWidth * 0.15)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="M"
                includeMargin={false}
              />
            </a>
          </div>
          <p className="text-[10px] sm:text-xs dark:text-gray-300">Scan to save contact</p>
          
          <CTAButtons cardData={cardData} textColor={qrStyle.foreground} />
          
          <p className="text-[8px] sm:text-[10px] mt-1"
             style={{ 
               color: '#FFD700',
               opacity: 0.9
             }}>
            Powered by: Splex
          </p>
        </div>
      </div>
      
      <WalletActions 
        cardData={cardData}
        qrCodeUrl={vCardData.vcard}
      />
    </div>
  );
};
