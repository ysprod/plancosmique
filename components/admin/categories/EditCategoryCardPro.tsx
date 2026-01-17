'use client';
import React, { memo, useCallback, useMemo, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { Rubrique } from "@/lib/interfaces";
import { CategorieAdmin } from "@/lib/interfaces";
import { RubriquesPickerPro } from "./RubriquesPickerPro";

export const EditCategoryCardPro = memo(function EditCategoryCardPro({
  cat,
  rubriques,
  loadingRubriques,
  onCancel,
  onSave,
}: {
  cat: CategorieAdmin;
  rubriques: Rubrique[];
  loadingRubriques: boolean;
  onCancel: () => void;
  onSave: (id: string, patch: Partial<CategorieAdmin>) => void;
}) {
  const [nom, setNom] = useState(cat.nom);
  const [description, setDescription] = useState(cat.description);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    () => cat.rubriques
      .map((r) => r._id)
      .filter((id): id is string => !!id)
  );
  const [busy, setBusy] = useState(false);

  const rubriquesById = useMemo(() => {
    const m = new Map<string, Rubrique>();
    for (const r of rubriques) {
      if (r._id) m.set(r._id, r);
    }
    return m;
  }, [rubriques]);

  const selectedRubriques = useMemo(() => {
    return selectedIds.map((id) => rubriquesById.get(id)).filter(Boolean) as Rubrique[];
  }, [selectedIds, rubriquesById]);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const canSave = useMemo(() => nom.trim().length > 0 && !busy, [nom, busy]);

  const handleSave = useCallback(async () => {
    if (!canSave) return;
    setBusy(true);
    try {
      await onSave(cat._id, {
        nom: nom.trim(),
        description: description.trim(),
        rubriques: selectedRubriques,
      });
    } finally {
      setBusy(false);
    }
  }, [canSave, cat._id, description, nom, onSave, selectedRubriques]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Edition</h3>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300">
              Modifiez puis sauvegardez (aucun autosave)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800/60"
            aria-label="Annuler l'édition"
          >
            <X className="h-4 w-4" />
            Annuler
          </button>

          <button
            onClick={handleSave}
            disabled={!canSave}
            className={[
              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-sm",
              "bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            ].join(" ")}
            aria-label="Sauvegarder la catégorie"
          >
            <Save className="h-4 w-4" />
            {busy ? "Sauvegarde..." : "Sauver"}
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-emerald-700 dark:focus:ring-emerald-900/40"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          aria-label="Nom de la catégorie"
        />

        <textarea
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-emerald-700 dark:focus:ring-emerald-900/40"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Description de la catégorie"
        />

        <RubriquesPickerPro
          title="Rubriques associées"
          rubriques={rubriques}
          selectedIds={selectedIds}
          onToggle={toggle}
          loading={loadingRubriques}
        />

        <div className="text-[11px] text-slate-600 dark:text-zinc-300">
          Sélectionnées : <span className="font-semibold">{selectedRubriques.length}</span>
        </div>
      </div>
    </div>
  );
});