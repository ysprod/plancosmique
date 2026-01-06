import React from "react";
import { Layers, ArrowLeft } from "lucide-react";
import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";

interface CategoryHeaderProps {
  category: Categorie;
  rubriqueCount: number;
  rubriqueCourante: any;
  closeRubrique: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, rubriqueCount, rubriqueCourante, closeRubrique }) => (
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
          {rubriqueCount} rubriques
        </span>
      )}
    </div>
  </div>
);

export default CategoryHeader;
