import { QRCodeSVG } from "qrcode.react";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Star, Sparkles, CircleDot, GripHorizontal, Gem, Camera, AlertCircle } from "lucide-react";
import { addYears } from "date-fns";
import { motion } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardTimestamp } from "./CardTimestamp";
import { SocialLinks } from "./SocialLinks";
import { validateCardData, generateVCFContent, generateDataUrl } from "@/utils/vcfGenerator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CardPreviewProps {
  cardData: CardData;
  profileImage: string | null;
  qrStyle: {
    background: string;
    foreground: string;
  };
}

export const CardPreview = ({ cardData, profileImage, qrStyle }: CardPreviewProps) => {
  const { toast } = useToast();
  const creationDate = new Date();
  const expirationDate = addYears(creationDate, 2);

  // Validate card data
  const validationErrors = validateCardData(cardData);
  const vcfContent = generateVCFContent(cardData);
  const dataUrl = generateDataUrl(vcfContent);

  const handleWhatsAppClick = () => {
    if (cardData.phone) {
      const cleanPhone = cardData.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi, I got your contact from your digital business card.`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleDownload = () => {
    if (validationErrors.length > 0) {
      toast({
        title: "Invalid Contact Data",
        description: validationErrors.join(". "),
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${cardData.name?.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(dataUrl);

    toast({
      title: "Contact Downloaded",
      description: "The contact card has been downloaded successfully.",
    });
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
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="absolute top-2 left-2 right-2 z-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the following: {validationErrors[0]}
            </AlertDescription>
          </Alert>
        )}

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
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
            >
              <QRCodeSVG
                value={vcfContent}
                size={Math.min(80, window.innerWidth * 0.15)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="H"
                includeMargin={true}
              />
              <motion.div
                className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Camera className="h-3 w-3 inline-block mr-1" />
                <span className="text-[10px]">Scan to Save</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <p className="text-[10px] sm:text-xs flex items-center justify-center gap-1">
            <Camera className="h-3 w-3" />
            Open your camera app to scan
          </p>

          <WalletActions 
            cardData={cardData}
            qrCodeUrl={dataUrl}
          />
        </div>
      </motion.div>
    </div>
  );
};