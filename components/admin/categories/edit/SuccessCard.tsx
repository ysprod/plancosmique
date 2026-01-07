"use client";
import React from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { cx } from "@/lib/functions";

const SuccessCard = React.memo(function SuccessCard({
  nom,
  onGoList,
  onEditAnother,
  reducedMotion,
}: {
  nom: string;
  onGoList: () => void;
  onEditAnother: () => void;
  reducedMotion: boolean;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-900/20">
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-600 text-white shadow-sm">
          <Check className={cx("h-5 w-5", !reducedMotion && "animate-bounce")} />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-100">Catégorie modifiée</h2>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-200">
            “{nom || "Catégorie"}” a été mise à jour.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onEditAnother}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-900/40 dark:bg-zinc-950 dark:text-emerald-100 dark:hover:bg-emerald-900/30"
          aria-label="Retour à la liste"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la liste
        </button>

        <button
          onClick={onGoList}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          aria-label="Voir la liste des catégories"
        >
          Voir la liste <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

export default SuccessCard;