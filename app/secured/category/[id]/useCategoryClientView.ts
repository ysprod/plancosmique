import { useMemo, useState } from "react";

export function useCategoryClientView(category: any) {
  const rubriques = useMemo(() => category.rubriques ?? [], [category.rubriques]);
  const [rubriqueCourante, setRubriqueCourante] = useState<any>(null);
  return { rubriques, rubriqueCourante, setRubriqueCourante };
}