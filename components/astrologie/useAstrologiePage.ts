import { useMemo } from "react";
import { astrologySections } from "./AstrologySectionsData";

export function useAstrologiePage() {
  // Ici, on pourrait ajouter une logique dynamique plus tard
  return useMemo(() => ({ astrologySections }), []);
}
