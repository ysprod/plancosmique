'use client';
import { motion } from "framer-motion";
import HighlightCard from "@/components/profil/HighlightCard";
import { useProfilHighlightCards } from "@/hooks/profil/useProfilHighlightCards";

export interface HighlightCardType {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string;
  link: string;
  badge?: string;
}

const ProfilHighlightCards = () => {
  const highlightCards = useProfilHighlightCards();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
    >
      {highlightCards.map((card, index) => (
        <HighlightCard key={card.id} card={card} index={index} />
      ))}
    </motion.div>
  );
};

export default ProfilHighlightCards;
