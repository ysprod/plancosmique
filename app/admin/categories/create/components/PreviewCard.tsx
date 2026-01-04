"use client";
import React, { useMemo } from "react";
import { Eye, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { Rubrique } from "@/lib/interfaces";

function rubriqueLabel(r: any): string {
  return String(r?.titre ?? r?.nom ?? "Rubrique");
}

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

const PreviewCard = React.memo(function PreviewCard({
  nom,
  description,
  selectedRubriques,
  busy,
  onBack,
  onConfirm,
}: {
  nom: string;
  description: string;
  selectedRubriques: Rubrique[];
  busy: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const items = useMemo(
    () => selectedRubriques.map(rubriqueLabel).filter(Boolean).sort((a, b) => a.localeCompare(b)),
    [selectedRubriques]
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-600 text-white shadow-sm">
          <Eye className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Aperçu</h2>
          <p className="text-[11px] text-slate-600 dark:text-zinc-300">Vérifiez avant de créer</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-[11px] font-bold text-slate-700 dark:text-zinc-200">Nom</div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">{nom.trim() || "—"}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-[11px] font-bold text-slate-700 dark:text-zinc-200">Description</div>
          <div className="text-[12px] text-slate-700 dark:text-zinc-200">{description.trim() || "—"}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-2 text-[11px] font-bold text-slate-700 dark:text-zinc-200">
            Rubriques ({items.length})
          </div>
          {items.length === 0 ? (
            <div className="text-[11px] text-slate-600 dark:text-zinc-300">Aucune rubrique.</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {items.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            aria-label="Retour à la création"
          >
            <ArrowLeft className="h-4 w-4" /> Modifier
          </button>

          <button
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Confirmer la création"
          >
            <Sparkles className={cx("h-4 w-4", busy && "animate-spin")} />
            {busy ? "Création..." : "Créer maintenant"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default PreviewCard;
