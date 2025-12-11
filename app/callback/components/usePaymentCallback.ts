/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePaymentVerification } from './usePaymentVerification';
import { usePaymentStatus } from './usePaymentStatus';
import { useAnalysisStages } from './useAnalysisStages';
import { useAnalysisProgress } from './useAnalysisProgress';
import { useAutoRedirect } from './useAutoRedirect';
import { usePaymentActions } from './usePaymentActions';
import { useStatusConfig } from './useStatusConfig';
import type { PaymentData } from './types';

export function usePaymentCallback(token: string | null) {
  const { verifyPayment, processConsultationPayment } = usePaymentVerification();

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

  // Vérification et traitement du paiement
  const initializePaymentVerification = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setError('Token de paiement manquant');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsProcessing(true);

      const verificationResult = await verifyPayment(token);

      if (!verificationResult.success || !verificationResult.data) {
        setStatus('error');
        setError(verificationResult.message || 'Impossible de vérifier le paiement');
        setIsLoading(false);
        setIsProcessing(false);
        return;
      }

      const backendPaymentData = verificationResult.data as any;
      const normalizedStatus = normalizePaymentStatus(backendPaymentData.status);
      setStatus(normalizedStatus);

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

      const handlePaid = async () => {
        await startAnalysisAnimation();
        const callbackResult = await processConsultationPayment(token || '', paymentDetails);

        if (callbackResult.success) {
          setConsultationId(callbackResult.consultationId || null);
          setDownloadUrl(callbackResult.downloadUrl || null);
          setShouldAutoRedirect(true);
          return;
        }

        const msg = (callbackResult.message || '').toLowerCase();
        const isAlreadyProcessed = msg.includes('déjà') || msg.includes('already');

        if (isAlreadyProcessed) {
          // Traiter comme un succès déjà consommé : on n'affiche pas d'erreur bloquante
          setStatus('already_used');
          setShouldAutoRedirect(true);
          return;
        }

        setStatus('error');
        setError(callbackResult.message || 'Erreur lors du traitement du paiement');
      };

      if (normalizedStatus === 'paid') {
        await handlePaid();
      } else if (normalizedStatus === 'already_used') {
        await startAnalysisAnimation();
        setShouldAutoRedirect(true);
      } else if (normalizedStatus === 'pending') {
        // rien de plus à faire
      }
    } catch (err: any) {
      setStatus('error');
      setError(err?.message || 'Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  }, [token, verifyPayment, processConsultationPayment, normalizePaymentStatus, setStatus, setError, startAnalysisAnimation, setShouldAutoRedirect]);

  useEffect(() => {
    initializePaymentVerification();
  }, [initializePaymentVerification]);

  // Compte à rebours auto-redirect après analyse
  useEffect(() => {
    if (!shouldAutoRedirect || !analysisCompleted) return;

    const cleanup = startCountdown(() => {
      handleAutoRedirect(null, consultationId, downloadUrl);
    });

    return cleanup;
  }, [shouldAutoRedirect, analysisCompleted, startCountdown, handleAutoRedirect, consultationId, downloadUrl]);

  return {
    // états globaux
    isLoading,
    isProcessing,
    status,
    statusConfig,

    // analyse
    analysisStages,
    isGeneratingAnalysis,
    analysisCompleted,
    analysisProgress,
    currentStageIndex,
    currentStageMessage,
    startAnalysisAnimation,

    // données
    consultationId,
    downloadUrl,

    // redirection
    shouldAutoRedirect,
    autoRedirectCountdown,

    // actions
    handleViewConsultation,
    handleDownloadBook,
    handleRetry,
    handleGoHome,
  };
}
