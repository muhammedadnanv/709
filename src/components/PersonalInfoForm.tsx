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
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoFormProps {
  cardData: CardData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof CardData, value: string) => void;
}

const PersonalInfoFields = [
  {
    id: "name",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    title: "Please enter a valid name (letters and basic punctuation only)",
    maxLength: 100,
  },
  {
    id: "title",
    label: "Professional Title",
    placeholder: "Software Engineer",
    required: true,
    maxLength: 100,
    title: "Please enter your professional title",
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Company Name",
    maxLength: 100,
  },
  {
    id: "department",
    label: "Department",
    placeholder: "Engineering",
    maxLength: 100,
  },
  {
    id: "location",
    label: "Location",
    placeholder: "City, Country",
    maxLength: 200,
  },
];

export const PersonalInfoForm = ({ 
  cardData, 
  handleInputChange, 
  handleSelectChange 
}: PersonalInfoFormProps) => {
  const { toast } = useToast();

  const handleValidatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity, title } = e.target;
    
    if (!validity.valid) {
      toast({
        title: "Invalid Input",
        description: title || `Please check the ${name} field`,
        variant: "destructive",
      });
      return;
    }
    
    handleInputChange(e);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <span className="text-sm text-muted-foreground">* Required fields</span>
      </div>

      <div className="grid gap-6">
        {PersonalInfoFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label 
              htmlFor={field.id} 
              className="text-sm font-medium flex items-center gap-1"
            >
              {field.label}
              {field.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              name={field.id}
              value={cardData[field.id as keyof CardData] || ''}
              onChange={handleValidatedInput}
              placeholder={field.placeholder}
              className="h-10 text-base transition-colors focus:ring-2 focus:ring-ring"
              required={field.required}
              maxLength={field.maxLength}
              pattern={field.pattern}
              title={field.title}
            />
          </div>
        ))}

        <div className="space-y-2">
          <Label htmlFor="pronouns" className="text-sm font-medium">
            Pronouns
          </Label>
          <Select 
            onValueChange={(value) => handleSelectChange('pronouns', value)}
            value={cardData.pronouns || ''}
          >
            <SelectTrigger id="pronouns" className="h-10">
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
      </div>
    </div>
  );
};