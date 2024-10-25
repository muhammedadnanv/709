import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useMemo, useRef } from "react";
import { Mail, Phone, Globe, Download } from "lucide-react";
import QRCodeTemplates from "./QRCodeTemplates";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";

const CardEditor = () => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
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

  const [selectedQRTemplate, setSelectedQRTemplate] = useState({
    id: 1,
    name: "Default",
    style: {
      background: "#FFFFFF",
      foreground: "#000000",
      cornerColor: "#000000",
      layout: "modern" as const,
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
    
    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${cardData.name}
TITLE:${cardData.title}
TEL;TYPE=CELL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
URL;type=LinkedIn:${cardData.linkedin}
URL;type=Instagram:${cardData.instagram}
URL;type=Facebook:${cardData.facebook}
END:VCARD`;
  }, [cardData]);

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
      <Card className="aspect-auto bg-white dark:bg-gray-950 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PersonalInfoForm cardData={cardData} handleInputChange={handleInputChange} />
            <ContactInfoForm cardData={cardData} handleInputChange={handleInputChange} />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Digital Card</h3>
              <div 
                ref={qrCodeRef}
                className="aspect-[3/4] rounded-lg flex flex-col items-center justify-center p-8 border shadow-lg"
                style={{ 
                  background: selectedQRTemplate.style.background,
                  color: selectedQRTemplate.style.foreground 
                }}
              >
                <div className="text-center space-y-4">
                  {cardData.name && (
                    <h4 className="font-semibold">{cardData.name}</h4>
                  )}
                  <QRCodeSVG
                    value={vCardData}
                    size={200}
                    bgColor={selectedQRTemplate.style.background}
                    fgColor={selectedQRTemplate.style.foreground}
                    level="M"
                    includeMargin={false}
                  />
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
              onSelectTemplate={(template) => setSelectedQRTemplate(template)}
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
