import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import QRCodeTemplates from "./QRCodeTemplates";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { ConnectivityForm } from "./ConnectivityForm";
import { QRTemplate } from "@/types/qrTypes";
import { CardPreview } from "./CardPreview";
import { generateVCard } from "@/utils/connectivityUtils";

interface CardEditorProps {
  onSave: () => void;
}

const CardEditor = ({ onSave }: CardEditorProps) => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [isPremium] = useState(false); // In a real app, this would come from your auth/payment system
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

  const [connectivityData, setConnectivityData] = useState({
    wifi: {
      ssid: "",
      password: "",
    },
    bluetooth: {
      deviceName: "",
      mac: "",
    },
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

  const handleConnectivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [type, field] = name.split(".");
    setConnectivityData((prev) => ({
      ...prev,
      [type]: { ...prev[type as keyof typeof prev], [field]: value },
    }));
  };

  const vCardData = useMemo(() => generateVCard(cardData), [cardData]);

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
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <PersonalInfoForm cardData={cardData} handleInputChange={handleInputChange} />
        <ContactInfoForm cardData={cardData} handleInputChange={handleInputChange} />
        <ConnectivityForm 
          connectivityData={connectivityData} 
          handleConnectivityChange={handleConnectivityChange}
          isPremium={isPremium}
        />
      </div>

      <div className="space-y-6">
        <CardPreview 
          ref={qrCodeRef}
          cardData={cardData}
          selectedTemplate={selectedQRTemplate}
        />
        <Button 
          onClick={handleDownload} 
          className="w-full gap-2"
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Download Card
        </Button>

        <QRCodeTemplates
          value={vCardData}
          onSelectTemplate={setSelectedQRTemplate}
          selectedTemplate={selectedQRTemplate}
          userName={cardData.name}
          connectivityData={connectivityData}
          cardData={cardData}
        />
      </div>
    </div>
  );
};

export default CardEditor;