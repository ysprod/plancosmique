'use client';
import { ActionButtons, BackgroundBlobs, CompletionBanner, SecurityNote, StatusCard, useAnimationVariants } from '@/components/callback';
import AnalysisPreview from '@/components/callback/AnalysisPreview';
import AnalysisProgressBar from '@/components/callback/AnalysisProgressBar';
import LoadingState from '@/components/callback/LoadingState';
import { usePaymentCallback } from '@/hooks/commons/usePaymentCallback';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function PaymentCallbackPageClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    isLoading, isProcessing, status, statusConfig, analysisStages, currentStageIndex,
    isGeneratingAnalysis, analysisCompleted, analysisProgress, autoRedirectCountdown,
    currentStageMessage, consultationId, downloadUrl, shouldAutoRedirect,
    handleViewConsultation, handleDownloadBook, handleRetry, handleGoHome,
  } = usePaymentCallback(token);

  const { containerVariants, itemVariants, pulseVariants } = useAnimationVariants();

  if (isLoading) { return <LoadingState />; }

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
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
          <AnalysisProgressBar
            analysisProgress={analysisProgress}
            currentStageIndex={currentStageIndex}
            currentStageMessage={currentStageMessage}
            analysisStages={analysisStages}
          />
          {isGeneratingAnalysis && (
            <AnalysisProgressBar
              analysisProgress={analysisProgress}
              currentStageIndex={currentStageIndex}
              currentStageMessage={currentStageMessage}
              analysisStages={analysisStages}
            />
          )}
          {analysisCompleted && !isGeneratingAnalysis && (
            <CompletionBanner />
          )}
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

          <ActionButtons
            status={status}
            downloadUrl={downloadUrl}
            consultationId={consultationId}
            onViewConsultation={() => handleViewConsultation()}
            onDownloadBook={() => handleDownloadBook()}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
            itemVariants={itemVariants}
          />

          <SecurityNote itemVariants={itemVariants} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}