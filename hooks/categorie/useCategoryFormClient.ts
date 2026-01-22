import { useChoicesWithCount } from "@/hooks/categorie/useChoicesWithCount";
import { api } from '@/lib/api/client';
import { useAuth } from "@/lib/auth/AuthContext";
import { mapFormDataToBackend } from '@/lib/functions';
import type { CategorieAdmin, ConsultationChoice, Rubrique, User } from '@/lib/interfaces';
import { useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useCategoryFormClient(category: CategorieAdmin) {
    const router = useRouter();
    const { user } = useAuth();
    const reduceMotion = useReducedMotion();
    const searchParams = useSearchParams();
    const consultationId = searchParams?.get("consultationId") ?? "";
    const userId = user?._id ?? "";
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
    const { data: rubriqueCourante, error } = useChoicesWithCount(consultationId, userId) as {
        data: Rubrique | null;
        loading: boolean;
        error: string | null;
        refetch: () => Promise<void>;
    };

    // Index O(1) pour trouver un enrichedChoice par choiceId
    const enrichedByChoiceId = useMemo(() => {
        const map = new Map<string, ConsultationChoice>();
        for (const ec of rubriqueCourante?.consultationChoices! ?? []) {
            map.set(ec._id ?? "", ec);
        }
        return map;
    }, [rubriqueCourante?.consultationChoices]);

    const stats = useMemo(() => {
        const total = rubriqueCourante?.consultationChoices.length || 0;
        const consulted = rubriqueCourante?.consultationChoices.filter((c) => c?.buttonStatus !== "CONSULTER").length || 0;
        const pending = rubriqueCourante?.consultationChoices.filter((c) => c?.buttonStatus === "RÉPONSE EN ATTENTE").length || 0;
        const completed = rubriqueCourante?.consultationChoices.filter((c) => c?.buttonStatus === "VOIR L'ANALYSE").length || 0;
        return { total, consulted, pending, completed };
    }, [rubriqueCourante?.consultationChoices]);

    const handleSelectConsultation = useCallback(
        async (choice: ConsultationChoice) => {
            const choiceId = choice._id ?? "";
            if (!choiceId) return;
            sessionStorage.setItem("selectedChoiceId", choiceId);
            const enrichedChoice = enrichedByChoiceId.get(choiceId);
            const existingConsultationId = enrichedChoice?.consultationId;
            if (existingConsultationId) {
                router.push(`/secured/category/${category._id}/consulter?consultationId=${existingConsultationId}`);
                return;
            }
            sessionStorage.setItem("categoryId", String(category._id));
            sessionStorage.setItem("rubriqueId", String(rubriqueCourante?._id ?? ""));
            const participants = choice?.participants;
            if (participants === "AVEC_TIERS") {
                router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
                return;
            }
            if (participants === "SOLO") {
                if (!user) {
                    router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
                    return;
                }
                try {
                    const mappedFormData = mapFormDataToBackend(user);
                    const payload = {
                        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
                        type: rubriqueCourante?.typeconsultation,
                        title: choice.title || "Consultation",
                        formData: mappedFormData,
                        description: choice.description || "",
                        status: "PENDING",
                        alternatives: choice.offering?.alternatives || [],
                        choice,
                    };
                    const response = await api.post("/consultations", payload);
                    const id = response.data?.id || response.data?.consultationId || response.data?._id;
                    if (id) {
                        sessionStorage.removeItem("selectedChoiceId");
                        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
                        return;
                    }
                    router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
                } catch {
                    router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
                }
                return;
            }
            router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
        },
        [category._id, enrichedByChoiceId, router, rubriqueCourante?._id, rubriqueCourante?.typeconsultation, user]
    );

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.push("/secured/category");
        }
    };


    useEffect(() => {
        let isMounted = true;
        const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
        if (!selectedChoiceId) {
            router.push(`/secured/category/${category._id}/selection`);
            return;
        }
        if (!rubriqueCourante || !rubriqueCourante.consultationChoices) {
            setLoading(true);
            return;
        }
        const choix = rubriqueCourante.consultationChoices.find((c: any) => c._id === selectedChoiceId);
        // Debug regroupé
        console.debug('[CategoryFormClient]', {
            selectedChoiceId,
            rubriqueCourante,
            consultationChoices: rubriqueCourante.consultationChoices.map((c: any) => c._id),
            choix
        });
        setContextInfo({ rubrique: rubriqueCourante, choix });
        const fetchUser = async () => {
            try {
                const userRes = await api.get('/users/me');
                if (!isMounted) return;
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
                if (!isMounted) return;
                setApiError('Erreur lors du chargement des données');
                setShowErrorToast(true);
                setLoading(false);
            }
        };
        fetchUser();
        return () => { isMounted = false; };
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