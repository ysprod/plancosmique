'use client';
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface CategoryBackButtonProps {
  onClick: () => void;
  variants: any;
}

const CategoryBackButton: React.FC<CategoryBackButtonProps> = ({ onClick, variants }) => (
  <motion.button
    key="back-button"
    type="button"
    onClick={onClick}
    variants={variants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-3 mx-auto"
    aria-label="Retour à la liste des rubriques"
    exit={{ opacity: 0, x: 20 }}
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-100 to-white border border-slate-200/80 group-hover:from-violet-50 group-hover:to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-700/80 dark:group-hover:from-violet-900/20 dark:group-hover:to-indigo-900/20" />
    <motion.div
      className="absolute inset-0 rounded-2xl p-[1.5px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ opacity: 0.8 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-30 blur-[1px]" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-60" />
    </motion.div>
    <ChevronLeft className="relative h-4 w-4 text-slate-700 group-hover:text-violet-700 dark:text-zinc-300 dark:group-hover:text-violet-300" />
    <span className="relative text-[13px] font-extrabold text-slate-800 group-hover:text-violet-800 dark:text-zinc-200 dark:group-hover:text-violet-200">
      Retour
    </span>
  </motion.button>
);

export default CategoryBackButton;