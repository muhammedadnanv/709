import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Star } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import CardEditor from "./CardEditor";
import { CardData } from "@/types/qrTypes";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const CardManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCard = () => {
    setIsCreating(true);
  };

  const handleSaveCard = (cardData: CardData) => {
    if (!cardData.name || !cardData.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the name and title fields.",
        variant: "destructive",
      });
      return;
    }

    const cardWithId = { 
      ...cardData, 
      id: crypto.randomUUID(),
      customButtons: cardData.customButtons || [] 
    };

    setCards((prevCards) => [...prevCards, cardWithId]);
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
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={`/users/${card.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <Card className="p-6 relative min-h-[120px]">
                    <h3 className="font-semibold line-clamp-1">{card.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{card.title}</p>
                    <motion.p 
                      className="text-[8px] sm:text-[10px] mt-4 text-muted-foreground/70 absolute bottom-2 right-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Star className="inline-block h-3 w-3 mr-1 text-yellow-500" /> 
                      Powered by: Splex
                    </motion.p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};