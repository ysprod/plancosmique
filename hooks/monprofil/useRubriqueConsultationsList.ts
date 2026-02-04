
import { useCallback } from "react";
import { Consultation } from "@/lib/interfaces";

export function useRubriqueConsultationsList() {

    const onView = useCallback((id: string) => {
        window.location.href = `/star/consultations/${id}?retour=cinqportes`;
    }, []);
    return { onView };
}