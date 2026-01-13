import { useMemo } from "react";
import type { CategorieAdmin } from "@/lib/interfaces";

export function useCategoryHeader(category: CategorieAdmin) {
  const hasDescription = useMemo(() => Boolean(category.description?.trim()), [category.description]);
  const description = useMemo(() => category.description?.trim() || "", [category.description]);
  const categoryName = useMemo(() => category.nom?.trim() || "Catégorie", [category.nom]);
  return { hasDescription, description, categoryName };
}
