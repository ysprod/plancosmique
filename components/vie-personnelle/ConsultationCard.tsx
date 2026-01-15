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
  const isDone = !!doneChoice;
  const isRepeatable = choice.frequence && choice.frequence !== 'UNE_FOIS_VIE';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white shadow-lg rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all"
    >
      <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
      
      {/* Affichage pour consultation unique (UNE_FOIS_VIE) */}
      {!isRepeatable && isDone ? (
        <button
          onClick={() => {
            window.location.href = `/secured/consultations/${doneChoice!.consultationId}`;
          }}
          className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 hover:shadow-lg text-center transition-all"
        >
          Voir l'analyse
        </button>
      ) : !isRepeatable && !isDone ? (
        <button
          onClick={onSelect}
          className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
        >
          Consulter
        </button>
      ) : null}
      
      {/* Affichage pour consultation répétable (plusieurs fois possible) */}
      {isRepeatable && (
        <div className="flex gap-2">
          <button
            onClick={onSelect}
            className="flex-1 px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
          >
            Consulter
          </button>
          
          {doneCount > 0 && onViewHistory && (
            <button
              onClick={onViewHistory}
              className="flex items-center gap-2 px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:scale-105 hover:shadow-lg transition-all"
            >
              <History className="w-5 h-5" />
              Historique ({doneCount})
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ConsultationCard;