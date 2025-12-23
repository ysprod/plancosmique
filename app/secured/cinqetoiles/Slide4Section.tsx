
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { ConsultationChoice, FormData, FormErrors, StepType } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useEffect, useState, useTransition } from 'react';
import PaymentProcessing from '../vie-personnelle/slidesection/PaymentProcessing';
import BackButton from './BackButton';
import ConsultationCard from './ConsultationCard';
import ConsultationForm from './ConsultationForm';
import { s } from 'framer-motion/client';

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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

function Slide4Section() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<ConsultationChoice | null>(null);
  const [form, setForm] = useState<FormData>({
    nom: '',
    prenoms: '',
    genre: '',
    dateNaissance: '',
    paysNaissance: '',
    villeNaissance: '',
    heureNaissance: '',
    numeroSend: '0758385387',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      setApiError(null);
    },
    []
  );

  const handleSelect = useCallback(() => {
    setStep('form');
  }, [setStep]);

  useEffect(() => {
    getRubriqueById('694acf59bd12675f59e7a7f2')
      .then(rubrique => {
        const arr = rubrique.consultationChoices || [];
        setChoices(arr);
        if (arr.length > 0) setSelected(arr[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
       setPaymentLoading(true);
      setApiError(null);     

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
        let gender: 'male' | 'female' | 'other' = 'other';
        if (form.genre?.toLowerCase() === 'homme' || form.genre?.toLowerCase() === 'male') gender = 'male';
        else if (form.genre?.toLowerCase() === 'femme' || form.genre?.toLowerCase() === 'female') gender = 'female';

        const userUpdatePayload = {
          nom: form.nom,
          prenoms: form.prenoms,
          genre: form.genre,
          gender,
          dateNaissance: form.dateNaissance,
          paysNaissance: form.paysNaissance,
          villeNaissance: form.villeNaissance,
          heureNaissance: form.heureNaissance,
        };
        await api.patch('/users/me', userUpdatePayload);

        const payload = {
          serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
          type: 'CINQ_ETOILES',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'pending_payment',
          alternatives: selected.offering.alternatives,
        };
        const consultationRes = await api.post('/consultations', payload);
        if (consultationRes.status !== 200 && consultationRes.status !== 201) {
          throw new Error(consultationRes.data?.message || 'Erreur lors de la création');
        }
        const consultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
        startTransition(() => {
          router.push(`/secured/consultergold?id=${consultationId}`);
        });
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Erreur lors de la création';
        setApiError(errorMessage);
        setPaymentLoading(false);
      }
    },
    [form, selected, router]
  );

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
      numeroSend: '0758385387',
    });
    setErrors({});
    setApiError(null);
    setStep('selection');
    setPaymentLoading(false);
  }, []);

  const showBackButton = step === 'form' && !paymentLoading;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 \
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {showBackButton && (
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl \
                      border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="max-w-6xl mx-auto">
            <BackButton onClick={resetSelection} />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col items-center justify-center px-2 py-4 sm:px-6 sm:py-8"
                style={{ minHeight: '40vh' }}
              >
                <h2 className="text-lg sm:text-xl font-bold text-cosmic-100 mb-2 tracking-tight animate-glow">
                  Les 5 portes de votre étoile
                </h2>
                <p className="text-xs sm:text-sm text-cosmic-200 leading-snug mb-1">
                  Découvrez les 5 forces qui structurent votre identité cosmique&nbsp;:
                </p>
                <ol className="flex flex-col gap-2 items-center text-cosmic-300 text-xs sm:text-sm mb-2 list-none">
                  {[
                    'Essence',
                    'Présence',
                    'Âme intime',
                    'Direction de vie',
                    'Relation à l’Autre',
                  ].map((label, idx) => (
                    <li
                      key={label}
                      className="w-full max-w-xs relative px-2 py-1 rounded bg-cosmic-800/40 flex items-center gap-1 shadow-sm animate-fadein"
                    >
                      <span className="inline-block w-5 h-5 mr-1 rounded-full bg-gradient-to-br from-cosmic-600 to-cosmic-400 text-cosmic-950 font-bold text-[0.85em] flex items-center justify-center shadow-md animate-pulse">
                        {idx + 1}
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs sm:text-sm text-cosmic-300">
                  Une étape fondamentale pour comprendre qui vous êtes, comment vous vibrez et la manière dont vous vous reliez au monde.
                </p><br /><br />
                <motion.div
                  variants={containerVariants}
                  className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5"
                >
                  {loading ? (
                    <div className="col-span-2 text-center text-cosmic-400 py-8">Chargement...</div>
                  ) : (
                    choices.map((choice) => (
                      <motion.div
                        key={choice.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 16px #fff3' }}
                        whileTap={{ scale: 0.97 }}
                        className="transition-transform duration-200"
                      >
                        <ConsultationCard choice={choice} />
                      </motion.div>
                    ))
                  )}
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => handleSelect()}
                      className="px-4 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Consulter Maintenant
                    </button>
                  </div>
                </motion.div>
              </motion.section>
            </motion.div>
          )}

          {step === 'form' && selected && !paymentLoading && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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

          {paymentLoading && (
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
      </div>
    </div>
  );
}

export default memo(Slide4Section);
