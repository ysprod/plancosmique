import { cleanText } from "@/lib/functions";
import { CategorieAdmin } from "@/lib/interfaces";

import { useMemo } from "react";

export function useCategoryClientViewWrapper(categorie: CategorieAdmin) {


    const title = useMemo(() => cleanText(categorie.nom) || "Catégorie", [categorie.nom]);
    const description = useMemo(() => cleanText(categorie.description), [categorie.description]);

    const handleOpenRubriqueById = (id: string, consultationId: string) => {
        try {
            sessionStorage.setItem('currentCategory', JSON.stringify(categorie));
        } catch (e) {
            // fail silently
        }
        window.location.href = `/star/category/${id}/choixconsultation?consultationId=${consultationId}&r=${Date.now()}`;
    };

    return { handleOpenRubriqueById, title, description };
}