"use client";
import { Categorie } from "@/hooks/useAdminCategoriesPage";
import { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import { RubriqueCard } from "./RubriqueCard";
import { useCategoryClientView } from "./useCategoryClientView";

function categoryBadge(category: string) {
  return (category ?? "").toUpperCase() || "CATÉGORIE";
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
};

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};


export default function CategoryClientView({ category }: { category: Categorie }) {
  const { rubriques } = useCategoryClientView(category);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50
                       dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700
                          dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            {categoryBadge(category.nom)}
          </div>
        </div>

        <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {category.nom}
              </h1>
              {category.description && (
                <p className="mt-1 text-lg leading-relaxed text-slate-600 dark:text-zinc-300">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {rubriques.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-lg text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            Aucune rubrique disponible pour cette catégorie.
          </div>
        ) : (
          <motion.ul
            variants={listVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-4 sm:gap-6"
            aria-label="Liste des rubriques"
          >
            {rubriques.map((rub: Rubrique) => (
              <RubriqueCard key={rub._id} rub={rub!} />
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
}
