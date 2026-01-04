import { Plus, ArrowLeft, Tags } from "lucide-react";
import { RubriquesPickerPro } from "@/components/admin/categories/RubriquesPickerPro";
import { MiniPill } from "@/components/admin/categories/MiniPill";
import React from "react";

interface CreateCategoryFormProps {
  nom: string;
  setNom: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  rubriqueIds: string[];
  rubriques: any[];
  rubriquesLoading: boolean;
  busy: boolean;
  banner: { type: "success" | "error"; message: string } | null;
  canCreate: boolean;
  selectedRubriques: any[];
  handleCreate: () => void;
  toggleRubrique: (id: string) => void;
  goBack: () => void;
  rubriqueLabel: (r: any) => string;
}

export function CreateCategoryForm({
  nom,
  setNom,
  description,
  setDescription,
  rubriqueIds,
  rubriques,
  rubriquesLoading,
  busy,
  banner,
  canCreate,
  selectedRubriques,
  handleCreate,
  toggleRubrique,
  goBack,
  rubriqueLabel,
}: CreateCategoryFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        <button
          onClick={goBack}
          className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:underline dark:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la liste
        </button>

        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
            <Tags className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Nouvelle catégorie</h1>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300">Remplissez le formulaire pour créer une catégorie.</p>
          </div>
        </div>

        {banner && (
          <div className={`mb-4 rounded-2xl border px-3 py-2 text-xs font-semibold ${
            banner.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100"
          }`}>
            {banner.message}
          </div>
        )}

        <div className="grid gap-3">
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            aria-label="Nom de la catégorie"
          />

          <textarea
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Description de la catégorie"
          />

          <RubriquesPickerPro
            title="Rubriques (sélection multiple)"
            rubriques={rubriques ?? []}
            selectedIds={rubriqueIds}
            onToggle={toggleRubrique}
            loading={rubriquesLoading}
          />

          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-600 dark:text-zinc-300">
              {selectedRubriques.length === 0 ? (
                "Aucune rubrique sélectionnée."
              ) : (
                <span className="font-semibold">
                  {selectedRubriques.slice(0, 3).map(rubriqueLabel).join(" • ")}
                  {selectedRubriques.length > 3 ? " • …" : ""}
                </span>
              )}
            </div>

            <button
              onClick={handleCreate}
              disabled={!canCreate}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Créer la catégorie"
            >
              <Plus className="h-4 w-4" />
              {busy ? "Création..." : "Créer la catégorie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
