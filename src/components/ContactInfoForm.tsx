import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Globe } from "lucide-react";
import { CardData } from "@/types/qrTypes";
import { useToast } from "@/hooks/use-toast";

interface ContactInfoFormProps {
  cardData: CardData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoForm = ({ cardData, handleInputChange }: ContactInfoFormProps) => {
  const { toast } = useToast();

  const handleValidatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { validity } = e.target;
    
    if (!validity.valid) {
      toast({
        title: "Invalid Input",
        description: e.target.title,
        variant: "destructive",
      });
      return;
    }
    
    handleInputChange(e);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base">Phone Number*</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              value={cardData.phone}
              onChange={handleValidatedInput}
              className="pl-10 h-12 text-base"
              placeholder="+1 (555) 000-0000"
              type="tel"
              required
              pattern="^\+?[1-9]\d{1,14}$"
              title="Please enter a valid phone number (E.164 format recommended, e.g., +1234567890)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email Address*</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              value={cardData.email}
              onChange={handleValidatedInput}
              className="pl-10 h-12 text-base"
              placeholder="john@example.com"
              type="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
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
              onChange={handleValidatedInput}
              className="pl-10 h-12 text-base"
              placeholder="https://example.com"
              type="url"
              pattern="https?://.+"
              title="Please include http:// or https:// in your website URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};