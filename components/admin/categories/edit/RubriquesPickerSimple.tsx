"use client";
import { useRubriquesPickerSimple } from "@/hooks/rubriques/useRubriquesPickerSimple";
import { Rubrique } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import React from "react";
import RubriquesChips from "./RubriquesChips";
import RubriquesGrid from "./RubriquesGrid";

const RubriquesPickerSimple = React.memo(function RubriquesPickerSimple({
  rubriques,
  selectedIds,
  selectedSet,
  loading,
  onToggle,
  onRemove,
  onClear,
}: {
  rubriques: Rubrique[];
  selectedIds: string[];
  selectedSet: Set<string>;
  loading: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {

  const { normalized, chips } = useRubriquesPickerSimple(rubriques, selectedIds);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        Chargement des rubriques…
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-[11px] font-extrabold text-slate-900 dark:text-white">
          Rubriques <span className="opacity-60">({selectedIds.length})</span>
        </div>
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-800 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100 dark:hover:bg-rose-900/30"
            aria-label="Effacer la sélection"
          >
            <Trash2 className="h-3 w-3" /> Effacer
          </button>
        )}
      </div>
      {chips.length > 0 ? (
        <RubriquesChips chips={chips} onRemove={onRemove} />
      ) : (
        <div className="mb-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          Touchez une rubrique pour l’ajouter.
        </div>
      )}
      <RubriquesGrid normalized={normalized} selectedSet={selectedSet} onToggle={onToggle} />
    </div>
  );
});

export default RubriquesPickerSimple;