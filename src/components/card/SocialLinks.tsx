import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CardData } from "@/types/qrTypes";

interface SocialLinksProps {
  cardData: CardData;
  foregroundColor: string;
  onWhatsAppClick: () => void;
}

export const SocialLinks = ({ cardData, foregroundColor, onWhatsAppClick }: SocialLinksProps) => {
  const socialIcons = [
    {
      condition: cardData.phone,
      icon: MessageCircle,
      action: onWhatsAppClick,
      isButton: true,
      title: "Connect on WhatsApp"
    }
  ];

  return (
    <motion.div 
      className="flex justify-center gap-3 mt-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {socialIcons.map((social, index) => {
        if (!social.condition) return null;
        
        const Icon = social.icon;
        const Component = social.isButton ? motion.button : motion.a;
        
        return (
          <Component
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={social.action}
            href={social.href}
            target={social.href ? "_blank" : undefined}
            rel={social.href ? "noopener noreferrer" : undefined}
            className="hover:opacity-80 transition-opacity relative group"
            title={social.title}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: foregroundColor }} />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {social.title}
            </span>
          </Component>
        );
      })}
    </motion.div>
  );
};