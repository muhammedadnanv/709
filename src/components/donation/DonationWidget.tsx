
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface DonationWidgetProps {
  upiId: string;
  name: string;
  defaultAmount: number;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor: string;
  buttonText: string;
}

export function DonationWidget({
  upiId = 'adnanmuhammad4393@okicici',
  name = 'Muhammed Adnan',
  defaultAmount = 199,
  position = 'bottom-right',
  primaryColor = '#8B5CF6',
  buttonText = 'Donate'
}: DonationWidgetProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);

  // Get position styles based on the position prop
  const getPositionStyles = () => {
    switch(position) {
      case 'bottom-left':
        return 'bottom-5 left-5';
      case 'top-right':
        return 'top-5 right-5';
      case 'top-left':
        return 'top-5 left-5';
      case 'bottom-right':
      default:
        return 'bottom-5 right-5';
    }
  };

  // Generate UPI URL for QR code
  const generateUpiUrl = () => {
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams();
    params.append('pa', upiId);
    params.append('pn', name);
    params.append('am', amount.toString());
    params.append('tn', 'Donation');
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <>
      <motion.div 
        className={`fixed z-[9999] ${getPositionStyles()}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <Heart className="h-4 w-4" />
          {buttonText}
        </Button>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[380px]">
          <DialogTitle>Support Us</DialogTitle>
          <DialogDescription>
            Scan this QR code to make a donation
          </DialogDescription>
          
          <div className="flex justify-center py-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <QRCodeSVG
                value={generateUpiUrl()}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level="L"
                includeMargin={false}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="donation-amount">Amount (₹)</Label>
            <Input 
              id="donation-amount" 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-right"
            />
          </div>
          
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm">
              UPI ID: <span className="font-semibold">{upiId}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Thank you for your support!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
