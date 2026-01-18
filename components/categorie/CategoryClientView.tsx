"use client";
import { useCategoryClientView } from "@/hooks/categorie/useCategoryClientView";
import type { CategorieAdmin } from "@/lib/interfaces";
import { motion } from "framer-motion";
import React, { memo } from "react";
import CategoryClientMain from "./CategoryClientMain";
import CategoryHeader from "./CategoryHeader";

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
} as const;

interface CategoryClientViewProps {
  category: CategorieAdmin;
}

const CategoryClientView: React.FC<CategoryClientViewProps> = ({ category }) => {
  const { rubriques, rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById } = useCategoryClientView(category);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-4xl"
      >
        <CategoryHeader
          category={category}
          rubriqueCourante={rubriqueCourante}
          closeRubrique={() => setRubriqueCourante(null)}
        />
        
        <CategoryClientMain
          ui={ui}
          rubriqueCourante={rubriqueCourante}
          rubriques={rubriques}
          openRubriqueById={handleOpenRubriqueById}
          pageVariants={pageVariants}
        />
      </motion.div>
    </div>
  );
};

export default memo(CategoryClientView);