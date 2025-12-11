/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { api } from '@/lib/api/client';
import {
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Clock,
  XCircle,
  BookOpen,
  Compass,
  Heart,
  Sparkles,
  Stars,
  Target,
  Telescope,
  Zap,
} from 'lucide-react';
import type { PaymentData, PaymentStatus, StatusConfig, AnalysisStage } from './types';

export function usePaymentCallback(token: string | null) {
  // Inline usePaymentVerification hook
  const verifyPayment = useCallback(async (paymentToken: string) => {
    try {
      if (!paymentToken || paymentToken.trim() === '') {
        return {
          success: false,
          status: 'error',
          message: 'Token de paiement manquant',
        };
      }

      console.log('🔍 Vérification paiement:', paymentToken);

      const response = await api.get(`/payments/verify?token=${paymentToken}`);

      console.log('✅ Paiement vérifié:', response.data.status);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur vérification paiement:', error.message);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de vérification du paiement',
      };
    }
  }, []);

  const processConsultationPayment = useCallback(
    async (paymentToken: string, paymentData: PaymentData) => {
      try {
        if (!paymentToken) {
          throw new Error('Token de paiement manquant');
        }

        console.log('📊 Traitement consultation:', {
          token: paymentToken,
          type: 'consultation',
        });

        const response = await api.post('/payments/process-consultation', {
          token: paymentToken,
          paymentData,
        });

        console.log('✅ Consultation traitée:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('❌ Erreur traitement consultation:', error.message);
        return {
          success: false,
          status: 'error',
          message: error.message || 'Erreur de traitement du paiement',
        };
      }
    },
    []
  );

  // États de base
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [manualAnalysisCompleted, setManualAnalysisCompleted] = useState(false);

  // Inline usePaymentStatus hook
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [error, setError] = useState<string>('');

  const normalizePaymentStatus = useCallback((apiStatus: string): PaymentStatus => {
    const normalized = apiStatus?.toLowerCase?.() || '';

    const statusMap: Record<string, PaymentStatus> = {
      pending: 'pending',
      paid: 'paid',
      completed: 'paid',
      failure: 'failure',
      'no paid': 'no paid',
      already_used: 'already_used',
    };

    return statusMap[normalized] || 'error';
  }, []);
  // Inline useAnalysisStages hook
  const analysisStages = useMemo<AnalysisStage[]>(
    () => [
      {
        progress: 5,
        label: 'Initialisation',
        icon: Sparkles,
        color: 'from-blue-400 to-cyan-400',
        description: 'Préparation des données de naissance...',
        duration: 1000,
      },
      {
        progress: 15,
        label: 'Positions Planétaires',
        icon: Stars,
        color: 'from-purple-400 to-pink-400',
        description: 'Calcul des positions célestes à votre naissance...',
        duration: 3000,
      },
      {
        progress: 30,
        label: 'Aspects Astrologiques',
        icon: Zap,
        color: 'from-yellow-400 to-orange-400',
        description: 'Analyse des interactions entre les planètes...',
        duration: 4000,
      },
      {
        progress: 45,
        label: 'Thème Natal',
        icon: Telescope,
        color: 'from-indigo-400 to-purple-400',
        description: 'Construction de votre carte du ciel personnalisée...',
        duration: 5000,
      },
      {
        progress: 60,
        label: 'Maisons Astrologiques',
        icon: Compass,
        color: 'from-green-400 to-teal-400',
        description: 'Interprétation des 12 maisons de votre thème...',
        duration: 4000,
      },
      {
        progress: 75,
        label: 'Mission de Vie',
        icon: Target,
        color: 'from-pink-400 to-rose-400',
        description: 'Dévoilement de votre chemin de vie karmique...',
        duration: 5000,
      },
      {
        progress: 88,
        label: 'Personnalité',
        icon: Heart,
        color: 'from-red-400 to-pink-400',
        description: 'Analyse approfondie de votre personnalité...',
        duration: 3000,
      },
      {
        progress: 95,
        label: 'Finalisation',
        icon: BookOpen,
        color: 'from-violet-400 to-purple-400',
        description: 'Compilation de votre rapport complet...',
        duration: 2000,
      },
      {
        progress: 100,
        label: 'Terminé',
        icon: CheckCircle,
        color: 'from-green-400 to-emerald-400',
        description: 'Votre analyse astrologique est prête !',
        duration: 1000,
      },
    ],
    []
  );

  // Inline useRealtimeAnalysisProgress hook
  const [sseProgress, setSseProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('init');
  const [sseStageIndex, setSseStageIndex] = useState(0);
  const [sseStageMessage, setSseStageMessage] = useState('Preparation...');
  const [sseCompleted, setSseCompleted] = useState(false);
  const [sseConnected, setSseConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000;

  useEffect(() => {
    if (!isGeneratingAnalysis || !consultationId) {
      return;
    }

    let isMounted = true;

    const connect = () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/v1/analysis/progress/${consultationId}`;

        console.log('SSE Connection:', url);

        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          if (!isMounted) return;
          
          console.log('SSE connected');
          setSseConnected(true);
          reconnectAttemptsRef.current = 0;
        };

        eventSource.onmessage = (event) => {
          if (!isMounted) return;

          try {
            const data = JSON.parse(event.data);
            
            setSseProgress(data.progress);
            setCurrentStage(data.stage);
            setSseStageIndex(data.stageIndex);
            setSseStageMessage(data.message);
            setSseCompleted(data.completed);

            if (data.completed) {
              eventSource.close();
            }
          } catch (err) {
            console.error('SSE parsing error:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('SSE error:', err);
          
          eventSource.close();
          
          if (!isMounted) return;

          setSseConnected(false);

          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current++;
            const delay = RECONNECT_DELAY * reconnectAttemptsRef.current;
            
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted && !sseCompleted) {
                connect();
              }
            }, delay);
          } else {
            console.log('Max reconnection attempts reached');
          }
        };

      } catch (err) {
        console.error('EventSource creation error:', err);
      }
    };

    connect();

    return () => {
      isMounted = false;
      
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [consultationId, isGeneratingAnalysis, sseCompleted]);

  const analysisCompleted = manualAnalysisCompleted || sseCompleted;
  const analysisProgress = manualAnalysisCompleted ? 100 : sseProgress;
  const currentStageIndex = manualAnalysisCompleted
    ? Math.max(analysisStages.length - 1, 0)
    : sseStageIndex;
  const currentStageMessage = manualAnalysisCompleted
    ? 'Analyse déjà générée. Redirection en cours...'
    : sseStageMessage || 'Préparation...';
  const router = useRouter();

  // Inline useAutoRedirect state
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number>(15);

  const startCountdown = useCallback((callback: () => void) => {
    setShouldAutoRedirect(true);
    setAutoRedirectCountdown(15);

    const interval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          callback();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Inline usePaymentActions hook
  const handleViewConsultation = useCallback(
    (consultationId: string | null) => {
      if (consultationId) {
        router.push(`/protected/consultations/${consultationId}`);
      }
    },
    [router]
  );

  const handleDownloadBook = useCallback((downloadUrl: string | null) => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    router.push('/protected/profil');
  }, [router]);

  const handleAutoRedirect = useCallback(
    (paymentData: PaymentData | null, consultationId: string | null, downloadUrl: string | null) => {
      const personalInfo = paymentData?.personal_Info?.[0];
      const type = personalInfo?.type || 'consultation';

      if (type === 'book' && downloadUrl) {
        router.push('/protected/bibliotheque');
      } else if (consultationId) {
        router.push(`/protected/consultations/${consultationId}`);
      } else {
        router.push('/protected/consultations');
      }
    },
    [router]
  );
  const statusConfig = useMemo<StatusConfig>(() => {
    const configs: Record<PaymentStatus, StatusConfig> = {
      pending: {
        icon: Clock,
        title: 'Paiement en cours',
        description: 'Votre paiement est en cours de traitement. Veuillez patienter...',
        color: 'text-yellow-600',
        gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        showDetails: true,
      },
      paid: {
        icon: CheckCircle2,
        title: 'Paiement réussi !',
        description: downloadUrl
          ? 'Votre livre est maintenant disponible dans votre bibliothèque.'
          : 'Votre consultation a été créée avec succès !',
        color: 'text-green-600',
        gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        showDetails: true,
      },
      failure: {
        icon: XCircle,
        title: 'Paiement échoué',
        description: 'Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.',
        color: 'text-red-600',
        gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        showDetails: true,
      },
      'no paid': {
        icon: AlertTriangle,
        title: 'Paiement non effectué',
        description: "Le paiement n'a pas été complété. Vous pouvez réessayer depuis votre profil.",
        color: 'text-orange-600',
        gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        showDetails: false,
      },
      already_used: {
        icon: CheckCircle,
        title: 'Paiement déjà enregistré',
        description: 'Cette transaction a déjà été validée. Retrouvez votre contenu dans vos consultations ou votre bibliothèque.',
        color: 'text-emerald-700',
        gradient: 'from-emerald-500/20 via-teal-500/20 to-green-500/20',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-700',
        showDetails: false,
      },
      error: {
        icon: XCircle,
        title: 'Erreur',
        description: error || 'Une erreur inattendue est survenue.',
        color: 'text-red-600',
        gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        showDetails: false,
      },
    };

    return configs[status];
  }, [status, error, downloadUrl]);

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
        setManualAnalysisCompleted(false);
        setIsGeneratingAnalysis(true);
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
          // Traiter comme un succès déjà consommé : marquer comme analysé et rediriger
          setStatus('already_used');
          setManualAnalysisCompleted(true);
          setIsGeneratingAnalysis(false);
          setConsultationId(callbackResult.consultationId || null);
          setDownloadUrl(callbackResult.downloadUrl || null);
          setShouldAutoRedirect(true);
          return;
        }

        setStatus('error');
        setError(callbackResult.message || 'Erreur lors du traitement du paiement');
        setIsGeneratingAnalysis(false);
        setManualAnalysisCompleted(false);
      };

      if (normalizedStatus === 'paid') {
        await handlePaid();
      } else if (normalizedStatus === 'already_used') {
        setManualAnalysisCompleted(true);
        setIsGeneratingAnalysis(false);
        setShouldAutoRedirect(true);
      } else if (normalizedStatus === 'pending') {
        // rien de plus à faire
      }
    } catch (err: any) {
      setStatus('error');
      setError(err?.message || 'Une erreur inattendue est survenue');
      setIsGeneratingAnalysis(false);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  }, [token, verifyPayment, processConsultationPayment, normalizePaymentStatus, setStatus, setError]);

  useEffect(() => {
    initializePaymentVerification();
  }, [initializePaymentVerification]);

  useEffect(() => {
    if (analysisCompleted) {
      setIsGeneratingAnalysis(false);
    }
  }, [analysisCompleted]);

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
    currentStage,
    sseConnected,

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
