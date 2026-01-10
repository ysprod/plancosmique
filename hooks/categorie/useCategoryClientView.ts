import type { CategorieAdmin } from "@/lib/interfaces";
import { useCategoryClientView as useCategoryClientViewMain } from "@/hooks/commons/useCategoryClientView";
import { useMemo } from "react";

export function useCategoryClientView(category: CategorieAdmin) {
  const { rubriques, rubriqueCourante, setRubriqueCourante } = useCategoryClientViewMain(category);

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
    setRubriqueCourante,
    ui,
  };
}
