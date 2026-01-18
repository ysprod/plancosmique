'use client';
import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CategorieAdmin, ConsultationChoice } from '@/lib/interfaces';
import CategoryStepNavigation from './CategoryStepNavigation';
import Slide4SectionSelection from '../vie-personnelle/Slide4SectionSelection';

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

interface CategorySelectionClientProps {
  category: CategorieAdmin;
}

const CategorySelectionClient = memo<CategorySelectionClientProps>(function CategorySelectionClient({ category }) {
  const router = useRouter();
  
  console.log('CategorySelectionClient - category:', category);
  console.log('CategorySelectionClient - consultationChoices:', category.consultationChoices);

  // Get choices directly from category
  const choices = useMemo(() => {
    if (!category?.consultationChoices) {
      console.log('No consultationChoices found in category');
      return [];
    }
    console.log('Found choices:', category.consultationChoices.length);
    return category.consultationChoices;
  }, [category]);

  const handleSelectConsultation = useCallback((choice: ConsultationChoice) => {
    // Store the selected choice in sessionStorage for the form page
    sessionStorage.setItem('selectedChoiceId', choice._id || '');
    sessionStorage.setItem('categoryId', category._id);
    
    // Navigate to form page
    router.push(`/secured/category/${category._id}/form`);
  }, [category._id, router]);

  if (!choices || choices.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <p className="text-gray-700 dark:text-slate-300">Aucun choix de consultation disponible</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Catégorie: {category.titre}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation 
          categoryId={category._id} 
          currentStep="selection"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
              {category.titre}
            </h1>
            {category.description && (
              <p className="text-center text-sm sm:text-base text-gray-600 dark:text-slate-400 mt-2 px-4">
                {category.description}
              </p>
            )}
          </div>
          
          <motion.div className="mt-6">
            <Slide4SectionSelection
              onSelect={handleSelectConsultation}
              choices={choices}
              alreadyDoneChoices={[]}
              choicesWithCount={[]}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

export default CategorySelectionClient;
