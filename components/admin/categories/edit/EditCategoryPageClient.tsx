"use client";
import Header from "@/components/admin/categories/edit/EditCategoryHeader";
import MainContent from "@/components/admin/categories/edit/EditCategoryMainContent";
import Title from "@/components/admin/categories/edit/EditCategoryTitle";
import { useEditCategoryPage } from "@/hooks/commons/useEditCategoryPage";

export default function EditCategoryPageClient() {
  const {
    rubriques, rubriquesLoading, description, pageLoading, view, selectedRubriques,
    banner, nom, selectionSummary, rubriqueIds, selectedSet, busy, goPreview,
    setNom, setDescription, toggleRubrique, goEdit, clearSelection, handleEdit,
  } = useEditCategoryPage();

  return (
    <div className="w-full mx-auto  px-3 py-6 sm:px-4 sm:py-10 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">

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
  );
}