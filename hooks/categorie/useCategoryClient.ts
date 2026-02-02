import type { CategorieAdmin, RubriqueOrNone } from "@/lib/interfaces";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function useCategoryClient(category: CategorieAdmin) {
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
    const rubrique = rubriques.find((r: any) => String(r._id) === String(id));
    //setRubriqueCourante(rubrique || null);
    if (category._id && consultationId) {
      router.push(`/star/category/${category._id}/choixconsultation?consultationId=${consultationId}`);
    }
  };

    const hasDescription = useMemo(() => Boolean(category.description?.trim()), [category.description]);
  const description = useMemo(() => category.description?.trim() || "", [category.description]);
  const categoryName = useMemo(() => category.nom?.trim() || "Catégorie", [category.nom]);
 

  return {
    rubriques, rubriqueCourante, setRubriqueCourante, ui,
     handleOpenRubriqueById,
    hasDescription,
    description,
    categoryName
  };
}