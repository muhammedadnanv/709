```typescript
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { QRTemplate } from "@/types/qrTypes";
import { generateQRData } from "@/utils/connectivityUtils";
import { Facebook, Instagram, Linkedin, Wifi, Bluetooth } from "lucide-react";

interface QRCodeTemplatesProps {
  value: string;
  onSelectTemplate: (template: QRTemplate) => void;
  selectedTemplate: QRTemplate;
  userName?: string;
  connectivityData?: {
    wifi: { ssid: string; password: string };
    bluetooth: { deviceName: string; mac: string };
  };
  cardData: {
    name: string;
    title: string;
    phone: string;
    email: string;
    website: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  isPremium?: boolean;
}

const QRCodeTemplates = ({ 
  onSelectTemplate, 
  selectedTemplate, 
  userName,
  connectivityData,
  cardData,
  isPremium = false
}: QRCodeTemplatesProps) => {
  const qrValue = generateQRData(cardData, connectivityData, isPremium);

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Choose QR Code Style</h3>
      <div className="flex gap-4 mb-4">
        {isPremium && connectivityData?.wifi?.ssid && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wifi className="h-4 w-4" />
            <span>WiFi Ready</span>
          </div>
        )}
        {isPremium && connectivityData?.bluetooth?.deviceName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bluetooth className="h-4 w-4" />
            <span>Bluetooth Ready</span>
          </div>
        )}
      </div>
      <div className="flex gap-4 mb-4">
        {cardData.facebook && (
          <Facebook className="h-4 w-4 text-muted-foreground" />
        )}
        {cardData.instagram && (
          <Instagram className="h-4 w-4 text-muted-foreground" />
        )}
        {cardData.linkedin && (
          <Linkedin className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {qrTemplates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`h-40 p-2 ${
                selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onSelectTemplate(template)}
            >
              <div className="w-full h-full flex flex-col items-center justify-center space-y-2 rounded-lg" 
                   style={{ background: template.style.background }}>
                <QRCodeSVG
                  value={qrValue}
                  size={80}
                  bgColor={template.style.background}
                  fgColor={template.style.foreground}
                  level="H"
                  includeMargin={false}
                />
                <span className="text-xs" style={{ color: template.style.foreground }}>
                  {userName || 'Scan to Connect'}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

const qrTemplates: QRTemplate[] = [
  {
    id: 1,
    name: "Modern Black",
    style: {
      background: "#FFFFFF",
      foreground: "#000000",
      cornerColor: "#000000",
      layout: "modern"
    }
  },
  {
    id: 2,
    name: "Ocean Blue",
    style: {
      background: "#001F3F",
      foreground: "#FFFFFF",
      cornerColor: "#7FDBFF",
      layout: "modern"
    }
  },
  {
    id: 3,
    name: "Forest Green",
    style: {
      background: "#2ECC40",
      foreground: "#FFFFFF",
      cornerColor: "#01FF70",
      layout: "classic"
    }
  },
  {
    id: 4,
    name: "Sunset Red",
    style: {
      background: "#FF4136",
      foreground: "#FFFFFF",
      cornerColor: "#FF851B",
      layout: "minimal"
    }
  },
  {
    id: 5,
    name: "Royal Purple",
    style: {
      background: "#B10DC9",
      foreground: "#FFFFFF",
      cornerColor: "#F012BE",
      layout: "bold"
    }
  },
  {
    id: 6,
    name: "Golden Sun",
    style: {
      background: "#FFDC00",
      foreground: "#000000",
      cornerColor: "#FF851B",
      layout: "classic"
    }
  },
  {
    id: 7,
    name: "Sky Blue",
    style: {
      background: "#7FDBFF",
      foreground: "#000000",
      cornerColor: "#001F3F",
      layout: "minimal"
    }
  },
  {
    id: 8,
    name: "Neon Pink",
    style: {
      background: "#F012BE",
      foreground: "#FFFFFF",
      cornerColor: "#B10DC9",
      layout: "bold"
    }
  },
  {
    id: 9,
    name: "Lime Light",
    style: {
      background: "#01FF70",
      foreground: "#000000",
      cornerColor: "#2ECC40",
      layout: "modern"
    }
  },
  {
    id: 10,
    name: "Orange Glow",
    style: {
      background: "#FF851B",
      foreground: "#000000",
      cornerColor: "#FF4136",
      layout: "classic"
    }
  }
];

export default QRCodeTemplates;
```