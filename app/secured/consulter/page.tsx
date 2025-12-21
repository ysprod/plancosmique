/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import PaymentProcessing from '../vie-personnelle/slidesection/PaymentProcessing';
import BackButton from './BackButton';
import ErrorAlert from './ErrorAlert';
import ErrorState from './ErrorState';
import LoadingSpinner from './LoadingSpinner';
import OfferingStep from './OfferingStep';


interface OfferingAlternative {
  category: 'animal' | 'vegetal' | 'beverage';
  offeringId: string;
  quantity: number;
  name?: string;
  price?: number;
  icon?: string;
}

interface WalletOffering {
  offeringId: string;
  quantity: number;
  name: string;
  icon: string;
  category: string;
  price: number;
}


interface ConsultationData {
  _id: string;
  title: string;
  description: string;
  alternatives: { offeringId: string; quantity: number }[];
  formData?: any;
  status: string;
  // autres champs potentiels selon le backend
}


function ConsulterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const consultationId = searchParams.get('id');
  const urlForm = searchParams.get('form');
  const urlOffering = searchParams.get('offering');
  const urlType = searchParams.get('type');
  const urlTitle = searchParams.get('title');
  const urlDescription = searchParams.get('description');

  const [consultation, setConsultation] = useState<ConsultationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'offering' | 'processing'>('offering');
  const [apiError, setApiError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  // Création de la consultation si pas d'id mais données présentes dans l'URL
  useEffect(() => {
    if (!consultationId && urlForm && urlOffering && urlType && urlTitle && urlDescription) {
      const createConsultation = async () => {
        setLoading(true);
        setApiError(null);
        try {
          const formData = JSON.parse(urlForm);
          const offering = JSON.parse(urlOffering);
          // Enrichir l'alternative sélectionnée
          let details = null;
          try {
            const response = await api.get('/offerings');
            if (response.status === 200 && response.data?.offerings) {
              const allOfferings = response.data.offerings;
              details = allOfferings.find((o: any) => o._id === offering.offeringId);
            }
          } catch (err) {
            details = null;
          }
          if (!details) throw new Error("Offrande inconnue");
          const payload = {
            serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
            type: urlType,
            title: urlTitle,
            description: urlDescription,
            formData,
            status: 'pending_payment',
            requiredOfferings: [offering],
            requiredOfferingsDetails: [{
              _id: details._id,
              name: details.name,
              price: details.price,
              icon: details.icon,
              category: details.category,
              quantity: offering.quantity,
            }],
          };
          const consultationRes = await api.post('/consultations', payload);
          if (consultationRes.status !== 200 && consultationRes.status !== 201) {
            throw new Error(consultationRes.data?.message || 'Erreur lors de la création');
          }
          const newId = consultationRes.data?.id || consultationRes.data?.consultationId;
          router.replace(`/secured/consulter?id=${newId}`);
        } catch (err: any) {
          setApiError(err.message || 'Erreur lors de la création de la consultation');
          setLoading(false);
        }
      };
      createConsultation();
    }
  }, [consultationId, urlForm, urlOffering, urlType, urlTitle, urlDescription, router]);

  const fetchConsultation = useCallback(async () => {
    if (!consultationId) {
      setApiError('ID de consultation manquant');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/consultations/${consultationId}`);

      console.log('Consultation fetch response:', response);

      if (response.status !== 200) {
        throw new Error('Consultation introuvable');
      }

      const raw = response.data?.consultation || response.data;
      // Harmonisation des champs pour la structure locale
      // On mappe les alternatives pour leur donner la forme attendue par l'UI (category, etc.)
      const alternatives: OfferingAlternative[] = (raw.alternatives || []).map((alt: any, idx: number) => ({
        offeringId: alt.offeringId,
        quantity: alt.quantity,
        // On tente d'inférer la catégorie par l'ordre ou on laisse vide si inconnu
        category: ['animal', 'vegetal', 'beverage'][idx] || 'animal',
        name: alt.name || '',
        price: alt.price || 0,
        icon: alt.icon || '',
      }));
      const consultationData: ConsultationData = {
        _id: raw._id || raw.id || raw.consultationId,
        title: raw.title || raw.titre || '',
        description: raw.description || '',
        alternatives,
        formData: raw.formData || {},
        status: raw.status || raw.statut || '',
        // autres champs si besoin
      };
      console.log('[Consultation] ✅ Chargée:', consultationData);
      setConsultation(consultationData);
    } catch (err: any) {
      console.error('[Consultation] ❌', err);
      setApiError(err.message || 'Impossible de charger');
    } finally {
      setLoading(false);
    }
  }, [consultationId]);

  const fetchWalletOfferings = useCallback(async () => {
    try {
      const response = await api.get(`/offering-stock/available?userId=${user?._id}`);

      const offeringsData = Array.isArray(response.data)
        ? response.data
        : response.data?.offerings || [];

      if (response.status === 200 && offeringsData.length > 0) {
        const offerings: WalletOffering[] = offeringsData.map((o: any) => ({
          offeringId: o.offeringId || o._id,
          quantity: o.quantity || o.availableQuantity || 0,
          name: o.name || 'Offrande inconnue',
          icon: o.icon || '📦',
          category: o.category || 'animal',
          price: o.price || 0,
        }));

        setWalletOfferings(offerings);
        console.log('[Wallet] ✅ Chargées:', offerings.length);
      } else {
        setWalletOfferings([]);
      }
    } catch (err: any) {
      console.error('[Wallet] ❌', err);
      setWalletOfferings([]);
    }
  }, [user?._id]);



  // enrichRequiredOfferings supprimé (plus utile)

  useEffect(() => {
    fetchConsultation();
  }, [fetchConsultation]);

  useEffect(() => {
    if (consultation && step === 'offering') {
      setLoadingOfferings(true);
      fetchWalletOfferings().finally(() => setLoadingOfferings(false));
    }
  }, [step, consultation, fetchWalletOfferings]);

  const handleOfferingValidation = useCallback(
    async (selectedAlternative: OfferingAlternative) => {
      if (!consultationId) {
        setApiError('Consultation introuvable');
        return;
      }

      try {
        setPaymentLoading(true);
        setStep('processing');
        console.log('[Offerings] ✅ Alternative sélectionnée:', selectedAlternative);

        if (!user?._id) {
          throw new Error('Utilisateur introuvable');
        }

        const consumeRes = await api.post('/wallet/consume-offerings', {
          
          userId: user._id,
          consultationId,
          offerings: [{
            offeringId: selectedAlternative.offeringId,
            quantity: selectedAlternative.quantity,
          }],
        });

        if (consumeRes.status !== 200 && consumeRes.status !== 201) {
          throw new Error(consumeRes.data?.message || 'Erreur consommation');
        }

        console.log('[Wallet] ✅ Consommée');

        await api.patch(`/consultations/${consultationId}`, {
          status: 'paid',
          paymentMethod: 'wallet_offerings',
        });

        console.log('[Consultation] ✅ Statut: paid');

        setTimeout(() => {
          router.push(`/secured/genereanalyse?id=${consultationId}`);
        }, 500);

      } catch (err: any) {
        console.error('[Offerings] ❌', err);
        setApiError(err.response?.data?.message || err.message || 'Erreur validation');
        setPaymentLoading(false);
      }
    },
    [consultationId, user, router]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (loading) {
    return <LoadingSpinner message="Chargement..." />;
  }

  if (!consultation) {
    return (
      <ErrorState
        title="Consultation introuvable"
        message={apiError || 'La consultation n\'existe pas'}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">

      {/* Header sticky */}
      {step === 'offering' && !paymentLoading && (
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="max-w-6xl mx-auto">
            <BackButton onClick={handleBack} />
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Workflow */}
        <AnimatePresence mode="wait">
          {/* Étape offrandes */}
          {step === 'offering' && !paymentLoading && (
            <motion.div
              key="offering"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loadingOfferings ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <LoadingSpinner
                    message="Chargement de vos offrandes..."
                    subMessage="Vérification du wallet"
                  />
                </div>
              ) : (
                <OfferingStep
                  requiredOfferings={consultation.alternatives as any}
                  walletOfferings={walletOfferings}
                  onNext={handleOfferingValidation}
                  onBack={handleBack}
                />
              )}
            </motion.div>
          )}

          {/* Étape traitement */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentProcessing />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Erreur */}
        {apiError && step === 'offering' && <ErrorAlert message={apiError} />}
      </div>
    </div>
  );
}

export default ConsulterPage;
