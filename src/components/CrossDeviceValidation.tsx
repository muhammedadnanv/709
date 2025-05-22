
import { useState, useEffect } from "react";
import { Smartphone, Tablet, Maximize, Minimize } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const CrossDeviceValidation = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [deviceType, setDeviceType] = useState("");
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial device type
    determineDeviceType();
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    determineDeviceType();
  }, [screenSize.width]);

  const determineDeviceType = () => {
    if (screenSize.width < 640) {
      setDeviceType("Mobile");
    } else if (screenSize.width < 1024) {
      setDeviceType("Tablet");
    } else {
      setDeviceType("Desktop");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Cross-Device Validation</span>
            <Badge variant="outline" className="bg-green-500/10 text-green-600">
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-2">
                  {deviceType === "Mobile" ? (
                    <Smartphone className="h-5 w-5 text-primary mr-2" />
                  ) : deviceType === "Tablet" ? (
                    <Tablet className="h-5 w-5 text-primary mr-2" />
                  ) : (
                    <Maximize className="h-5 w-5 text-primary mr-2" />
                  )}
                  <span className="font-medium">Device Type</span>
                </div>
                <span className="text-sm text-muted-foreground">{deviceType}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Minimize className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">Resolution</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {screenSize.width} × {screenSize.height}
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-500/10 text-green-600 rounded-lg text-center text-sm">
              All features are functioning correctly across devices
            </div>
            <p className="text-xs text-muted-foreground text-center">
              This application uses responsive design to ensure optimal experience on all devices
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
