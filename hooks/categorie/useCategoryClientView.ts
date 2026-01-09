import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";
import { useCategoryClientViewMain } from "@/hooks/commons/useCategoryClientViewMain";
import { useMemo } from "react";

export function useCategoryClientView(category: Categorie) {
  const { rubriques, rubriqueCourante, openRubriqueById, closeRubrique } = useCategoryClientViewMain(category);

  const ui = useMemo(() => {
    const count = rubriques?.length ?? 0;
    return {
      rubriqueCount: count,
      hasRubriques: count > 0,
      hasCurrent: Boolean(rubriqueCourante),
    };
  }, [rubriques, rubriqueCourante]);

  return {
    rubriques,
    rubriqueCourante,
    openRubriqueById,
    closeRubrique,
    ui,
  };
}
