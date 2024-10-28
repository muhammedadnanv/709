import { QRCodeSVG } from "qrcode.react";
import { CardData, VCardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Star, Sparkles, CircleDot, GripHorizontal, Gem, Camera } from "lucide-react";
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
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-lg flex flex-col items-center justify-between p-4 border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm sm:max-w-[504px] sm:p-6 group"
        style={{ 
          background: `linear-gradient(135deg, ${qrStyle.background}, ${qrStyle.background}ee)`,
          color: qrStyle.foreground,
        }}
      >
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform" />
        <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 bg-gradient-to-tr from-black/10 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform" />
        
        {/* Animated Decorative Icons */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ rotate: 15, scale: 1.2 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-500/50" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 left-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.2 }}
        >
          <CircleDot className="w-3 h-3 text-primary/30" />
        </motion.div>

        <motion.div
          className="absolute top-4 left-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ rotate: -15, scale: 1.2 }}
        >
          <Gem className="w-3 h-3 text-primary/30" />
        </motion.div>
        
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
            className="flex items-center justify-center py-2 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 rounded-full group-hover:opacity-30 transition-opacity" />
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Camera className="h-3 w-3 inline-block mr-1" />
                <span className="text-[10px]">Camera Ready</span>
              </motion.div>
              <a 
                href={vCardData.dataUrl} 
                download={vCardData.downloadFilename}
                className="block hover:opacity-90 transition-all duration-300"
              >
                <QRCodeSVG
                  value={vCardData.vcard}
                  size={Math.min(80, window.innerWidth * 0.15)}
                  bgColor={qrStyle.background}
                  fgColor={qrStyle.foreground}
                  level="M"
                  includeMargin={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20 rounded-sm group-hover:opacity-30 transition-opacity" />
              </a>
            </motion.div>
          </motion.div>
          <p className="text-[10px] sm:text-xs flex items-center justify-center gap-1">
            <Camera className="h-3 w-3" />
            Just open your phone camera
          </p>

          <WalletActions 
            cardData={cardData}
            qrCodeUrl={vCardData.vcard}
          />
        </div>
      </motion.div>
    </div>
  );
};
