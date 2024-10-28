import { useState, Suspense } from "react";
import { Button } from "./ui/button";
import { Plus, Star, Copy, Trash2, Loader2, Lock } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { CardData } from "@/types/qrTypes";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { lazy } from "react";
import { useUser } from "@clerk/clerk-react";

// Lazy load the CardEditor
const CardEditor = lazy(() => import("./CardEditor"));

const LoadingCard = () => (
  <Card className="p-6 relative min-h-[120px]">
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="absolute bottom-2 right-4">
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  </Card>
);

export const CardManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useUser();

  // Check if user has reached the free limit
  const hasReachedLimit = cards.length >= 3 && !user?.publicMetadata?.isPremium;

  const handleCreateCard = () => {
    if (hasReachedLimit) {
      toast({
        title: "Card Limit Reached",
        description: "Free users can create up to 3 cards. Upgrade to create more!",
        variant: "destructive",
      });
      return;
    }
    setIsCreating(true);
  };

  const handleSaveCard = (cardData: Omit<CardData, 'id'>) => {
    if (!cardData.name || !cardData.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the name and title fields.",
        variant: "destructive",
      });
      return;
    }

    const uuid = crypto.randomUUID();
    const cardWithId: CardData = { 
      ...cardData, 
      id: uuid as `${string}-${string}-${string}-${string}-${string}`,
      customButtons: cardData.customButtons || [] 
    };

    setCards((prevCards) => [...prevCards, cardWithId]);
    setIsCreating(false);
    
    toast({
      title: "Success!",
      description: "Your card has been created successfully.",
    });
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      }
      return [...prev, cardId];
    });
  };

  const handleDuplicateSelected = () => {
    if (selectedCards.length === 0) {
      toast({
        title: "No Cards Selected",
        description: "Please select cards to duplicate.",
        variant: "destructive",
      });
      return;
    }

    const newCards = selectedCards.map(id => {
      const originalCard = cards.find(card => card.id === id);
      if (!originalCard) return null;
      
      const uuid = crypto.randomUUID();
      return {
        ...originalCard,
        id: uuid as `${string}-${string}-${string}-${string}-${string}`,
        name: `${originalCard.name} (Copy)`,
      };
    }).filter((card): card is CardData => card !== null);

    setCards(prev => [...prev, ...newCards]);
    setSelectedCards([]);
    
    toast({
      title: "Success!",
      description: `Duplicated ${newCards.length} cards.`,
    });
  };

  const handleDeleteSelected = () => {
    if (selectedCards.length === 0) {
      toast({
        title: "No Cards Selected",
        description: "Please select cards to delete.",
        variant: "destructive",
      });
      return;
    }

    setCards(prev => prev.filter(card => !selectedCards.includes(card.id)));
    setSelectedCards([]);
    
    toast({
      title: "Success!",
      description: `Deleted ${selectedCards.length} cards.`,
    });
  };

  return (
    <div className="space-y-6">
      {!isCreating && (
        <div className="flex items-center justify-between gap-4">
          <Button 
            onClick={handleCreateCard} 
            className="gap-2"
            disabled={hasReachedLimit}
          >
            {hasReachedLimit ? (
              <>
                <Lock className="h-4 w-4" />
                Upgrade to Create More
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create New Card (Ctrl+N)
              </>
            )}
          </Button>
          
          {selectedCards.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={handleDuplicateSelected} variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Duplicate ({selectedCards.length})
              </Button>
              <Button onClick={handleDeleteSelected} variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete ({selectedCards.length})
              </Button>
            </div>
          )}
        </div>
      )}

      {isCreating ? (
        <Suspense fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading editor...</span>
          </div>
        }>
          <CardEditor onSave={handleSaveCard} />
        </Suspense>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1 // Progressive loading delay
                }}
                className={`relative ${selectedCards.includes(card.id) ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleCardSelect(card.id)}
              >
                <Link 
                  to={`/users/${card.id}`}
                  className="block hover:opacity-80 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Suspense fallback={<LoadingCard />}>
                    <Card className="p-6 relative min-h-[120px] cursor-pointer">
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
                  </Suspense>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};
