import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenTool, Stamp, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DigitalSignatureProps {
  onSignatureAdd: (signature: string) => void;
}

export const DigitalSignature = ({ onSignatureAdd }: DigitalSignatureProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signature = canvas.toDataURL("image/png");
    onSignatureAdd(signature);
    toast({
      title: "Signature Added",
      description: "Your digital signature has been added to the card.",
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="h-5 w-5" />
          <h3 className="font-semibold">Digital Signature</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          <Button size="sm" onClick={saveSignature} className="gap-2">
            <Stamp className="h-4 w-4" />
            Add to Card
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-2">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="border border-dashed border-gray-300 rounded w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </Card>
  );
};