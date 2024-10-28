import { QRCodeSVG } from "qrcode.react";
import { CardData, VCardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Star, Sparkles } from "lucide-react";
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
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi,%20I got your contact from your digital business card.`;
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
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-xl flex flex-col items-center justify-between p-4 border-2 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden backdrop-blur-sm sm:max-w-[504px] sm:p-6"
        style={{ 
          background: `linear-gradient(135deg, ${qrStyle.background}ee, ${qrStyle.background})`,
          color: qrStyle.foreground,
          borderColor: `${qrStyle.foreground}22`,
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 -ml-16 -mb-16 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-2xl" />
        
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
            className="flex items-center justify-center py-3"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a 
              href={vCardData.dataUrl} 
              download={vCardData.downloadFilename}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-90 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <QRCodeSVG
                value={vCardData.vcard}
                size={Math.min(90, window.innerWidth * 0.15)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="Q"
                includeMargin={false}
              />
            </motion.a>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-xs font-medium tracking-wide"
          >
            Scan to save contact
          </motion.p>
          
          <CTAButtons cardData={cardData} textColor={qrStyle.foreground} />
          
          <motion.p 
            className="text-[8px] sm:text-[10px] mt-2 font-semibold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.5 }}
            style={{ color: getGoldShade() }}
          >
            <Sparkles className="inline-block h-3 w-3 mr-1" /> Premium Digital Card by Splex
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