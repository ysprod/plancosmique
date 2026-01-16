'use client';

import React from "react";
import { motion } from "framer-motion";

interface CategoryEmptyStateProps {
  variants: any;
}

const CategoryEmptyState: React.FC<CategoryEmptyStateProps> = ({ variants }) => (
  <motion.div
    key="empty"
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-[13px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300"
  >
    Aucune rubrique disponible pour cette catégorie.
  </motion.div>
);

export default CategoryEmptyState;