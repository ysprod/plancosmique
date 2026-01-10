import { useMemo } from "react";
import type { Rubrique } from "@/lib/interfaces";
import { getBorderGradient } from "./getBorderGradient";

export function useRubriqueDerived(rubrique: Rubrique) {
  return useMemo(() => {
    const id = String((rubrique as any)?._id ?? Math.random().toString(36));
    const title = String(rubrique.titre ?? "Rubrique").trim();
    const description = String(rubrique.description ?? "").trim();
    const borderClass = getBorderGradient(id);
    return { id, title, description, borderClass };
  }, [rubrique]);
}
