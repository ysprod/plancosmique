'use client';

import React, { memo } from "react";
import { motion } from "framer-motion";

interface CategoryTitleProps {
  title: string;
}

const titleVariants = {
  initial: { opacity: 0, y: 12, scale: 0.96, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
      duration: 0.5,
    },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" },
};

const CategoryTitle: React.FC<CategoryTitleProps> = memo(({ title }) => (
  <motion.h1
    className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-slate-900 dark:text-white px-1 py-0.5 rounded select-none bg-gradient-to-r from-violet-600/10 via-indigo-500/10 to-emerald-500/10 dark:from-violet-400/10 dark:to-indigo-400/10 shadow-sm"
    variants={titleVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    layoutId="category-title"
    style={{
      letterSpacing: "-0.01em",
      WebkitTextStroke: "0.5px #a5b4fc33",
      backgroundClip: "padding-box",
    }}
  >
    <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
      {title}
    </span>
  </motion.h1>
));

CategoryTitle.displayName = "CategoryTitle";

export default CategoryTitle;
