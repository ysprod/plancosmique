"use client";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";

const LEGEND_ITEMS = [
  { emoji: "🌑", label: "Nouvelle Lune" },
  { emoji: "🌓", label: "Premier Quartier" },
  { emoji: "🌕", label: "Pleine Lune" },
  { emoji: "🌗", label: "Dernier Quartier" },
];

export const MoonPhaseLegend = memo(() => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2 justify-center pt-2 px-2">
      {LEGEND_ITEMS.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        >
          <span className="text-base sm:text-lg">{item.emoji}</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
});

MoonPhaseLegend.displayName = "MoonPhaseLegend";