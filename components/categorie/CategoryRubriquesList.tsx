"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import type { Rubrique } from "@/lib/interfaces";
import { RubriqueCard } from "./RubriqueCard";

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
} as const;

interface CategoryRubriquesListProps {
  rubriques: Rubrique[];
  onOpen: (id: string) => void;
}

const CategoryRubriquesList: React.FC<CategoryRubriquesListProps> = ({ rubriques, onOpen }) => {
  return (
    <motion.ul
      key="rubriquesList"
      variants={listVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
      aria-label="Liste des rubriques"
    >
      {rubriques.map((rub) => (
        <RubriqueCard key={rub._id} rub={rub} onOpen={onOpen} />
      ))}
    </motion.ul>
  );
};

export default memo(CategoryRubriquesList);
