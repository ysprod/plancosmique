import { motion } from 'framer-motion';
import DomaineCard from '@/components/admin/rubriques/overview/DomaineCard';

export function DomaineList({
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
    <div className="space-y-6">
      {domaines.map((domaine: any, dIndex: number) => (
        <motion.div
          key={`domaine-${domaine.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + dIndex * 0.1 }}
        >
          <DomaineCard
            domaine={domaine}
            isExpanded={expandedDomaine === domaine.id}
            onToggle={() => setExpandedDomaine(expandedDomaine === domaine.id ? null : domaine.id)}
            expandedRubrique={expandedRubrique}
            setExpandedRubrique={setExpandedRubrique}
            expandedSousRubrique={expandedSousRubrique}
            setExpandedSousRubrique={setExpandedSousRubrique}
          />
        </motion.div>
      ))}
    </div>
  );
}