import { motion } from 'framer-motion';
import { Eye, Download, Hash, Repeat } from 'lucide-react';
import { formatDate } from '@/lib/functions';
import { Consultation, ResultData } from '@/lib/interfaces';
import React from 'react';

interface NumerologyConsultationCardProps {
  consultation: Consultation;
  index: number;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const NumerologyConsultationCard: React.FC<NumerologyConsultationCardProps> = ({ consultation, index, onView, onDownload }) => {
  // resultData: { numbers: [...], cycles: [...] }
  const resultData = consultation.resultData as ResultData | null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
    >
      <h3 className="text-xl font-bold text-white mb-2">Analyse Numérologique</h3>
      <div className="mb-3 text-purple-200 text-sm">{consultation.title}</div>
      <div className="mb-4 text-xs text-purple-300">Créé le {formatDate(consultation.createdAt)}</div>
      {resultData?.numbers && Array.isArray(resultData.numbers) && (
        <div className="mb-4">
          <div className="font-semibold text-amber-400 mb-1 flex items-center gap-2"><Hash className="w-4 h-4" />Nombres personnels</div>
          <ul className="list-disc ml-6 text-white text-sm">
            {resultData.numbers.map((num, i) => (
              <li key={i}>{num.label}: <span className="font-bold text-amber-300">{num.value}</span></li>
            ))}
          </ul>
        </div>
      )}
      {resultData?.cycles && Array.isArray(resultData.cycles) && (
        <div className="mb-4">
          <div className="font-semibold text-pink-400 mb-1 flex items-center gap-2"><Repeat className="w-4 h-4" />Cycles personnels</div>
          <ul className="list-disc ml-6 text-white text-sm">
            {resultData.cycles.map((cycle, i) => (
              <li key={i}>{cycle.label}: <span className="font-bold text-pink-300">{cycle.value}</span></li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onView(consultation._id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all font-semibold"
        >
          <Eye className="w-4 h-4" />
          Voir l'analyse
        </button>
        <button
          onClick={() => onDownload(consultation._id)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all font-semibold"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </motion.div>
  );
};
export default NumerologyConsultationCard;
