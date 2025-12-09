/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { Clock, Loader2 } from 'lucide-react';

interface PaymentStatusIndicatorsProps {
  isProcessing: boolean;
  isGeneratingAnalysis: boolean;
  shouldAutoRedirect: boolean;
  analysisCompleted: boolean;
  autoRedirectCountdown: number;
  itemVariants: any;
}

/**
 * Composant pour afficher les indicateurs de statut et le countdown
 */
export function PaymentStatusIndicators({
  isProcessing,
  isGeneratingAnalysis,
  shouldAutoRedirect,
  analysisCompleted,
  autoRedirectCountdown,
  itemVariants,
}: PaymentStatusIndicatorsProps) {
  return (
    <>
      {/* Statut de traitement */}
      {isProcessing && !isGeneratingAnalysis && (
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3"
        >
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-spin flex-shrink-0" />
          <p className="text-blue-800 text-[10px] sm:text-sm">Traitement de votre commande en cours...</p>
        </motion.div>
      )}

      {/* ⚠️ COMPTE À REBOURS - UNIQUEMENT APRÈS ANALYSE */}
      {shouldAutoRedirect && analysisCompleted && autoRedirectCountdown > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <p className="text-purple-800 text-sm sm:text-base font-semibold">Redirection automatique dans</p>
          </div>
          <motion.div
            key={autoRedirectCountdown}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-4xl sm:text-6xl font-bold text-purple-600 mb-2"
          >
            {autoRedirectCountdown}
          </motion.div>
          <p className="text-purple-700 text-xs sm:text-sm">secondes...</p>
        </motion.div>
      )}
    </>
  );
}
