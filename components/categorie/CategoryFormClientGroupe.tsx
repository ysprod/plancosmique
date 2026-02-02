'use client';
import { useCategoryFormClient } from '@/hooks/categorie/useCategoryFormClient';
import type { CategorieAdmin } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo } from 'react';
import ConsultationForm from '../vie-personnelle/ConsultationForm';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';
import Slide4SectionLoadingOverlay from '../vie-personnelle/Slide4SectionLoadingOverlay';
import CategoryContextBanner from './CategoryContextBanner';
import CategoryStepNavigation from './CategoryStepNavigation';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

interface CategoryFormClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryFormClientGroupe = memo<CategoryFormClientProps>(function CategoryFormClientGroupe({ category, consultationId }) {
  const {
    contextInfo, needsForm, loading, form, errors, apiError, showErrorToast,
    handleChange, handleSubmit, handleReset, handleCloseError,
    selectedChoiceId, userData, selectedChoice
  } = useCategoryFormClient(category, consultationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation
          categoryId={category._id}
          currentStep="form"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
          {needsForm && !loading && selectedChoiceId && userData && selectedChoice && (
            <motion.div className="mt-6">
              <ConsultationForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={handleReset}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      <Slide4SectionErrorToast
        showErrorToast={showErrorToast}
        apiError={apiError}
        handleCloseError={handleCloseError}
      />
      <Slide4SectionLoadingOverlay
        paymentLoading={loading}
        step={needsForm ? "form" : "consulter"}
      />
    </div>
  );
});

export default CategoryFormClientGroupe;