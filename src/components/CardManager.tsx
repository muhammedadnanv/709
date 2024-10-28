import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import CardEditor from "./CardEditor";
import { CardData } from "@/types/qrTypes";
import { Link } from "react-router-dom";

export const CardManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCard = () => {
    setIsCreating(true);
  };

  const handleSaveCard = (cardData: CardData) => {
    const cardWithId = { ...cardData, id: crypto.randomUUID() };
    setCards([...cards, cardWithId]);
    setIsCreating(false);
    toast({
      title: "Success!",
      description: "Your card has been created successfully.",
    });
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 md:px-8">
      {!isCreating && (
        <div className="flex justify-center sm:justify-start">
          <Button onClick={handleCreateCard} className="w-full sm:w-auto gap-2">
            <Plus className="h-4 w-4" />
            Create New Card
          </Button>
        </div>
      )}

      {isCreating ? (
        <CardEditor onSave={handleSaveCard} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={`/users/${card.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <Card className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg">{card.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{card.title}</p>
                {card.company && (
                  <p className="text-xs text-muted-foreground/80 mt-0.5">{card.company}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};