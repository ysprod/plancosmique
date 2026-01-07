import React from "react";
import { Trash2 } from "lucide-react";

interface RubriquesPickerHeaderProps {
  selectedCount: number;
  onClear: () => void;
}

const RubriquesPickerHeader: React.FC<RubriquesPickerHeaderProps> = ({ selectedCount, onClear }) => (
  <div className="mb-2 flex items-center justify-between gap-2">
    <div className="text-[11px] font-extrabold text-slate-900 dark:text-white">
      Rubriques <span className="opacity-60">({selectedCount})</span>
    </div>
    {selectedCount > 0 && (
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
);

export default RubriquesPickerHeader;