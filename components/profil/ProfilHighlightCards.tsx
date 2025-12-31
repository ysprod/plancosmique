import { motion } from "framer-motion";
import HighlightCard from "@/components/profil/HighlightCard";

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

interface Props {
  cards: HighlightCardType[];
}

const ProfilHighlightCards = ({ cards }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
  >
    {cards.map((card, index) => (
      <HighlightCard key={card.id} card={card} index={index} />
    ))}
  </motion.div>
);

export default ProfilHighlightCards;
