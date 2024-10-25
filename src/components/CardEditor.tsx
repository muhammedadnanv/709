import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useMemo } from "react";
import { Download, Loader2 } from "lucide-react";
import QRCodeTemplates from "./QRCodeTemplates";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import PremiumFeatures from "./PremiumFeatures";
import { QRTemplate } from "@/types/qrTypes";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { useCardData } from "@/hooks/useCardData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CardEditorProps {
  onSave: () => void;
}

const CardEditor = ({ onSave }: CardEditorProps) => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasWirelessConnectivity, setHasWirelessConnectivity] = useState(false);
  const { cardData, handleInputChange } = useCardData();
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
    if (!qrCodeRef.current) {
      toast({
        title: "Error",
        description: "Could not generate QR code. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DndContext>
      <Card className="aspect-auto bg-white dark:bg-gray-950 p-4 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <ProfileImageUpload 
              userName={cardData.name} 
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
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
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={profileImage || ""} alt="Profile" />
                        <AvatarFallback className="text-xl">
                          {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-lg">{cardData.name}</h4>
                      {cardData.title && (
                        <p className="text-sm opacity-80">{cardData.title}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-3 w-full px-4">
                    {cardData.phone && (
                      <span className="text-sm truncate">{cardData.phone}</span>
                    )}
                    {cardData.email && (
                      <span className="text-sm truncate">{cardData.email}</span>
                    )}
                    {cardData.website && (
                      <span className="text-sm truncate">{cardData.website}</span>
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {isLoading ? "Downloading..." : "Download Card"}
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
