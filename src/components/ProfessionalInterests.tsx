import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfessionalInterestsProps {
  interests: string[];
  onChange: (interests: string[]) => void;
}

export const ProfessionalInterests = ({ interests, onChange }: ProfessionalInterestsProps) => {
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      onChange([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    onChange(interests.filter((i) => i !== interest));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Add professional interest"
          onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
          className="flex-1"
        />
        <Button onClick={handleAddInterest} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <motion.div
              key={interest}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              layout
            >
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleRemoveInterest(interest)}
              >
                {interest}
                <Check className="ml-1 h-3 w-3" />
              </Badge>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};