import { DomaineList } from './DomaineList';

export function RubriquesOverviewDomaines({
  domaines,
  expandedDomaine,
  setExpandedDomaine,
  expandedRubrique,
  setExpandedRubrique,
  expandedSousRubrique,
  setExpandedSousRubrique,
}: {
  domaines: any[];
  expandedDomaine: string | null;
  setExpandedDomaine: (id: string | null) => void;
  expandedRubrique: string | null;
  setExpandedRubrique: (id: string | null) => void;
  expandedSousRubrique: string | null;
  setExpandedSousRubrique: (id: string | null) => void;
}) {

  return (
    <DomaineList
      domaines={domaines}
      expandedDomaine={expandedDomaine}
      setExpandedDomaine={setExpandedDomaine}
      expandedRubrique={expandedRubrique}
      setExpandedRubrique={setExpandedRubrique}
      expandedSousRubrique={expandedSousRubrique}
      setExpandedSousRubrique={setExpandedSousRubrique}
    />
  );
}