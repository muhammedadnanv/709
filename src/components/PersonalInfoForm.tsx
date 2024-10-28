import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardData } from "@/types/qrTypes";
import { ProfessionalInterests } from "./ProfessionalInterests";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return !value.trim() ? "Name is required" : "";
      case "title":
        return !value.trim() ? "Job title is required" : "";
      case "company":
        return !value.trim() ? "Company name is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (!error) {
      handleInputChange(e);
      toast({
        title: "Field Updated",
        description: `${name.charAt(0).toUpperCase() + name.slice(1)} has been updated successfully.`,
        duration: 2000,
      });
    }
  };

  const renderInput = (
    id: string,
    label: string,
    placeholder: string,
    required: boolean = false
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        name={id}
        value={cardData[id as keyof CardData] as string || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={errors[id] ? "border-red-500" : ""}
      />
      {errors[id] && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors[id]}</AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => {
            if (Object.keys(errors).length === 0) {
              toast({
                title: "All fields are valid",
                description: "Your personal information is complete.",
              });
            }
          }}
        >
          <Check className="h-4 w-4 mr-1" />
          Verify Fields
        </Button>
      </div>
      
      <div className="space-y-4">
        {renderInput("name", "Full Name", "John Doe", true)}
        {renderInput("title", "Job Title", "Software Engineer", true)}
        {renderInput("company", "Company", "Acme Inc.", true)}
        {renderInput("department", "Department", "Engineering")}
        {renderInput("pronouns", "Pronouns", "they/them")}
        {renderInput("location", "Location", "San Francisco, CA")}

        <div className="space-y-2">
          <Label>Professional Interests</Label>
          <ProfessionalInterests
            interests={cardData.interests || []}
            onChange={(interests) => handleSelectChange('interests', interests)}
          />
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the errors above before proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};