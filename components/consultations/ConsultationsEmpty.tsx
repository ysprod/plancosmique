'use client';

import { motion } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import { ConsultationType, ConsultationStatus } from '@/lib/interfaces';

interface ConsultationsEmptyProps {
  consultationsLength: number;
  setSearchQuery: (v: string) => void;
  setTypeFilter: (v: ConsultationType | 'ALL') => void;
  setStatusFilter: (v: ConsultationStatus | 'ALL') => void;
}

export default function ConsultationsEmpty({ consultationsLength, setSearchQuery, setTypeFilter, setStatusFilter }: ConsultationsEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
    >
      <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">
        {consultationsLength === 0
          ? 'Aucune consultation pour le moment'
          : 'Aucun résultat trouvé'}
      </h3>
      <p className="text-purple-200 mb-6">
        {consultationsLength === 0
          ? 'Commandez votre première analyse astrologique pour découvrir votre destinée'
          : 'Essayez de modifier vos filtres de recherche'}
      </p>
      {consultationsLength > 0 && (
        <button
          onClick={() => {
            setSearchQuery('');
            setTypeFilter('ALL');
            setStatusFilter('ALL');
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          <Filter className="w-5 h-5" />
          Réinitialiser les filtres
        </button>
      )}
    </motion.div>
  );
}
