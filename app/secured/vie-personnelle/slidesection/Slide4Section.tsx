/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { CONSULTATION_TYPE_MAP } from './consultation.constants';
import type { ConsultationChoice, FormData, FormErrors, StepType } from './consultation.types';
import ConsultationForm from './ConsultationForm';
import ConsultationSelection from './ConsultationSelection';
import OfferingStep from './OfferingStep';
import PaymentProcessing from './PaymentProcessing';

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

export default function Slide4Section() {
  const router = useRouter();
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
  const [backActivated, setBackActivated] = useState(false);
  const [createdConsultationId, setCreatedConsultationId] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      setApiError(null);
    },
    [errors]
  );

  const handleSelectConsultation = useCallback((choice: ConsultationChoice) => {
    setSelected(choice);
    setBackActivated(true);
    setStep('form');
  }, []);

  /**
   * Vérifie si l'utilisateur dispose de toutes les offrandes requises dans son wallet
   */
  const checkUserWalletOfferings = useCallback(async (requiredOfferings: Array<{ offeringId: string; quantity: number }>): Promise<boolean> => {
    try {
      console.log('[Wallet] 🔍 Vérification des offrandes dans le wallet...');
      
      // Récupérer les offrandes du wallet de l'utilisateur
      const walletRes = await api.get('/wallet/offerings');
      
      if (walletRes.status !== 200 || !walletRes.data?.offerings) {
        console.log('[Wallet] ⚠️ Impossible de récupérer le wallet');
        return false;
      }

      const userOfferings = walletRes.data.offerings;
      console.log('[Wallet] 📦 Offrandes disponibles:', userOfferings);

      // Vérifier chaque offrande requise
      for (const required of requiredOfferings) {
        const userOffering = userOfferings.find((o: any) => o.offeringId === required.offeringId);
        
        if (!userOffering || userOffering.quantity < required.quantity) {
          console.log(`[Wallet] ❌ Offrande insuffisante: ${required.offeringId} (requis: ${required.quantity}, disponible: ${userOffering?.quantity || 0})`);
          return false;
        }
      }

      console.log('[Wallet] ✅ Toutes les offrandes sont disponibles!');
      return true;
    } catch (err: any) {
      console.error('[Wallet] ❌ Erreur lors de la vérification:', err);
      return false;
    }
  }, []);

  /**
   * Consomme les offrandes du wallet pour la consultation
   */
  const consumeWalletOfferings = useCallback(async (consultationId: string, requiredOfferings: Array<{ offeringId: string; quantity: number }>): Promise<boolean> => {
    try {
      console.log('[Wallet] 🔄 Consommation des offrandes du wallet...');
      
      const consumeRes = await api.post('/wallet/consume-offerings', {
        consultationId,
        offerings: requiredOfferings
      });

      if (consumeRes.status !== 200) {
        throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation des offrandes');
      }

      console.log('[Wallet] ✅ Offrandes consommées avec succès');
      return true;
    } catch (err: any) {
      console.error('[Wallet] ❌ Erreur lors de la consommation:', err);
      return false;
    }
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
        setApiError('Aucun choix de consultation sélectionné');
        setPaymentLoading(false);
        return;
      }

      try {
        console.log('[Consultation] 📝 Création de la consultation...');
        
        // 1. Créer la consultation
        const payload = {
          serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
          type: CONSULTATION_TYPE_MAP[selected.id] || 'AUTRE',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'pending_payment',
          requiredOfferings: selected.requiredOfferings,
        };

        const consultationRes = await api.post('/consultations', payload);

        if (consultationRes.status !== 200 && consultationRes.status !== 201) {
          throw new Error(consultationRes.data?.message || 'Erreur lors de la création de la consultation');
        }

        const consultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
        setCreatedConsultationId(consultationId);
        
        console.log('[Consultation] ✅ Consultation créée avec ID:', consultationId);

        // 2. Vérifier si l'utilisateur possède les offrandes requises
        const hasOfferings = await checkUserWalletOfferings(selected.requiredOfferings);

        if (hasOfferings) {
          console.log('[Wallet] 🎉 L\'utilisateur possède toutes les offrandes requises!');
          
          // 3. Consommer les offrandes du wallet
          const consumed = await consumeWalletOfferings(consultationId, selected.requiredOfferings);
          
          if (consumed) {
            // 4. Mettre à jour le statut de la consultation
            await api.patch(`/consultations/${consultationId}`, {
              status: 'paid',
              paymentMethod: 'wallet_offerings'
            });

            console.log('[Consultation] ✅ Statut mis à jour : paid');
            
            // 5. Redirection vers la page de génération d'analyse
            console.log('[Consultation] 🚀 Redirection vers /secured/genereanalyse');
            
            setTimeout(() => {
              router.push(`/secured/genereanalyse?id=${consultationId}`);
            }, 1000);
          } else {
            // Échec de la consommation, passer à l'étape des offrandes
            console.log('[Wallet] ⚠️ Échec de la consommation, redirection vers le marché');
            setPaymentLoading(false);
            setStep('offering');
          }
        } else {
          // L'utilisateur n'a pas les offrandes, passer à l'étape des offrandes
          console.log('[Wallet] 💰 Offrandes manquantes, redirection vers le marché');
          setPaymentLoading(false);
          setStep('offering');
        }

      } catch (err: any) {
        let errorMessage = 'Erreur lors de la création de la consultation';
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        console.error('[Consultation] ❌ Erreur:', err);
        setApiError(errorMessage);
        setPaymentLoading(false);
      }
    },
    [form, selected, router, checkUserWalletOfferings, consumeWalletOfferings]
  );

  const handleBackToForm = useCallback(() => {
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
      numeroSend: '0758385387',
    });
    setErrors({});
    setApiError(null);
    setStep('selection');
    setBackActivated(false);
    setCreatedConsultationId(null);
    setPaymentLoading(false);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-fuchsia-950/20">
      <div className="max-w-6xl mx-auto">
        {/* Header avec bouton retour */}
        {step !== 'success' && backActivated && step !== 'offering' && !paymentLoading && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={resetSelection}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
                     hover:text-gray-900 dark:hover:text-gray-100 
                     transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Retour</span>
          </motion.button>
        )}

        {/* Étape de sélection */}
        {step === 'selection' && (
          <ConsultationSelection onSelect={handleSelectConsultation} />
        )}

        {/* Workflow multi-étapes */}
        <AnimatePresence mode="wait">
          {/* Étape 1 : Formulaire */}
          {step === 'form' && selected && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ConsultationForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={resetSelection}
                selectedTitle={selected.title}
                // isLoading={paymentLoading}
              />
            </motion.div>
          )}

          {/* Étape 2 : Offrandes */}
          {step === 'offering' && selected && createdConsultationId && (
            <motion.div
              key="offering"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <OfferingStep
                selected={selected}
                consultationId={createdConsultationId}
                paymentLoading={paymentLoading}
                onBackToForm={handleBackToForm}
              />
            </motion.div>
          )}

          {/* Étape 3 : Traitement */}
          {paymentLoading && step === 'form' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <PaymentProcessing />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
