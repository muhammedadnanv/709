import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import CardEditor from "./CardEditor";
import { CardData } from "@/hooks/useCardData";

export const CardManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCard = () => {
    setIsCreating(true);
  };

  const handleSaveCard = (cardData: CardData) => {
    setCards([...cards, cardData]);
    setIsCreating(false);
    toast({
      title: "Success!",
      description: "Your card has been created successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {!isCreating && (
        <Button onClick={handleCreateCard} className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Create New Card
        </Button>
      )}

      {isCreating ? (
        <CardEditor onSave={handleSaveCard} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold">{card.name}</h3>
              <p className="text-sm text-muted-foreground">{card.title}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};