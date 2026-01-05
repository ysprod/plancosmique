import React from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { SousRubrique, ConsultationConfig } from "@/lib/config/rubriques.config";
import ConsultationCard from "./ConsultationCard";

interface SousRubriqueCardProps {
  sousRubrique: SousRubrique;
  isExpanded: boolean;
  onToggle: () => void;
}

const SousRubriqueCard: React.FC<SousRubriqueCardProps> = ({
  sousRubrique,
  isExpanded,
  onToggle
}) => {
  return (
    <div className="bg-white rounded-lg shadow border border-green-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
            <TrendingUp size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-800">{sousRubrique.titre}</h4>
            <p className="text-gray-600 text-xs">{sousRubrique.description}</p>
            <p className="text-xs text-gray-500 mt-1">{sousRubrique.consultations.length} consultation(s)</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-3 bg-gray-50 space-y-2"
        >
          {sousRubrique.consultations.map((consultation: ConsultationConfig) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SousRubriqueCard;
