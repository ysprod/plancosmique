import { useMemo } from "react";

export function useNumerologyCyclesSection(cyclesEnMouvement: any) {
  return useMemo(() => cyclesEnMouvement, [cyclesEnMouvement]);
}
