import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface QRTemplate {
  id: number;
  name: string;
  style: {
    background: string;
    foreground: string;
    cornerColor: string;
    layout: "modern" | "classic" | "minimal" | "bold";
  };
}

const generateQRTemplates = (): QRTemplate[] => {
  const layouts = ["modern", "classic", "minimal", "bold"] as const;
  const colors = [
    { bg: "#FFFFFF", fg: "#000000", corner: "#000000" },
    { bg: "#001F3F", fg: "#FFFFFF", corner: "#7FDBFF" },
    { bg: "#2ECC40", fg: "#FFFFFF", corner: "#01FF70" },
    { bg: "#FF4136", fg: "#FFFFFF", corner: "#FF851B" },
    { bg: "#B10DC9", fg: "#FFFFFF", corner: "#F012BE" },
    { bg: "#FFDC00", fg: "#000000", corner: "#FF851B" },
    { bg: "#7FDBFF", fg: "#000000", corner: "#001F3F" },
    { bg: "#F012BE", fg: "#FFFFFF", corner: "#B10DC9" },
    { bg: "#01FF70", fg: "#000000", corner: "#2ECC40" },
    { bg: "#FF851B", fg: "#000000", corner: "#FF4136" },
  ];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `QR Style ${i + 1}`,
    style: {
      background: colors[i % colors.length].bg,
      foreground: colors[i % colors.length].fg,
      cornerColor: colors[i % colors.length].corner,
      layout: layouts[i % layouts.length],
    },
  }));
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
      <h3 className="font-semibold mb-4">Choose QR Code Style</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 gap-4">
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
                  {userName || 'Scan to Connect'}
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