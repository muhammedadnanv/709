import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Globe } from "lucide-react";
import { CardData } from "@/hooks/useCardData";

interface ContactInfoFormProps {
  cardData: CardData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoForm = ({ cardData, handleInputChange }: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              value={cardData.phone}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              value={cardData.email}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base"
              placeholder="john@example.com"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website" className="text-base">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              name="website"
              value={cardData.website}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base"
              placeholder="https://example.com"
              type="url"
            />
          </div>
        </div>
      </div>
    </div>
  );
};