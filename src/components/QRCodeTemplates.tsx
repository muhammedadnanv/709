import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { QRTemplate } from "@/types/qrTypes";
import { generateQRData, previewQRInTerminal } from "@/utils/connectivityUtils";
import { QRConnectivityStatus } from "./QRConnectivityStatus";
import { qrTemplates } from "@/data/qrTemplates";
import { useEffect, useState } from "react";

interface QRCodeTemplatesProps {
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
  const [qrData, setQrData] = useState<string>('');
  const [apiQrUrl, setApiQrUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      const { qrData, qrDataUrl } = await generateQRData(cardData, connectivityData, isPremium);
      setQrData(qrData);
      if (qrDataUrl) {
        setApiQrUrl(qrDataUrl);
      }
      await previewQRInTerminal(qrData);
    };

    generateQR();
  }, [cardData, connectivityData, isPremium]);

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Choose QR Code Style</h3>
      <QRConnectivityStatus
        isPremium={isPremium}
        connectivityData={connectivityData}
        cardData={cardData}
      />
      {apiQrUrl && (
        <div className="mb-4">
          <img src={apiQrUrl} alt="API Generated QR Code" className="mx-auto w-32 h-32" />
        </div>
      )}
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
              <div 
                className="w-full h-full flex flex-col items-center justify-center space-y-2 rounded-lg"
                style={{ background: template.style.background }}
              >
                <QRCodeSVG
                  value={qrData || 'Loading...'}
                  size={80}
                  bgColor={template.style.background}
                  fgColor={template.style.foreground}
                  level="H"
                  includeMargin={false}
                />
                <span 
                  className="text-xs"
                  style={{ color: template.style.foreground }}
                >
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

export default QRCodeTemplates;