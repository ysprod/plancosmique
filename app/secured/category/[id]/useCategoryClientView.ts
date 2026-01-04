import { useMemo } from "react";

export function useCategoryClientView(category: any) {
  const rubriques = useMemo(() => category.rubriques ?? [], [category.rubriques]);
  return { rubriques };
}
