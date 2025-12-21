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

interface RequiredOffering {
  _id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number;
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
  requiredOfferings: Array<{ offeringId: string; quantity: number }>;
  requiredOfferingsDetails?: RequiredOffering[];
  formData?: any;
  status: string;
}

function ConsulterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const consultationId = searchParams.get('id');

  const [consultation, setConsultation] = useState<ConsultationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'offering' | 'processing'>('offering');
  const [apiError, setApiError] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [requiredOfferingsDetails, setRequiredOfferingsDetails] = useState<RequiredOffering[]>([]);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  const fetchConsultation = useCallback(async () => {
    if (!consultationId) {
      setApiError('ID de consultation manquant');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/consultations/${consultationId}`);

      if (response.status !== 200) {
        throw new Error('Consultation introuvable');
      }

      const consultationData = response.data?.consultation || response.data;

      if (consultationData.requiredOfferingsDetails?.length > 0) {
        setRequiredOfferingsDetails(consultationData.requiredOfferingsDetails);
      }

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


  const enrichRequiredOfferings = useCallback(async () => {
    if (consultation?.requiredOfferingsDetails && consultation.requiredOfferingsDetails.length > 0) return;
    if (!consultation?.requiredOfferings?.length) {
      setRequiredOfferingsDetails([]);
      return;
    }

    try {
      const response = await api.get('/offerings');

      if (response.status === 200 && response.data?.offerings) {
        const allOfferings = response.data.offerings;
        const enriched: RequiredOffering[] = consultation.requiredOfferings
          .map((req: any) => {
            const details = allOfferings.find((o: any) => o._id === req.offeringId);
            return details ? {
              _id: details._id,
              name: details.name,
              price: details.price,
              icon: details.icon,
              category: details.category,
              quantity: req.quantity,
            } : null;
          })
          .filter((o): o is RequiredOffering => o !== null);

        setRequiredOfferingsDetails(enriched);
        console.log('[Offerings] ✅ Enrichies:', enriched.length);
      } else {
        setRequiredOfferingsDetails([]);
      }
    } catch (err: any) {
      console.error('[Offerings] ❌', err);
      setRequiredOfferingsDetails([]);
      setApiError('Impossible de charger les détails');
    }
  }, [consultation]);

  useEffect(() => {
    fetchConsultation();
  }, [fetchConsultation]);

  useEffect(() => {
    if (consultation && step === 'offering') {
      setLoadingOfferings(true);

      if (consultation.requiredOfferingsDetails && consultation.requiredOfferingsDetails.length > 0) {
        fetchWalletOfferings().finally(() => setLoadingOfferings(false));
      } else {
        Promise.all([
          fetchWalletOfferings(),
          enrichRequiredOfferings()
        ]).finally(() => setLoadingOfferings(false));
      }
    }
  }, [step, consultation, fetchWalletOfferings, enrichRequiredOfferings]);

  const handleOfferingValidation = useCallback(
    async (selectedOfferingIds: string[]) => {
      if (!consultationId) {
        setApiError('Consultation introuvable');
        return;
      }

      try {
        setPaymentLoading(true);
        setStep('processing');
        console.log('[Offerings] ✅ Sélectionnées:', selectedOfferingIds.length);

        const offeringsToConsume = selectedOfferingIds.map((id) => {
          const required = consultation?.requiredOfferings.find((r: any) => r.offeringId === id);
          return {
            offeringId: id,
            quantity: required?.quantity || 1,
          };
        });

        if (!user?._id) {
          throw new Error('Utilisateur introuvable');
        }

        const consumeRes = await api.post('/wallet/consume-offerings', {
          userId: user._id,
          consultationId,
          offerings: offeringsToConsume,
        });

        if (consumeRes.status !== 200 && consumeRes.status !== 201) {
          throw new Error(consumeRes.data?.message || 'Erreur consommation');
        }

        console.log('[Wallet] ✅ Consommées');

        await api.patch(`/consultations/${consultationId}`, {
          status: 'paid',
          paymentMethod: 'wallet_offerings',
        });

        console.log('[Consultation] ✅ Statut: paid');



        setTimeout(() => {
          router.push(`/secured/genereanalyse?id=${consultationId}`);
        }, 1500);

      } catch (err: any) {
        console.error('[Offerings] ❌', err);
        setApiError(err.response?.data?.message || err.message || 'Erreur validation');
        setPaymentLoading(false);
      }
    },
    [consultationId, consultation, user, router]
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
        {/* Titre */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {consultation.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {consultation.description}
          </p>
        </div>

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
                  requiredOfferings={requiredOfferingsDetails}
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
