/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import AnalysisProgressBar from '@/components/callback/AnalysisProgressBar';
import AnalysisPreview from '@/components/callback/AnalysisPreview';
import LoadingState from '@/components/callback/LoadingState';
import { useAnimationVariants } from '@/hooks/commons/useAnimationVariants';
import { usePaymentCallback } from '@/hooks/commons/usePaymentCallback';
import { BackgroundBlobs, CompletionBanner, StatusCard, ActionButtons, SecurityNote } from '@/components/callback';

const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    isLoading, isProcessing, status, statusConfig, analysisStages,
    isGeneratingAnalysis, analysisCompleted, analysisProgress,
    currentStageIndex, currentStageMessage, consultationId,
    downloadUrl, shouldAutoRedirect, autoRedirectCountdown,
    handleViewConsultation, handleDownloadBook, handleRetry, handleGoHome,
  } = usePaymentCallback(token);

  const { containerVariants, itemVariants, pulseVariants } = useAnimationVariants();

  if (isLoading) {
    return <LoadingState />;
  }

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
};

export default PaymentCallbackContent;