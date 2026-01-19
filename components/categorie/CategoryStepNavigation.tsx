'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

interface Step {
  id: string;
  label: string;
  href: string;
  completed: boolean;
  current: boolean;
}

interface CategoryStepNavigationProps {
  categoryId: string;
  currentStep: 'selection' | 'form' | 'consulter' | 'genereanalyse';
  consultationId?: string;
}

const CategoryStepNavigation = memo<CategoryStepNavigationProps>(function CategoryStepNavigation({ 
  categoryId, 
  currentStep,
  consultationId 
}) {
  const steps: Step[] = [
    {
      id: 'selection',
      label: 'Sélection',
      href: `/secured/category/${categoryId}/selection`,
      completed: currentStep !== 'selection',
      current: currentStep === 'selection'
    },
    {
      id: 'form',
      label: 'Formulaire',
      href: `/secured/category/${categoryId}/form`,
      completed: ['consulter', 'genereanalyse'].includes(currentStep),
      current: currentStep === 'form'
    },
    {
      id: 'consulter',
      label: 'Consultation',
      href: consultationId ? `/secured/category/${categoryId}/consulter?consultationId=${consultationId}` : '#',
      completed: currentStep === 'genereanalyse',
      current: currentStep === 'consulter'
    },
    {
      id: 'genereanalyse',
      label: 'Félicitations',
      href: consultationId ? `/secured/category/${categoryId}/genereanalyse?consultationId=${consultationId}` : '#',
      completed: false,
      current: currentStep === 'genereanalyse'
    }
  ];

  return (
    <nav aria-label="Progress" className="mb-6 sm:mb-8">
      <ol className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center flex-1 sm:flex-none">
            {step.completed ? (
              <Link href={step.href} className="group flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 hidden sm:inline">
                  {step.label}
                </span>
              </Link>
            ) : step.current ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl border-2 border-white dark:border-slate-800"
                >
                  <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                </motion.div>
                <span className="ml-2 text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-400 hidden sm:inline">
                  {step.label}
                </span>
              </div>
            ) : (
              <div className="flex items-center opacity-50">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-slate-400">
                  <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                </div>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-500 hidden sm:inline">
                  {step.label}
                </span>
              </div>
            )}
            
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-slate-600 mx-1 sm:mx-3 flex-shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
});

export default CategoryStepNavigation;
