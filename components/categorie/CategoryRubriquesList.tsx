"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import type { CategorieAdmin, Rubrique } from "@/lib/interfaces";
import { RubriqueCard } from "./RubriqueCard";

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
} as const;

interface CategoryRubriquesListProps {
  category?: CategorieAdmin;
  rubriques?: Rubrique[];
  onOpen: (id: string) => void;
}

const CategoryRubriquesList: React.FC<CategoryRubriquesListProps> = ({ category, rubriques, onOpen }) => {
  const rubriquesList = rubriques || category?.rubriques || [];
  
  if (rubriquesList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Aucune rubrique disponible pour cette catégorie.</p>
      </div>
    );
  }

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