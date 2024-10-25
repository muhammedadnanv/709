import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardData } from "@/hooks/useCardData";
import { useToast } from "@/components/ui/use-toast";

interface PersonalInfoFormProps {
  cardData: CardData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof CardData, value: string) => void;
}

export const PersonalInfoForm = ({ cardData, handleInputChange, handleSelectChange }: PersonalInfoFormProps) => {
  const { toast } = useToast();

  const handleValidatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target;
    
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
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">Full Name*</Label>
          <Input
            id="name"
            name="name"
            value={cardData.name}
            onChange={handleValidatedInput}
            placeholder="John Doe"
            className="h-12 text-base"
            required
            minLength={2}
            maxLength={100}
            pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Please enter a valid name (2-100 characters, letters and basic punctuation only)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pronouns" className="text-base">Pronouns</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('pronouns', value)}
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
            onChange={handleValidatedInput}
            placeholder="Software Engineer"
            className="h-12 text-base"
            required
            minLength={2}
            maxLength={100}
            title="Please enter your professional title (2-100 characters)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-base">Company</Label>
          <Input
            id="company"
            name="company"
            value={cardData.company}
            onChange={handleValidatedInput}
            placeholder="Company Name"
            className="h-12 text-base"
            maxLength={100}
            title="Company name (max 100 characters)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="text-base">Department</Label>
          <Input
            id="department"
            name="department"
            value={cardData.department}
            onChange={handleValidatedInput}
            placeholder="Engineering"
            className="h-12 text-base"
            maxLength={100}
            title="Department name (max 100 characters)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base">Location</Label>
          <Input
            id="location"
            name="location"
            value={cardData.location}
            onChange={handleValidatedInput}
            placeholder="City, Country"
            className="h-12 text-base"
            maxLength={200}
            title="Location (max 200 characters)"
          />
        </div>
      </div>
    </div>
  );
};