import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Consultation } from "@/lib/interfaces";

export function useRubriqueConsultationsList() {
    const router = useRouter();
    const onView = useCallback((id: string) => {
        router.push(`/secured/consultations/${id}?retour=cinqportes`);
    }, [router]);
    return { onView };
}