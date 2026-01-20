import { useMemo } from "react";

export function useNumerologyCycles(cyclesEnMouvement: any) {
  return useMemo(() => {
    if (!cyclesEnMouvement) return null;
    return {
      anneeUniverselle: cyclesEnMouvement.anneeUniverselle,
      anneePersonnelle: cyclesEnMouvement.anneePersonnelle,
      moisPersonnel: cyclesEnMouvement.moisPersonnel,
      jourPersonnel: cyclesEnMouvement.jourPersonnel,
      description: cyclesEnMouvement.description,
    };
  }, [cyclesEnMouvement]);
}
