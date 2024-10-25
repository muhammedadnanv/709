import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
  cardData: {
    name: string;
    title: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoForm = ({ cardData, handleInputChange }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={cardData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={cardData.title}
            onChange={handleInputChange}
            placeholder="Software Engineer"
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
};