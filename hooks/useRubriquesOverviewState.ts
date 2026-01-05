import { useState } from "react";

export function useRubriquesOverviewState() {
  const [expandedDomaine, setExpandedDomaine] = useState<string | null>(null);
  const [expandedRubrique, setExpandedRubrique] = useState<string | null>(null);
  const [expandedSousRubrique, setExpandedSousRubrique] = useState<string | null>(null);

  return {
    expandedDomaine,
    setExpandedDomaine,
    expandedRubrique,
    setExpandedRubrique,
    expandedSousRubrique,
    setExpandedSousRubrique,
  };
}
