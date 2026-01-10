import { useMemo } from "react";
import type { Rubrique } from "@/lib/interfaces";
import { getBorderGradientFromId } from "./getBorderGradient";

import { useRubriqueUtils } from './useRubriqueUtils';
export function useRubriqueDerived(rub: Rubrique) {
  const { clampText, getStableRubriqueId } = useRubriqueUtils();
  return useMemo(() => {
    const id = getStableRubriqueId(rub);
    const title = typeof rub.titre === "string" ? rub.titre.trim() : "Rubrique";
    const desc = rub.description ? clampText(rub.description, 140) : "—";
    const borderClass = getBorderGradientFromId(id);
    const choicesCount = Array.isArray((rub as any)?.consultationChoices)
      ? (rub as any).consultationChoices.length
      : undefined;
    return { id, title, desc, borderClass, choicesCount };
  }, [rub._id, rub.titre, rub.description, (rub as any)?.consultationChoices]);
}
