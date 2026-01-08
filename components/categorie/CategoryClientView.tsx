"use client";

import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";
import React, { memo, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CategoryEmptyState from "./CategoryEmptyState";
import CategoryHeader from "./CategoryHeader";
import CategoryRubriquesList from "./CategoryRubriquesList";
import { RubriqueView } from "./RubriqueView";
import { useCategoryClientViewMain } from "@/hooks/commons/useCategoryClientViewMain";

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
} as const;

interface CategoryClientViewProps {
  category: Categorie;
}

const CategoryClientView: React.FC<CategoryClientViewProps> = ({ category }) => {
  // ✅ Guard simple (et stable)
  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-3 py-10 text-center text-[13px] text-slate-500 dark:text-zinc-400">
        Aucune catégorie sélectionnée.
      </div>
    );
  }

  // ✅ Hook central (data + navigation interne)
  const { rubriques, rubriqueCourante, openRubriqueById, closeRubrique } =
    useCategoryClientViewMain(category);

  // ✅ Derived state memo (évite de recalculer des bools/compteurs partout)
  const ui = useMemo(() => {
    const count = rubriques?.length ?? 0;
    return {
      rubriqueCount: count,
      hasRubriques: count > 0,
      hasCurrent: Boolean(rubriqueCourante),
    };
  }, [rubriques, rubriqueCourante]);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-4xl px-3 py-6 sm:px-8 sm:py-20"
      >
        <CategoryHeader
          category={category}
          rubriqueCount={ui.rubriqueCount}
          rubriqueCourante={rubriqueCourante}
          closeRubrique={closeRubrique}
        />

        <AnimatePresence mode="wait" initial={false}>
          {ui.hasCurrent ? (
            <motion.div
              key="rubriqueView"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-3"
            >
              {/* ✅ RubriqueView reste inchangée */}
              <RubriqueView rubrique={rubriqueCourante!} />
            </motion.div>
          ) : !ui.hasRubriques ? (
            <motion.div
              key="empty"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-3"
            >
              <CategoryEmptyState variants={pageVariants} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-3"
            >
              <CategoryRubriquesList rubriques={rubriques} onOpen={openRubriqueById} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default memo(CategoryClientView);
