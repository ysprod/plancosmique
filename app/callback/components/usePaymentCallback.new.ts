/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Clock,
  Compass,
  Heart,
  Sparkles,
  Stars,
  Target,
  Telescope,
  XCircle,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AnalysisStage, PaymentData, PaymentStatus, StatusConfig } from './types';

const SSE_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const ANALYSIS_STAGES: AnalysisStage[] = [
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
];

export function usePaymentCallback(token: string | null) {
  const router = useRouter();
  
  // States
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [error, setError] = useState<string>('');
  const [sseProgress, setSseProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('init');
  const [sseStageIndex, setSseStageIndex] = useState(0);
  const [sseStageMessage, setSseStageMessage] = useState('Préparation...');
  const [sseCompleted, setSseCompleted] = useState(false);
  const [sseConnected, setSseConnected] = useState(false);
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(15);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  // Computed
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

  // SSE Connection
  useEffect(() => {
    if (!isGeneratingAnalysis || !consultationId) return;

    let isMounted = true;

    const connect = () => {
      try {
        const url = `${SSE_BASE_URL}/api/v1/analysis/progress/${consultationId}`;
        console.log('📡 SSE Connection:', url);

        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          if (!isMounted) return;
          console.log('✅ SSE connected');
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
              console.log('✅ Analyse terminée via SSE');
              eventSource.close();
            }
          } catch (err) {
            console.error('❌ SSE parsing error:', err);
          }
        };

        eventSource.onerror = () => {
          console.error('❌ SSE error');
          eventSource.close();
          if (!isMounted) return;
          setSseConnected(false);

          if (reconnectAttemptsRef.current < 5) {
            reconnectAttemptsRef.current++;
            const delay = 2000 * reconnectAttemptsRef.current;
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted && !sseCompleted) connect();
            }, delay);
          }
        };
      } catch (err) {
        console.error('❌ EventSource creation error:', err);
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

  // Initialize payment verification
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Token de paiement manquant');
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        setIsProcessing(true);

        // Verify payment
        if (!token.trim()) {
          setStatus('error');
          setError('Token de paiement manquant');
          return;
        }

        console.log('🔍 Vérification paiement:', token);
        const verifyRes = await api.get(`/payments/verify?token=${token}`);

        if (!verifyRes.data?.success || !verifyRes.data?.data) {
          setStatus('error');
          setError(verifyRes.data?.message || 'Impossible de vérifier le paiement');
          return;
        }

        // Prepare payment data
        const backendData = verifyRes.data.data;
        const paymentData: PaymentData = {
          _id: backendData._id,
          tokenPay: token,
          numeroSend: '',
          nomclient: '',
          Montant: backendData.amount,
          frais: 0,
          statut: 'paid',
          createdAt: new Date().toISOString(),
          personal_Info: [],
        };

        // Start analysis generation
        setIsGeneratingAnalysis(true);

        try {
          console.log('📊 Traitement consultation:', { token, type: 'consultation' });
          const processRes = await api.post('/payments/process-consultation', {
            token,
            paymentData,
          });

          console.log('✅ Consultation traitée:', processRes.data);

          if (processRes.data?.success) {
            setConsultationId(processRes.data.consultationId || null);
            setDownloadUrl(processRes.data.downloadUrl || null);
            setShouldAutoRedirect(true);
            setStatus('paid');
          } else {
            // Handle already_used case
            const msg = (processRes.data?.message || '').toLowerCase();
            if (msg.includes('déjà') || msg.includes('already')) {
              setStatus('already_used');
              setIsGeneratingAnalysis(false);
            } else {
              setStatus('error');
              setError(processRes.data?.message || 'Erreur lors du traitement du paiement');
              setIsGeneratingAnalysis(false);
            }
            setConsultationId(processRes.data?.consultationId || null);
            setDownloadUrl(processRes.data?.downloadUrl || null);
          }
        } catch (error: any) {
          console.error('❌ Erreur traitement consultation:', error.message);
          setStatus('error');
          setError(error.message || 'Erreur de traitement du paiement');
          setIsGeneratingAnalysis(false);
        }
      } catch (err: any) {
        console.error('❌ Erreur globale:', err);
        setStatus('error');
        setError(err?.message || 'Une erreur inattendue est survenue');
      } finally {
        setIsLoading(false);
        setIsProcessing(false);
      }
    })();
  }, [token]);

  // Stop generation when analysis completes
  useEffect(() => {
    if (sseCompleted) {
      console.log('✅ Analyse terminée, arrêt de la génération');
      setIsGeneratingAnalysis(false);
    }
  }, [sseCompleted]);

  // Auto-redirect countdown
  useEffect(() => {
    if (!shouldAutoRedirect || !sseCompleted) return;

    const interval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (downloadUrl) {
            router.push('/protected/bibliotheque');
          } else if (consultationId) {
            router.push(`/protected/consultations/${consultationId}`);
          } else {
            router.push('/protected/consultations');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldAutoRedirect, sseCompleted, consultationId, downloadUrl, router]);

  // Actions
  const handleViewConsultation = useCallback(() => {
    if (consultationId) {
      router.push(`/protected/consultations/${consultationId}`);
    }
  }, [consultationId, router]);

  const handleDownloadBook = useCallback(() => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  }, [downloadUrl]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    router.push('/protected/profil');
  }, [router]);

  return {
    isLoading,
    isProcessing,
    status,
    statusConfig,
    analysisStages: ANALYSIS_STAGES,
    isGeneratingAnalysis,
    analysisCompleted: sseCompleted,
    analysisProgress: sseProgress,
    currentStageIndex: sseStageIndex,
    currentStageMessage: sseStageMessage || 'Préparation...',
    currentStage,
    sseConnected,
    consultationId,
    downloadUrl,
    shouldAutoRedirect,
    autoRedirectCountdown,
    handleViewConsultation,
    handleDownloadBook,
    handleRetry,
    handleGoHome,
  };
}
