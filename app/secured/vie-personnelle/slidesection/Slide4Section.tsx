/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { CONSULTATION_CHOICES, CONSULTATION_TYPE_MAP } from './consultation.constants';
import type { ConsultationChoice, FormData, FormErrors, StepType } from './consultation.types';
import ConsultationForm from './ConsultationForm';
import ConsultationSelection from './ConsultationSelection';
import OfferingStep from './OfferingStep';
import PaymentProcessing from './PaymentProcessing';
import { useAuth } from '@/lib/auth/AuthContext';

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
  const { user } = useAuth();
  // États principaux
  const [selected, setSelected] = useState<ConsultationChoice | null>(CONSULTATION_CHOICES[0]);
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

  // États pour les offrandes
  const [requiredOfferingsDetails, setRequiredOfferingsDetails] = useState<RequiredOffering[]>([]);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  // =====================================================
  // HANDLERS FORMULAIRE
  // =====================================================
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
    console.log('[Consultation] 📋 Consultation sélectionnée:', choice);
    setSelected(choice);
    setBackActivated(true);
    setStep('form');
  }, []);

  // =====================================================
  // CHARGEMENT DES OFFRANDES DU WALLET
  // =====================================================
  const fetchWalletOfferings = useCallback(async () => {
    try {
      console.log('[Wallet] � Chargement des offrandes du wallet...');
      const response = await api.get(`/offering-stock/available?userId=${user?._id}`);
      console.log('[Wallet] 📦 Réponse des offrandes du wallet:', response);

      // L'API retourne directement un tableau dans response.data
      const offeringsData = Array.isArray(response.data) ? response.data : response.data?.offerings || [];
      
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
        console.log('[Wallet] ✅ Offrandes chargées:', offerings);
      } else {
        console.warn('[Wallet] ⚠️ Aucune offrande trouvée dans le wallet');
        setWalletOfferings([]);
      }
    } catch (err: any) {
      console.error('[Wallet] ❌ Erreur lors du chargement:', err);
      setWalletOfferings([]);
    }
  }, []);

  // =====================================================
  // ENRICHISSEMENT DES OFFRANDES REQUISES
  // =====================================================
  const enrichRequiredOfferings = useCallback(async () => {
    if (!selected?.requiredOfferings || selected.requiredOfferings.length === 0) {
      console.log('[Offerings] ℹ️ Aucune offrande requise à enrichir');
      setRequiredOfferingsDetails([]);
      return;
    }

    try {
      console.log('[Offerings] 🔄 Enrichissement des offrandes requises...');
      console.log('[Offerings] 📦 selected.requiredOfferings:', selected.requiredOfferings);

      // Récupérer les IDs des offrandes requises
      const offeringIds = selected.requiredOfferings.map((o: any) => o.offeringId);
      console.log('[Offerings] 🎯 IDs à enrichir:', offeringIds);

      // Charger les détails depuis l'API
      const response = await api.get('/offerings');

      if (response.status === 200 && response.data?.offerings) {
        const allOfferings = response.data.offerings;
        console.log('[Offerings] 📚 Toutes les offrandes disponibles:', allOfferings.length);

        // Filtrer et mapper les offrandes requises avec leurs détails
        const enriched: RequiredOffering[] = selected.requiredOfferings
          .map((req: any) => {
            const details = allOfferings.find((o: any) => o._id === req.offeringId);

            if (details) {
              console.log(`  ✅ Détails trouvés pour ${req.offeringId}:`, details.name);
              return {
                _id: details._id,
                name: details.name,
                price: details.price,
                icon: details.icon,
                category: details.category,
                quantity: req.quantity, // ✅ Inclure la quantité requise
              };
            }

            console.warn(`  ⚠️ Détails non trouvés pour ${req.offeringId}`);
            return null;
          })
          .filter((o): o is RequiredOffering => o !== null);

        console.log('[Offerings] ✅ Offrandes enrichies:', enriched);
        setRequiredOfferingsDetails(enriched);
      } else {
        console.warn('[Offerings] ⚠️ Impossible de charger les détails des offrandes');
        setRequiredOfferingsDetails([]);
      }
    } catch (err: any) {
      console.error('[Offerings] ❌ Erreur lors de l\'enrichissement:', err);
      setRequiredOfferingsDetails([]);
      setApiError('Impossible de charger les détails des offrandes requises.');
    }
  }, [selected]);

  // =====================================================
  // EFFET : Charger les offrandes quand on arrive à l'étape "offering"
  // =====================================================
  useEffect(() => {
    if (step === 'offering') {
      console.log('[Effect] 🎯 Étape "offering" atteinte, chargement des offrandes...');

      setLoadingOfferings(true);

      // Exécuter les deux chargements en parallèle
      Promise.all([
        fetchWalletOfferings(),
        enrichRequiredOfferings()
      ]).finally(() => {
        setLoadingOfferings(false);
      });
    }
  }, [step]); // ⚠️ CORRECTION : Ne dépendre que de 'step' pour éviter la boucle infinie

  // =====================================================
  // SOUMISSION DU FORMULAIRE
  // =====================================================
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
        console.log('[Consultation] 📋 Selected requiredOfferings:', selected.requiredOfferings);

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

        // 2. Passer à l'étape de sélection des offrandes
        setPaymentLoading(false);
        setStep('offering');

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
    [form, selected]
  );

  // =====================================================
  // VALIDATION DE LA SÉLECTION D'OFFRANDES
  // =====================================================
  const handleOfferingValidation = useCallback(
    async (selectedOfferingIds: string[]) => {
      if (!createdConsultationId || !selected) {
        setApiError('Consultation introuvable');
        return;
      }

      try {
        setPaymentLoading(true);
        console.log('[Offerings] ✅ Offrandes sélectionnées:', selectedOfferingIds);

        // Construire la liste des offrandes à consommer
        const offeringsToConsume = selectedOfferingIds.map((id) => {
          const required = selected.requiredOfferings.find((r: any) => r.offeringId === id);
          return {
            offeringId: id,
            quantity: required?.quantity || 1,
          };
        });

        console.log('[Wallet] 🔄 Consommation des offrandes:', offeringsToConsume);

        // 1. Consommer les offrandes du wallet (le backend attend userId + consultationId + offerings)
        if (!user?._id) {
          throw new Error('Utilisateur introuvable pour la consommation des offrandes');
        }

        const consumeRes = await api.post('/wallet/consume-offerings', {
          userId: user._id,
          consultationId: createdConsultationId,
          offerings: offeringsToConsume,
        });

        console.log('[Wallet] ↩️ Réponse consommation:', consumeRes.status, consumeRes.data);

        if (consumeRes.status !== 200 && consumeRes.status !== 201) {
          throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation des offrandes');
        }

        console.log('[Wallet] ✅ Offrandes consommées avec succès');

        // 2. Mettre à jour le statut de la consultation
        await api.patch(`/consultations/${createdConsultationId}`, {
          status: 'paid',
          paymentMethod: 'wallet_offerings',
        });

        console.log('[Consultation] ✅ Statut mis à jour : paid');

        // 3. Redirection vers la page de génération d'analyse
        setTimeout(() => {
          console.log('[Consultation] 🚀 Redirection vers /secured/genereanalyse');
          router.push(`/secured/genereanalyse?id=${createdConsultationId}`);
        }, 1000);

      } catch (err: any) {
        console.error('[Offerings] ❌ Erreur lors de la validation:', err);

        let errorMessage = 'Erreur lors de la validation des offrandes';
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }

        setApiError(errorMessage);
        setPaymentLoading(false);
      }
    },
    [createdConsultationId, selected, router]
  );

  // =====================================================
  // NAVIGATION
  // =====================================================
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
    setRequiredOfferingsDetails([]);
    setWalletOfferings([]);
  }, []);

  // =====================================================
  // DEBUG : Afficher les états actuels
  // =====================================================
  useEffect(() => {
    console.log('[DEBUG] 🔍 État actuel:', {
      step,
      selectedTitle: selected?.title,
      requiredOfferingsCount: selected?.requiredOfferings?.length || 0,
      enrichedCount: requiredOfferingsDetails.length,
      walletCount: walletOfferings.length,
      loadingOfferings,
    });
  }, [step, selected, requiredOfferingsDetails, walletOfferings, loadingOfferings]);

  // =====================================================
  // RENDER
  // =====================================================
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
          {step === 'form' && selected && !paymentLoading && (
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
              />
            </motion.div>
          )}

          {/* Étape 2 : Sélection des offrandes */}
          {step === 'offering' && !paymentLoading && (
            <motion.div
              key="offering"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {loadingOfferings ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 mx-auto mb-4 rounded-full border-4 
                               border-purple-200 dark:border-purple-800 
                               border-t-purple-600 dark:border-t-purple-400"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Chargement de vos offrandes...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Vérification de votre wallet et des offrandes requises
                    </p>
                  </div>
                </div>
              ) : (
                <OfferingStep
                  requiredOfferings={requiredOfferingsDetails}
                  walletOfferings={walletOfferings}
                  onNext={handleOfferingValidation}
                  onBack={handleBackToForm}
                />
              )}
            </motion.div>
          )}

          {/* Étape 3 : Traitement du paiement */}
          {paymentLoading && (
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

        {/* Message d'erreur API global */}
        {apiError && step === 'offering' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                     rounded-xl text-sm text-red-600 dark:text-red-400"
          >
            {apiError}
          </motion.div>
        )}
      </div>
    </div>
  );
}
