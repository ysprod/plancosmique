'use client';
import { motion } from 'framer-motion';
import React, { memo } from 'react';

export interface RitualItem {
  name: string;
  phase: string;
  goal: string;
}

interface RitualCardProps {
  ritual: RitualItem;
  index: number;
}

const RitualCard = memo<RitualCardProps>(({ ritual, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.02, x: 4 }}
    className="
      bg-gradient-to-r from-purple-50 to-pink-50 
      rounded-xl p-4 border border-purple-200 
      hover:border-purple-400 transition-all cursor-pointer
      shadow-sm hover:shadow-md
    "
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{ritual.name}</h4>
      <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
        {ritual.phase}
      </span>
    </div>
    <p className="text-xs sm:text-sm text-gray-600">{ritual.goal}</p>
  </motion.div>
));

RitualCard.displayName = 'RitualCard';

export { RitualCard };