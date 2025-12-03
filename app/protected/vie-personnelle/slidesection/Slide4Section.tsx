/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { birthCountries } from '../birthCountries';
import ConsultationCard from './ConsultationCard';
import ConsultationForm from './ConsultationForm';
import PaymentSuccess from './PaymentSuccess';
import PriceConfirm from './PriceConfirm';
import { CONSULTATION_CHOICES, CONSULTATION_TYPE_MAP } from './consultation.constants';

// Types
interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
}

interface FormData {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  paysNaissance: string;
  villeNaissance: string;
  heureNaissance: string;
  numeroSend?: string;
}

interface FormErrors {
  [key: string]: string;
}

type StepType = 'selection' | 'form' | 'confirm' | 'processing' | 'success';

// Constantes
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const PAYMENT_BASE_URL = 'https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/';

// Validation
const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!form.nom.trim()) errors.nom = 'Nom requis';
  if (!form.prenoms.trim()) errors.prenoms = 'Prénoms requis';
  if (!form.genre) errors.genre = 'Genre requis';
  if (!form.dateNaissance) errors.dateNaissance = 'Date de naissance requise';
  if (!form.paysNaissance) errors.paysNaissance = 'Pays de naissance requis';
  if (!form.villeNaissance.trim()) errors.villeNaissance = 'Ville de naissance requise';
  if (!form.heureNaissance) errors.heureNaissance = 'Heure de naissance requise';
  if (!form.numeroSend?.trim()) errors.numeroSend = 'Numéro de téléphone requis pour le paiement';

  return errors;
};

// Composant principal
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
    numeroSend: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);

  const countryOptions = useMemo(() => ['', ...birthCountries], []);

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

  const handleNumeroChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, numeroSend: e.target.value }));
      if (errors.numeroSend) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.numeroSend;
          return newErrors;
        });
      }
      setPaymentError(null);
    },
    [errors]
  );

  const handleSelectConsultation = useCallback((choice: ConsultationChoice) => {
    setSelected(choice);
    setStep('form');
  }, []);

  // 1. Soumission du formulaire => étape de confirmation du prix
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
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

      setStep('confirm');
    },
    [form, selected]
  );

  // 2. Création de la consultation et déclenchement du paiement
  const handlePay = useCallback(async () => {
    if (!selected) return;

    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // 1. Créer la consultation dans la base de données
      const payload = {
        serviceId: SERVICE_ID,
        type: CONSULTATION_TYPE_MAP[selected.id] || 'AUTRE',
        title: selected.title,
        description: selected.description,
        formData: form,
        status: 'pending_payment', // Statut en attente de paiement
      };

      const consultationRes = await api.post('/consultations', payload);

      if (consultationRes.status !== 200 && consultationRes.status !== 201) {
        throw new Error(consultationRes.data?.message || 'Erreur lors de la création de la consultation');
      }

      const createdConsultationId = consultationRes.data?.id || consultationRes.data?.consultationId;
      setConsultationId(createdConsultationId);

      // 2. Préparer les données de paiement MoneyFusion
      const paymentData = {
        totalPrice: 200, // À adapter selon le type de consultation
        article: [{ consultation: 200 }],
        personal_Info: [
          {
            nom: form.nom,
            prenoms: form.prenoms,
            consultationId: createdConsultationId, // Lier le paiement à la consultation
          },
        ],
        numeroSend: form.numeroSend || '',
        nomclient: `${form.prenoms} ${form.nom}`,
        return_url: `${window.location.origin}/callback?consultation_id=${createdConsultationId}`,
        webhook_url: `${window.location.origin}/api/webhooks/moneyfusion`,
      };

      // 3. Initier le paiement MoneyFusion
      const paymentResponse = await fetch(PAYMENT_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const paymentResult = await paymentResponse.json();

      if (paymentResult?.statut && paymentResult?.url) {
        // Paiement initié avec succès
        setStep('processing');

        // Redirection vers la page de paiement
        setTimeout(() => {
          window.location.href = paymentResult.url;
        }, 1500);
      } else {
        throw new Error(paymentResult?.message || 'Erreur lors de la création du paiement');
      }
    } catch (err: any) {
      console.error('Erreur paiement:', err);
      setPaymentError(
        err.response?.data?.message || err.message || 'Erreur lors du traitement du paiement'
      );
      setStep('confirm'); // Retour à l'étape de confirmation
    } finally {
      setPaymentLoading(false);
    }
  }, [form, selected]);

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
        {step !== 'success' && (
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

        {/* Titre principal */}
        {step === 'selection' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-3">
              Souhaite-tu vraiment une consultation sur
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Votre Vie Personnelle ?
            </h1>
          </motion.div>
        )}

        {/* Liste des choix de consultation */}
        {step === 'selection' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
          >
            {CONSULTATION_CHOICES.map((choice) => (
              <ConsultationCard
                key={choice.id}
                choice={choice}
                onSelect={() => handleSelectConsultation(choice)}
              />
            ))}
          </motion.div>
        )}

        {/* Workflow multi-étapes */}
        <AnimatePresence mode="wait">
          {/* Étape 1 : Formulaire */}
          {step === 'form' && selected && (
            <ConsultationForm
              form={form}
              errors={errors}
              handleChange={handleChange}
              handleNumeroChange={handleNumeroChange}
              apiError={apiError}
              paymentError={paymentError || undefined}
              handleSubmit={handleSubmit}
              resetSelection={resetSelection}
              countryOptions={countryOptions}
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
          {step === 'processing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center py-20"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Redirection en cours...
                </h3>
                <p className="text-gray-600">
                  Vous allez être redirigé vers la page de paiement sécurisée.
                </p>
              </div>
            </motion.div>
          )}

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
