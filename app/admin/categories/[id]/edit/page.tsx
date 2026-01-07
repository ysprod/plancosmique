"use client";
import { useEditCategoryPage } from "@/hooks/commons/useEditCategoryPage";
import Header from "@/components/admin/categories/edit/EditCategoryHeader";
import Title from "@/components/admin/categories/edit/EditCategoryTitle";
import MainContent from "@/components/admin/categories/edit/EditCategoryMainContent";

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
        <Header view={view} onBack={() => window.history.back()} />

        <Title selectionSummary={selectionSummary} />
        <MainContent
          banner={banner}
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