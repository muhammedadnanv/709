import { QRCodeSVG } from "qrcode.react";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardTimestamp } from "./CardTimestamp";
import { SocialLinks } from "./SocialLinks";
import { validateCardData, generateVCFContent, generateQRCodeData } from "@/utils/vcfGenerator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { QRCodeDialog } from "./QRCodeDialog";
import { addYears } from "date-fns";
import { QRCodeCustomizer } from "./QRCodeCustomizer";
import { SocialShare } from "./SocialShare";
import { DigitalSignature } from "./DigitalSignature";

interface CardPreviewProps {
  cardData: CardData;
  profileImage: string | null;
  qrStyle: {
    background: string;
    foreground: string;
  };
}

export const CardPreview = ({ cardData, profileImage, qrStyle: initialQrStyle }: CardPreviewProps) => {
  const { toast } = useToast();
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState<boolean | null>(null);
  const [qrStyle, setQrStyle] = useState(initialQrStyle);
  const creationDate = new Date();
  const expirationDate = addYears(creationDate, 2);

  const validationErrors = validateCardData(cardData);
  const vcfData = generateVCFContent(cardData);
  const qrCodeData = generateQRCodeData(cardData);

  const handleWhatsAppClick = () => {
    if (cardData.phone) {
      const cleanPhone = cardData.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi, I got your contact from your digital business card.`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleScanAttempt = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanSuccess(null);

    if (navigator.share) {
      navigator.share({
        title: `${cardData.name}'s Digital Business Card`,
        text: 'Check out my digital business card',
        url: window.location.href
      }).catch(() => {
        handleDownload();
      });
    } else {
      handleDownload();
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

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    const link = document.createElement('a');
    link.href = vcfData.dataUrl;
    link.download = vcfData.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(vcfData.dataUrl);

    toast({
      title: "Digital Card Downloaded",
      description: "Your digital business card has been downloaded successfully.",
    });
    setShowQRDialog(false);
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
        {validationErrors.length > 0 && validationErrors.some(error => !error.includes("required")) && (
          <Alert variant="destructive" className="absolute top-2 left-2 right-2 z-50">
            <AlertDescription>
              {validationErrors.filter(error => !error.includes("required"))[0]}
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
              onClick={() => setShowQRDialog(true)}
            >
              <QRCodeSVG
                value={qrCodeData}
                size={Math.min(80, window.innerWidth * 0.15)}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="H"
                includeMargin={true}
              />
            </motion.div>
          </motion.div>

          <p className="text-[10px] sm:text-xs flex items-center justify-center gap-1">
            <Camera className="h-3 w-3" />
            Scan to save digital card
          </p>

          <WalletActions 
            cardData={cardData}
            qrCodeUrl={vcfData.dataUrl}
          />
        </div>
      </motion.div>

      <QRCodeCustomizer
        value={qrCodeData}
        onStyleChange={setQrStyle}
        currentStyle={qrStyle}
      />

      <SocialShare
        cardUrl={window.location.href}
        cardName={cardData.name}
      />

      <DigitalSignature
        onSignatureAdd={(signature) => {
          // Handle signature addition
          toast({
            title: "Signature Added",
            description: "Your digital signature has been added to the card.",
          });
        }}
      />

      <QRCodeDialog
        showDialog={showQRDialog}
        setShowDialog={setShowQRDialog}
        vcfContent={qrCodeData}
        qrStyle={qrStyle}
        isScanning={isScanning}
        scanProgress={scanProgress}
        scanSuccess={scanSuccess}
        handleScanAttempt={handleScanAttempt}
        handleDownload={handleDownload}
      />
    </div>
  );
};