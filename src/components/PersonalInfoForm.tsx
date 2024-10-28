import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardData } from "@/types/qrTypes";
import { ProfessionalInterests } from "./ProfessionalInterests";

interface PersonalInfoFormProps {
  cardData: CardData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof CardData, value: any) => void;
}

export const PersonalInfoForm = ({
  cardData,
  handleInputChange,
  handleSelectChange,
}: PersonalInfoFormProps) => {
  return (
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
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={cardData.title}
            onChange={handleInputChange}
            placeholder="Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={cardData.company}
            onChange={handleInputChange}
            placeholder="Acme Inc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={cardData.department}
            onChange={handleInputChange}
            placeholder="Engineering"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pronouns">Pronouns</Label>
          <Input
            id="pronouns"
            name="pronouns"
            value={cardData.pronouns}
            onChange={handleInputChange}
            placeholder="they/them"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={cardData.location}
            onChange={handleInputChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label>Professional Interests</Label>
          <ProfessionalInterests
            interests={cardData.interests || []}
            onChange={(interests) => handleSelectChange('interests', interests)}
          />
        </div>
      </div>
    </div>
  );
};