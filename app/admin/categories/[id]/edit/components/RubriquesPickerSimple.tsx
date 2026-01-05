"use client";
import React, { useMemo } from "react";
import { Check, Trash2, X } from "lucide-react";
import { Rubrique } from "@/lib/interfaces";
import { cx, getRubriqueId, rubriqueLabel } from "@/lib/functions";

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
  const normalized = useMemo(() => {
    return (rubriques ?? [])
      .map((r: any) => {
        const id = getRubriqueId(r);
        if (!id) return null;
        return { id, rubrique: r as Rubrique, label: rubriqueLabel(r) };
      })
      .filter(Boolean) as Array<{ id: string; rubrique: Rubrique; label: string }>;
  }, [rubriques]);

  const chips = useMemo(() => {
    const byId = new Map<string, Rubrique>();
    normalized.forEach((n) => byId.set(n.id, n.rubrique));
    return selectedIds.map((id) => byId.get(id)).filter(Boolean) as Rubrique[];
  }, [normalized, selectedIds]);

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
      ) : (
        <div className="mb-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          Touchez une rubrique pour l’ajouter.
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {normalized.map(({ id, label }) => {
          const active = selectedSet.has(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              aria-label={`${label} ${active ? "sélectionnée" : "non sélectionnée"}`}
              className={cx(
                "relative overflow-hidden rounded-2xl border p-3 text-left transition-all",
                "active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900/40",
                active
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-900/20"
                  : "border-slate-200 bg-white hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800/40"
              )}
            >
              <div
                className={cx(
                  "absolute inset-x-0 top-0 h-1",
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-lime-500"
                    : "bg-gradient-to-r from-violet-500/20 to-indigo-500/20"
                )}
              />

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div
                    className={cx(
                      "text-[12px] font-extrabold leading-tight",
                      active ? "text-emerald-950 dark:text-emerald-100" : "text-slate-900 dark:text-white"
                    )}
                  >
                    {label}
                  </div>
                  <div
                    className={cx(
                      "mt-1 text-[10px]",
                      active
                        ? "text-emerald-800/80 dark:text-emerald-200/80"
                        : "text-slate-500 dark:text-zinc-400"
                    )}
                  >
                    {active ? "Sélectionnée" : "Toucher pour sélectionner"}
                  </div>
                </div>

                <div
                  className={cx(
                    "grid h-7 w-7 place-items-center rounded-xl border text-xs font-black",
                    active
                      ? "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950 dark:text-emerald-200"
                      : "border-slate-200 bg-slate-50 text-slate-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  )}
                >
                  {active ? <Check className="h-4 w-4" /> : "+"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default RubriquesPickerSimple;