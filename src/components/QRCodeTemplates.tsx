import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { QRTemplate } from "@/types/qrTypes";

const generateQRTemplates = (): QRTemplate[] => {
  const layouts = ["modern", "classic", "minimal", "bold"] as const;
  
  // Extended color palette
  const colors = [
    // Professional colors
    { bg: "#FFFFFF", fg: "#000000", corner: "#000000" },
    { bg: "#001F3F", fg: "#FFFFFF", corner: "#7FDBFF" },
    { bg: "#0074D9", fg: "#FFFFFF", corner: "#7FDBFF" },
    { bg: "#39CCCC", fg: "#FFFFFF", corner: "#7FDBFF" },
    // Nature colors
    { bg: "#2ECC40", fg: "#FFFFFF", corner: "#01FF70" },
    { bg: "#3D9970", fg: "#FFFFFF", corner: "#01FF70" },
    { bg: "#01FF70", fg: "#000000", corner: "#2ECC40" },
    // Warm colors
    { bg: "#FF4136", fg: "#FFFFFF", corner: "#FF851B" },
    { bg: "#FF851B", fg: "#000000", corner: "#FF4136" },
    { bg: "#FFDC00", fg: "#000000", corner: "#FF851B" },
    // Cool colors
    { bg: "#7FDBFF", fg: "#000000", corner: "#001F3F" },
    { bg: "#B10DC9", fg: "#FFFFFF", corner: "#F012BE" },
    { bg: "#F012BE", fg: "#FFFFFF", corner: "#B10DC9" },
    // Neutral colors
    { bg: "#AAAAAA", fg: "#FFFFFF", corner: "#111111" },
    { bg: "#DDDDDD", fg: "#000000", corner: "#111111" },
    // Gradient-like combinations
    { bg: "#85144b", fg: "#FFFFFF", corner: "#B10DC9" },
    { bg: "#3D9970", fg: "#FFFFFF", corner: "#39CCCC" },
    { bg: "#2ECC40", fg: "#000000", corner: "#01FF70" },
    { bg: "#001f3f", fg: "#FFFFFF", corner: "#0074D9" },
    { bg: "#FF4136", fg: "#FFFFFF", corner: "#FF851B" },
    // Modern combinations
    { bg: "#F8F9FA", fg: "#212529", corner: "#343A40" },
    { bg: "#E9ECEF", fg: "#212529", corner: "#343A40" },
    { bg: "#DEE2E6", fg: "#212529", corner: "#343A40" },
    { bg: "#CED4DA", fg: "#212529", corner: "#343A40" },
    { bg: "#ADB5BD", fg: "#212529", corner: "#343A40" },
    // Dark mode combinations
    { bg: "#212529", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#343A40", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#495057", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#6C757D", fg: "#F8F9FA", corner: "#E9ECEF" },
    { bg: "#1A1A1A", fg: "#FFFFFF", corner: "#333333" }
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
      
      return `#${Math.min(255, Math.max(0, Math.floor(r * factor))).toString(16).padStart(2, '0')}${
        Math.min(255, Math.max(0, Math.floor(g * factor))).toString(16).padStart(2, '0')}${
        Math.min(255, Math.max(0, Math.floor(b * factor))).toString(16).padStart(2, '0')}`;
    };

    const variationFactor = 0.8 + (variation * 0.1);
    
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
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Choose from 440 QR Code Styles</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {qrTemplates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`h-40 p-2 ${
                selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onSelectTemplate(template)}
            >
              <div className="w-full h-full flex flex-col items-center justify-center space-y-2 rounded-lg" 
                   style={{ background: template.style.background }}>
                <QRCodeSVG
                  value={value}
                  size={80}
                  bgColor={template.style.background}
                  fgColor={template.style.foreground}
                  level="M"
                  includeMargin={false}
                />
                <span className="text-xs" style={{ color: template.style.foreground }}>
                  {userName || 'Style ' + template.id}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default QRCodeTemplates;