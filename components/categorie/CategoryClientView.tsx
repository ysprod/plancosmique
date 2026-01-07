"use client";
import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryHeader from "./CategoryHeader";
import CategoryRubriquesList from "./CategoryRubriquesList";
import { RubriqueView } from "./RubriqueView";
import { useCategoryClientViewMain } from "./useCategoryClientViewMain";

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
};

interface CategoryClientViewProps {
  category: Categorie;
}

const CategoryClientView: React.FC<CategoryClientViewProps> = ({ category }) => {
  const { rubriques, rubriqueCourante, openRubriqueById, closeRubrique } = useCategoryClientViewMain(category);
  const hasRubriques = rubriques.length > 0;
  
  console.log("Rendering CategoryClientView for category:", rubriqueCourante);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10"
      >
        <CategoryHeader
          category={category}
          rubriqueCount={rubriques.length}
          rubriqueCourante={rubriqueCourante}
          closeRubrique={closeRubrique}
        />

        <AnimatePresence mode="wait" initial={false}>
          {rubriqueCourante ? (
            <motion.div key="rubriqueView" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <RubriqueView rubrique={rubriqueCourante} />
            </motion.div>
          ) : !hasRubriques ? (
            <CategoryEmptyState variants={pageVariants} />
          ) : (
            <CategoryRubriquesList
              rubriques={rubriques}
              onOpen={openRubriqueById}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CategoryClientView;