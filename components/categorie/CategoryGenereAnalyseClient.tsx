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
    <div className="w-full max-w-6xl mx-auto  py-4 sm:py-6 lg:py-8">
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