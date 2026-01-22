import { cleanText } from "@/lib/functions";
import { CategorieAdmin } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function useCategoryClientViewWrapper(categorie: CategorieAdmin) {
    const router = useRouter();

    const title = useMemo(() => cleanText(categorie.nom) || "Catégorie", [categorie.nom]);
    const description = useMemo(() => cleanText(categorie.description), [categorie.description]);

    const handleOpenRubriqueById = (id: string, consultationId: string) => {
        // Mise en cache de la catégorie dans sessionStorage avant navigation
        try {
            sessionStorage.setItem('currentCategory', JSON.stringify(categorie));
        } catch (e) {
            // fail silently
        }
        router.push(`/secured/category/${id}/choixconsultation?consultationId=${consultationId}`);
    };

    return { handleOpenRubriqueById, title, description };
}