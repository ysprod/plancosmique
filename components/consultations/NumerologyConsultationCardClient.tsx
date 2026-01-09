'use client';
import { formatDate } from '@/lib/functions';
import { Consultation, ResultData } from '@/lib/interfaces';
import { Download, Hash, Repeat } from 'lucide-react';
import React from 'react';

interface NumerologyConsultationCardClientProps {
  consultation: Consultation;
  index?: number;
}

const NumerologyConsultationCardClient: React.FC<NumerologyConsultationCardClientProps> = ({ consultation, index = 0 }) => {
  const resultData = consultation.resultData as ResultData | null;
  
  const handleDownload = () => {
    window.open(`/api/consultations/${consultation._id}/download-pdf`, '_blank');
  };

  return (
    <div
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
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all font-semibold"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </div>
  );
};
export default NumerologyConsultationCardClient;
