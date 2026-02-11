'use client';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CacheLink from "@/components/commons/CacheLink";
import { memo } from "react";

interface HighlightCardProps {
  card: {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    gradient: string;
    link: string;
    badge?: string;
  };
  index: number;
}

const HighlightCard = memo(({ card, index }: HighlightCardProps) => {
  const CardIcon = card.icon;
  return (
    <CacheLink href={card.link}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
      >        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 dark:via-purple-700/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-xl mb-3 group-hover:shadow-2xl transition-shadow`}
          >
            <CardIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </motion.div>
          <h3 className={`text-sm sm:text-base font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-1 leading-tight`}>
            {card.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-semibold mb-3 leading-tight">
            {card.subtitle}
          </p>
          <motion.div
            className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-purple-600 dark:text-purple-400 mt-auto"
            whileHover={{ x: 3 }}
          >
            <span>Découvrir</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </motion.div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl`} />
      </motion.div>
    </CacheLink>
  );
});

HighlightCard.displayName = 'HighlightCard';

export default HighlightCard;