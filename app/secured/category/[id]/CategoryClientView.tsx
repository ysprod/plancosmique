"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";
import type { Rubrique } from "@/lib/interfaces";
import { RubriqueView } from "./RubriqueView";
import { RubriqueCard } from "./RubriqueCard";
import { useCategoryClientViewMain } from "./useCategoryClientViewMain";

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
};

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

interface CategoryClientViewProps {
  category: Categorie;
}

const CategoryClientView: React.FC<CategoryClientViewProps> = ({ category }) => {
  const { rubriques, rubriqueCourante, openRubriqueById, closeRubrique } = useCategoryClientViewMain(category);
  const hasRubriques = rubriques.length > 0;

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10"
      >
        <div className="mb-3 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-extrabold text-white">
                <Layers className="h-4 w-4" />
                {category.nom}
              </div>
              <h1 className="mt-2 text-center text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                {category.nom}
              </h1>

              {category.description ? (
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-zinc-300">
                  {category.description}
                </p>
              ) : null}
            </div>

            {rubriqueCourante ? (
              <button
                type="button"
                onClick={closeRubrique}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-extrabold text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Retour à la liste des rubriques"
              >
                <ArrowLeft className="h-4 w-4" />
                Rubriques
              </button>
            ) : (
              <span className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                {rubriques.length} rubriques
              </span>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {rubriqueCourante ? (
            <motion.div key="rubriqueView" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <RubriqueView rubrique={rubriqueCourante} />
            </motion.div>
          ) : !hasRubriques ? (
            <motion.div
              key="empty"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-[13px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300"
            >
              Aucune rubrique disponible pour cette catégorie.
            </motion.div>
          ) : (
            <motion.ul
              key="rubriquesList"
              variants={listVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 gap-3 sm:gap-6"
              aria-label="Liste des rubriques"
            >
              {rubriques.map((rub: Rubrique) => (
                <RubriqueCard key={rub._id} rub={rub} onOpen={openRubriqueById} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CategoryClientView;