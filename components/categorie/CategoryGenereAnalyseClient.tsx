'use client';
import { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CategorieAdmin } from '@/lib/interfaces';
import CategoryStepNavigation from './CategoryStepNavigation';
import CategoryContextBanner from './CategoryContextBanner';
import Slide4SectionGenereAnalyse from '../vie-personnelle/Slide4SectionGenereAnalyse';
import { api } from '@/lib/api/client';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';

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

interface CategoryGenereAnalyseClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryGenereAnalyseClient = memo<CategoryGenereAnalyseClientProps>(function CategoryGenereAnalyseClient({ 
  category, 
  consultationId 
}) {
  const router = useRouter();
  
  const [apiError, setApiError] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [contextInfo, setContextInfo] = useState<{ rubrique?: any; choix?: any }>({});

  // Load context info from sessionStorage
  useEffect(() => {
    const rubriqueId = sessionStorage.getItem('rubriqueId');
    const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
    const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
    const choix = rubrique?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
    setContextInfo({ rubrique, choix });
  }, [category.rubriques]);

  // Poll consultation status to check when analysis is complete
  useEffect(() => {
    if (analysisComplete) return;
    
    const checkStatus = async () => {
      try {
        const response = await api.get(`/consultations/${consultationId}`);
        const consultationData = response.data?.consultation || response.data;
        if (consultationData?.statut === 'REPONDU') {
          setAnalysisComplete(true);
          // Redirect to consultation view after a delay
          setTimeout(() => {
            router.push(`/secured/consultations/${consultationId}`);
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking consultation status:', error);
      }
    };
    
    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [consultationId, analysisComplete, router]);

  const handleCloseError = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation 
          categoryId={category._id} 
          currentStep="genereanalyse"
          consultationId={consultationId}
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
            choixTitre={contextInfo.choix?.titre}
            choixDescription={contextInfo.choix?.description}
          />
                    <motion.div className="mt-6">
            <Slide4SectionGenereAnalyse />
            
            {analysisComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="backdrop-blur-xl bg-green-100/80 dark:bg-green-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-700/50">
                  <p className="text-green-700 dark:text-green-300 font-semibold">
                    ✨ Analyse terminée ! Redirection vers votre consultation...
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      <Slide4SectionErrorToast 
        showErrorToast={showErrorToast} 
        apiError={apiError} 
        handleCloseError={handleCloseError} 
      />
    </div>
  );
});

export default CategoryGenereAnalyseClient;
