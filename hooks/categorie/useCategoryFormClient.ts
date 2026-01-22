import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { mapFormDataToBackend } from '@/lib/functions';
import type { CategorieAdmin, Rubrique, User } from '@/lib/interfaces';
import { useCategoryClientViewChoix } from '@/components/categorie/clientviewchoix/useCategoryClientViewChoix';

export function useCategoryFormClient(category: CategorieAdmin) {
  const { stats, rubriqueCourante, handleSelectConsultation, handleBack } = useCategoryClientViewChoix({ category });
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [contextInfo, setContextInfo] = useState<{ rubrique?: Rubrique; choix?: any }>({});
  const [needsForm, setNeedsForm] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [form, setForm] = useState({
    nom: '',
    prenoms: '',
    gender: '',
    dateNaissance: '',
    heureNaissance: '',
    villeNaissance: '',
    paysNaissance: '',
    question: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
    const rubriqueId = sessionStorage.getItem('rubriqueId');
    if (!selectedChoiceId) {
      router.push(`/secured/category/${category._id}/selection`);
      return;
    }
    const initializeData = async () => {
      try {
        setLoading(true);
        // DEBUG LOGS
        console.debug('[CategoryFormClient] selectedChoiceId:', selectedChoiceId);
        console.debug('[CategoryFormClient] rubriqueCourante:', rubriqueCourante);
        console.debug('[CategoryFormClient] consultationChoices:', rubriqueCourante?.consultationChoices?.map((c: any) => c._id));
        const choix = rubriqueCourante?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
        console.debug('[CategoryFormClient] choix trouvé:', choix);
        setContextInfo({ rubrique: rubriqueCourante!, choix });
        const userRes = await api.get('/users/me');
        const currentUser = userRes.data;
        setUserData(currentUser);
        const requiresForm = choix?.participants === 'AVEC_TIERS';
        setNeedsForm(requiresForm);
        if (!requiresForm && currentUser) {
          if (!choix) {
            setApiError('Aucun choix de consultation sélectionné.');
            setShowErrorToast(true);
            setLoading(false);
            return;
          }
          await createConsultationWithUserData(choix, currentUser, selectedChoiceId);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setApiError('Erreur lors du chargement des données');
        setShowErrorToast(true);
        setLoading(false);
      }
    };
    initializeData();
  }, [category._id, router, rubriqueCourante]);

  const createConsultationWithUserData = useCallback(async (choix: any, currentUser: User, selectedChoiceId: string) => {
    try {
      if (!choix) throw new Error('Aucun choix de consultation sélectionné.');
      const mappedFormData = mapFormDataToBackend(currentUser);
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: category?.typeconsultation,
        title: choix?.title || 'Consultation',
        formData: mappedFormData,
        description: choix?.description || '',
        status: 'PENDING',
        alternatives: choix?.offering?.alternatives || [],
        choice: choix,
      };
      const response = await api.post('/consultations', payload);
      const id = response.data?.id || response.data?.consultationId || response.data?._id;
      if (id) {
        sessionStorage.removeItem('selectedChoiceId');
        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
      } else {
        throw new Error('ID de consultation manquant');
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || error.message || 'Erreur lors de la création');
      setShowErrorToast(true);
      setLoading(false);
    }
  }, [category, router, rubriqueCourante]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!form.prenoms.trim()) newErrors.prenoms = 'Le prénom est requis';
    if (!form.gender) newErrors.gender = 'Le genre est requis';
    if (!form.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise';
    if (!form.heureNaissance) newErrors.heureNaissance = "L'heure de naissance est requise";
    if (!form.villeNaissance.trim()) newErrors.villeNaissance = 'La ville de naissance est requise';
    if (!form.paysNaissance.trim()) newErrors.paysNaissance = 'Le pays de naissance est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setApiError('Veuillez remplir tous les champs requis');
      setShowErrorToast(true);
      return;
    }
    const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
    if (!selectedChoiceId) {
      setApiError('Aucun choix sélectionné');
      setShowErrorToast(true);
      return;
    }
    if (!userData) {
      setApiError('Chargement des données utilisateur en cours, veuillez patienter.');
      setShowErrorToast(true);
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      const rubriqueId = sessionStorage.getItem('rubriqueId');
      const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
      const selectedChoice = rubrique?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
      if (!selectedChoice) {
        throw new Error('Choix de consultation introuvable');
      }
      const mappedFormData = mapFormDataToBackend(userData);
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: category?.typeconsultation,
        title: selectedChoice.title || 'Consultation',
        formData: mappedFormData,
        tierce: form,
        description: selectedChoice.description || '',
        status: 'PENDING',
        alternatives: selectedChoice.offering?.alternatives || [],
        choice: selectedChoice,
      };
      const response = await api.post('/consultations', payload);
      const id = response.data?.id || response.data?.consultationId || response.data?._id;
      if (id) {
        sessionStorage.removeItem('selectedChoiceId');
        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
      } else {
        throw new Error('ID de consultation manquant dans la réponse');
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || error.message || 'Erreur lors de la création de la consultation');
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  }, [form, validateForm, category, userData, router]);

  const handleReset = useCallback(() => {
    router.push(`/secured/category/${category._id}/selection`);
  }, [category._id, router]);

  const handleCloseError = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  return {
    stats,
    rubriqueCourante,
    handleSelectConsultation,
    handleBack,
    loading,
    apiError,
    showErrorToast,
    contextInfo,
    needsForm,
    userData,
    form,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    handleCloseError,
  };
}
