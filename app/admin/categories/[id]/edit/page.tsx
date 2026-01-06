"use client";
import { useEditCategoryPage } from "@/hooks/commons/useEditCategoryPage";
import { ArrowLeft, Layers, Tags } from "lucide-react";
import Banner from "./components/Banner";
import CategoryViewSwitcher from "./components/CategoryViewSwitcher";

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
        <CategoryViewSwitcher
          view={view}
          pageLoading={pageLoading}
          formProps={{
            nom,
            setNom,
            description,
            setDescription,
            rubriques: rubriques ?? [],
            rubriqueIds,
            selectedSet,
            rubriquesLoading,
            toggleRubrique,
            clearSelection,
            goPreview,
            selectionSummary,
          }}
          previewProps={{
            nom,
            description,
            selectedRubriques,
            busy,
            onBack: goEdit,
            onConfirm: handleEdit,
          }}
          successProps={{
            nom,
            onGoList: () => window.history.back(),
            onEditAnother: goEdit,
            reducedMotion: false,
          }}
        />
      </div>
    </div>
  );
}