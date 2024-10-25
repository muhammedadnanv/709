import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import CardEditor from "./CardEditor";
import { CardData } from "@/hooks/useCardData";
import { Link } from "react-router-dom";

export const CardManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  // Load cards from localStorage on component mount
  useEffect(() => {
    const savedCards = localStorage.getItem('saved-cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('saved-cards', JSON.stringify(cards));
  }, [cards]);

  const handleCreateCard = () => {
    setIsCreating(true);
  };

  const handleSaveCard = (cardData: CardData) => {
    const cardWithId = { ...cardData, id: crypto.randomUUID() };
    setCards([...cards, cardWithId]);
    setIsCreating(false);
    
    // Save to localStorage immediately
    const updatedCards = [...cards, cardWithId];
    localStorage.setItem('saved-cards', JSON.stringify(updatedCards));
    
    toast({
      title: "Success!",
      description: "Your card has been created and saved successfully.",
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
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={`/c/${card.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <Card className="p-6">
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted-foreground">{card.title}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};