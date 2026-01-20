import { useMemo } from "react";

export function useNumerologyLifeCycles(cyclesDeVieGrands: any[]) {
  return useMemo(() => {
    if (!cyclesDeVieGrands || !Array.isArray(cyclesDeVieGrands) || cyclesDeVieGrands.length === 0) return [];
    return cyclesDeVieGrands.map(cycle => ({
      periode: cycle.periode,
      ages: cycle.ages,
      nombre: cycle.nombre,
      theme: cycle.theme,
    }));
  }, [cyclesDeVieGrands]);
}
