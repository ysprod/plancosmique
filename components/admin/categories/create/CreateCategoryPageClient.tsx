"use client";
import CreateCategoryHeader from "@/components/admin/categories/create/CreateCategoryHeader";
import CreateCategoryMainContent from "@/components/admin/categories/create/CreateCategoryMainContent";
import CreateCategoryTitle from "@/components/admin/categories/create/CreateCategoryTitle";
import { useCreateCategoryPage } from "@/hooks/commons/useCreateCategoryPage";
import { useReducedMotion } from "framer-motion";

export default function CreateCategoryPageClient() {
  const reducedMotion = useReducedMotion();
  const {
    rubriques, rubriquesLoading, view, setView, nom, setDescription, rubriqueIds,
    setNom, description, selectedRubriques, invalidRubriquesCount,
    setRubriqueIds, selectedSet, busy, banner, showBanner, goPreview, goCreate,
    selectionSummary, handleCreate, clearSelection, toggleRubrique,
  } = useCreateCategoryPage();

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
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