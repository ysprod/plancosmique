"use client";
import React, { memo } from "react";
import { ArrowLeft, PackageOpen } from "lucide-react";

const AssociationsHeader = memo(function AssociationsHeader({
  viewName,
  rubriqueCount,
  onBack,
}: {
  viewName: "rubriques" | "choices" | "details";
  rubriqueCount: number;
  onBack: () => void;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
          Associations · Rubriques → Consultations → Offrandes
        </div>
        <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
          Navigation interne ultra-compacte, indexation O(n), rendu fluide.
        </div>
      </div>

      {viewName !== "rubriques" ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Retour"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <PackageOpen className="h-4 w-4" />
          {rubriqueCount} rubriques
        </span>
      )}
    </div>
  );
});

export default AssociationsHeader;
