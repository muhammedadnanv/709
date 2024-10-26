import { QRCodeSVG } from "qrcode.react";
import { CardData, VCardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Star } from "lucide-react";
import { addYears } from "date-fns";
import { motion } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardTimestamp } from "./CardTimestamp";
import { SocialLinks } from "./SocialLinks";

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

  const getGoldShade = () => {
    const hex = qrStyle.background.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#B8860B' : '#FFD700';
  };

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-lg flex flex-col items-center justify-between p-4 border shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden backdrop-blur-sm sm:max-w-[504px] sm:p-6"
        style={{ 
          background: qrStyle.background,
          color: qrStyle.foreground,
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-xl" />
        
        <div className="text-center space-y-2 w-full relative z-10">
          <CardHeader 
            cardData={cardData}
            profileImage={profileImage}
            foregroundColor={qrStyle.foreground}
          />

          <CardTimestamp 
            creationDate={creationDate}
            expirationDate={expirationDate}
            foregroundColor={qrStyle.foreground}
          />

          <SocialLinks 
            cardData={cardData}
            foregroundColor={qrStyle.foreground}
            onWhatsAppClick={handleWhatsAppClick}
          />

          <motion.div 
            className="flex items-center justify-center py-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a 
              href={vCardData.dataUrl} 
              download={vCardData.downloadFilename}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-90 transition-opacity"
            >
              <QRCodeSVG
                value={vCardData.vcard}
                size={Math.min(80, window.innerWidth * 0.15)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="M"
                includeMargin={false}
              />
            </motion.a>
          </motion.div>
          <p className="text-[10px] sm:text-xs">Scan to save contact</p>
          
          <CTAButtons cardData={cardData} textColor={qrStyle.foreground} />
          
          <motion.p 
            className="text-[8px] sm:text-[10px] mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.5 }}
            style={{ color: getGoldShade() }}
          >
            <Star className="inline-block h-3 w-3 mr-1" /> Powered by: Splex
          </motion.p>
        </div>
      </motion.div>
      
      <WalletActions 
        cardData={cardData}
        qrCodeUrl={vCardData.vcard}
      />
    </div>
  );
};