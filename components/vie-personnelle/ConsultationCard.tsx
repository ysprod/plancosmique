'use client';

import ConsultationButton from '@/components/consultations/ConsultationButton';
import { useConsultationChoiceStatus } from '@/hooks/consultations/useConsultationChoiceStatus';
import { useAuth } from '@/lib/auth/AuthContext';
import { ConsultationChoice, DoneChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
  onSelect: () => void;
  doneChoice?: DoneChoice | null;
  doneCount?: number; // Nombre de fois déjà effectuée
  onViewHistory?: () => void; // Callback pour voir l'historique
}> = ({ choice, onSelect, doneChoice, doneCount = 0, onViewHistory }) => {
  const { user } = useAuth();
  const { status, loading } = useConsultationChoiceStatus(user?._id, choice._id);
  
  const isDone = !!doneChoice;
  const isRepeatable = choice.frequence && choice.frequence !== 'UNE_FOIS_VIE';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white shadow-lg rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all text-center"
    >
      <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
      
      {/* Affichage du bouton avec les 3 états gérés automatiquement */}
      {loading ? (
        <div className="w-full px-4 py-3 bg-gray-200 rounded-xl animate-pulse">
          <span className="text-gray-500">Chargement...</span>
        </div>
      ) : status ? (
        <div className="space-y-2">
          <ConsultationButton
            status={status.buttonStatus}
            choiceId={choice._id || ''}
            consultationId={status.consultationId}
            onConsult={onSelect}
          />
          
          {/* Affichage de l'historique pour les consultations répétables */}
          {isRepeatable && doneCount > 0 && onViewHistory && (
            <button
              onClick={onViewHistory}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:scale-105 hover:shadow-lg transition-all"
            >
              <History className="w-5 h-5" />
              Historique ({doneCount})
            </button>
          )}
        </div>
      ) : (
        // Fallback si pas de statut (ne devrait pas arriver)
        <button
          onClick={onSelect}
          className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
        >
          Consulter
        </button>
      )}
    </motion.div>
  );
};

export default ConsultationCard;