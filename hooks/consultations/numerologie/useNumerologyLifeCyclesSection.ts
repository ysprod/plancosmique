import { useMemo } from "react";

export function useNumerologyLifeCyclesSection(cyclesDeVieGrands: any) {
  return useMemo(() => cyclesDeVieGrands, [cyclesDeVieGrands]);
}
