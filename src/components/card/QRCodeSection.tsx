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
      className="flex flex-col items-center justify-center py-4 relative"
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
            size={Math.min(100, window.innerWidth * 0.2)}
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
        className="mt-4 space-y-2 text-center"
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
        <p className="text-[10px] sm:text-xs font-semibold opacity-75">
          Powered by Digital Business Card
        </p>
      </motion.div>
    </motion.div>
  );
};