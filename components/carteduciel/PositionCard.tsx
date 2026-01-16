'use client';

import { Position } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { memo } from "react";

const positionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.03,
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  })
};

const PLANET_ICONS: Record<string, string> = {
  'Soleil': '☉',
  'Lune': '☽',
  'Mercure': '☿',
  'Vénus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturne': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluton': '♇',
  'Ascendant': '↑',
  'Milieu du Ciel': 'MC',
  'Chiron': '⚷',
  'Nœud Nord': '☊',
  'Nœud Sud': '☋'
};

const PLANET_COLORS: Record<string, string> = {
  'Soleil': 'from-amber-500 to-orange-500',
  'Lune': 'from-slate-300 to-gray-400',
  'Mercure': 'from-sky-400 to-blue-500',
  'Vénus': 'from-pink-400 to-rose-500',
  'Mars': 'from-red-500 to-orange-600',
  'Jupiter': 'from-purple-400 to-indigo-500',
  'Saturne': 'from-gray-600 to-slate-700',
  'Uranus': 'from-cyan-400 to-teal-500',
  'Neptune': 'from-blue-500 to-indigo-600',
  'Pluton': 'from-purple-700 to-indigo-900',
  'Ascendant': 'from-emerald-400 to-green-500',
  'Milieu du Ciel': 'from-violet-400 to-purple-500'
};

const PositionCard = memo(({
  position,
  index
}: {
  position: Position;
  index: number;
}) => {
  const gradient = PLANET_COLORS[position.planete!] || 'from-gray-500 to-slate-600';
  const icon = PLANET_ICONS[position.planete!] || '●';

  return (
    <motion.div
      custom={index}
      variants={positionVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-center gap-2 p-2.5 rounded-xl
               bg-white/5 backdrop-blur-sm border border-white/10
               hover:bg-white/10 hover:border-white/20
               transition-all shadow-sm"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient}
                 flex items-center justify-center text-white font-bold text-sm
                 shadow-md border border-white/20 flex-shrink-0`}
      >
        {icon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white truncate">{position.planete}</span>
          {position.retrograde && (
            <span className="text-[9px] text-amber-400 font-bold">℞</span>
          )}
        </div>
        <p className="text-[10px] text-white/70">
          {position.signe} • Maison {position.maison}
        </p>
      </div>
    </motion.div>
  );
});

PositionCard.displayName = 'PositionCard';

export default PositionCard;