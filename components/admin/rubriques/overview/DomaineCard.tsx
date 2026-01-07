import React from "react";
import { Book } from "lucide-react";
import { motion } from "framer-motion";
import { Domaine, Rubrique } from "@/lib/config/rubriques.config";
import RubriqueCard from "./RubriqueCard";

interface DomaineCardProps {
  domaine: Domaine;
  isExpanded: boolean;
  onToggle: () => void;
  expandedRubrique: string | null;
  setExpandedRubrique: (id: string | null) => void;
  expandedSousRubrique: string | null;
  setExpandedSousRubrique: (id: string | null) => void;
}

const DomaineCard: React.FC<DomaineCardProps> = ({
  domaine,
  isExpanded,
  onToggle,
  expandedRubrique,
  setExpandedRubrique,
  expandedSousRubrique,
  setExpandedSousRubrique
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white">
            <Book size={24} />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-800">{domaine.titre}</h2>
            <p className="text-gray-600 text-sm">{domaine.description}</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-6 bg-gray-50 space-y-4"
        >
          {domaine.rubriques.map((rubrique: Rubrique) => (
            <RubriqueCard
              key={rubrique.id}
              rubrique={rubrique}
              isExpanded={expandedRubrique === rubrique.id}
              onToggle={() => setExpandedRubrique(expandedRubrique === rubrique.id ? null : rubrique.id)}
              expandedSousRubrique={expandedSousRubrique}
              setExpandedSousRubrique={setExpandedSousRubrique}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DomaineCard;