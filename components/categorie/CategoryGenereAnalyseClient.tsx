'use client';
import { memo } from 'react';
import type { CategorieAdmin } from '@/lib/interfaces';
import { useAnalysisPolling } from '@/hooks/categorie/useAnalysisPolling';
import { useConsultationData } from '@/hooks/categorie/useConsultationData';
import CategoryStepNavigation from './CategoryStepNavigation';
import ConsulterHeader from './ConsulterHeader';
import GenereAnalyseContent from './GenereAnalyseContent';
import AnalysisCompleteNotice from './AnalysisCompleteNotice';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';

interface CategoryGenereAnalyseClientProps {
    category: CategorieAdmin;
    consultationId: string;
}

const CategoryGenereAnalyseClient = memo<CategoryGenereAnalyseClientProps>(function CategoryGenereAnalyseClient({
    category,
    consultationId
}) {
    // Load consultation data and context
    const {
        consultation,
        contextInfo,
        error: dataError
    } = useConsultationData(consultationId, category);
    
    // Poll for analysis completion
    const {
        analysisComplete,
        error: pollingError,
        showError,
        clearError
    } = useAnalysisPolling({ consultationId });

    const currentError = pollingError || dataError;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-4 sm:py-6 lg:py-8">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
                <CategoryStepNavigation
                    categoryId={category._id}
                    currentStep="genereanalyse"
                    consultationId={consultationId}
                />

                <ConsulterHeader title={category.titre || category.nom} />

                <GenereAnalyseContent 
                    contextInfo={contextInfo}
                    consultation={consultation}
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
