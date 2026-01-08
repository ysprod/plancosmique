"use client";
import { useReducedMotion } from "framer-motion";
import CreateCategoryHeader from "@/components/admin/categories/create/CreateCategoryHeader";
import CreateCategoryTitle from "@/components/admin/categories/create/CreateCategoryTitle";
import CreateCategoryMainContent from "@/components/admin/categories/create/CreateCategoryMainContent";
import { useCreateCategoryPage } from "@/hooks/commons/useCreateCategoryPage";

export default function CreateCategoryPage() {
  const reducedMotion = useReducedMotion();
  const {
    rubriques, rubriquesLoading, view, setView, nom,
    setNom, description, setDescription, rubriqueIds,
    setRubriqueIds, selectedSet, busy, banner, showBanner,
    selectedRubriques, invalidRubriquesCount,
    toggleRubrique, clearSelection, goPreview, goCreate,
    selectionSummary, handleCreate,
  } = useCreateCategoryPage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        <CreateCategoryHeader view={view} />

        <CreateCategoryTitle />

        <CreateCategoryMainContent
          invalidRubriquesCount={invalidRubriquesCount}
          banner={banner}
          view={view}
          formProps={{
            nom,
            setNom,
            description,
            setDescription,
            rubriques,
            rubriqueIds,
            selectedSet,
            rubriquesLoading,
            toggleRubrique,
            clearSelection,
            selectionSummary,
            goPreview,
          }}
          previewProps={{
            nom,
            description,
            selectedRubriques,
            onBack: goCreate,
            onConfirm: handleCreate,
            busy,
          }}
          successProps={{
            nom: nom.trim(),
            onGoList: () => window.location.replace("/admin/categories"),
            onCreateAnother: () => {
              setNom("");
              setDescription("");
              setRubriqueIds([]);
              setView("create");
              showBanner({ type: "info", message: "Prêt pour une nouvelle catégorie." });
            },
            reducedMotion: !!reducedMotion,
          }}
        />
      </div>
    </div>
  );
}