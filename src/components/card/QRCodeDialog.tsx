import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QRCodeSVG } from "qrcode.react";
import { Camera, Download, Scan, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QRCodeDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  vcfContent: string;
  qrStyle: {
    background: string;
    foreground: string;
  };
  isScanning: boolean;
  scanProgress: number;
  scanSuccess: boolean | null;
  handleScanAttempt: () => void;
  handleDownload: () => void;
}

export const QRCodeDialog = ({
  showDialog,
  setShowDialog,
  vcfContent,
  qrStyle,
  isScanning,
  scanProgress,
  scanSuccess,
  handleScanAttempt,
  handleDownload,
}: QRCodeDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
  );
};