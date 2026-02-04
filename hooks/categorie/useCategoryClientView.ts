import type { CategorieAdmin, RubriqueOrNone } from "@/lib/interfaces";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function useCategoryClientView(category: CategorieAdmin) {
  const router = useRouter();
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

  const handleOpenRubriqueById = (id: string, consultationId: string) => {
    if (category._id && consultationId) {
      window.location.href = `/star/category/${category._id}/choixconsultation?consultationId=${consultationId}`;
    }
  };

  return {
    rubriques, rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById
  };
}