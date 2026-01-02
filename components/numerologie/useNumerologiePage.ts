import { useMemo } from "react";
import { numerologieSections } from "./NumerologieSectionsData";
 

export function useNumerologiePage() {
  // Ici, on pourrait ajouter une logique dynamique plus tard
  return useMemo(() => ({ numerologieSections }), []);
}
