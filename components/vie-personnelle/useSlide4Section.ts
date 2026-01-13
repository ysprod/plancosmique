import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { useAuth } from '@/lib/auth/AuthContext';
import { mapFormDataToBackend } from '@/lib/functions';
import { ConsultationChoice, ConsultationData, DoneChoice, OfferingAlternative, Rubrique, User, WalletOffering } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm' | 'consulter' | 'genereanalyse';

export interface Slide4SectionMainProps {
  step: StepType;
  paymentLoading: boolean;
  choices: ConsultationChoice[];
  alreadyDoneChoices: DoneChoice[];
  handleSelectConsultation: (choice: ConsultationChoice) => Promise<void>;
  consultationId: string | null;
  consultation: any;
  walletOfferings: WalletOffering[];
  handleOfferingValidation: (selectedAlternative: OfferingAlternative) => Promise<void>;
  handleBack: () => void;
  apiError: string | null;
  showErrorToast: boolean;
  handleCloseError: () => void;
  // Props pour ConsultationForm (AVEC_TIERS)
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetSelection: () => void;
}

export function useSlide4Section(rubrique: Rubrique) {
  // Pour stocker le choix sélectionné nécessitant un formulaire AVEC_TIERS
  const [pendingChoice, setPendingChoice] = useState<ConsultationChoice | null>(null);
  const [formData, setFormData] = useState<any>({
    nom: '',
    prenoms: '',
    dateNaissance: '',
    villeNaissance: '',
    heureNaissance: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const router = useRouter();
  const { user } = useAuth();

  const [alreadyDoneChoices, setAlreadyDoneChoices] = useState<DoneChoice[]>([]);
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [consultation, setConsultation] = useState<any>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const choicesFetchedRef = useRef(false);
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (user?._id) {
        try {
          const res = await api.get(`/users/me`);
          setUserData(res.data);
        } catch (err) {
          console.error('Erreur chargement utilisateur:', err);
          setUserData(null);
        } finally {
          console.warn('User data fetch attempt finished.');
        }
      } else {
        setUserData(null);
      }
    }
    fetchUser();
  }, [user?._id]);

  useEffect(() => {
    async function fetchChoicesAndDone() {
      if (choicesFetchedRef.current) return;
      choicesFetchedRef.current = true;
      try {
        const rubriqueData = await getRubriqueById(rubrique?._id || '');
        const arr = rubriqueData.consultationChoices || [];
        setChoices(arr);
      } catch (err) {
        console.error('[Choices] ❌', err);
      } finally {
        setLoading(false);
      }
      if (user?._id) {
        try {
          const res = await api.get(`/user-consultation-choices?userId=${user._id}`);
          if (Array.isArray(res.data)) {
            setAlreadyDoneChoices(res.data);
          } else {
            setAlreadyDoneChoices([]);
          }
        } catch (err) {
          console.error('[AlreadyDoneChoices] ❌', err);
          setAlreadyDoneChoices([]);
        }
      }
    }
    fetchChoicesAndDone();
  }, [user?._id, rubrique?._id]);

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

  const showErrorToast = useMemo(() => !!apiError && step === 'selection', [apiError, step]);

  const handleSelectConsultation = useCallback(async (choice: ConsultationChoice) => {
    setApiError(null);
    setPaymentLoading(true);
    if (alreadyDoneChoices.some(dc => dc.choiceId === choice._id)) {
      setApiError("Une analyse existe déjà pour ce choix de consultation. Vous ne pouvez effectuer cette analyse qu'une seule fois.");
      setPaymentLoading(false);
      return;
    }
    if (!userData) {
      setApiError("Chargement des données utilisateur en cours, veuillez patienter.");
      setPaymentLoading(false);
      return;
    }
    if (choice.participants === 'AVEC_TIERS') {
      setPendingChoice(choice);
      setStep('form');
      setPaymentLoading(false);
      return;
    }
    // Cas normal (pas de formulaire tiers)
    try {
      const mappedFormData = mapFormDataToBackend(userData);
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: rubrique?.typeconsultation,
        title: choice.title,
        formData: mappedFormData,
        description: choice.description,
        status: 'PENDING',
        alternatives: choice.offering.alternatives,
        choice,
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
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Erreur lors de la création de la consultation';
      setApiError(errorMessage);
      setPaymentLoading(false);
    }
  }, [userData]);

  // Gestion du formulaire AVEC_TIERS
  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setPaymentLoading(true);

    // Vérifications préalables
    if (!formData) {
      setApiError('Données du formulaire manquantes');
      setPaymentLoading(false);
      return;
    }

    if (!userData) {
      setApiError('Chargement des données utilisateur en cours, veuillez patienter.');
      setPaymentLoading(false);
      return;
    }

    if (!pendingChoice) {
      setApiError('Aucun choix sélectionné');
      setPaymentLoading(false);
      return;
    }

    console.log('Submitting form data:', formData);

    // Validation simple (à adapter selon besoins)
    const errors: any = {};
    ['nom', 'prenoms', 'dateNaissance', 'villeNaissance', 'heureNaissance'].forEach(field => {
      if (!formData[field]) errors[field] = 'Champ requis';
    });
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setPaymentLoading(false);
      return;
    }

    try {
      const mappedFormData = mapFormDataToBackend(userData);
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: rubrique?.typeconsultation,
        title: pendingChoice.title,
        formData: mappedFormData,
        tierce: formData,
        description: pendingChoice.description,
        status: 'PENDING',
        alternatives: pendingChoice.offering.alternatives,
        choice: pendingChoice,
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
      setPendingChoice(null);
    } catch (err: any) {
      console.error('[Form AVEC_TIERS] ❌ Erreur:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Erreur lors de la création de la consultation';
      setApiError(errorMessage);
      setPaymentLoading(false);
    }
  }, [formData, pendingChoice, rubrique?.typeconsultation]);

  const handleCloseError = useCallback(() => {
    setApiError(null);
  }, []);

  return {
    step,
    paymentLoading,
    choices,
    alreadyDoneChoices,
    handleSelectConsultation,
    consultationId,
    consultation,
    walletOfferings,
    handleOfferingValidation,
    handleBack,
    apiError,
    showErrorToast,
    handleCloseError,
    // Props explicites pour ConsultationForm (AVEC_TIERS)
    form: formData,
    errors: formErrors,
    handleChange: handleFormChange,
    handleSubmit: handleFormSubmit,
    resetSelection: handleBack,
  };
}
