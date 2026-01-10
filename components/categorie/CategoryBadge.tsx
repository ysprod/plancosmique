import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CategoryBadgeProps {
  rubriqueCount: number;
  itemVariants: any;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ rubriqueCount, itemVariants }) => (
  <motion.div
    key="count-badge"
    variants={itemVariants}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-3 mx-auto"
  >
    {/* Fond du badge */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm border border-slate-200/60 group-hover:border-violet-200/80 dark:from-zinc-900/80 dark:to-zinc-800/80 dark:border-zinc-700/60 dark:group-hover:border-violet-700/30" />
    {/* Élément décoratif animé */}
    <motion.div
      className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Contenu du badge */}
    <Sparkles className="relative h-4 w-4 text-violet-600 dark:text-violet-400" />
    <span className="relative text-[13px] font-black tracking-tight text-slate-800 dark:text-zinc-200">
      <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
        {rubriqueCount}
      </span>
      <span className="text-slate-500 dark:text-zinc-400 ml-1">
        rubrique{rubriqueCount !== 1 ? 's' : ''}
      </span>
    </span>
  </motion.div>
);

export default CategoryBadge;
