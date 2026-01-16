import { useMemo } from "react";
import type { Rubrique } from "@/lib/interfaces";
import { getBorderGradientFromId } from "../../components/categorie/getBorderGradient";

import { useRubriqueUtils } from './useRubriqueUtils';

/**
 * Hook optimisé pour dériver les propriétés d'une rubrique
 * Utilise useMemo pour éviter les recalculs inutiles
 */
export function useRubriqueDerived(rub: Rubrique) {
  const { clampText, getStableRubriqueId } = useRubriqueUtils();
  
  // Mémoïser les valeurs individuelles pour éviter les recalculs
  const id = useMemo(() => getStableRubriqueId(rub), [rub._id, getStableRubriqueId]);
  const title = useMemo(() => 
    typeof rub.titre === "string" ? rub.titre.trim() : "Rubrique", 
    [rub.titre]
  );
  const desc = useMemo(() => 
    rub.description ? clampText(rub.description, 140) : "—", 
    [rub.description, clampText]
  );
  const borderClass = useMemo(() => getBorderGradientFromId(id), [id]);
  const choicesCount = useMemo(() => 
    Array.isArray((rub as any)?.consultationChoices)
      ? (rub as any).consultationChoices.length
      : undefined,
    [(rub as any)?.consultationChoices]
  );
  
  return useMemo(() => ({
    id,
    title,
    desc,
    borderClass,
    choicesCount
  }), [id, title, desc, borderClass, choicesCount]);
}
