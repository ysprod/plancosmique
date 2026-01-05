"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, Layers, Tags } from "lucide-react";
import Banner from "./components/Banner";
import PreviewCard from "./components/PreviewCard";
import RubriquesPickerSimple from "./components/RubriquesPickerSimple";
import SuccessCard from "./components/SuccessCard";
import { useEditCategoryPage } from "./useEditCategoryPage";

export default function EditCategoryPage() {
  const {
    rubriques, rubriquesLoading, description, pageLoading, view,
    nom, selectionSummary, rubriqueIds,
    selectedSet, busy, banner, selectedRubriques,
    setNom, setDescription, toggleRubrique,
    clearSelection, goEdit, goPreview, handleEdit,
  } = useEditCategoryPage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">

        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            aria-label="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Vue :{" "}
            <span className="font-extrabold">
              {view === "edit" ? "Édition" : view === "preview" ? "Aperçu" : "Succès"}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
            <Tags className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Modifier la catégorie
            </h1>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300">
              {selectionSummary}
            </p>
          </div>
        </div>

        <Banner banner={banner} />

        {pageLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
            <div className="mt-3 h-24 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
            <div className="mt-3 h-56 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-800" />
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {view === "edit" && (
              <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
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

                  <RubriquesPickerSimple
                    rubriques={rubriques ?? []}
                    selectedIds={rubriqueIds}
                    selectedSet={selectedSet}
                    loading={rubriquesLoading}
                    onToggle={toggleRubrique}
                    onRemove={toggleRubrique}
                    onClear={clearSelection}
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={goPreview}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      aria-label="Aller à l'aperçu"
                    >
                      <Eye className="h-4 w-4" />
                      Aperçu
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {view === "preview" && (
              <PreviewCard
                nom={nom}
                description={description}
                selectedRubriques={selectedRubriques}
                busy={busy}
                onBack={goEdit}
                onConfirm={handleEdit}
              />
            )}

            {view === "success" && (
              <SuccessCard
                nom={nom}
                onGoList={() => window.history.back()}
                onEditAnother={goEdit}
                reducedMotion={false}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
