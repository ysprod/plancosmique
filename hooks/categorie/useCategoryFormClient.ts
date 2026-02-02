import { api } from "@/lib/api/client";
import { getChoicesWithCount } from "@/lib/api/services/rubrique.service";
import { mapFormDataToBackend } from "@/lib/functions";
import type { CategorieAdmin, ConsultationChoice, Rubrique, User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UiState = {
    loading: boolean;
    error: string | null;     // erreurs fetch (rubrique/choices)
    apiError: string | null;  // erreurs create consultation
    showErrorToast: boolean;
};

const initialUi: UiState = {
    loading: true,
    error: null,
    apiError: null,
    showErrorToast: false,
};

function readSelectedChoiceIdOnce() {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("selectedChoiceId") || "";
}

export function useCategoryFormClient(category: CategorieAdmin, consultationId: string) {
    const router = useRouter();

    const [ui, setUi] = useState<UiState>(initialUi);
    const [userData, setUserData] = useState<User | null>(null);
    const [rubriqueCourante, setRubriqueCourante] = useState<Rubrique | null>(null);
    const [selectedChoiceId, setSelectedChoiceId] = useState<string>(() => readSelectedChoiceIdOnce());
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        nom: "",
        prenoms: "",
        gender: "",
        dateNaissance: "",
        heureNaissance: "",
        villeNaissance: "",
        paysNaissance: "",
        question: "",
    });

    useEffect(() => {
        const ctrl = new AbortController();

        (async () => {
            try {
                const userRes = await api.get("/users/me", { signal: ctrl.signal } as any);
                setUserData(userRes.data ?? null);
            } catch {
                setUserData(null);
            }
        })();

        return () => ctrl.abort();
    }, []);

    const userId = userData?._id || "";

    const reqSeqRef = useRef(0);
    useEffect(() => {
        if (!consultationId || !userId) {
            setUi((s) => (s.loading ? { ...s, loading: false } : s));
            return;
        }

        const ctrl = new AbortController();
        const seq = ++reqSeqRef.current;

        setUi((s) => (s.loading && s.error === null ? s : { ...s, loading: true, error: null }));

        (async () => {
            try {
                const result = await getChoicesWithCount(consultationId, userId);
                if (reqSeqRef.current !== seq) return;
                setRubriqueCourante(result);
                setUi((s) => ({ ...s, loading: false, error: null }));
            } catch (err: any) {
                if (reqSeqRef.current !== seq) return;
                const msg = err?.response?.data?.message || err?.message || "Erreur inconnue";
                setUi((s) => ({ ...s, loading: false, error: msg }));
            }
        })();

        return () => ctrl.abort();
    }, [consultationId, userId]);

    const choicesById = useMemo(() => {
        const map = new Map<string, ConsultationChoice>();
        const list = rubriqueCourante?.consultationChoices || [];
        for (const c of list) map.set(String(c._id), c);
        return map;
    }, [rubriqueCourante?.consultationChoices]);

    const selectedChoice = useMemo(
        () => (selectedChoiceId ? choicesById.get(String(selectedChoiceId)) : undefined),
        [choicesById, selectedChoiceId]
    );

    const needsForm = useMemo(() => {
        const p = selectedChoice?.participants;
        return p === "AVEC_TIERS" || p === "POUR_TIERS";
    }, [selectedChoice?.participants]);

    const contextInfo = useMemo(
        () => ({ rubrique: rubriqueCourante, choix: selectedChoice }),
        [rubriqueCourante, selectedChoice]
    );

    // --- 4) Create consultation factorisé (même fonction SOLO/TIERS) ---
    const createConsultation = useCallback(
        async (params: { choice: ConsultationChoice; tierce?: typeof form }) => {
            const choice = params.choice;
            const rubriqueId = rubriqueCourante?._id || "";

            // formData: SOLO utilise userData, TIERS utilise userData + tierce séparé
            const mappedFormData = mapFormDataToBackend(userData);

            const payload = {
                serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
                type: category?.typeconsultation,
                title: choice?.title || "Consultation",
                formData: mappedFormData,
                tierce: params.tierce, // undefined en SOLO
                description: choice?.description || "",
                status: "PENDING",
                alternatives: choice?.offering?.alternatives || [],
                choice,
                rubriqueId,
            };
            console.log("Creating consultation with payload:", payload);

              const response = await api.post("/consultations", payload);
            const id = response.data?.id || response.data?.consultationId || response.data?._id;

            if (!id) throw new Error("ID de consultation manquant");

            // nettoyage et navigation
            if (typeof window !== "undefined") {
                sessionStorage.removeItem("selectedChoiceId");
            }
            router.push(`/star/category/${category._id}/consulter?consultationId=${id}`);
        
         },
        [category?._id, category?.typeconsultation, router, rubriqueCourante?._id, userData]
    );

    // --- 5) AUTO-create en SOLO (si pas besoin de formulaire) ---
    const didAutoCreateRef = useRef(false);
    useEffect(() => {
        // Reset guard quand on change de rubrique/choice
        didAutoCreateRef.current = false;
    }, [consultationId, selectedChoiceId]);

    useEffect(() => {
        if (!rubriqueCourante) return;
        if (!userData) return;

        // Si besoin de formulaire → on stop, l’utilisateur remplira
        if (needsForm) {
            setUi((s) => (s.loading ? { ...s, loading: false } : s));
            return;
        }

        // SOLO: si pas de choice, afficher une erreur
        if (!selectedChoice) {
            setUi((s) => ({
                ...s,
                loading: false,
                apiError: "Aucun choix de consultation sélectionné.",
                showErrorToast: true,
            }));
            return;
        }

        // Evite double POST (StrictMode, deps, etc.)
        if (didAutoCreateRef.current) return;
        didAutoCreateRef.current = true;

        setUi((s) => ({ ...s, loading: true, apiError: null }));

        (async () => {
            try {
                await createConsultation({ choice: selectedChoice });
            } catch (err: any) {
                setUi((s) => ({
                    ...s,
                    loading: false,
                    apiError: err?.response?.data?.message || err?.message || "Erreur lors de la création",
                    showErrorToast: true,
                }));
            }
        })();
    }, [rubriqueCourante, userData, needsForm, selectedChoice, createConsultation]);

    // --- 6) Form handlers ---
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setForm((prev) => (prev[name as keyof typeof prev] === value ? prev : { ...prev, [name]: value }));

            // supprime une erreur uniquement si elle existe (évite setState inutile)
            setErrors((prev) => {
                if (!prev[name]) return prev;
                const next = { ...prev };
                delete next[name];
                return next;
            });
        },
        []
    );

    const validateForm = useCallback(() => {
        const f = form;
        const newErrors: Record<string, string> = {};
        if (!f.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!f.prenoms.trim()) newErrors.prenoms = "Le prénom est requis";
        if (!f.gender) newErrors.gender = "Le genre est requis";
        if (!f.dateNaissance) newErrors.dateNaissance = "La date de naissance est requise";
        if (!f.heureNaissance) newErrors.heureNaissance = "L'heure de naissance est requise";
        if (!f.villeNaissance.trim()) newErrors.villeNaissance = "La ville de naissance est requise";
        if (!f.paysNaissance.trim()) newErrors.paysNaissance = "Le pays de naissance est requis";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [form]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (!rubriqueCourante?._id) return;

            if (!validateForm()) {
                setUi((s) => ({ ...s, apiError: "Veuillez remplir tous les champs requis", showErrorToast: true }));
                return;
            }

            if (!selectedChoice) {
                setUi((s) => ({ ...s, apiError: "Choix de consultation introuvable", showErrorToast: true }));
                return;
            }

            setUi((s) => ({ ...s, loading: true, apiError: null }));

            try {
                await createConsultation({ choice: selectedChoice, tierce: form });
            } catch (err: any) {
                setUi((s) => ({
                    ...s,
                    loading: false,
                    apiError: err?.response?.data?.message || err?.message || "Erreur lors de la création de la consultation",
                    showErrorToast: true,
                }));
            } finally {
                setUi((s) => (s.loading ? { ...s, loading: false } : s));
            }
        },
        [rubriqueCourante?._id, validateForm, selectedChoice, createConsultation, form]
    );

    const handleReset = useCallback(() => {
        router.push(`/star/category/${category._id}/selection`);
    }, [category._id, router]);

    const handleCloseError = useCallback(() => {
        setUi((s) => (s.showErrorToast ? { ...s, showErrorToast: false } : s));
    }, []);

    return {
        rubriqueCourante, loading: ui.loading, error: ui.error,
        apiError: ui.apiError, showErrorToast: ui.showErrorToast,
        contextInfo, needsForm, userData, form, errors,
        selectedChoiceId, selectedChoice,
        setSelectedChoiceId, handleChange, handleSubmit, handleReset, handleCloseError,
    };
}
