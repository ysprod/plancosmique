import React, { memo, useCallback, useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { Rubrique } from "@/lib/interfaces";

function rubriqueLabel(r: Rubrique): string {
  // robust pour ton code: parfois titre, parfois nom
  // @ts-expect-error compat legacy
  return (r?.titre ?? r?.nom ?? "").toString();
}

export const RubriquesPickerPro = memo(function RubriquesPickerPro({
  title,
  rubriques,
  selectedIds,
  onToggle,
  loading,
}: {
  title: string;
  rubriques: Rubrique[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  loading: boolean;
}) {
  const [q, setQ] = useState("");
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rubriques;
    return rubriques.filter((r) => rubriqueLabel(r).toLowerCase().includes(query));
  }, [q, rubriques]);

  const toggleAllFiltered = useCallback(() => {
    const ids = filtered.map((r) => r._id!).filter(Boolean);
    const allSelected = ids.every((id) => selectedSet.has(id));
    ids.forEach((id) => {
      const shouldSelect = !allSelected;
      const isSelected = selectedSet.has(id);
      if (shouldSelect && !isSelected) onToggle(id);
      if (!shouldSelect && isSelected) onToggle(id);
    });
  }, [filtered, onToggle, selectedSet]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        Chargement des rubriques…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-[11px] font-bold text-slate-900 dark:text-white">{title}</div>
        <button
          type="button"
          onClick={toggleAllFiltered}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
          aria-label="Sélectionner/désélectionner toutes les rubriques filtrées"
        >
          <Check className="h-3 w-3" />
          Tout
        </button>
      </div>

      <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <Search className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une rubrique…"
          aria-label="Rechercher une rubrique"
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          Aucun résultat.
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {filtered.map((r) => {
            const id = r._id!;
            const active = selectedSet.has(id);
            const label = rubriqueLabel(r);

            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggle(id)}
                aria-label={`Rubrique ${label} ${active ? "sélectionnée" : "non sélectionnée"}`}
                className={[
                  "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-semibold transition-all",
                  active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60",
                ].join(" ")}
              >
                {active ? <Check className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-slate-300 dark:border-zinc-700" />}
                <span className="max-w-[190px] truncate">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
