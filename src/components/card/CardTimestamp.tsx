import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CardTimestampProps {
  creationDate: Date;
  expirationDate: Date;
  foregroundColor: string;
}

export const CardTimestamp = ({ creationDate, expirationDate, foregroundColor }: CardTimestampProps) => {
  return (
    <motion.div 
      className="flex justify-center gap-4 text-[10px] sm:text-xs opacity-70 mt-1" 
      style={{ color: foregroundColor }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-1 hover:opacity-100 transition-opacity">
        <Clock className="h-3 w-3" />
        Created {format(creationDate, 'MMM d, yyyy')}
      </div>
      <div className="flex items-center gap-1 hover:opacity-100 transition-opacity">
        <Calendar className="h-3 w-3" />
        Valid until {format(expirationDate, 'MMM d, yyyy')}
      </div>
    </motion.div>
  );
};