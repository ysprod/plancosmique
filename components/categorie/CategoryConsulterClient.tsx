'use client';
import { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CategorieAdmin } from '@/lib/interfaces';
import CategoryStepNavigation from './CategoryStepNavigation';
import CategoryContextBanner from './CategoryContextBanner';
import Slide4SectionConsulter from '../vie-personnelle/Slide4SectionConsulter';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import Slide4SectionLoadingOverlay from '../vie-personnelle/Slide4SectionLoadingOverlay';
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

interface CategoryConsulterClientProps {
  category: CategorieAdmin;
  consultationId: string;
}

const CategoryConsulterClient = memo<CategoryConsulterClientProps>(function CategoryConsulterClient({ 
  category, 
  consultationId 
}) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [consultation, setConsultation] = useState<any>(null);
  const [walletOfferings, setWalletOfferings] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [contextInfo, setContextInfo] = useState<{ rubrique?: any; choix?: any }>({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load context info from sessionStorage
        const rubriqueId = sessionStorage.getItem('rubriqueId');
        const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
        const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
        const choix = rubrique?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
        setContextInfo({ rubrique, choix });
        
        const [consultationRes, walletRes] = await Promise.all([
          api.get(`/consultations/${consultationId}`),
          api.get(`/offering-stock/available?userId=${user?._id}`)
        ]);
        
        const consultationData = consultationRes.data?.consultation || consultationRes.data;
        setConsultation(consultationData);
        
        const offeringsData = Array.isArray(walletRes.data) ? walletRes.data : walletRes.data?.offerings || [];
        const offerings: WalletOffering[] = offeringsData.map((o: any) => ({
          offeringId: o.offeringId || o._id,
          quantity: o.quantity || o.availableQuantity || 0,
          name: o.name || 'Offrande inconnue',
          icon: o.icon || '📦',
          category: o.category || 'animal',
          price: o.price || 0
        }));
        setWalletOfferings(offerings);
      } catch (error: any) {
        console.error('Error loading consultation:', error);
        setApiError(error.response?.data?.message || 'Erreur lors du chargement');
        setShowErrorToast(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [consultationId, user?._id]);

  const handleOfferingValidation = useCallback(async (selectedAlternative: OfferingAlternative) => {
    setLoading(true);
    setApiError(null);
    
    try {
      if (!user?._id) {
        throw new Error('Utilisateur introuvable');
      }
      
      // Consume offerings
      const consumeRes = await api.post('/wallet/consume-offerings', {
        userId: user._id,
        consultationId,
        offerings: [{
          offeringId: selectedAlternative.offeringId,
          quantity: selectedAlternative.quantity
        }]
      });
      
      if (consumeRes.status !== 200 && consumeRes.status !== 201) {
        throw new Error(consumeRes.data?.message || 'Erreur consommation');
      }
      
      // Update consultation status
      await api.patch(`/consultations/${consultationId}`, {
        status: 'paid',
        paymentMethod: 'wallet_offerings'
      });
      
      // Navigate to genereanalyse page
      router.push(`/secured/category/${category._id}/genereanalyse?consultationId=${consultationId}`);
    } catch (error: any) {
      console.error('Error validating offerings:', error);
      setApiError(error.response?.data?.message || 'Erreur lors de la validation');
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  }, [consultationId, category._id, router, user]);

  const handleBack = useCallback(() => {
    router.push(`/secured/category/${category._id}/form`);
  }, [category._id, router]);

  const handleCloseError = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation 
          categoryId={category._id} 
          currentStep="consulter"
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
          
          {!loading && consultation && (
            <motion.div className="mt-6">
              <Slide4SectionConsulter
                consultation={consultation}
                walletOfferings={walletOfferings}
                handleOfferingValidation={handleOfferingValidation}
                handleBack={handleBack}
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
        step="consulter" 
      />
    </div>
  );
});

export default CategoryConsulterClient;
