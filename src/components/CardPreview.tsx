import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { User, Mail, Phone, Globe, Linkedin, Instagram, Facebook } from "lucide-react";
import { QRTemplate } from "@/types/qrTypes";
import { generateVCard } from "@/utils/connectivityUtils";

interface CardPreviewProps {
  cardData: {
    name: string;
    title: string;
    phone: string;
    email: string;
    website: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  selectedTemplate: QRTemplate;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ cardData, selectedTemplate }, ref) => {
    const qrData = generateVCard(cardData);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Digital Card</h3>
        <div 
          ref={ref}
          className="aspect-[3/4] rounded-lg flex flex-col items-center justify-between p-4 sm:p-8 border shadow-lg mx-auto max-w-sm"
          style={{ 
            background: selectedTemplate.style.background,
            color: selectedTemplate.style.foreground 
          }}
        >
          <div className="text-center space-y-4 w-full">
            {cardData.name && (
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-opacity-10 flex items-center justify-center" 
                     style={{ backgroundColor: selectedTemplate.style.foreground }}>
                  <User className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-lg">{cardData.name}</h4>
                {cardData.title && (
                  <p className="text-sm opacity-80">{cardData.title}</p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-4">
              {cardData.phone && (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-8 h-8 rounded-full bg-opacity-10 flex items-center justify-center" 
                       style={{ backgroundColor: selectedTemplate.style.foreground }}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm truncate">{cardData.phone}</span>
                </div>
              )}
              {cardData.email && (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-8 h-8 rounded-full bg-opacity-10 flex items-center justify-center" 
                       style={{ backgroundColor: selectedTemplate.style.foreground }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm truncate">{cardData.email}</span>
                </div>
              )}
              {cardData.website && (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-8 h-8 rounded-full bg-opacity-10 flex items-center justify-center" 
                       style={{ backgroundColor: selectedTemplate.style.foreground }}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm truncate">{cardData.website}</span>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              {cardData.linkedin && (
                <div className="w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center" 
                     style={{ backgroundColor: selectedTemplate.style.foreground }}>
                  <Linkedin className="w-5 h-5" />
                </div>
              )}
              {cardData.instagram && (
                <div className="w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center" 
                     style={{ backgroundColor: selectedTemplate.style.foreground }}>
                  <Instagram className="w-5 h-5" />
                </div>
              )}
              {cardData.facebook && (
                <div className="w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center" 
                     style={{ backgroundColor: selectedTemplate.style.foreground }}>
                  <Facebook className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <QRCodeSVG
                value={qrData}
                size={120}
                bgColor={selectedTemplate.style.background}
                fgColor={selectedTemplate.style.foreground}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = "CardPreview";