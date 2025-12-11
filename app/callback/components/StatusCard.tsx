'use client';

import { motion, type Variants } from 'framer-motion';
import { Clock, Loader2 } from 'lucide-react';
import type { PaymentStatus, StatusConfig } from './types';

interface StatusCardProps {
  status: PaymentStatus;
  statusConfig: StatusConfig;
  isProcessing: boolean;
  isGeneratingAnalysis: boolean;
  shouldAutoRedirect: boolean;
  analysisCompleted: boolean;
  autoRedirectCountdown: number;
  itemVariants: Variants;
  pulseVariants: Variants;
}

/**
 * Composant de carte de statut principal
 * Affiche le statut du paiement avec icône, titre et description
 */
export function StatusCard({
  status,
  statusConfig,
  isProcessing,
  isGeneratingAnalysis,
  shouldAutoRedirect,
  analysisCompleted,
  autoRedirectCountdown,
  itemVariants,
  pulseVariants,
}: StatusCardProps) {
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Header avec statut */}
      <div className={`bg-gradient-to-r ${statusConfig.gradient} p-5 sm:p-8 text-center relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            x: ['0%', '100%'],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          variants={pulseVariants}
          animate={status === 'pending' ? 'pulse' : ''}
          className="relative inline-block mb-3 sm:mb-6"
        >
          <div className={`${statusConfig.iconBg} rounded-full p-3 sm:p-6 inline-block`}>
            <StatusIcon className={`w-10 h-10 sm:w-16 sm:h-16 ${statusConfig.iconColor}`} />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-xl sm:text-3xl md:text-4xl font-bold ${statusConfig.color} mb-2`}
        >
          {statusConfig.title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-700 text-xs sm:text-base md:text-lg max-w-xl mx-auto px-2"
        >
          {statusConfig.description}
        </motion.p>
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Détails de transaction (si applicable) */}
        {statusConfig.showDetails && (
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 space-y-2 sm:space-y-3"
          >
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
              Détails de la transaction
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-sm">
              <div>
                <span className="text-gray-600">Montant :</span>
                <span className="font-semibold text-gray-900 ml-2">0 FCFA</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Banner de traitement */}
        {isProcessing && !isGeneratingAnalysis && (
          <motion.div
            variants={itemVariants}
            className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3"
          >
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-spin flex-shrink-0" />
            <p className="text-blue-800 text-[10px] sm:text-sm">
              Traitement de votre commande en cours...
            </p>
          </motion.div>
        )}

        {/* Compte à rebours de redirection */}
        {shouldAutoRedirect && analysisCompleted && autoRedirectCountdown > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <p className="text-purple-800 text-sm sm:text-base font-semibold">
                Redirection automatique dans
              </p>
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
      </div>
    </motion.div>
  );
}