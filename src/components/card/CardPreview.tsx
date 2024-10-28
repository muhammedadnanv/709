import { QRCodeSVG } from "qrcode.react";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { Camera, ScanLine, Sparkle, Crown, Star } from "lucide-react";
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
        className="mx-auto max-w-[336px] w-full aspect-[1.75/1] rounded-lg flex flex-col items-center justify-between p-4 border shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm sm:max-w-[504px] sm:p-6 group"
        style={{ 
          background: `linear-gradient(135deg, ${qrStyle.background}ee, ${qrStyle.background}dd)`,
          color: qrStyle.foreground,
          boxShadow: `0 4px 20px -2px ${qrStyle.foreground}20`,
          borderColor: `${qrStyle.foreground}30`,
        }}
      >
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay'
            }}
          />
          {/* Decorative Elements */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 opacity-5"
          >
            <Crown className="w-40 h-40" style={{ color: qrStyle.foreground }} />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          >
            <Star className="w-6 h-6" style={{ color: qrStyle.foreground }} />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-4 right-4"
          >
            <Sparkle className="w-5 h-5" style={{ color: qrStyle.foreground }} />
          </motion.div>
        </div>

        {/* Main Content */}
        {validationErrors.length > 0 && validationErrors.some(error => !error.includes("required")) && (
          <Alert variant="destructive" className="absolute top-2 left-2 right-2 z-50">
            <AlertDescription>
              {validationErrors.filter(error => !error.includes("required"))[0]}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-2 w-full relative z-10 backdrop-blur-sm">
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

          {/* QR Code Section with Enhanced Styling */}
          <motion.div 
            className="flex flex-col items-center justify-center py-2 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="relative group cursor-pointer backdrop-blur-md p-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQRDialog(true)}
              style={{
                background: `${qrStyle.background}20`,
                boxShadow: `0 4px 15px -3px ${qrStyle.foreground}10`
              }}
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