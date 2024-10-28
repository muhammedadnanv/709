import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  title?: string;
}

export const ColorPicker = ({ color, onChange, title }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[4rem] h-[2.5rem] px-2"
          style={{ backgroundColor: color }}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <Label>{title || "Choose Color"}</Label>
          <Input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="h-32 w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};