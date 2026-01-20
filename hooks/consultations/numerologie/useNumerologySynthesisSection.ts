import { useMemo } from "react";

export function useNumerologySynthesisSection(syntheseEtTiming: any) {
  return useMemo(() => syntheseEtTiming, [syntheseEtTiming]);
}
