import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Nfc, BadgeCheck, AlertCircle, Sparkles } from "lucide-react";
import { CardData } from "@/types/qrTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CardHeaderProps {
  cardData: CardData;
  profileImage: string | null;
  foregroundColor: string;
}

export const CardHeader = ({ cardData, profileImage, foregroundColor }: CardHeaderProps) => {
  const { toast } = useToast();
  const isVerified = cardData.name?.charAt(0).toUpperCase() === 'A' || 
                     cardData.name?.charAt(0).toUpperCase() === 'S';

  const handleImageError = () => {
    toast({
      title: "Image Load Error",
      description: "Unable to load profile image",
      variant: "destructive",
    });
  };

  const handleAvatarClick = () => {
    if (profileImage) {
      window.open(profileImage, '_blank');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <AnimatePresence mode="wait">
        {cardData.name && (
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Avatar 
                className="w-12 h-12 sm:w-16 sm:h-16 ring-2 ring-white/20 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
                onClick={handleAvatarClick}
              >
                <AvatarImage 
                  src={profileImage || ""} 
                  alt={`${cardData.name}'s profile`}
                  className="object-cover"
                  onError={handleImageError}
                />
                <AvatarFallback className="text-sm sm:text-base bg-gradient-to-br from-primary/20 to-primary/10">
                  {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-sm sm:text-base tracking-wide">{cardData.name}</h4>
                {isVerified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 25,
                            delay: 0.2 
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 15,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <BadgeCheck 
                            className="h-4 w-4 text-blue-500" 
                            style={{ 
                              filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))',
                              transformOrigin: 'center'
                            }}
                          />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent 
                        sideOffset={5}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      >
                        <p className="flex items-center gap-1.5 px-1">
                          <Sparkles className="h-3 w-3" />
                          Premium Verified User
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <AnimatePresence mode="wait">
                {cardData.title && (
                  <motion.p 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-xs sm:text-sm font-medium tracking-wide"
                  >
                    {cardData.title}
                  </motion.p>
                )}
                {cardData.company && (
                  <motion.p 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs sm:text-sm font-medium tracking-wide"
                  >
                    {cardData.company}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          color: foregroundColor,
          filter: `drop-shadow(0 0 4px ${foregroundColor}40)`
        }}
      >
        <Nfc className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.div>
    </div>
  );
};