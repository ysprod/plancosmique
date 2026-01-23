import { api } from '@/lib/api/client';
import { getChoicesWithCount } from "@/lib/api/services/rubrique.service";
import { mapFormDataToBackend } from '@/lib/functions';
import type { CategorieAdmin, ConsultationChoice, Rubrique, User } from '@/lib/interfaces';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useCategoryFormClient(category: CategorieAdmin) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const consultationId = searchParams?.get("consultationId") ?? "";
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [rubriqueCourante, setRubriqueCourante] = useState<Rubrique | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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

    const getSelectedChoiceId = () => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('selectedChoiceId') || '';
        }
        return '';
    };

    useEffect(() => {
        let isMounted = true;
        const fetchUser = async () => {
            try {
                const userRes = await api.get('/users/me');
                if (!isMounted) return;
                setUserData(userRes.data);
            } catch (error) {
                if (!isMounted) return;
                setUserData(null);
            }
        };
        fetchUser();
        return () => { isMounted = false; };
    }, []);

    const fetchChoices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getChoicesWithCount(consultationId, userData?._id!);
            setRubriqueCourante(result);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    }, [consultationId, userData?._id!]);

    useEffect(() => {
        if (consultationId && userData?._id!) {
            fetchChoices();
        }
    }, [consultationId, userData?._id!, fetchChoices]);

    const selectedChoiceId = getSelectedChoiceId();
    const selectedChoice = rubriqueCourante?.consultationChoices.find((c: ConsultationChoice) => c._id === selectedChoiceId);
    const needsForm = selectedChoice?.participants === 'AVEC_TIERS';
    const contextInfo = { rubrique: rubriqueCourante, choix: selectedChoice };

    const createConsultationWithUserData = useCallback(async (choix: ConsultationChoice, currentUser: User, selectedChoiceId: string) => {
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
    }, [category, router, rubriqueCourante, selectedChoice, selectedChoiceId, error]);

    useEffect(() => {
        let isMounted = true;
        if (!rubriqueCourante) {
            setLoading(true);
            return;
        }
        const fetchUser = async () => {
            try {
                if (!isMounted) return;
                if (!needsForm && userData) {
                    if (!selectedChoice) {
                        setApiError('Aucun choix de consultation sélectionné.');
                        setShowErrorToast(true);
                        setLoading(false);
                        return;
                    }
                    await createConsultationWithUserData(selectedChoice, userData, selectedChoiceId!);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                if (!isMounted) return;
                setApiError('Erreur lors du chargement des données');
                setShowErrorToast(true);
                setLoading(false);
            }
        };
        fetchUser();
        return () => { isMounted = false; };
    }, [rubriqueCourante, needsForm, selectedChoice, selectedChoiceId, createConsultationWithUserData]);

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
        setLoading(true);
        setApiError(null);
        try {
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
    }, [form, validateForm, category, userData, router, selectedChoice]);

    const handleReset = useCallback(() => {
        router.push(`/secured/category/${category._id}/selection`);
    }, [category._id, router]);

    const handleCloseError = useCallback(() => {
        setShowErrorToast(false);
    }, []);

    return {
        rubriqueCourante, loading, apiError, showErrorToast, contextInfo, error,
        needsForm, userData, form, errors, selectedChoiceId, selectedChoice,
        handleChange, handleSubmit, handleReset, handleCloseError,
    };
}