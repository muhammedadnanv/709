import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useRef } from "react";
import { Download } from "lucide-react";
import QRCodeTemplates from "./QRCodeTemplates";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import PremiumFeatures from "./PremiumFeatures";
import { QRTemplate } from "@/types/qrTypes";

interface CardEditorProps {
  onSave: () => void;
}

const CardEditor = ({ onSave }: CardEditorProps) => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [hasWirelessConnectivity, setHasWirelessConnectivity] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  });

  const [selectedQRTemplate, setSelectedQRTemplate] = useState<QRTemplate>({
    id: 1,
    name: "Default",
    style: {
      background: "#FFFFFF",
      foreground: "#000000",
      cornerColor: "#000000",
      layout: "modern",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const vCardData = useMemo(() => {
    const nameParts = cardData.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${cardData.name}
TITLE:${cardData.title}
TEL;TYPE=CELL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
URL;type=LinkedIn:${cardData.linkedin}
URL;type=Instagram:${cardData.instagram}
URL;type=Facebook:${cardData.facebook}`;

    if (hasWirelessConnectivity) {
      vcard += '\nX-WIRELESS-ENABLED:true';
    }

    vcard += '\nEND:VCARD';
    return vcard;
  }, [cardData, hasWirelessConnectivity]);

  const handleDownload = async () => {
    if (qrCodeRef.current) {
      try {
        const canvas = await html2canvas(qrCodeRef.current);
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${cardData.name || 'qr-code'}-card.png`;
        link.href = url;
        link.click();
        
        toast({
          title: "Success!",
          description: "Your QR code card has been downloaded.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download QR code card.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <DndContext>
      <Card className="aspect-auto bg-white dark:bg-gray-950 p-4 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <PersonalInfoForm cardData={cardData} handleInputChange={handleInputChange} />
            <ContactInfoForm cardData={cardData} handleInputChange={handleInputChange} />
            <PremiumFeatures onUnlock={() => setHasWirelessConnectivity(true)} />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Digital Card</h3>
              <div 
                ref={qrCodeRef}
                className="aspect-[3/4] rounded-lg flex flex-col items-center justify-between p-4 sm:p-8 border shadow-lg mx-auto max-w-sm"
                style={{ 
                  background: selectedQRTemplate.style.background,
                  color: selectedQRTemplate.style.foreground 
                }}
              >
                <div className="text-center space-y-4 w-full">
                  {cardData.name && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{cardData.name}</h4>
                      {cardData.title && (
                        <p className="text-sm opacity-80">{cardData.title}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-3 w-full px-4">
                    {cardData.phone && (
                      <span className="text-sm">{cardData.phone}</span>
                    )}
                    {cardData.email && (
                      <span className="text-sm">{cardData.email}</span>
                    )}
                    {cardData.website && (
                      <span className="text-sm">{cardData.website}</span>
                    )}
                  </div>

                  <div className="flex justify-center gap-4">
                    {cardData.linkedin && (
                      <span className="text-sm">LinkedIn</span>
                    )}
                    {cardData.instagram && (
                      <span className="text-sm">Instagram</span>
                    )}
                    {cardData.facebook && (
                      <span className="text-sm">Facebook</span>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center py-4">
                    <QRCodeSVG
                      value={vCardData}
                      size={Math.min(200, window.innerWidth * 0.4)}
                      bgColor={selectedQRTemplate.style.background}
                      fgColor={selectedQRTemplate.style.foreground}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-sm">Scan to Connect</p>
                </div>
              </div>
              <Button 
                onClick={handleDownload} 
                className="w-full gap-2"
                variant="outline"
              >
                <Download className="h-4 w-4" />
                Download Card
              </Button>
            </div>

            <QRCodeTemplates
              value={vCardData}
              onSelectTemplate={setSelectedQRTemplate}
              selectedTemplate={selectedQRTemplate}
              userName={cardData.name}
            />
          </div>
        </div>
      </Card>
    </DndContext>
  );
};

export default CardEditor;