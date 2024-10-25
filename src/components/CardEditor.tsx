import { DndContext } from "@dnd-kit/core";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import QRCodeTemplates from "./QRCodeTemplates";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import PremiumFeatures from "./PremiumFeatures";
import { QRTemplate } from "@/types/qrTypes";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { useCardData, CardData } from "@/hooks/useCardData";
import { CardPreview } from "./card/CardPreview";
import { CardActions } from "./card/CardActions";
import { generateVCardData } from "@/utils/vcard";
import { CustomButtonsManager } from "./CustomButtonsManager";
import { CustomButton } from "@/types/qrTypes";

interface CardEditorProps {
  onSave: (cardData: CardData) => void;
}

const CardEditor = ({ onSave }: CardEditorProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [hasWirelessConnectivity, setHasWirelessConnectivity] = useState<boolean>(false);
  const { cardData, handleInputChange, handleSelectChange, setCardData } = useCardData();
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

  const handleCustomButtonsChange = (buttons: CustomButton[]) => {
    setCardData(prev => ({
      ...prev,
      customButtons: buttons
    }));
  };

  const vCardData = generateVCardData(cardData, hasWirelessConnectivity);

  const handleSaveClick = () => {
    onSave(cardData);
  };

  return (
    <DndContext>
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="sticky top-4">
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
                <CustomButtonsManager
                  buttons={cardData.customButtons || []}
                  onChange={handleCustomButtonsChange}
                />
                <PremiumFeatures onUnlock={() => setHasWirelessConnectivity(true)} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="lg:sticky lg:top-4">
                <h3 className="text-lg font-semibold mb-4">Your Digital Card</h3>
                <div ref={qrCodeRef} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <CardPreview 
                    cardData={cardData}
                    profileImage={profileImage}
                    vCardData={vCardData}
                    qrStyle={selectedQRTemplate.style}
                  />
                </div>
                <CardActions qrCodeRef={qrCodeRef} cardData={cardData} />
                <QRCodeTemplates
                  value={vCardData.vcard}
                  onSelectTemplate={setSelectedQRTemplate}
                  selectedTemplate={selectedQRTemplate}
                  userName={cardData.name}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DndContext>
  );
};

export default CardEditor;
