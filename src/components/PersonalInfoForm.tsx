import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoFormProps {
  cardData: {
    name: string;
    title: string;
    company?: string;
    department?: string;
    pronouns?: string;
    location?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (field: string, value: string) => void;
}

export const PersonalInfoForm = ({ cardData, handleInputChange, handleSelectChange }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">Full Name*</Label>
          <Input
            id="name"
            name="name"
            value={cardData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="h-12 text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pronouns" className="text-base">Pronouns</Label>
          <Select 
            onValueChange={(value) => handleSelectChange?.('pronouns', value)}
            value={cardData.pronouns}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your pronouns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he/him">He/Him</SelectItem>
              <SelectItem value="she/her">She/Her</SelectItem>
              <SelectItem value="they/them">They/Them</SelectItem>
              <SelectItem value="prefer-not">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">Professional Title*</Label>
          <Input
            id="title"
            name="title"
            value={cardData.title}
            onChange={handleInputChange}
            placeholder="Software Engineer"
            className="h-12 text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-base">Company</Label>
          <Input
            id="company"
            name="company"
            value={cardData.company}
            onChange={handleInputChange}
            placeholder="Company Name"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="text-base">Department</Label>
          <Input
            id="department"
            name="department"
            value={cardData.department}
            onChange={handleInputChange}
            placeholder="Engineering"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base">Location</Label>
          <Input
            id="location"
            name="location"
            value={cardData.location}
            onChange={handleInputChange}
            placeholder="City, Country"
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
};