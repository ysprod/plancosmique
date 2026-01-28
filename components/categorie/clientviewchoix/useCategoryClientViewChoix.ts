import { useChoicesWithCount } from "@/hooks/categorie/useChoicesWithCount";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { mapFormDataToBackend } from "@/lib/functions";
import type { CategorieAdmin, ConsultationChoice, Rubrique } from "@/lib/interfaces";
import { useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useCategoryClientViewChoix({ category, }: { category: CategorieAdmin; }) {
    const router = useRouter();
    const { user } = useAuth();

    const reduceMotion = useReducedMotion();
    const searchParams = useSearchParams();
    const consultationId = searchParams?.get("consultationId") ?? "";
    const userId = user?._id ?? "";

    const { data: rubriqueCourante, loading, error } = useChoicesWithCount(consultationId, userId) as {
        data: Rubrique | null;
        loading: boolean;
        error: string | null;
        refetch: () => Promise<void>;
    };

    const enrichedByChoiceId = useMemo(() => {
        const map = new Map<string, ConsultationChoice>();
        for (const ec of rubriqueCourante?.consultationChoices! ?? []) {
            map.set(ec._id ?? "", ec);
        }
        return map;
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
                        rubriqueId: rubriqueCourante?._id || "",
                    };
                    const response = await api.post("/consultations", payload);
                    const id = response.data?.id || response.data?.consultationId || response.data?._id;
                    if (id) {
                        sessionStorage.removeItem("selectedChoiceId");
                        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
                        return;
                    }
                    router.push(`/secured/category/${category._id}/form?consultationId=${rubriqueCourante?._id ?? ""}`);
                } catch (e) {
                    console.error('[handleSelectConsultation] Erreur lors de la création de la consultation:', e);
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

    return {
        enrichedByChoiceId, handleSelectConsultation, handleBack,
        rubriqueCourante, loading, error, reduceMotion, consultationId,
    };
}