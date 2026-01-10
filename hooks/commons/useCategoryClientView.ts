import { Rubrique, RubriqueOrNone } from "@/lib/interfaces";
import { useMemo, useState } from "react";

export function useCategoryClientView(category: any) {
  const rubriques = useMemo(() => category.rubriques ?? [], [category.rubriques]);
  const [rubriqueCourante, setRubriqueCourante] = useState<RubriqueOrNone>(null);
  return { rubriques, rubriqueCourante, setRubriqueCourante };
}