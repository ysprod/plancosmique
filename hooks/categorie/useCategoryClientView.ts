import type { CategorieAdmin, RubriqueOrNone } from "@/lib/interfaces";
import { useMemo, useState } from "react";

export function useCategoryClientView(category: CategorieAdmin) {
  const rubriques = useMemo(() => category.rubriques ?? [], [category.rubriques]);
  const [rubriqueCourante, setRubriqueCourante] = useState<RubriqueOrNone>(null);

  const ui = useMemo(() => {
    const count = rubriques?.length ?? 0;
    return {
      rubriqueCount: count,
      hasRubriques: count > 0,
      hasCurrent: Boolean(rubriqueCourante),
    };
  }, [rubriques, rubriqueCourante]);

  const handleOpenRubriqueById = (id: string) => {
    const rubrique = rubriques.find((r: any) => String(r._id) === String(id));
    setRubriqueCourante(rubrique || null);
  };

  return {
    rubriques, rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById
  };
}