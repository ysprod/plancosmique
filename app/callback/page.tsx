/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { usePaymentCallback } from './components/usePaymentCallback';
import { useAnimationVariants } from './components/useAnimationVariants';
import { CompletionBanner, StatusCard, ActionButtons, SecurityNote, BackgroundBlobs } from './components';
import type { AnalysisStage } from './components/types';

type AnalysisProgressBarProps = {
  analysisProgress: number;
  currentStageIndex: number;
  currentStageMessage: string;
  analysisStages: AnalysisStage[];
};

const AnalysisProgressBar = ({ analysisProgress, currentStageIndex, currentStageMessage, analysisStages }: AnalysisProgressBarProps) => {
  const currentStage = analysisStages[currentStageIndex] || analysisStages[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 relative">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-white/70 text-xs">Étape {currentStageIndex + 1}/{analysisStages.length}</p>
              <p className="text-white text-lg sm:text-xl font-semibold">{currentStage.label}</p>
            </div>
            <p className="text-white font-bold text-lg sm:text-xl">{analysisProgress}%</p>
          </div>

          <div className="w-full bg-white/20 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          <p className="text-white/80 text-sm mt-3 min-h-[32px]">{currentStageMessage}</p>
        </div>
      </div>
    </motion.div>
  );
};

type AnalysisPreviewProps = {
  consultationId: string | null;
  downloadUrl: string | null;
  itemVariants: Variants;
};

const AnalysisPreview = ({ consultationId, downloadUrl, itemVariants }: AnalysisPreviewProps) => {
  const cards = [
    {
      title: 'Consultation créée',
      description: consultationId ? `ID consultation: ${consultationId}` : 'Consultation prête',
      accent: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Téléchargement',
      description: downloadUrl ? 'Lien de téléchargement disponible' : 'Lien disponible après génération',
      accent: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-purple-200/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-3">
          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Aperçu de votre analyse</h3>
          <p className="text-xs sm:text-sm text-gray-600">Votre rapport est prêt à être consulté</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-purple-100"
          >
            <div className={`h-1 w-12 rounded-full mb-2 bg-gradient-to-r ${card.accent}`} />
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{card.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Composant principal de callback de paiement
 * Gère l'affichage de la progression d'analyse et des résultats
 */
const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const {
    isLoading,
    isProcessing,
    status,
    statusConfig,
    analysisStages,
    isGeneratingAnalysis,
    analysisCompleted,
    analysisProgress,
    currentStageIndex,
    currentStageMessage,
    consultationId,
    downloadUrl,
    shouldAutoRedirect,
    autoRedirectCountdown,
    handleViewConsultation,
    handleDownloadBook,
    handleRetry,
    handleGoHome,
  } = usePaymentCallback(token);

  const { containerVariants, itemVariants, pulseVariants } = useAnimationVariants();

  // ==================== LOADING STATE ====================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-50 animate-pulse" />
            <Loader2 className="w-16 h-16 text-purple-600 relative z-10" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Vérification du paiement
          </h2>
          
          <p className="text-gray-600 text-sm md:text-base px-4">
            Veuillez patienter pendant que nous vérifions votre transaction...
          </p>
        </motion.div>
      </div>
    );
  }

  // ==================== MAIN CONTENT ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Background animé */}
      <BackgroundBlobs />

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-3xl relative z-10"
        >
          {/* 🔮 Barre de progression d'analyse */}
          {isGeneratingAnalysis && (
            <AnalysisProgressBar
              analysisProgress={analysisProgress}
              currentStageIndex={currentStageIndex}
              currentStageMessage={currentStageMessage}
              analysisStages={analysisStages}
            />
          )}

          {/* 🎉 Bannière de succès */}
          {analysisCompleted && !isGeneratingAnalysis && (
            <CompletionBanner />
          )}

          {/* 📖 Aperçu de l'analyse */}
          {analysisCompleted && 
           !isGeneratingAnalysis && 
           status === 'paid' && 
           (consultationId || downloadUrl) && (
            <AnalysisPreview
              consultationId={consultationId}
              downloadUrl={downloadUrl}
              itemVariants={itemVariants}
            />
          )}

          {/* 📋 Carte de statut principale */}
          <StatusCard
            status={status}
            statusConfig={statusConfig}
            isProcessing={isProcessing}
            isGeneratingAnalysis={isGeneratingAnalysis}
            shouldAutoRedirect={shouldAutoRedirect}
            analysisCompleted={analysisCompleted}
            autoRedirectCountdown={autoRedirectCountdown}
            itemVariants={itemVariants}
            pulseVariants={pulseVariants}
          />

          {/* 🎬 Boutons d'action */}
          <ActionButtons
            status={status}
            downloadUrl={downloadUrl}
            consultationId={consultationId}
            onViewConsultation={() => handleViewConsultation(consultationId)}
            onDownloadBook={() => handleDownloadBook(downloadUrl)}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
            itemVariants={itemVariants}
          />

          {/* 🔒 Note de sécurité */}
          <SecurityNote itemVariants={itemVariants} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentCallbackContent;