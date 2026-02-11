import { useCallback } from "react";

export function useRubriqueConsultationsList() {
    const onView = useCallback((id: string) => {
        window.location.href = `/star/consultations/${id}?retour=cinqportes&r=${Date.now()}`;
    }, []);
    return { onView };
}