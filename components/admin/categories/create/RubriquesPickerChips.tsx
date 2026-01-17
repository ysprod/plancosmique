'use client';
import React from "react";
import { Check, X } from "lucide-react";
import { Rubrique } from "@/lib/interfaces";
import { getRubriqueId, rubriqueLabel } from "@/lib/functions";

interface RubriquesPickerChipsProps {
  chips: Rubrique[];
  onRemove: (id: string) => void;
}

const RubriquesPickerChips: React.FC<RubriquesPickerChipsProps> = ({ chips, onRemove }) => {
  if (chips.length === 0) {
    return (
      <div className="mb-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        Touchez une rubrique pour l’ajouter.
      </div>
    );
  }
  
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {chips.map((r: Rubrique) => {
        const id = getRubriqueId(r);
        if (!id) return null;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onRemove(id)}
            className="group inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
            aria-label={`Retirer ${rubriqueLabel(r)}`}
            title="Retirer"
          >
            <Check className="h-3 w-3" />
            <span className="max-w-[200px] truncate">{rubriqueLabel(r)}</span>
            <X className="h-3 w-3 opacity-70 transition-opacity group-hover:opacity-100" />
          </button>
        );
      })}
    </div>
  );
};

export default RubriquesPickerChips;