import { Layers, ArrowLeft } from "lucide-react";
import React from "react";

interface EditCategoryHeaderProps {
  view: string;
  onBack: () => void;
}

const EditCategoryHeader: React.FC<EditCategoryHeaderProps> = ({ view, onBack }) => (
  <div className="mb-5 flex items-center justify-between gap-3">
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
      aria-label="Retour à la liste"
    >
      <ArrowLeft className="h-4 w-4" /> Retour
    </button>
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
      Vue :{" "}
      <span className="font-extrabold">
        {view === "edit" ? "Édition" : view === "preview" ? "Aperçu" : "Succès"}
      </span>
    </div>
  </div>
);

export default EditCategoryHeader;
