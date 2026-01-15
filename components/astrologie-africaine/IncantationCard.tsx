import { motion } from 'framer-motion';
import React, { memo } from 'react';

export interface IncantationItem {
  name: string;
  purpose: string;
  element: string;
}

interface IncantationCardProps {
  incantation: IncantationItem;
  index: number;
}

const IncantationCard = memo<IncantationCardProps>(({ incantation, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.02, x: 4 }}
    className="
      bg-gradient-to-r from-pink-50 to-purple-50 
      rounded-xl p-4 border border-pink-200 
      hover:border-pink-400 transition-all cursor-pointer
      shadow-sm hover:shadow-md
    "
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{incantation.name}</h4>
      <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-full whitespace-nowrap">
        {incantation.element}
      </span>
    </div>
    <p className="text-xs sm:text-sm text-gray-600">{incantation.purpose}</p>
  </motion.div>
));

IncantationCard.displayName = 'IncantationCard';

export { IncantationCard };