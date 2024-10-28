import { QRCodeSVG } from "qrcode.react";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "./WalletActions";
import { CTAButtons } from "./CTAButtons";
import { Star, Sparkles, CircleDot, GripHorizontal, Gem, Camera, AlertCircle, Download, Scan, CheckCircle2, XCircle } from "lucide-react";
import { addYears } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardTimestamp } from "./CardTimestamp";
import { SocialLinks } from "./SocialLinks";
import { validateCardData, generateVCFContent, generateDataUrl } from "@/utils/vcfGenerator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

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

  const validationErrors = validateCardData(cardData);
  const vcfContent = generateVCFContent(cardData);
  const dataUrl = generateDataUrl(vcfContent);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            setScanSuccess(true);
            clearInterval(interval);
            handleDownload();
            return 0;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

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

    // Check if the device supports the Web Share API
    if (navigator.share) {
      navigator.share({
        title: `${cardData.name}'s Contact Card`,
        text: 'Check out my digital business card',
        url: window.location.href
      }).catch(() => {
        // If sharing fails, fall back to download
        handleDownload();
      });
    } else {
      // If Web Share API is not supported, proceed with download
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

    // Trigger device vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate(200);
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
              onClick={() => setShowQRDialog(true)}
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
                <span className="text-[10px]">Scan or Click</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <p className="text-[10px] sm:text-xs flex items-center justify-center gap-1">
            <Camera className="h-3 w-3" />
            Click to scan or download
          </p>

          <WalletActions 
            cardData={cardData}
            qrCodeUrl={dataUrl}
          />
        </div>
      </motion.div>

      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Contact</DialogTitle>
            <DialogDescription>
              Scan the QR code with your phone's camera or click the button below to download.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="relative">
              <QRCodeSVG
                value={vcfContent}
                size={200}
                bgColor={qrStyle.background}
                fgColor={qrStyle.foreground}
                level="H"
                includeMargin={true}
              />
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-white text-center space-y-2">
                      <Scan className="h-8 w-8 animate-pulse mx-auto" />
                      <Progress value={scanProgress} className="w-32" />
                    </div>
                  </motion.div>
                )}
                {scanSuccess === true && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green-500/50 rounded-lg flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                )}
                {scanSuccess === false && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-red-500/50 rounded-lg flex items-center justify-center"
                  >
                    <XCircle className="h-12 w-12 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-2 w-full">
              <Button 
                onClick={handleScanAttempt} 
                className="w-full gap-2"
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Scan className="h-4 w-4 animate-pulse" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Scan & Download
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDownload} 
                variant="outline" 
                className="w-full gap-2"
                disabled={isScanning}
              >
                <Download className="h-4 w-4" />
                Download Directly
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};