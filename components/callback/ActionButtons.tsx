'use client';
import { motion, type Variants } from 'framer-motion';
import { Download, Eye, Home, RefreshCw, ArrowRight } from 'lucide-react';
import type { PaymentStatus } from './types';

interface ActionButtonsProps {
  status: PaymentStatus;
  downloadUrl: string | null;
  consultationId: string | null;
  onViewConsultation: () => void;
  onDownloadBook: () => void;
  onRetry: () => void;
  onGoHome: () => void;
  itemVariants: Variants;
}
 
export function ActionButtons({
  status,
  downloadUrl,
  consultationId,
  onViewConsultation,
  onDownloadBook,
  onRetry,
  onGoHome,
  itemVariants,
}: ActionButtonsProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6"
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {status === 'paid' && downloadUrl && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownloadBook}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Télécharger le livre
          </motion.button>
        )}

        {/* Bouton Voir Consultation */}
        {status === 'paid' && consultationId && !downloadUrl && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewConsultation}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            Voir ma consultation
          </motion.button>
        )}

        {/* Bouton Réessayer (pour les échecs) */}
        {(status === 'failure' || status === 'error') && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Réessayer
          </motion.button>
        )}

        {/* Bouton Retour Profil (toujours visible) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoHome}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Retour au profil</span>
          <span className="sm:hidden">Profil</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}