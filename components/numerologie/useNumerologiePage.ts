import { useMemo } from "react";
import { numerologieSections } from "./NumerologieSectionsData";
 

export function useNumerologiePage() {
  return useMemo(() => ({ numerologieSections }), []);
}
