'use client';
import { useCategoryFormClientGroupe } from '@/hooks/categorie/useCategoryFormClientGroupe';
import type { CategorieAdmin } from '@/lib/interfaces';
import { memo } from 'react';
import ConsultationFormGroupe from '../vie-personnelle/ConsultationFormGroupe';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';
import Slide4SectionLoadingOverlay from '../vie-personnelle/Slide4SectionLoadingOverlay';
import CategoryContextBanner from './CategoryContextBanner';
import CategoryStepNavigation from './CategoryStepNavigation';

interface CategoryFormClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryFormClientGroupe = memo<CategoryFormClientProps>(function CategoryFormClientGroupe({ category, consultationId }) {
  const {
    contextInfo, loading, form, errors, apiError, showErrorToast,
    selectedChoiceId, selectedChoice, tiercesList, showAddMore,
    isFormValid, successMessage,
    handleChange, handleSubmit, handleReset, handleCloseError,
    setShowAddMore, handleAddTierce, handleRemoveTierce,
  } = useCategoryFormClientGroupe(category, consultationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation
          categoryId={category._id}
          currentStep="form"
        />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
            {category.titre || category.nom}
          </h1>
        </div>
        <CategoryContextBanner
          rubriqueTitre={contextInfo.rubrique?.titre}
          choixTitre={contextInfo.choix?.title}
          choixDescription={contextInfo.choix?.description}
        />
        {selectedChoiceId && selectedChoice && (
          <div className="mt-6">
            <ConsultationFormGroupe
              form={form}
              errors={errors}
              handleChange={handleChange}
              apiError={apiError}
              handleSubmit={handleSubmit}
              resetSelection={handleReset}
              tiercesList={tiercesList}
              showAddMore={showAddMore}
              setShowAddMore={setShowAddMore}
              handleAddTierce={handleAddTierce}
              handleRemoveTierce={handleRemoveTierce}
              isFormValid={isFormValid}
              successMessage={successMessage}
            />
          </div>
        )}
      </div>

      <Slide4SectionErrorToast
        showErrorToast={showErrorToast}
        apiError={apiError}
        handleCloseError={handleCloseError}
      />
      <Slide4SectionLoadingOverlay
        paymentLoading={loading}
        step={"form"}
      />
    </div>
  );
});

export default CategoryFormClientGroupe;