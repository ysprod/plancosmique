"use client";

import { api } from "@/lib/api/client";
import { getChoicesWithCount } from "@/lib/api/services/rubrique.service";
import { mapFormDataToBackend } from "@/lib/functions";
import type { CategorieAdmin, ConsultationChoice, Rubrique, User } from "@/lib/interfaces";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ----- UI state
type UiState = {
    loading: boolean;
    error: string | null;
    apiError: string | null;
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

// ----- Tierce types/helpers (reprends bloc A ici)
type TierceForm = {
    id: string;
    nom: string;
    prenoms: string;
    gender: string;
    dateNaissance: string;
    heureNaissance: string;
    villeNaissance: string;
    paysNaissance: string;
    question: string;
};

const EMPTY_TIERCE: Omit<TierceForm, "id"> = {
    nom: "",
    prenoms: "",
    gender: "",
    dateNaissance: "",
    heureNaissance: "",
    villeNaissance: "",
    paysNaissance: "",
    question: "",
};

function newTierce(): TierceForm {
    const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    return { id, ...EMPTY_TIERCE };
}

function normalizeTierce(t: TierceForm): TierceForm {
    return {
        ...t,
        nom: t.nom.trim(),
        prenoms: t.prenoms.trim(),
        villeNaissance: t.villeNaissance.trim(),
        paysNaissance: t.paysNaissance.trim(),
        question: t.question.trim(),
    };
}

function tierceKey(t: TierceForm) {
    return `${t.prenoms.trim().toLowerCase()}|${t.nom.trim().toLowerCase()}|${t.dateNaissance}|${t.heureNaissance}|${t.villeNaissance.trim().toLowerCase()}`;
}

export function useCategoryFormClientGroupe(category: CategorieAdmin, consultationId: string) {
    const [ui, setUi] = useState<UiState>(initialUi);

    const [userData, setUserData] = useState<User | null>(null);
    const [rubriqueCourante, setRubriqueCourante] = useState<Rubrique | null>(null);

    const [selectedChoiceId, setSelectedChoiceId] = useState<string>(() => readSelectedChoiceIdOnce());
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ✅ tierce courante (form)
    const [form, setForm] = useState<TierceForm>(() => newTierce());

    // ✅ liste des tierces finalisées avec persistence localStorage
    const [tiercesList, setTiercesList] = useState<TierceForm[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = sessionStorage.getItem(`tierces_${consultationId}`);
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    });
    const [showAddMore, setShowAddMore] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const reqSeqRef = useRef(0);
    const submitLockRef = useRef(false);
    const successTimerRef = useRef<number | null>(null);

    // Persister les tierces dans sessionStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (tiercesList.length > 0) {
            sessionStorage.setItem(`tierces_${consultationId}`, JSON.stringify(tiercesList));
        } else {
            sessionStorage.removeItem(`tierces_${consultationId}`);
        }
    }, [tiercesList, consultationId]);

    // ─────────────────────────────────────────────────────────────
    // Load context (user + choix)
    // ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const ctrl = new AbortController();
        const seq = ++reqSeqRef.current;

        setUi((s) => (s.loading && s.error === null ? s : { ...s, loading: true, error: null }));

        (async () => {
            try {
                const userRes = await api.get("/users/me", { signal: ctrl.signal } as any);
                const user = userRes.data ?? null;
                if (reqSeqRef.current !== seq) return;

                setUserData(user);

                if (consultationId && user?._id) {
                    const result = await getChoicesWithCount(consultationId );
                    if (reqSeqRef.current !== seq) return;

                    setRubriqueCourante(result);
                    setUi((s) => ({ ...s, loading: false, error: null }));
                } else {
                    setUi((s) => ({ ...s, loading: false }));
                }
            } catch (err: any) {
                if (reqSeqRef.current !== seq) return;
                const msg = err?.response?.data?.message || err?.message || "Erreur inconnue";
                setUi((s) => ({ ...s, loading: false, error: msg }));
            }
        })();

        return () => ctrl.abort();
    }, [consultationId]);

    const choicesById = useMemo(() => {
        const map = new Map<string, ConsultationChoice>();
        const list = rubriqueCourante?.consultationChoices || [];
        for (const c of list) map.set(String((c as any)?._id), c);
        return map;
    }, [rubriqueCourante?.consultationChoices]);

    const selectedChoice = useMemo(
        () => (selectedChoiceId ? choicesById.get(String(selectedChoiceId)) : undefined),
        [choicesById, selectedChoiceId],
    );

    const contextInfo = useMemo(
        () => ({ rubrique: rubriqueCourante, choix: selectedChoice }),
        [rubriqueCourante, selectedChoice],
    );

    // ─────────────────────────────────────────────────────────────
    // Form change (tierce courante) + clear field error
    // ─────────────────────────────────────────────────────────────
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;

            setForm((prev) => {
                const k = name as keyof TierceForm;
                if (prev[k] === value) return prev;
                return { ...prev, [k]: value };
            });

            setErrors((prev) => {
                if (!prev[name]) return prev;
                const next = { ...prev };
                delete next[name];
                return next;
            });
        },
        [],
    );

    // ─────────────────────────────────────────────────────────────
    // Validation (tierce courante) - optimisée
    // ─────────────────────────────────────────────────────────────
    const validateTierce = useCallback((t: TierceForm) => {
        const f = normalizeTierce(t);
        const newErrors: Record<string, string> = {};

        // Validation optimisée : arrête dès qu'on trouve une erreur
        if (!f.nom) {
            newErrors.nom = "Le nom est requis";
        } else if (!f.prenoms) {
            newErrors.prenoms = "Le prénom est requis";
        } else if (!f.gender) {
            newErrors.gender = "Le genre est requis";
        } else if (!f.dateNaissance) {
            newErrors.dateNaissance = "La date de naissance est requise";
        } else if (!f.heureNaissance) {
            newErrors.heureNaissance = "L'heure de naissance est requise";
        } else if (!f.villeNaissance) {
            newErrors.villeNaissance = "La ville de naissance est requise";
        } else if (!f.paysNaissance) {
            newErrors.paysNaissance = "Le pays de naissance est requis";
        }

        return { ok: Object.keys(newErrors).length === 0, errors: newErrors, value: f };
    }, []);

    // ─────────────────────────────────────────────────────────────
    // Add / remove tierce - optimisé
    // ─────────────────────────────────────────────────────────────
    const handleAddTierce = useCallback((): boolean => {
        const { ok, errors: newErrors, value } = validateTierce(form);
        if (!ok) {
            setErrors(newErrors);
            setUi((s) => ({ ...s, apiError: "Veuillez remplir tous les champs requis", showErrorToast: true }));
            return false;
        }

        const key = tierceKey(value);

        // ✅ optimisation: vérifier anti-doublon AVANT setState pour éviter un rendu inutile
        if (tiercesList.some((x) => tierceKey(x) === key)) {
            setUi((s) => ({ ...s, apiError: "Cette personne est déjà ajoutée.", showErrorToast: true }));
            return false;
        }

        // ✅ mise à jour: ajouter à la liste sans setState callback
        setTiercesList((prev) => [...prev, value]);

        // reset vers une nouvelle tierce (id unique)
        setForm(newTierce());
        setShowAddMore(false);
        setUi((s) => ({ ...s, apiError: null }));

        // ✅ Feedback de succès
        setSuccessMessage(`${value.prenoms} ${value.nom} a été ajouté(e) avec succès`);
        if (successTimerRef.current) clearTimeout(successTimerRef.current);
        successTimerRef.current = window.setTimeout(() => setSuccessMessage(null), 3000);

        return true;
    }, [form, validateTierce, tiercesList]);

    const handleRemoveTierce = useCallback((id: string) => {
        setTiercesList((prev) => prev.filter((t) => t.id !== id));
    }, []);



    // ─────────────────────────────────────────────────────────────
    // Create consultation (payload tierces)
    // ─────────────────────────────────────────────────────────────
    const createConsultation = useCallback(
        async (params: { choice: ConsultationChoice; tierces: TierceForm[] }) => {
            const rubriqueId = (rubriqueCourante as any)?._id || "";
            const mappedFormData = mapFormDataToBackend(userData);

            // ✅ On envoie au backend uniquement les champs utiles
            const tiercesPayload = params.tierces.map(({ id: _id, ...rest }) => rest);

            const payload = {
                serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
                type: category?.typeconsultation,
                title: params.choice?.title || "Consultation",
                formData: mappedFormData,
                tierces: tiercesPayload,
                description: params.choice?.description || "",
                status: "PENDING",
                alternatives: (params.choice as any)?.offering?.alternatives || [],
                choice: params.choice,
                rubriqueId,
            };

            const response = await api.post("/consultations", payload);
            const id = response.data?.id || response.data?.consultationId || response.data?._id;
            if (!id) throw new Error("ID de consultation manquant");

            return id as string;
        },
        [category?.typeconsultation, rubriqueCourante, userData],
    );

    // ─────────────────────────────────────────────────────────────
    // Submit final
    // ─────────────────────────────────────────────────────────────
    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();
            if (!rubriqueCourante?._id) return;

            if (!selectedChoice) {
                setUi((s) => ({ ...s, apiError: "Choix de consultation introuvable", showErrorToast: true }));
                return;
            }

            if (submitLockRef.current) return;
            submitLockRef.current = true;

            try {
                // Règle UX : il faut au moins 1 tierce.
                // Si la liste est vide, on tente d'ajouter la tierce courante si valide.
                let finalTierces = tiercesList;

                if (finalTierces.length === 0) {
                    const { ok, errors: newErrors, value } = validateTierce(form);
                    if (!ok) {
                        setErrors(newErrors);
                        setUi((s) => ({
                            ...s,
                            apiError: "Ajoutez au moins une personne tierce (ou complétez le formulaire).",
                            showErrorToast: true,
                        }));
                        return;
                    }
                    finalTierces = [value];
                }

                setUi((s) => ({ ...s, loading: true, apiError: null }));

                const createdId = await createConsultation({ choice: selectedChoice, tierces: finalTierces });

                // ✅ Nettoyer le sessionStorage après succès
                if (typeof window !== "undefined") {
                    sessionStorage.removeItem(`tierces_${consultationId}`);
                    sessionStorage.removeItem("selectedChoiceId");
                }

                // ✅ Navigation vers la page de paiement
                window.location.href = `/star/category/${category._id}/consulter?consultationId=${createdId}&r=${Date.now()}`;

                setUi((s) => ({ ...s, loading: false }));
            } catch (err: any) {
                setUi((s) => ({
                    ...s,
                    loading: false,
                    apiError: err?.response?.data?.message || err?.message || "Erreur lors de la création de la consultation",
                    showErrorToast: true,
                }));
            } finally {
                submitLockRef.current = false;
                setUi((s) => (s.loading ? { ...s, loading: false } : s));
            }
        },
        [rubriqueCourante?._id, selectedChoice, tiercesList, validateTierce, form, createConsultation, consultationId, category._id],
    );

    // ─────────────────────────────────────────────────────────────
    // reset / close error
    // ─────────────────────────────────────────────────────────────
    const handleReset = useCallback(() => {
        window.location.href = `/star/category/${category._id}/selection?r=${Date.now()}`;
    }, [category._id]);

    const handleCloseError = useCallback(() => {
        setUi((s) => (s.showErrorToast ? { ...s, showErrorToast: false } : s));
    }, []);

    // Cleanup
    useEffect(() => {
        return () => {
            if (successTimerRef.current) clearTimeout(successTimerRef.current);
        };
    }, []);

    return {
        rubriqueCourante,
        loading: ui.loading,
        error: ui.error,
        apiError: ui.apiError,
        showErrorToast: ui.showErrorToast,

        contextInfo,

        form,
        errors,
        handleChange,

        selectedChoiceId,
        selectedChoice,
        setSelectedChoiceId,

        tiercesList,
        showAddMore,
        setShowAddMore,
        handleAddTierce,
        handleRemoveTierce,

        handleSubmit,
        handleReset,
        handleCloseError,
        isFormValid: useMemo(() => !!(
            form.nom.trim() &&
            form.prenoms.trim() &&
            form.gender &&
            form.dateNaissance &&
            form.heureNaissance &&
            form.villeNaissance.trim() &&
            form.paysNaissance.trim()
        ), [form]),
        successMessage,
    };
}
