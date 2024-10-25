import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { useRef, useState } from "react";
import QRCodeTemplates from "./QRCodeTemplates";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import PremiumFeatures from "./PremiumFeatures";
import { QRTemplate } from "@/types/qrTypes";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { useCardData } from "@/hooks/useCardData";
import { CardPreview } from "./card/CardPreview";
import { CardActions } from "./card/CardActions";
import { generateVCardData } from "@/utils/vcard";
import { CardData } from "@/hooks/useCardData";

interface CardEditorProps {
  onSave: (cardData: CardData) => void;
}

const CardEditor = ({ onSave }: CardEditorProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [hasWirelessConnectivity, setHasWirelessConnectivity] = useState<boolean>(false);
  const { cardData, handleInputChange, handleSelectChange } = useCardData();
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

  const vCardData = generateVCardData(cardData, hasWirelessConnectivity);

  const handleSaveClick = () => {
    onSave(cardData);
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
            <PersonalInfoForm 
              cardData={cardData} 
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
            <ContactInfoForm cardData={cardData} handleInputChange={handleInputChange} />
            <PremiumFeatures onUnlock={() => setHasWirelessConnectivity(true)} />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Digital Card</h3>
              <div ref={qrCodeRef}>
                <CardPreview 
                  cardData={cardData}
                  profileImage={profileImage}
                  vCardData={vCardData}
                  qrStyle={selectedQRTemplate.style}
                />
              </div>
              <CardActions qrCodeRef={qrCodeRef} cardData={cardData} />
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