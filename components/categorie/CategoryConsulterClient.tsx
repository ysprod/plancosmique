'use client';
import { useConsultationData } from '@/hooks/categorie/useConsultationData';
import { useOfferingValidation } from '@/hooks/categorie/useOfferingValidation';
import type { CategorieAdmin } from '@/lib/interfaces';

import { memo, useCallback } from 'react';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';
import Slide4SectionLoadingOverlay from '../vie-personnelle/Slide4SectionLoadingOverlay';
import CategoryStepNavigation from './CategoryStepNavigation';
import ConsulterContent from './ConsulterContent';
import ConsulterHeader from './ConsulterHeader';
import ConsulterLoadingState from './ConsulterLoadingState';

interface CategoryConsulterClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryConsulterClient = memo<CategoryConsulterClientProps>(function CategoryConsulterClient({ category, consultationId }) {

  const { consultation, walletOfferings, contextInfo, loading: dataLoading, error: dataError
  } = useConsultationData(consultationId, category);

  const {
    loading: validationLoading, error: validationError, showError,
    handleValidation, clearError
  } = useOfferingValidation({ consultationId, categoryId: category._id, });

  const isLoading = dataLoading || validationLoading;
  const currentError = validationError || dataError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-4 sm:py-6 lg:py-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        <CategoryStepNavigation
          categoryId={category._id}
          currentStep="consulter"
          consultationId={consultationId}
        />

        <ConsulterHeader title={category.titre || category.nom} />

        {dataLoading ? (
          <ConsulterLoadingState />
        ) : consultation ? (
          <ConsulterContent
            consultation={consultation}
            walletOfferings={walletOfferings}
            contextInfo={contextInfo}
            onOfferingValidation={handleValidation}
          />
        ) : null}
      </div>

      <Slide4SectionErrorToast
        showErrorToast={showError || !!dataError}
        apiError={currentError}
        handleCloseError={clearError}
      />

      <Slide4SectionLoadingOverlay
        paymentLoading={isLoading}
        step="consulter"
      />
    </div>
  );
});

export default CategoryConsulterClient;