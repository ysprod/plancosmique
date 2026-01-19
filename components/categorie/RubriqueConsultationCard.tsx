'use client';
import { ConsultationChoice, EnrichedChoice } from '@/lib/interfaces';
import { ConsultationChoiceStatusDto } from '@/lib/api/services/consultation-status.service';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Eye } from 'lucide-react';

interface RubriqueConsultationCardProps {
    enrichedChoice: EnrichedChoice;
//   choice: ConsultationChoice;
//   status: ConsultationChoiceStatusDto;
  onSelect: () => void;
}

export default function RubriqueConsultationCard({
//   choice,
//   status,
enrichedChoice,
  onSelect,
}: RubriqueConsultationCardProps) {
  
  const renderButton = () => {
    switch (enrichedChoice.status.buttonStatus) {
      case 'CONSULTER':
        return (
          <button
            onClick={onSelect}
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
          >
            Consulter
          </button>
        );
      
      case 'RÉPONSE EN ATTENTE':
        return (
          <button
            disabled
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-75 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5 animate-pulse" />
            Réponse en attente
          </button>
        );
      
      case "VOIR L'ANALYSE":
        return (
          <button
            onClick={() => {
              if (enrichedChoice.status.consultationId) {
                window.location.href = `/secured/consultations/${enrichedChoice.status.consultationId}`;
              }
            }}
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Voir l'analyse
          </button>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white shadow-lg rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all text-center"
    >
      <h2 className="font-bold text-purple-700 text-lg mb-3">{enrichedChoice.choice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{enrichedChoice.choice.description}</p>
      
      {/* Indicateur de consultation active */}
      {enrichedChoice.status.hasActiveConsultation && (
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <CheckCircle className="w-4 h-4" />
          <span>Consultation active</span>
        </div>
      )}
      
      {renderButton()}
    </motion.div>
  );
}
