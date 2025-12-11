/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    AnalysisCompletionBanner,
    AnalysisPreview,
    AnalysisProgress,
    PaymentActionsButtons,
    PaymentLoadingScreen,
    PaymentStatusIndicators,
    TransactionDetails,
    useAnalysisProgress,
    useAnalysisStages,
    useAnimationVariants,
    useAutoRedirect,
    usePaymentActions,
    usePaymentStatus,
    usePaymentVerification,
    useStatusConfig,
    type PaymentData,
} from './components';

const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { verifyPayment, processConsultationPayment, processBookPayment } = usePaymentVerification();

  // États de base
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hooks spécialisés
  const { status, setStatus, error, setError, normalizePaymentStatus } = usePaymentStatus();
  const analysisStages = useAnalysisStages();
  const {
    isGeneratingAnalysis,
    analysisCompleted,
    analysisProgress,
    currentStageIndex,
    currentStageMessage,
    startAnalysisAnimation,
  } = useAnalysisProgress(analysisStages);
  const { shouldAutoRedirect, setShouldAutoRedirect, autoRedirectCountdown, startCountdown } =
    useAutoRedirect();
  const { handleViewConsultation, handleDownloadBook, handleRetry, handleGoHome, handleAutoRedirect } =
    usePaymentActions();
  const statusConfig = useStatusConfig(status, error, downloadUrl);
  const { containerVariants, itemVariants, pulseVariants } = useAnimationVariants();

  // 🔹 Logique principale de vérification du paiement
  useEffect(() => {
    const initializePaymentVerification = async () => {
      if (!token) {
        setStatus('error');
        setError('Token de paiement manquant');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsProcessing(true);

        console.log('🔄 Vérification du paiement...');
        const verificationResult = await verifyPayment(token);

        if (!verificationResult.success || !verificationResult.data) {
          setStatus('error');
          setError(verificationResult.message || 'Impossible de vérifier le paiement');
          setIsLoading(false);
          setIsProcessing(false);
          return;
        }

        // La réponse du backend NestJS retourne un objet simplifié
        const backendPaymentData = verificationResult.data as any;
        const normalizedStatus = normalizePaymentStatus(backendPaymentData.status);
        setStatus(normalizedStatus);

        if (normalizedStatus === 'paid') {
          console.log('✅ Paiement confirmé, traitement du callback...');
          await startAnalysisAnimation();
          
          // Créer un objet PaymentData compatible pour le traitement
          const paymentDetails: PaymentData = {
            _id: backendPaymentData._id,
            tokenPay: token || '',
            numeroSend: '',
            nomclient: '',
            Montant: backendPaymentData.amount,
            frais: 0,
            statut: 'paid',
            createdAt: new Date().toISOString(),
            personal_Info: [],
          };
          
          // Appeler la méthode de traitement appropriée
          // Pour l'instant, on suppose une consultation (sera à adapter selon les données disponibles)
          const callbackResult = await processConsultationPayment(token || '', paymentDetails);

          if (callbackResult.success) {
            setConsultationId(callbackResult.consultationId || null);
            setDownloadUrl(callbackResult.downloadUrl || null);
            setShouldAutoRedirect(true);
          } else {
            setStatus('error');
            setError(callbackResult.message || 'Erreur lors du traitement du paiement');
          }
        } else if (normalizedStatus === 'already_used') {
          console.log('⚠️ Token déjà utilisé — relance de l\'affichage d\'analyse');
          await startAnalysisAnimation();
          setShouldAutoRedirect(true);
        } else if (normalizedStatus === 'pending') {
          console.log('⏳ Paiement en attente...');
        } else {
          console.log(`❌ Statut du paiement: ${normalizedStatus}`);
        }
      } catch (error: any) {
        console.error('❌ Erreur générale:', error);
        setStatus('error');
        setError(error.message || 'Une erreur inattendue est survenue');
      } finally {
        setIsLoading(false);
        setIsProcessing(false);
      }
    };

    initializePaymentVerification();
  }, [token, verifyPayment, processConsultationPayment, processBookPayment, normalizePaymentStatus, setStatus, setError, startAnalysisAnimation, setShouldAutoRedirect]);

  // 🔹 Gestion du compte à rebours - NE DÉMARRE QU'APRÈS L'ANALYSE
  useEffect(() => {
    if (!shouldAutoRedirect || !analysisCompleted) return;

    console.log('⏱️ Démarrage du compte à rebours de redirection...');

    const cleanup = startCountdown(() => {
      handleAutoRedirect(null, consultationId, downloadUrl);
    });

    return cleanup;
  }, [shouldAutoRedirect, analysisCompleted, startCountdown, handleAutoRedirect, consultationId, downloadUrl]);

  // 🌟 Loader initial
  if (isLoading) {
    return <PaymentLoadingScreen />;
  }

  const StatusIcon = statusConfig.icon;

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
            {/* Header avec gradient */}
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

            {/* Corps de la carte */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Détails du paiement */}
              {statusConfig.showDetails && <TransactionDetails paymentData={null} showDetails={statusConfig.showDetails} itemVariants={itemVariants} />}

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

              {/* Indicateurs de statut et compte à rebours */}
              <PaymentStatusIndicators
                isProcessing={isProcessing}
                isGeneratingAnalysis={isGeneratingAnalysis}
                shouldAutoRedirect={shouldAutoRedirect}
                analysisCompleted={analysisCompleted}
                autoRedirectCountdown={autoRedirectCountdown}
                itemVariants={itemVariants}
              />

              {/* Actions */}
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