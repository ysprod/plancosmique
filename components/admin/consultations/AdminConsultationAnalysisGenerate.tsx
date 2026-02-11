"use client";
import ErrorState from "@/components/consultations/ErrorState";
import LoadingSkeletonGenerate from "@/components/consultations/LoadingSkeletonGenerate";
import { api } from "@/lib/api/client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function getConsultationIdFromParams(params: unknown): string | null {
    const raw = (params as any)?.id;
    if (!raw) return null;
    return Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
}

type UiState =
    | { status: "loading"; error: null }
    | { status: "error"; error: string }
    | { status: "done"; error: null };

export default function AdminConsultationAnalysisGenerate() {
    const params = useParams();

    const consultationId = useMemo(() => getConsultationIdFromParams(params), [params]);
    const [ui, setUi] = useState<UiState>({ status: "loading", error: null });

    const onRetry = useCallback(() => {
        window.location.reload();
    }, []);

    const goback = useCallback(() => {
        window.location.replace(`/admin/consultations/${consultationId}`);
    }, [consultationId]);

    useEffect(() => {
        if (!consultationId) {
            setUi({ status: "error", error: "ID de consultation manquant" });
            return;
        }

        setUi((prev) => (prev.status === "loading" ? prev : { status: "loading", error: null }));

        (async () => {
            try {
                await api.post(`/consultations/${consultationId}/generate-analysis`);
                goback();
            } catch (err: any) {
                setUi({
                    status: "error",
                    error: err?.message || "Erreur lors de la génération de l'analyse",
                });
            }
        })();
    }, [consultationId]);

    if (ui.status === "loading") return <LoadingSkeletonGenerate />;

    if (ui.status === "error") {
        return <ErrorState error={ui.error} onRetry={onRetry} />;
    }

    return (
        <div className="text-center py-8 text-cosmic-indigo dark:text-cosmic-pink font-semibold">
            Génération de l&apos;analyse terminée.
        </div>
    );
}