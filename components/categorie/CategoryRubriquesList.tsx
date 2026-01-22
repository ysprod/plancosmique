"use client";
import type { CategorieAdmin } from "@/lib/interfaces";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { RubriqueCard } from "./RubriqueCard";

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
} as const;

interface CategoryRubriquesListProps {
  category?: CategorieAdmin;
  onOpen: (id: string, consultationId: string) => void;
}

const CategoryRubriquesList: React.FC<CategoryRubriquesListProps> = ({ category, onOpen }) => {
  const rubriquesList =   category?.rubriques || [];

  return (
    <motion.ul
      key="rubriquesList"
      variants={listVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
      aria-label="Liste des rubriques"
    >
      {rubriquesList.map((rub) => (
        <RubriqueCard key={rub._id} rub={rub} onOpen={onOpen} />
      ))}
    </motion.ul>
  );
};

export default memo(CategoryRubriquesList);