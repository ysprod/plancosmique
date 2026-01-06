import React from "react";
import { motion } from "framer-motion";
import type { Rubrique } from "@/lib/interfaces";
import { RubriqueCard } from "./RubriqueCard";

interface CategoryRubriquesListProps {
  rubriques: Rubrique[];
  onOpen: (id: string) => void;
  variants: any;
}

const CategoryRubriquesList: React.FC<CategoryRubriquesListProps> = ({ rubriques, onOpen, variants }) => (
  <motion.ul
    key="rubriquesList"
    variants={variants}
    initial="initial"
    animate="animate"
    className="grid grid-cols-2 gap-3 sm:gap-6"
    aria-label="Liste des rubriques"
  >
    {rubriques.map((rub: Rubrique) => (
      <RubriqueCard key={rub._id} rub={rub} onOpen={onOpen} />
    ))}
  </motion.ul>
);

export default CategoryRubriquesList;
