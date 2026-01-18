'use client';
import React from "react";
import { motion } from "framer-motion";

interface CategoryDescriptionProps {
  description: string;
}

const CategoryDescription: React.FC<CategoryDescriptionProps> = ({ description }) => (
  <motion.p
    className="mt-2 text-sm leading-relaxed text-slate-600/90 dark:text-zinc-300/90 text-center"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
  >
    {description}
  </motion.p>
);

export default CategoryDescription;