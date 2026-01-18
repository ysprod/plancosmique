'use client';
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
} as const;

 

const CategoryEmptyState: React.FC = () => (
  <motion.div
    key="empty"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-[13px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300"
  >
    Aucune rubrique disponible pour cette catégorie.
  </motion.div>
);

export default CategoryEmptyState;