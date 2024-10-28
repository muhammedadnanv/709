import { QRCodeSVG } from "qrcode.react";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { Camera, ScanLine } from "lucide-react";
import { motion } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardTimestamp } from "./CardTimestamp";
import { SocialLinks } from "./SocialLinks";
import { validateCardData, generateVCFContent, generateQRCodeData } from "@/utils/vcfGenerator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useMemo } from "react";
import { QRCodeDialog } from "./QRCodeDialog";
import { addYears } from "date-fns";
import { SocialShare } from "./SocialShare";
import { PrintService } from "../print/PrintService";

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
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState<boolean | null>(null);
  const creationDate = new Date();
  const expirationDate = addYears(creationDate, 2);

  // Memoize QR code data generation
  const qrCodeData = useMemo(() => generateQRCodeData(cardData), [
    cardData.name,
    cardData.title,
    cardData.phone,
    cardData.email,
    cardData.website,
    cardData.company,
    cardData.department,
    cardData.pronouns,
    cardData.location
  ]);

  const validationErrors = validateCardData(cardData);
  const vcfData = useMemo(() => generateVCFContent(cardData), [cardData]);

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
          />

          <motion.div 
            className="flex flex-col items-center justify-center py-2 relative"
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
              <div className="relative">
                <QRCodeSVG
                  value={qrCodeData}
                  size={Math.min(80, window.innerWidth * 0.15)}
                  bgColor={qrStyle.background}
                  fgColor={qrStyle.foreground}
                  level="L"
                  includeMargin={false}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    y: ["-100%", "100%"],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <ScanLine className="w-full h-1 text-primary/50" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-2 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5">
                <Camera className="h-4 w-4" />
                Scan QR Code with Phone Camera
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                No app needed - works with any phone
              </p>
            </motion.div>
          </motion.div>

          <WalletActions 
            cardData={cardData}
            qrCodeUrl={vcfData.dataUrl}
          />
        </div>
      </motion.div>

      <SocialShare
        cardUrl={window.location.href}
        cardName={cardData.name}
      />

      <PrintService cardData={cardData} />

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