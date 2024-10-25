import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Link } from "lucide-react";
import { CustomButton } from "@/types/qrTypes";
import { useToast } from "@/hooks/use-toast";

interface CustomButtonsManagerProps {
  buttons: CustomButton[];
  onChange: (buttons: CustomButton[]) => void;
}

export const CustomButtonsManager = ({ buttons, onChange }: CustomButtonsManagerProps) => {
  const { toast } = useToast();
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddButton = () => {
    if (!newLabel || !newUrl) {
      toast({
        title: "Error",
        description: "Please enter both a label and URL for the button",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(newUrl); // Validate URL format
      const newButton: CustomButton = {
        id: crypto.randomUUID(),
        label: newLabel,
        url: newUrl,
      };
      onChange([...buttons, newButton]);
      setNewLabel("");
      setNewUrl("");
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
    }
  };

  const handleRemoveButton = (id: string) => {
    onChange(buttons.filter(button => button.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Buttons</h3>
      
      <div className="space-y-4">
        {buttons.map((button) => (
          <div key={button.id} className="flex items-center gap-2">
            <Input 
              value={button.label}
              onChange={(e) => {
                const updatedButtons = buttons.map(b => 
                  b.id === button.id ? { ...b, label: e.target.value } : b
                );
                onChange(updatedButtons);
              }}
              placeholder="Button Label"
            />
            <Input 
              value={button.url}
              onChange={(e) => {
                const updatedButtons = buttons.map(b => 
                  b.id === button.id ? { ...b, url: e.target.value } : b
                );
                onChange(updatedButtons);
              }}
              placeholder="https://example.com"
              type="url"
            />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemoveButton(button.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New Button Label"
        />
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://example.com"
          type="url"
        />
        <Button onClick={handleAddButton}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};