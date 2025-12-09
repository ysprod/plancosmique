"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import ConsultationForm from './ConsultationForm';
import ConsultationSelection from './ConsultationSelection';
import OfferingPage from './OfferingPage';
import PaymentProcessing from './PaymentProcessing';
import { CONSULTATION_TYPE_MAP } from './consultation.constants';
import { CONSULTATION_OFFERINGS } from './offrandes.constants';

import type { ConsultationChoice, FormData, FormErrors, StepType } from './consultation.types';

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

  // 1. Soumission du formulaire => passage direct à l'offrande
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError(null);

      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!selected) {
        setApiError('Aucun choix de consultation sélectionné');
        return;
      }

      // Passer directement à l'offrande (pas de traitement ici)
      setStep('offering');
    },
    [form, selected]
  );

  // 2. Confirmation de l'offrande => Initiation du paiement MoneyFusion
  const handleOfferingConfirm = useCallback(async () => {
    if (!selected) return;

    setPaymentLoading(true);
    setStep('processing');

    try {
      // 1. Créer la consultation EN ATTENTE DE PAIEMENT
      const payload = {
        serviceId: SERVICE_ID,
        type: CONSULTATION_TYPE_MAP[selected.id] || 'AUTRE',
        title: selected.title,
        description: selected.description,
        formData: form,
        status: 'pending_payment',
      };

      const consultationRes = await api.post('/consultations', payload);

      if (consultationRes.status !== 200 && consultationRes.status !== 201) {
        throw new Error(consultationRes.data?.message || 'Erreur lors de la création de la consultation');
      }

      const createdConsultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
      console.log('✅ Consultation créée avec ID:', createdConsultationId);

      // 2. Préparer les données pour MoneyFusion
      const offeringType = CONSULTATION_TYPE_MAP[selected.id];
      const offering = CONSULTATION_OFFERINGS[offeringType];
      const paymentData = {
        totalPrice: offering.amount,
        article: [{ consultation: offering.amount }],
        personal_Info: [{
          consultationId: createdConsultationId,
          type: CONSULTATION_TYPE_MAP[selected.id],
          formData: form,
        }],
        numeroSend: form.numeroSend || '0758385387',
        nomclient: `${form.prenoms} ${form.nom}`,
        return_url: `https://www.monetoile.org/callback?consultation_id=${createdConsultationId}`,
        webhook_url: `https://www.monetoile.org/api/webhooks/moneyfusion`,
      };

      // 3. Appeler MoneyFusion     
      
      const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
      const response = await axios.post(apiUrl, paymentData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log('✅ Réponse MoneyFusion:', response.data);

      if (response.data?.statut && response.data?.url) {
        // Sauvegarder le type d'offrande avant redirection
        const savedOfferingType = CONSULTATION_TYPE_MAP[selected.id];
        localStorage.setItem('consultation_offering_type', savedOfferingType);
        
        // 4. Redirection vers la page de paiement
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 1000);
      } else {
        throw new Error(response.data?.message || 'Erreur lors de l\'initiation du paiement');
      }

    } catch (err: any) {
      let errorMessage = 'Erreur lors du paiement';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error('[Paiement] Erreur:', errorMessage);
      setApiError(errorMessage);
      setPaymentLoading(false);
      setStep('offering');
    }
  }, [form, selected]);

  // Retour au formulaire depuis l'offrande
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
      numeroSend: '',
    });
    setErrors({});
    setApiError(null);
    setStep('selection');
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

          {/* Étape 2 : Offrande */}
          {step === 'offering' && selected && (
            <OfferingPage
              consultationType={selected.id}
              onConfirm={handleOfferingConfirm}
              loading={paymentLoading}
              onBack={handleBackToForm}
            />
          )}

       
          {step === 'processing' && <PaymentProcessing />}
        </AnimatePresence>
      </div>
    </div>
  );
}
