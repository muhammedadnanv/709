import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Nfc, BadgeCheck } from "lucide-react";
import { CardData } from "@/types/qrTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CardHeaderProps {
  cardData: CardData;
  profileImage: string | null;
  foregroundColor: string;
}

export const CardHeader = ({ cardData, profileImage, foregroundColor }: CardHeaderProps) => {
  const isVerified = cardData.name?.charAt(0).toUpperCase() === 'A' || 
                     cardData.name?.charAt(0).toUpperCase() === 'S';

  return (
    <div className="flex items-center justify-between">
      <AnimatePresence>
        {cardData.name && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16 ring-2 ring-white/20 transition-all duration-300">
                <AvatarImage 
                  src={profileImage || ""} 
                  alt={`${cardData.name}'s profile`}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm sm:text-base bg-gradient-to-br from-primary/20 to-primary/10">
                  {cardData.name ? cardData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <h4 className="font-semibold text-sm sm:text-base">{cardData.name}</h4>
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
                        >
                          <BadgeCheck 
                            className="h-4 w-4 text-blue-500" 
                            style={{ 
                              filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))',
                              transformOrigin: 'center'
                            }}
                          />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent 
                        sideOffset={5}
                        className="bg-blue-500 text-white"
                      >
                        <p>Verified User</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <AnimatePresence>
                {cardData.title && (
                  <motion.p 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-xs sm:text-sm"
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
                    className="text-xs sm:text-sm"
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
          filter: `drop-shadow(0 0 2px ${foregroundColor}40)`
        }}
      >
        <Nfc className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.div>
    </div>
  );
};