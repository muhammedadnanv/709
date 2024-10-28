import { QRCodeSVG } from "qrcode.react";
import { Camera, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

interface QRCodeSectionProps {
  qrCodeData: string;
  qrStyle: {
    background: string;
    foreground: string;
  };
  setShowQRDialog: (show: boolean) => void;
}

export const QRCodeSection = ({ qrCodeData, qrStyle, setShowQRDialog }: QRCodeSectionProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-6 relative mx-auto max-w-[250px] w-full"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <motion.div
        className="relative group cursor-pointer backdrop-blur-md p-4 rounded-xl w-full flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowQRDialog(true)}
        style={{
          background: `${qrStyle.background}40`,
          boxShadow: `0 8px 32px -4px ${qrStyle.foreground}20`
        }}
      >
        <div className="relative">
          <QRCodeSVG
            value={qrCodeData}
            size={Math.min(160, window.innerWidth * 0.3)}
            bgColor={qrStyle.background}
            fgColor={qrStyle.foreground}
            level="H"
            includeMargin={true}
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
        className="mt-4 space-y-2 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-sm sm:text-base font-medium flex items-center justify-center gap-2">
          <Camera className="h-5 w-5" />
          Scan QR Code
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Works with any phone camera
        </p>
        <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Powered by Digital Business Card
        </p>
      </motion.div>
    </motion.div>
  );
};