import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Template {
  id: number;
  name: string;
  style: {
    background: string;
    textColor: string;
    accentColor: string;
    layout: "modern" | "classic" | "minimal" | "bold";
  };
}

// Generate 1000 unique templates
const generateTemplates = (): Template[] => {
  const layouts = ["modern", "classic", "minimal", "bold"] as const;
  const colors = [
    { bg: "bg-blue-50", text: "text-blue-900", accent: "bg-blue-500" },
    { bg: "bg-green-50", text: "text-green-900", accent: "bg-green-500" },
    { bg: "bg-purple-50", text: "text-purple-900", accent: "bg-purple-500" },
    { bg: "bg-rose-50", text: "text-rose-900", accent: "bg-rose-500" },
    { bg: "bg-orange-50", text: "text-orange-900", accent: "bg-orange-500" },
    { bg: "bg-teal-50", text: "text-teal-900", accent: "bg-teal-500" },
    { bg: "bg-gray-50", text: "text-gray-900", accent: "bg-gray-500" },
    { bg: "bg-slate-50", text: "text-slate-900", accent: "bg-slate-500" },
    { bg: "bg-zinc-50", text: "text-zinc-900", accent: "bg-zinc-500" },
    { bg: "bg-neutral-50", text: "text-neutral-900", accent: "bg-neutral-500" },
  ];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    style: {
      background: colors[i % colors.length].bg,
      textColor: colors[i % colors.length].text,
      accentColor: colors[i % colors.length].accent,
      layout: layouts[i % layouts.length],
    },
  }));
};

const templates = generateTemplates();

const CardTemplates = ({ onSelectTemplate }: { onSelectTemplate: (template: Template) => void }) => {
  return (
    <Card className="p-4">
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              className={`h-24 ${template.style.background} ${template.style.textColor} hover:${template.style.accentColor} transition-colors`}
              onClick={() => onSelectTemplate(template)}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default CardTemplates;