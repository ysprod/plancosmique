import React from "react";
import { useCallback, useEffect, useMemo } from "react";
import { Rubrique } from "@/lib/interfaces";
export { useCategoryClientView } from "./useCategoryClientView";
import { getRubriqueFromUrl, setRubriqueInUrl } from "@/components/categorie/categoryClientViewUtils";
import { CategorieAdmin } from "@/lib/interfaces";
import { getRubriqueId } from "@/lib/functions";

export function useCategoryClientViewMain(category: CategorieAdmin) {
    const [rubriques, setRubriques] = React.useState<Rubrique[]>(category.rubriques || []);
    const [rubriqueCourante, setRubriqueCourante] = React.useState<Rubrique | null>(null);

    const rubriquesById = useMemo(() => {
        const m = new Map<string, Rubrique>();
        for (const r of rubriques) {
            const id = getRubriqueId(r);
            if (id) m.set(id, r);
        }
        return m;
    }, [rubriques]);

    const openRubriqueById = useCallback(
        (id: string) => {
            const rub = rubriquesById.get(id) ?? null;
            setRubriqueCourante(rub);
            setRubriqueInUrl(rub ? getRubriqueId(rub) : null);
        },
        [rubriquesById, setRubriqueCourante]
    );

    const closeRubrique = useCallback(() => {
        setRubriqueCourante(null);
        setRubriqueInUrl(null);
    }, [setRubriqueCourante]);

    useEffect(() => {
        const rid = getRubriqueFromUrl();
        if (rid && !rubriqueCourante) {
            const rub = rubriquesById.get(rid);
            if (rub) setRubriqueCourante(rub);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rubriquesById]);

    useEffect(() => {
        const onPop = () => {
            const rid = getRubriqueFromUrl();
            if (!rid) {
                setRubriqueCourante(null);
                return;
            }
            const rub = rubriquesById.get(rid) ?? null;
            setRubriqueCourante(rub);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, [rubriquesById, setRubriqueCourante]);

    return {
        rubriques,
        rubriqueCourante,
        openRubriqueById,
        closeRubrique,
    };
}
