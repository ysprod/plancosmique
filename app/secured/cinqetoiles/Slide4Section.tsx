/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { useAuth } from '@/lib/auth/AuthContext';
import { ConsultationChoice, FormData, FormErrors, OfferingAlternative, StepType, WalletOffering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Sparkles, Star } from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PaymentProcessing from '../../../components/vie-personnelle/PaymentProcessing';
import BackButton from './BackButton';
import ConsultationCard from './ConsultationCard';
import ConsultationForm from './ConsultationForm';
import ConsulterGoldContent from './ConsulterGoldContent';

export interface ConsultationData {
  _id: string;
  title: string;
  description: string;
  alternatives: { offeringId: string; quantity: number }[];
  formData?: any;
  status: string;
}

type ExtendedStepType = StepType | 'gold';

const RUBRIQUE_ID = '694acf59bd12675f59e7a7f2';
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const DEFAULT_PHONE = '0758385387';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 250, damping: 22 }
  },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.2 }
  }
};

const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!form.nom.trim()) errors.nom = 'Nom requis';
  if (!form.prenoms.trim()) errors.prenoms = 'Prénoms requis';
  if (!form.genre) errors.genre = 'Genre requis';
  if (!form.dateNaissance) errors.dateNaissance = 'Date de naissance requise';
  if (!form.paysNaissance) errors.paysNaissance = 'Pays de naissance requis';
  if (!form.villeNaissance.trim()) errors.villeNaissance = 'Ville de naissance requise';
  if (!form.heureNaissance) errors.heureNaissance = 'Heure de naissance requise';
  return errors;
};

const parseGender = (genre: string): 'male' | 'female' | 'other' => {
  const lower = genre?.toLowerCase();
  if (lower === 'homme' || lower === 'male') return 'male';
  if (lower === 'femme' || lower === 'female') return 'female';
  return 'other';
};

const LoadingState = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-12"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="mb-3"
    >
      <Loader2 className="w-10 h-10 text-purple-600" />
    </motion.div>
    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
      Chargement des consultations...
    </p>
  </motion.div>
));
LoadingState.displayName = 'LoadingState';

const PorteItem = memo(({ label, index }: { label: string; index: number }) => (
  <motion.li
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="w-full max-w-xs relative px-3 py-2 rounded-lg
             bg-gradient-to-r from-purple-900/30 to-pink-900/20
             backdrop-blur-sm border border-purple-500/20
             flex items-center gap-2 shadow-sm hover:shadow-md
             hover:from-purple-900/40 hover:to-pink-900/30
             transition-all duration-200"
  >
    <motion.span
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center justify-center w-6 h-6 
               rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
               text-white font-bold text-xs shadow-lg flex-shrink-0"
    >
      {index + 1}
    </motion.span>
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </span>
  </motion.li>
));
PorteItem.displayName = 'PorteItem';

const SelectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-6"
  >
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className="inline-flex items-center gap-2 mb-3"
    >
      <Sparkles className="w-6 h-6 text-purple-600" />
      <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 
                   to-pink-600 bg-clip-text text-transparent">
        LES 5 PORTES DE MON ÉTOILE
      </h2>
      <Star className="w-6 h-6 text-pink-600" />
    </motion.div>


    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-base sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto 
               leading-relaxed px-4"
    >
      Commençons par une consultation qui dévoile les cinq forces essentielles qui structurent
      votre identité cosmique.
      C’est une étape préalable et fondamentale pour comprendre qui vous êtes, comment
      vous vibrez, ce que vous ressentez, ce vers quoi vous avancez, et la manière dont vous
      vous reliez au monde.
    </motion.p>
  </motion.div>
));
SelectionHeader.displayName = 'SelectionHeader';

function Slide4Section() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<ConsultationChoice | null>(null);
  const [form, setForm] = useState<FormData>({
    nom: '',
    prenoms: '',
    genre: '',
    dateNaissance: '',
    paysNaissance: '',
    villeNaissance: '',
    heureNaissance: '',
    numeroSend: DEFAULT_PHONE,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<ExtendedStepType>('selection');
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [consultation, setConsultation] = useState<ConsultationData | null>(null);
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);

  const walletFetchedRef = useRef(false);
  const choicesFetchedRef = useRef(false);

  const showBackButton = useMemo(() =>
    step === 'form' && !paymentLoading,
    [step, paymentLoading]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const { [name]: _, ...rest } = prev;
        return rest;
      });

      setApiError(null);
    },
    []
  );

  const handleSelect = useCallback(() => {
    setStep('form');
  }, []);

  const resetSelection = useCallback(() => {
    setSelected(null);
    setForm({
      nom: '',
      prenoms: '',
      genre: '',
      dateNaissance: '',
      paysNaissance: '',
      villeNaissance: '',
      heureNaissance: '',
      numeroSend: DEFAULT_PHONE,
    });
    setErrors({});
    setApiError(null);
    setStep('selection');
    setPaymentLoading(false);
  }, []);


  const fetchWalletOfferings = useCallback(async () => {
    if (!user?._id || walletFetchedRef.current) return;
    walletFetchedRef.current = true;

    try {
      const response = await api.get(`/offering-stock/available?userId=${user._id}`);
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
      }
    } catch (err: any) {
      console.error('[Wallet] ❌', err);
      setWalletOfferings([]);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchWalletOfferings();
  }, [fetchWalletOfferings]);


  useEffect(() => {
    if (choicesFetchedRef.current) return;
    choicesFetchedRef.current = true;

    getRubriqueById(RUBRIQUE_ID)
      .then(rubrique => {
        const arr = rubrique.consultationChoices || [];
        setChoices(arr);
        if (arr.length > 0) setSelected(arr[0]);
      })
      .catch(err => console.error('[Choices] ❌', err))
      .finally(() => setLoading(false));
  }, []);


  const fetchConsultation = useCallback(async () => {
    if (!consultationId) return;

    try {
      const response = await api.get(`/consultations/${consultationId}`);
      if (response.status !== 200) throw new Error('Consultation introuvable');

      const raw = response.data?.consultation || response.data;
      const alternatives: OfferingAlternative[] = (raw.alternatives || []).map((alt: any, idx: number) => ({
        offeringId: alt.offeringId,
        quantity: alt.quantity,
        category: ['animal', 'vegetal', 'beverage'][idx] || 'animal',
        name: alt.name || '',
        price: alt.price || 0,
        icon: alt.icon || '',
      }));

      setConsultation({
        _id: raw._id || raw.id || raw.consultationId,
        title: raw.title || raw.titre || '',
        description: raw.description || '',
        alternatives,
        formData: raw.formData || {},
        status: raw.status || raw.statut || '',
      });
    } catch (err: any) {
      console.error('[Consultation] ❌', err);
      setApiError(err.message || 'Impossible de charger');
    }
  }, [consultationId]);

  useEffect(() => {
    fetchConsultation();
  }, [fetchConsultation]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setPaymentLoading(true);
      setApiError(null);

      // Validation
      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setPaymentLoading(false);
        return;
      }

      if (!selected) {
        setApiError('Veuillez sélectionner une consultation.');
        setPaymentLoading(false);
        return;
      }

      try {
        // Update user
        const userUpdatePayload = {
          nom: form.nom,
          prenoms: form.prenoms,
          genre: form.genre,
          gender: parseGender(form.genre),
          dateNaissance: form.dateNaissance,
          paysNaissance: form.paysNaissance,
          villeNaissance: form.villeNaissance,
          heureNaissance: form.heureNaissance,
        };
        await api.patch('/users/me', userUpdatePayload);

        // Create consultation
        const payload = {
          serviceId: SERVICE_ID,
          type: 'CINQ_ETOILES',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'pending_payment',
          alternatives: selected.offering.alternatives,
          visible: false
        };

        const consultationRes = await api.post('/consultations', payload);
        if (consultationRes.status !== 200 && consultationRes.status !== 201) {
          throw new Error(consultationRes.data?.message || 'Erreur lors de la création');
        }

        const newConsultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
        setConsultationId(newConsultationId);
        setStep('gold');
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Erreur lors de la création';
        setApiError(errorMessage);
      } finally {
        setPaymentLoading(false);
      }
    },
    [form, selected]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {/* Sticky Header avec BackButton */}
      {showBackButton && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                   border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3 shadow-sm"
        >
          <div className="max-w-6xl mx-auto">
            <BackButton onClick={resetSelection} />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <AnimatePresence mode="wait">
          {/* SELECTION STEP */}
          {step === 'selection' && (
            <motion.div
              key="selection"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SelectionHeader />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  {loading ? (
                    <LoadingState />
                  ) : (
                    choices.map((choice) => (
                      <motion.div
                        key={choice.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          y: -4,
                          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.15)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ConsultationCard choice={choice} />
                      </motion.div>
                    ))
                  )}
                </div>

                {!loading && choices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSelect}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                               text-white font-bold rounded-xl shadow-lg 
                               hover:shadow-xl hover:from-purple-700 hover:to-pink-700
                               transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Consulter Maintenant</span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 'form' && selected && !paymentLoading && (
            <motion.div
              key="form"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConsultationForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={resetSelection}
              />
            </motion.div>
          )}

          {/* PAYMENT PROCESSING */}
          {paymentLoading && (
            <motion.div
              key="processing"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PaymentProcessing />
            </motion.div>
          )}
     
          {step === 'gold' && consultationId && !paymentLoading && consultation && (
            <motion.div
              key="gold"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConsulterGoldContent
                consultationId={consultationId}
                walletOfferings={walletOfferings}
                consultation={consultation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(Slide4Section);