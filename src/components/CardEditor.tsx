import { Card } from "@/components/ui/card";
import { DndContext } from "@dnd-kit/core";
import { QRCodeSVG } from "qrcode.react";

const CardEditor = () => {
  return (
    <DndContext>
      <Card className="aspect-[3/2] bg-white dark:bg-gray-950 p-8 flex items-center justify-center">
        <div className="text-center space-y-4 text-muted-foreground">
          <p className="text-lg">Drag and drop elements here</p>
          <p className="text-sm">or select a template to get started</p>
        </div>
      </Card>
    </DndContext>
  );
};

export default CardEditor;