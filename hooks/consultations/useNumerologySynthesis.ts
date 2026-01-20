import { useMemo } from "react";

export function useNumerologySynthesis(syntheseEtTiming: any) {
  return useMemo(() => {
    if (!syntheseEtTiming) return null;
    return {
      accord: syntheseEtTiming.accord,
      opportunites: syntheseEtTiming.opportunites,
      defisActuels: syntheseEtTiming.defisActuels,
      conseilsPratiques: syntheseEtTiming.conseilsPratiques,
      prochainsJoursFavorables: syntheseEtTiming.prochainsJoursFavorables,
    };
  }, [syntheseEtTiming]);
}
