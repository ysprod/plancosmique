import { useMemo } from "react";

export function useNumerologyWisdom(sagesseAfricaine: any) {
  return useMemo(() => {
    if (!sagesseAfricaine) return null;
    return {
      proverbe: sagesseAfricaine.proverbe,
      source: sagesseAfricaine.source,
      lien: sagesseAfricaine.lien,
    };
  }, [sagesseAfricaine]);
}
