import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import { Qrcode, Palette, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeCustomizerProps {
  value: string;
  onStyleChange: (style: { background: string; foreground: string }) => void;
  currentStyle: {
    background: string;
    foreground: string;
  };
}

export const QRCodeCustomizer = ({
  value,
  onStyleChange,
  currentStyle,
}: QRCodeCustomizerProps) => {
  const { toast } = useToast();
  const [customUrl, setCustomUrl] = useState("");

  const handleUrlChange = (url: string) => {
    try {
      new URL(url);
      setCustomUrl(url);
      toast({
        title: "URL Updated",
        description: "Your QR code has been updated with the new URL.",
      });
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Qrcode className="h-5 w-5" />
        <h3 className="font-semibold">Customize QR Code</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Custom URL
          </Label>
          <Input
            type="url"
            placeholder="https://example.com"
            value={customUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </Label>
          <div className="flex gap-2">
            <ColorPicker
              color={currentStyle.foreground}
              onChange={(color) =>
                onStyleChange({ ...currentStyle, foreground: color })
              }
              title="QR Code Color"
            />
            <ColorPicker
              color={currentStyle.background}
              onChange={(color) =>
                onStyleChange({ ...currentStyle, background: color })
              }
              title="Background Color"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <QRCodeSVG
          value={customUrl || value}
          size={120}
          bgColor={currentStyle.background}
          fgColor={currentStyle.foreground}
          level="H"
          includeMargin={true}
        />
      </div>
    </Card>
  );
};