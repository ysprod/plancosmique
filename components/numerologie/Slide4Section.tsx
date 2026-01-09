"use client";
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { ConsultationChoice, ConsultationData, OfferingAlternative, UserData, WalletOffering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { containerVariants, processingVariants } from '../../lib/animation.constants';
 
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import ConsultationSelection from './ConsultationSelection';
import PaymentProcessing from '../vie-personnelle/PaymentProcessing';
import OfferingStep from '../vie-personnelle/OfferingStep';
import AnalyseGenere from '../vie-personnelle/AnalyseGenere';
import ErrorToast from '../vie-personnelle/ErrorToast';
import LoadingOverlay from '../vie-personnelle/LoadingOverlay';

interface Slide4SectionProps {
  rubriqueId: string;
  typeconsultation: string;
}

export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm'| 'consulter'| 'genereanalyse';

function Slide4SectionComponent({ rubriqueId,typeconsultation }: Slide4SectionProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [consultation, setConsultation] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const choicesFetchedRef = useRef(false);
    const [choices, setChoices] = useState<ConsultationChoice[]>([]);
    const [loading, setLoading] = useState(true);
  // Mapping formData frontend -> backend (strict)
  function mapFormDataToBackend(form: any) {
    if (!form) {
      console.warn('mapFormDataToBackend: form is null or undefined');
      return {};
    }
    const result = {
      firstName: form.prenoms || form.firstName || '',
      lastName: form.nom || form.lastName || '',
      dateOfBirth: form.dateNaissance
        ? new Date(form.dateNaissance).toISOString()
        : (form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : ''),
      timeOfBirth: form.heureNaissance || form.timeOfBirth || '',
      countryOfBirth: form.paysNaissance || form.countryOfBirth || '',
      cityOfBirth: form.villeNaissance || form.cityOfBirth || '',
      gender: form.genre || form.gender || '',
      phone: form.phone || form.numeroSend || '',
      email: form.email || '',
      country: form.country || form.paysNaissance || '',
      question: form.question || '',
      username: form.username || '',
      // Ajoute d'autres champs backend utiles ici
      ...form
    };
 
    return result;
  }

  useEffect(() => {
    if (user?._id) {
      api.get(`/users/me`)
        .then(res => {
          setUserData(res.data);
   
        })
        .catch(err => {
          console.error('Erreur chargement utilisateur:', err);
          setUserData(null);
        })
        .finally(() => {
          console.warn('User data fetch attempt finished.');
        });
    } else {
       setUserData(null);
    }
  }, [user?._id]);


    useEffect(() => {
      if (choicesFetchedRef.current) return;
      choicesFetchedRef.current = true;
  
      getRubriqueById(rubriqueId)
        .then(rubrique => {
          const arr = rubrique.consultationChoices || [];
          setChoices(arr);
        })
        .catch(err => console.error('[Choices] ❌', err))
        .finally(() => setLoading(false));
    }, []);

 
  const handleOfferingValidation = useCallback(
    async (selectedAlternative: OfferingAlternative) => {
      try {
        setPaymentLoading(true);
        setStep('processing');
        if (!user?._id) { throw new Error('Utilisateur introuvable'); }

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

        await api.patch(`/consultations/${consultationId}`, {
          status: 'paid',
          paymentMethod: 'wallet_offerings',
        });
        setStep('genereanalyse');
        setPaymentLoading(false);
      } catch (err: any) {
        console.error('[Offerings] ❌', err);
        setApiError(err.response?.data?.message || err.message || 'Erreur validation');
        setPaymentLoading(false);
      }
    },
    [consultationId, user]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

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
      } else {
        setWalletOfferings([]);
      }
    } catch (err: any) {
      console.error('[Wallet] ❌', err);
      setWalletOfferings([]);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchWalletOfferings();
  }, [fetchWalletOfferings]);

  const showErrorToast = useMemo(() =>
    !!apiError && step === 'selection',
    [apiError, step]
  );

  const handleSelectConsultation = useCallback(async (choice: ConsultationChoice) => {
    setApiError(null);
    setPaymentLoading(true);
    if (!userData) {
      setApiError("Chargement des données utilisateur en cours, veuillez patienter.");
      setPaymentLoading(false);
      return;
    }
    try {
       const mappedFormData = mapFormDataToBackend(userData);
       const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: typeconsultation,
        title: choice.title,
        formData: mappedFormData,
        description: choice.description,
        status: 'pending_payment',
        alternatives: choice.offering.alternatives,
      };
 
      const consultationRes = await api.post('/consultations', payload);
       if (consultationRes.status !== 200 && consultationRes.status !== 201) {
        throw new Error(consultationRes.data?.message || 'Erreur lors de la création');
      }
      const id = consultationRes.data?.id || consultationRes.data?.consultationId;
      if (!id) {
        throw new Error('ID de consultation manquant dans la réponse');
      }
      setConsultationId(id);

      const response = await api.get(`/consultations/${id}`);
      if (response.status !== 200) {
        throw new Error('Consultation introuvable');
      }
      const raw = response.data?.consultation || response.data;
      const alternatives: OfferingAlternative[] = (raw.alternatives || []).map((alt: any, idx: number) => ({
        offeringId: alt.offeringId,
        quantity: alt.quantity,
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
        status: raw.status || raw.statut || '',
      };
      setConsultation(consultationData);
      setStep('consulter');
      setPaymentLoading(false);
    } catch (err: any) {
      console.error('[Slide4] ❌ Erreur:', err);
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Erreur lors de la création de la consultation';
      setApiError(errorMessage);
      setPaymentLoading(false);
    }
  }, [userData]);

  const handleCloseError = useCallback(() => {
    setApiError(null);
  }, []);

  return (
    <div className=" bg-gradient-to-br 
                    from-purple-50/80 via-pink-50/50 to-orange-50/80
                    dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-900
                    relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -right-32 w-80 h-80 
                   bg-purple-400/30 dark:bg-purple-500/20 
                   rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 
                   bg-pink-400/30 dark:bg-pink-500/20 
                   rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {step === 'selection' && !paymentLoading && (
            <motion.div
              key="selection"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConsultationSelection onSelect={handleSelectConsultation} choices={choices} />
            </motion.div>
          )}
          {paymentLoading && (
            <motion.div
              key="processing"
              variants={processingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center justify-center min-h-[60vh]"
            >
              <div className="w-full max-w-md px-4">
                <PaymentProcessing />
              </div>
            </motion.div>
          )}
          {step === 'consulter' && consultationId && consultation && (
            <motion.div
              key="consulter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
                <div className="max-w-6xl mx-auto p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="offering"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OfferingStep
                        requiredOfferings={consultation.alternatives as any}
                        walletOfferings={walletOfferings}
                        onNext={handleOfferingValidation}
                        onBack={handleBack}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'genereanalyse' && consultationId && (
            <motion.div
              key="genereanalyse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnalyseGenere />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showErrorToast && (
          <ErrorToast
            message={apiError!}
            onClose={handleCloseError}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentLoading && step === 'selection' && <LoadingOverlay />}
      </AnimatePresence>
    </div>
  );
}

export default memo(Slide4SectionComponent, () => {
  return true;
});