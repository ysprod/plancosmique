import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Rubrique, SousRubrique } from "@/lib/config/rubriques.config";
import SousRubriqueCard from "./SousRubriqueCard";

interface RubriqueCardProps {
  rubrique: Rubrique;
  isExpanded: boolean;
  onToggle: () => void;
  expandedSousRubrique: string | null;
  setExpandedSousRubrique: (id: string | null) => void;
}

const RubriqueCard: React.FC<RubriqueCardProps> = ({
  rubrique,
  isExpanded,
  onToggle,
  expandedSousRubrique,
  setExpandedSousRubrique
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <Star size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">{rubrique.titre}</h3>
            <p className="text-gray-600 text-sm">{rubrique.description}</p>
            <p className="text-xs text-gray-500 mt-1">{rubrique.sousRubriques.length} sous-rubrique(s)</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-4 bg-gray-50 space-y-3"
        >
          {rubrique.sousRubriques.map((sousRubrique: SousRubrique) => (
            <SousRubriqueCard
              key={sousRubrique.id}
              sousRubrique={sousRubrique}
              isExpanded={expandedSousRubrique === sousRubrique.id}
              onToggle={() => setExpandedSousRubrique(expandedSousRubrique === sousRubrique.id ? null : sousRubrique.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RubriqueCard;
