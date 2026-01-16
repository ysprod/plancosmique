'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ConsultationErrorProps {
  error: string | null;
  onBack: () => void;
}

export default function ConsultationError({ error, onBack }: ConsultationErrorProps) {
  return (
    <div className="bg-gradient-to-br from-red-900 via-orange-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
      >
        <AlertCircle className="w-14 h-14 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Erreur</h2>
        <p className="text-sm sm:text-base text-red-200 mb-6">{error || 'Analyse non disponible'}</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all active:scale-95"
        >
          Retour aux consultations
        </button>
      </motion.div>
    </div>
  );
}
