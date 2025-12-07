/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import ConsultationForm from './ConsultationForm';
import ConsultationSelection from './ConsultationSelection';
import PaymentProcessing from './PaymentProcessing';
import PaymentSuccess from './PaymentSuccess';
import PriceConfirm from './PriceConfirm';
import { CONSULTATION_TYPE_MAP } from './consultation.constants';

import type { ConsultationChoice, FormData, FormErrors, StepType } from './consultation.types';
import axios from 'axios';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;

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
  const [selected, setSelected] = useState<ConsultationChoice | null>(null);
  const [form, setForm] = useState<FormData>({
    nom: '',
    prenoms: '',
    genre: '',
    dateNaissance: '',
    paysNaissance: '',
    villeNaissance: '',
    heureNaissance: '',
    numeroSend: '0758385387', // valeur par défaut
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [backActivated, setBackActivated] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);

  // Vérifier le statut du paiement au retour depuis MoneyFusion
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');

    if (paymentStatus === 'success' && transactionId) {
      // Paiement réussi
      setStep('success');

      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'failed') {
      // Paiement échoué
      setPaymentError('Le paiement a échoué. Veuillez réessayer.');
      setStep('confirm');
    }
  }, []);

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
      setPaymentError(null);
    },
    [errors]
  );


  const handleSelectConsultation = useCallback((choice: ConsultationChoice) => {
    setSelected(choice);
    setBackActivated(true);
    setStep('form');
  }, []);

  // 1. Soumission du formulaire => génération de l'analyse
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError(null);
      setPaymentError(null);

      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!selected) {
        setApiError('Aucun choix de consultation sélectionné');
        return;
      }

      // Lancer la génération de l'analyse IMMÉDIATEMENT après validation
      setPaymentLoading(true);
      setStep('processing'); // Afficher l'écran de génération

      try {
        // 1. Créer la consultation
        const payload = {
          serviceId: SERVICE_ID,
          type: CONSULTATION_TYPE_MAP[selected.id] || 'AUTRE',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'generating_analysis',
        };

        const consultationRes = await api.post('/consultations', payload);

        if (consultationRes.status !== 200 && consultationRes.status !== 201) {
          throw new Error(consultationRes.data?.message || 'Erreur lors de la création de la consultation');
        }

        const createdConsultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
        setConsultationId(createdConsultationId);

        // 2. Générer l'analyse
        const analysisResponse = await fetch(`/api/consultations/${createdConsultationId}/generate-analysis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthData: {
              nom: form.nom,
              prenoms: form.prenoms,
              genre: form.genre,
              dateNaissance: form.dateNaissance,
              heureNaissance: form.heureNaissance,
              paysNaissance: form.paysNaissance,
              villeNaissance: form.villeNaissance,
              email: form.email,
            },
          }),
        });

        const analysisData = await analysisResponse.json();

        if (!analysisData.success) {
          const errorMsg = analysisData.error || 'Erreur lors de la génération de l\'analyse';
          
          if (errorMsg.includes('Crédit DeepSeek épuisé') || errorMsg.includes('INSUFFICIENT_BALANCE')) {
            throw new Error('Le service d\'analyse astrologique est temporairement indisponible (crédit API épuisé). Veuillez contacter le support.');
          }
          
          throw new Error(errorMsg);
        }

        console.log('✅ Analyse générée avec succès:', analysisData);

        // Sauvegarder l'analyse dans localStorage côté client
        if (analysisData.analyse) {
          localStorage.setItem(
            `astro_analysis_${createdConsultationId}`,
            JSON.stringify(analysisData.analyse)
          );
          localStorage.setItem(
            `astro_status_${createdConsultationId}`,
            JSON.stringify({
              consultationId: createdConsultationId,
              statut: 'completed',
              progression: 100,
              etapeCourante: 'Analyse complète',
              dateFin: new Date().toISOString(),
            })
          );
          console.log('💾 Analyse sauvegardée dans localStorage');
        }

        // 3. Analyse prête, passer à la confirmation du prix
        setPaymentLoading(false);
        setStep('confirm');

      } catch (err: any) {
        let errorMessage = 'Erreur lors de la génération';
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }

        console.error('[Génération] Erreur:', errorMessage);
        setApiError(errorMessage);
        setPaymentLoading(false);
        setStep('form'); // Retour au formulaire en cas d'erreur
      }
    },
    [form, selected]
  );

  // 2. Confirmation du prix => paiement (l'analyse est déjà prête)
  const handlePay = useCallback(async () => {
    if (!selected || !consultationId) return;

    setPaymentLoading(true);
    setPaymentError(null);
    setStep('processing'); // Afficher "Redirection vers le paiement..."

    try {
      // L'analyse a déjà été générée, procéder directement au paiement
      const paymentData = {
        totalPrice: 200,
        article: [{ consultation: 200 }],
        personal_Info: [{
          consultationId: consultationId,
          type: 'CONSULTATION',
          formData: form,
        }],
        numeroSend: form.numeroSend || '0758385387',
        nomclient: `${form.prenoms} ${form.nom}`,
        return_url: `${window.location.origin}/callback?consultation_id=${consultationId}`,
        webhook_url: `${window.location.origin}/api/webhooks/moneyfusion`,
      };

      const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
      const response = await axios.post(apiUrl, paymentData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log('Résultat du paiement MoneyFusion:', response);

      if (response.data?.statut && response.data?.url) {
        // Paiement initié avec succès - l'analyse est déjà prête
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 1500);
      } else {
        throw new Error(response.data?.message || 'Erreur lors de la création du paiement');
      }
    } catch (err: any) {
      let apiErrorMsg = 'Erreur lors du traitement';
      if (err.response?.data?.message) {
        apiErrorMsg = `API: ${err.response.data.message}`;
      } else if (err.message) {
        apiErrorMsg = `JS: ${err.message}`;
      } else if (typeof err === 'string') {
        apiErrorMsg = `Erreur: ${err}`;
      } else if (err instanceof Error) {
        apiErrorMsg = `Exception: ${err.toString()}`;
      }
      setPaymentError(apiErrorMsg);
      setStep('confirm'); // Retour à l'étape de confirmation
      // Optionnel : log complet pour debug
      console.error('Erreur paiement:', err);
    } finally {
      setPaymentLoading(false);
    }
  }, [form, selected, consultationId]);

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
      numeroSend: '',
    });
    setErrors({});
    setApiError(null);
    setPaymentError(null);
    setStep('selection');
    setConsultationId(null);
  }, []);

  const handleBackToForm = useCallback(() => {
    setStep('form');
    setPaymentError(null);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header avec bouton retour */}
        {step !== 'success' && backActivated && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={resetSelection}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Retour</span>
          </motion.button>
        )}

        {/* Étape de sélection de la consultation */}
        {step === 'selection' && (
          <ConsultationSelection onSelect={handleSelectConsultation} />
        )}

        {/* Workflow multi-étapes */}
        <AnimatePresence mode="wait">
          {/* Étape 1 : Formulaire */}
          {step === 'form' && selected && (
            <ConsultationForm
              form={form}
              errors={errors}
              handleChange={handleChange}
              apiError={apiError}
              handleSubmit={handleSubmit}
              resetSelection={resetSelection}
              selectedTitle={selected.title}
            />
          )}

          {/* Étape 2 : Confirmation du prix */}
          {step === 'confirm' && (
            <PriceConfirm
              handlePay={handlePay}
              paymentLoading={paymentLoading}
              paymentError={paymentError || undefined}
              onBack={handleBackToForm}
            />
          )}

          {/* Étape 3 : Traitement du paiement (redirection) */}
          {step === 'processing' && <PaymentProcessing />}

          {/* Étape 4 : Succès (UNIQUEMENT APRÈS PAIEMENT RÉUSSI) */}
          {step === 'success' && (
            <PaymentSuccess
              consultationId={consultationId!}
              resetSelection={resetSelection}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
