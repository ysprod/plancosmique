'use client';
import { useAnalysisPolling } from '@/hooks/categorie/useAnalysisPolling';
import { useConsultationData } from '@/hooks/categorie/useConsultationData';
import type { CategorieAdmin } from '@/lib/interfaces';
import { memo } from 'react';
import AnalyseGenere from '../vie-personnelle/AnalyseGenere';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';
import AnalysisCompleteNotice from './AnalysisCompleteNotice';
import CategoryStepNavigation from './CategoryStepNavigation';

interface CategoryGenereAnalyseClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryGenereAnalyseClient = memo<CategoryGenereAnalyseClientProps>(function CategoryGenereAnalyseClient({
  category,
  consultationId
}) {
  const { consultation, contextInfo, error: dataError } = useConsultationData(consultationId, category);

  const { analysisComplete, error: pollingError, showError, clearError } = useAnalysisPolling({ consultationId });

  const currentError = pollingError || dataError;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <CategoryStepNavigation
          categoryId={category._id}
          currentStep="genereanalyse"
          consultationId={consultationId}
        />
        <AnalyseGenere
          consultation={consultation}
          choix={contextInfo.choix}
        />
        <AnalysisCompleteNotice show={analysisComplete} />
      </div>

      <Slide4SectionErrorToast
        showErrorToast={showError || !!dataError}
        apiError={currentError}
        handleCloseError={clearError}
      />
    </div>
  );
});

export default CategoryGenereAnalyseClient;