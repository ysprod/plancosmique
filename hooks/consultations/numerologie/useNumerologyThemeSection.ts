import { useMemo } from "react";
import { useNumerologyTheme } from "@/hooks/consultations/useNumerologyTheme";

export function useNumerologyThemeSection(themeDeNaissance: any) {
  return useMemo(() => useNumerologyTheme(themeDeNaissance), [themeDeNaissance]);
}
