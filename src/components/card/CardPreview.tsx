import { QRCodeSVG } from "qrcode.react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardData, VCardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Linkedin, Instagram, Facebook, Nfc, Clock, Calendar, MessageCircle, Star } from "lucide-react";
import { format, addYears } from "date-fns";
import { motion } from "framer-motion";

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
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-lg flex flex-col items-center justify-between p-4 border shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 sm:max-w-[504px] sm:p-6 relative overflow-hidden"
        style={{ 
          background: qrStyle.background,
          color: qrStyle.foreground,
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        
        <div className="text-center space-y-2 w-full relative z-10">
          <div className="flex items-center justify-between">
            {cardData.name && (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16 ring-2 ring-white/20">
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
              </motion.div>
            )}
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Nfc className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center gap-4 text-[10px] sm:text-xs opacity-70 mt-1" 
            style={{ color: qrStyle.foreground }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Created {format(creationDate, 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Valid until {format(expirationDate, 'MMM d, yyyy')}
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-3 mt-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {cardData.phone && (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWhatsAppClick}
                className="hover:opacity-80 dark:text-gray-200 transition-opacity"
                title="Connect on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </motion.button>
            )}
            {cardData.linkedin && (
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={cardData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 dark:text-gray-200 transition-opacity"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </motion.a>
            )}
            {cardData.instagram && (
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={cardData.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 dark:text-gray-200 transition-opacity"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </motion.a>
            )}
            {cardData.facebook && (
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={cardData.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 dark:text-gray-200 transition-opacity"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: qrStyle.foreground }} />
              </motion.a>
            )}
          </motion.div>

          <motion.div 
            className="flex items-center justify-center py-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
          </motion.div>
          <p className="text-[10px] sm:text-xs dark:text-gray-300">Scan to save contact</p>
          
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