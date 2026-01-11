import { useAuth } from '@/lib/auth/AuthContext';
import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConsultationChoice, FormData, FormErrors, OfferingAlternative, StepType, WalletOffering, ConsultationData } from '@/lib/interfaces';

export type ExtendedStepType = StepType | 'gold';

const RUBRIQUE_ID = '694acf59bd12675f59e7a7f2';
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const DEFAULT_PHONE = '0758385387';

const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!form.nom.trim()) errors.nom = 'Nom requis';
  if (!form.prenoms.trim()) errors.prenoms = 'Prénoms requis';
  if (!form.dateNaissance) errors.dateNaissance = 'Date de naissance requise';
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

export function useSlide4Section() {
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
      .catch(() => { })
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
        const payload = {
          serviceId: SERVICE_ID,
          type: 'CINQ_ETOILES',
          title: selected.title,
          description: selected.description,
          formData: form,
          status: 'COMPLETED',
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

  return {
    user,
    selected,
    setSelected,
    form,
    setForm,
    errors,
    setErrors,
    apiError,
    setApiError,
    step,
    setStep,
    consultationId,
    setConsultationId,
    paymentLoading,
    setPaymentLoading,
    walletOfferings,
    setWalletOfferings,
    consultation,
    setConsultation,
    choices,
    setChoices,
    loading,
    setLoading,
    showBackButton,
    handleChange,
    handleSelect,
    resetSelection,
    handleSubmit,
  };
}
