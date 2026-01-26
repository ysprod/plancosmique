'use client';
import { useConsultationData } from '@/hooks/categorie/useConsultationData';
import type { CategorieAdmin } from '@/lib/interfaces';
import { memo } from 'react';
import AnalyseGenere from '../vie-personnelle/AnalyseGenere';
import CategoryStepNavigation from './CategoryStepNavigation';

interface CategoryGenereAnalyseClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryGenereAnalyseClient = memo<CategoryGenereAnalyseClientProps>(function CategoryGenereAnalyseClient({
  category,
  consultationId
}) {
  const { consultation, contextInfo } = useConsultationData(consultationId, category);

  return (
    <div className="w-full max-w-4xl mx-auto  bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-4 sm:py-6 lg:py-8">
      <CategoryStepNavigation
        categoryId={category._id}
        currentStep="genereanalyse"
        consultationId={consultationId}
      />
      <AnalyseGenere
        consultation={consultation}
        choix={contextInfo.choix}
      />        
    </div>
  );
});

export default CategoryGenereAnalyseClient;