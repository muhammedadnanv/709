import { QrCode, Smartphone, Share2, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const WelcomeMessage = () => {
  return (
    <Card className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Works with Any Phone!
        </h2>
        <p className="text-muted-foreground mt-2">No special apps needed - just use your camera</p>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-3 py-6">
        <motion.div 
          className="space-y-2 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative inline-block">
            <Camera className="h-8 w-8 mx-auto text-primary" />
            <motion.div
              className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <h3 className="font-semibold">Just Open Camera</h3>
          <p className="text-sm text-muted-foreground">
            Works with any phone's built-in camera app
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-2 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <QrCode className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Scan & Save</h3>
          <p className="text-sm text-muted-foreground">
            Point camera at QR code to instantly save contact
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-2 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Share2 className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Share Instantly</h3>
          <p className="text-sm text-muted-foreground">
            No apps to download - works right away
          </p>
        </motion.div>
      </div>

      <div className="text-center bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Smartphone className="h-4 w-4" />
          <span>Compatible with iOS, Android, and all modern phones</span>
        </div>
      </div>
    </Card>
  );
};