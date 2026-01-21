'use client';
import { Rubrique } from "@/lib/interfaces";
import RubriquesPickerSimple from "./RubriquesPickerSimple";
import { Eye } from "lucide-react";
import React from "react";

interface CreateCategoryFormProps {
  nom: string;
  setNom: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  rubriques: Rubrique[];
  rubriqueIds: string[];
  selectedSet: any;
  rubriquesLoading: boolean;
  toggleRubrique: (id: string) => void;
  clearSelection: () => void;
  selectionSummary: string;
  goPreview: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  nom,
  setNom,
  description,
  setDescription,
  rubriques,
  rubriqueIds,
  selectedSet,
  rubriquesLoading,
  toggleRubrique,
  clearSelection,
  selectionSummary,
  goPreview,
}) => (
  <div className="grid gap-3">
    <input
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
      placeholder="Nom"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      aria-label="Nom de la catégorie"
    />
    <textarea
      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
      placeholder="Description"
      rows={3}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      aria-label="Description de la catégorie"
    />
    <RubriquesPickerSimple
      rubriques={rubriques ?? []}
      selectedIds={rubriqueIds}
      selectedSet={selectedSet}
      loading={rubriquesLoading}
      onToggle={toggleRubrique}
      onRemove={toggleRubrique}
      onClear={clearSelection}
    />
    <div className="flex items-center justify-between gap-2">
      <div className="text-[11px] text-slate-600 dark:text-zinc-300">
        <span className="font-semibold">{selectionSummary}</span>
      </div>
      <button
        onClick={goPreview}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
        aria-label="Aller à l'aperçu"
      >
        <Eye className="h-4 w-4" />
        Aperçu
      </button>
    </div>
  </div>
);

export default CreateCategoryForm;