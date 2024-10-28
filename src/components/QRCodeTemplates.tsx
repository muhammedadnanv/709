import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { QRTemplate } from "@/types/qrTypes";
import { Lock } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

// Generate a smaller set of default templates for free users
const generateDefaultTemplates = (): QRTemplate[] => {
  return [
    {
      id: 1,
      name: "Classic Black",
      style: {
        background: "#FFFFFF",
        foreground: "#000000",
        cornerColor: "#000000",
        layout: "classic"
      }
    },
    {
      id: 2,
      name: "Modern Blue",
      style: {
        background: "#FFFFFF",
        foreground: "#0074D9",
        cornerColor: "#7FDBFF",
        layout: "modern"
      }
    },
    {
      id: 3,
      name: "Professional Green",
      style: {
        background: "#FFFFFF",
        foreground: "#2ECC40",
        cornerColor: "#01FF70",
        layout: "minimal"
      }
    }
  ];
};

const generateQRTemplates = (): QRTemplate[] => {
  const layouts = ["modern", "classic", "minimal", "bold"] as const;
  
  // Extended color palette with mixed colors
  const colors = [
    // Professional colors
    { bg: "#FFFFFF", fg: "#000000", corner: "#000000" },
    { bg: "#001F3F", fg: "#FFFFFF", corner: "#7FDBFF" },
    { bg: "#0074D9", fg: "#FFFFFF", corner: "#7FDBFF" },
    { bg: "#39CCCC", fg: "#FFFFFF", corner: "#7FDBFF" },
    // Nature & Mixed colors
    { bg: "#2ECC40", fg: "#FFFFFF", corner: "#01FF70" },
    { bg: "#3D9970", fg: "#FFFFFF", corner: "#01FF70" },
    { bg: "#01FF70", fg: "#000000", corner: "#2ECC40" },
    { bg: "#88D498", fg: "#2D3047", corner: "#1B998B" },
    { bg: "#C6DABF", fg: "#3D5A80", corner: "#98C1D9" },
    // Warm & Mixed colors
    { bg: "#FF4136", fg: "#FFFFFF", corner: "#FF851B" },
    { bg: "#FF851B", fg: "#000000", corner: "#FF4136" },
    { bg: "#FFDC00", fg: "#000000", corner: "#FF851B" },
    { bg: "#E76F51", fg: "#FFFFFF", corner: "#F4A261" },
    { bg: "#E9C46A", fg: "#264653", corner: "#2A9D8F" },
    // Cool & Mixed colors
    { bg: "#7FDBFF", fg: "#000000", corner: "#001F3F" },
    { bg: "#B10DC9", fg: "#FFFFFF", corner: "#F012BE" },
    { bg: "#F012BE", fg: "#FFFFFF", corner: "#B10DC9" },
    { bg: "#BDE0FE", fg: "#023047", corner: "#8ECAE6" },
    { bg: "#A2D2FF", fg: "#023047", corner: "#FFB5A7" },
    // Neutral & Mixed colors
    { bg: "#AAAAAA", fg: "#FFFFFF", corner: "#111111" },
    { bg: "#DDDDDD", fg: "#000000", corner: "#111111" },
    { bg: "#CCD5AE", fg: "#2B2D42", corner: "#E9EDC9" },
    { bg: "#FAEDCD", fg: "#403D39", corner: "#CCD5AE" },
    // Gradient-like combinations
    { bg: "#85144b", fg: "#FFFFFF", corner: "#B10DC9" },
    { bg: "#3D9970", fg: "#FFFFFF", corner: "#39CCCC" },
    { bg: "#2ECC40", fg: "#000000", corner: "#01FF70" },
    { bg: "#001f3f", fg: "#FFFFFF", corner: "#0074D9" },
    { bg: "#FF4136", fg: "#FFFFFF", corner: "#FF851B" },
    // Modern & Mixed combinations
    { bg: "#F8F9FA", fg: "#212529", corner: "#343A40" },
    { bg: "#E9ECEF", fg: "#212529", corner: "#343A40" },
    { bg: "#DEE2E6", fg: "#212529", corner: "#343A40" },
    { bg: "#CED4DA", fg: "#212529", corner: "#343A40" },
    { bg: "#ADB5BD", fg: "#212529", corner: "#343A40" },
    // Dark mode & Mixed combinations
    { bg: "#212529", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#343A40", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#495057", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#6C757D", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#1A1A1A", fg: "#FFFFFF", corner: "#333333" },
    // Pastel & Mixed combinations
    { bg: "#FFE5D9", fg: "#6D6875", corner: "#B5838D" },
    { bg: "#E5989B", fg: "#FFFFFF", corner: "#B5838D" },
    { bg: "#FFB4A2", fg: "#6D6875", corner: "#E5989B" },
    { bg: "#FFCDB2", fg: "#6D6875", corner: "#FFB4A2" }
  ];

  // Generate 440 templates by combining colors and layouts with variations
  return Array.from({ length: 440 }, (_, i) => {
    const colorIndex = i % colors.length;
    const layoutIndex = Math.floor(i / colors.length) % layouts.length;
    const variation = Math.floor(i / (colors.length * layouts.length));
    
    // Create slight variations in colors for more unique combinations
    const baseColor = colors[colorIndex];
    const adjustColor = (hex: string, factor: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      // Add some color mixing for more variety
      const mix = (a: number, b: number, factor: number) => 
        Math.min(255, Math.max(0, Math.floor(a * factor + b * (1 - factor))));
      
      const mixR = mix(r, g, factor);
      const mixG = mix(g, b, factor);
      const mixB = mix(b, r, factor);
      
      return `#${mixR.toString(16).padStart(2, '0')}${
        mixG.toString(16).padStart(2, '0')}${
        mixB.toString(16).padStart(2, '0')}`;
    };

    const variationFactor = 0.7 + (variation * 0.15); // Increased range for more variety
    
    return {
      id: i + 1,
      name: `QR Style ${i + 1}`,
      style: {
        background: adjustColor(baseColor.bg, variationFactor),
        foreground: adjustColor(baseColor.fg, variationFactor),
        cornerColor: adjustColor(baseColor.corner, variationFactor),
        layout: layouts[layoutIndex],
      },
    };
  });
};

const qrTemplates = generateQRTemplates();

interface QRCodeTemplatesProps {
  value: string;
  onSelectTemplate: (template: QRTemplate) => void;
  selectedTemplate: QRTemplate;
  userName?: string;
}

const QRCodeTemplates = ({ value, onSelectTemplate, selectedTemplate, userName }: QRCodeTemplatesProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const isPremium = user?.publicMetadata?.isPremium;
  const templates = isPremium ? qrTemplates : generateDefaultTemplates();

  const handleTemplateClick = (template: QRTemplate) => {
    if (!isPremium && template.id > 3) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to access 440+ QR code styles!",
        variant: "destructive",
      });
      return;
    }
    onSelectTemplate(template);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {isPremium ? "Choose from 440 QR Code Styles" : "Choose QR Code Style"}
        </h3>
        {!isPremium && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>437 styles locked</span>
          </div>
        )}
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`h-40 p-2 relative flex items-center justify-center ${
                selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleTemplateClick(template)}
            >
              <div 
                className="w-full h-full flex flex-col items-center justify-center space-y-2 rounded-lg" 
                style={{ background: template.style.background }}
              >
                <QRCodeSVG
                  value={value}
                  size={60}
                  bgColor={template.style.background}
                  fgColor={template.style.foreground}
                  level="M"
                  includeMargin={false}
                />
                <span 
                  className="text-xs"
                  style={{ color: template.style.foreground }}
                >
                  {userName || 'Style ' + template.id}
                </span>
              </div>
              {!isPremium && template.id > 3 && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default QRCodeTemplates;
