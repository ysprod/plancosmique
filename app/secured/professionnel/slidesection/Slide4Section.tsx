/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useState, useTransition } from 'react';
import { CONSULTATION_TYPE_MAP } from './consultation.constants';
import type { ConsultationChoice, FormData, FormErrors, StepType } from './consultation.types';
import ConsultationForm from './ConsultationForm';
import ConsultationSelection from './ConsultationSelection';
import PaymentProcessing from './PaymentProcessing';

interface RequiredOffering {
  _id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number;
}

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

const BackButton = memo(({ onClick }: { onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onClick}
    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
             hover:text-gray-900 dark:hover:text-gray-100 
             transition-colors mb-4 group"
  >
    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    <span className="font-semibold text-sm">Retour</span>
  </motion.button>
));
BackButton.displayName = 'BackButton';

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
  const [requiredOfferingsDetails, setRequiredOfferingsDetails] = useState<RequiredOffering[]>([]);

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

  const handleSelectConsultation = useCallback(async (choice: ConsultationChoice) => {
    console.log('[Consultation] 📋 Sélection:', choice.title);
    setSelected(choice);

    // Enrichir les offrandes si nécessaire
    if (choice.requiredOfferings?.length > 0) {
      try {
        console.log('[Offerings] 🔄 Enrichissement...');
        const response = await api.get('/offerings');

        if (response.status === 200 && response.data?.offerings) {
          const allOfferings = response.data.offerings;
          const enriched: RequiredOffering[] = choice.requiredOfferings
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
        }
      } catch (err: any) {
        console.error('[Offerings] ❌ Erreur:', err);
      }
    }

    setStep('form');
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError(null);
      setPaymentLoading(true);

      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setPaymentLoading(false);
        return;
      }

      if (!selected) {
        setApiError('Aucune consultation sélectionnée');
        setPaymentLoading(false);
        return;
      }

      try {
        const payload = {
          serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
          type: CONSULTATION_TYPE_MAP[selected.id] || 'AUTRE',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'pending_payment',
          requiredOfferings: selected.requiredOfferings,
          requiredOfferingsDetails,
        };

        const consultationRes = await api.post('/consultations', payload);

        if (consultationRes.status !== 200 && consultationRes.status !== 201) {
          throw new Error(consultationRes.data?.message || 'Erreur lors de la création');
        }

        const consultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
        startTransition(() => {
          router.push(`/secured/consulter?id=${consultationId}`);
        });

      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Erreur lors de la création';

        console.error('[Consultation] ❌', err);
        setApiError(errorMessage);
        setPaymentLoading(false);
      }
    },
    [form, selected, requiredOfferingsDetails, router]
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
    setRequiredOfferingsDetails([]);
  }, []);

  const showBackButton = step === 'form' && !paymentLoading;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {/* Header fixe sur mobile */}
      {showBackButton && (
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="max-w-6xl mx-auto">
            <BackButton onClick={resetSelection} />
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* Étape sélection */}
          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ConsultationSelection onSelect={handleSelectConsultation} />
            </motion.div>
          )}

          {/* Étape formulaire */}
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
                selectedTitle={selected.title}
              />
            </motion.div>
          )}

          {/* Étape traitement */}
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
