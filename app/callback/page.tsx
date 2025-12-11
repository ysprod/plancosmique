/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  AnalysisCompletionBanner,
  AnalysisPreview,
  AnalysisProgress,
  PaymentActionsButtons,
  PaymentLoadingScreen,
  PaymentStatusIndicators,
  ProcessingBanner,
  StatusHeader,
  TransactionDetails,
  useAnimationVariants,
  usePaymentCallback,
} from './components';

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

  // 🌟 Loader initial
  if (isLoading) {
    return <PaymentLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-3 sm:p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-3xl"
        >
          {/* 🔮 Composant de progression d'analyse */}
          {isGeneratingAnalysis && (
            <AnalysisProgress
              analysisProgress={analysisProgress}
              currentStageIndex={currentStageIndex}
              currentStageMessage={currentStageMessage}
              analysisStages={analysisStages}
            />
          )}

          {/* 🎉 Bannière de succès après analyse */}
          {analysisCompleted && !isGeneratingAnalysis && <AnalysisCompletionBanner />}

          {/* 📖 Aperçu de l'analyse générée */}
          {analysisCompleted && !isGeneratingAnalysis && status === 'paid' && (
            <AnalysisPreview 
              consultationId={consultationId} 
              downloadUrl={downloadUrl}
              itemVariants={itemVariants}
            />
          )}

          {/* Carte principale */}
          <motion.div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <StatusHeader
              status={status}
              statusConfig={statusConfig}
              itemVariants={itemVariants}
              pulseVariants={pulseVariants}
            />

            <div className="p-4 sm:p-6 md:p-8">
              {statusConfig.showDetails && (
                <TransactionDetails
                  paymentData={null}
                  showDetails={statusConfig.showDetails}
                  itemVariants={itemVariants}
                />
              )}

              <ProcessingBanner
                isProcessing={isProcessing}
                isGeneratingAnalysis={isGeneratingAnalysis}
                itemVariants={itemVariants}
              />

              <PaymentStatusIndicators
                isProcessing={isProcessing}
                isGeneratingAnalysis={isGeneratingAnalysis}
                shouldAutoRedirect={shouldAutoRedirect}
                analysisCompleted={analysisCompleted}
                autoRedirectCountdown={autoRedirectCountdown}
                itemVariants={itemVariants}
              />

              <PaymentActionsButtons
                status={status}
                downloadUrl={downloadUrl}
                consultationId={consultationId}
                onViewConsultation={() => handleViewConsultation(consultationId)}
                onDownloadBook={() => handleDownloadBook(downloadUrl)}
                onRetry={() => handleRetry()}
                onGoHome={() => handleGoHome()}
                itemVariants={itemVariants}
              />
            </div>
          </motion.div>

          {/* Note de sécurité */}
          <motion.div variants={itemVariants} className="mt-3 sm:mt-6 text-center text-[10px] sm:text-sm text-gray-600 px-4">
            <p>
              💡 Ce paiement est sécurisé par{' '}
              <a
                href="https://moneyfusion.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline font-semibold"
              >
                MoneyFusion
              </a>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentCallbackContent;