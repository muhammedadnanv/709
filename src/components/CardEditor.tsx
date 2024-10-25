import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import { Mail, Phone, Globe, Linkedin, Instagram, Facebook } from "lucide-react";
import QRCodeTemplates from "./QRCodeTemplates";

const CardEditor = () => {
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

  return (
    <DndContext>
      <Card className="aspect-auto bg-white dark:bg-gray-950 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={cardData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={cardData.title}
                    onChange={handleInputChange}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      value={cardData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      name="website"
                      value={cardData.website}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">QR Code Style</h3>
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center border p-4" style={{ background: selectedQRTemplate.style.background }}>
                <QRCodeSVG
                  value={vCardData}
                  size={200}
                  bgColor={selectedQRTemplate.style.background}
                  fgColor={selectedQRTemplate.style.foreground}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <Button className="w-full" variant="outline">
                Download QR Code
              </Button>
            </div>

            <QRCodeTemplates
              value={vCardData}
              onSelectTemplate={setSelectedQRTemplate}
              selectedTemplate={selectedQRTemplate}
            />
          </div>
        </div>
      </Card>
    </DndContext>
  );
};

export default CardEditor;
