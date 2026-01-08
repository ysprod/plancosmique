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
import type { AnalysisStage, PaymentData, PaymentStatus, StatusConfig } from '../components/callback/types';

// ==================== CONSTANTES ====================
const SSE_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 2000;
const AUTO_REDIRECT_DELAY = 15;

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

interface VerificationResult {
  success: boolean;
  status: string;
  message?: string;
  data?: any;
}

interface ProcessResult {
  success: boolean;
  consultationId?: string;
  downloadUrl?: string;
  message?: string;
}

// ==================== HOOK PRINCIPAL ====================
export function usePaymentCallback(token: string | null) {
  const router = useRouter();

  // ========== États ==========
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
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(AUTO_REDIRECT_DELAY);

  // ========== Refs ==========
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isSSEConnectedRef = useRef(false); // Éviter les connexions multiples

  // ==================== SSE CONNECTION (fonction réutilisable) ====================

  /**
   * Établit la connexion SSE pour suivre la progression de l'analyse
   */
  const setupSSEConnection = useCallback((targetConsultationId: string) => {
    // Éviter les connexions multiples
    if (isSSEConnectedRef.current || eventSourceRef.current) {
      return;
    }

    const connect = () => {
      try {
        const url = `${SSE_BASE_URL}/api/v1/analysis/progress/${targetConsultationId}`;

        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;
        isSSEConnectedRef.current = true;

        eventSource.onopen = () => {
          setSseConnected(true);
          reconnectAttemptsRef.current = 0;
        };

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setSseProgress(data.progress);
            setCurrentStage(data.stage);
            setSseStageIndex(data.stageIndex);
            setSseStageMessage(data.message);
            setSseCompleted(data.completed);

            if (data.completed) {
              eventSource.close();
              isSSEConnectedRef.current = false;
            }
          } catch (err) {
            console.error('❌ SSE parsing error:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('❌ SSE error:', err);
          eventSource.close();
          isSSEConnectedRef.current = false;
          setSseConnected(false);

          // Reconnexion avec backoff exponentiel
          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current++;
            const delay = RECONNECT_DELAY * reconnectAttemptsRef.current;
            reconnectTimeoutRef.current = setTimeout(() => {
              if (!sseCompleted) {
                connect();
              }
            }, delay);
          } else {
            console.warn('⚠️ Max reconnection attempts reached');
          }
        };
      } catch (err) {
        console.error('❌ EventSource creation error:', err);
        isSSEConnectedRef.current = false;
      }
    };

    connect();
  }, [sseCompleted]);

  // ==================== INITIALISATION PAIEMENT + SSE ====================

  const initializePayment = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setError('Token de paiement manquant');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsProcessing(true);

      // ========== 1. VÉRIFIER LE PAIEMENT ==========
      let verification: VerificationResult;

      if (!token?.trim()) {
        verification = {
          success: false,
          status: 'error',
          message: 'Token de paiement manquant',
        };
      } else {
        try {
          const response = await api.get(`/payments/verify?token=${token}`);
          verification = response.data;
        } catch (error: any) {
          console.error('❌ Erreur vérification paiement:', error.message);
          verification = {
            success: false,
            status: 'error',
            message: error.message || 'Erreur de vérification du paiement',
          };
        }
      }

      if (!verification.success || !verification.data) {
        setStatus('error');
        setError(verification.message || 'Impossible de vérifier le paiement');
        return;
      }

      // ========== 2. CRÉER LES DONNÉES DE PAIEMENT ==========
      const paymentData: PaymentData = {
        _id: verification.data._id,
        tokenPay: token || '',
        numeroSend: '',
        nomclient: '',
        Montant: verification.data.amount,
        frais: 0,
        statut: 'paid',
        createdAt: new Date().toISOString(),
        personal_Info: [],
      };

      // ========== 3. TRAITER LA CONSULTATION ==========
      setIsGeneratingAnalysis(true);

      let result: ProcessResult;

      try {
        const response = await api.post('/payments/process-consultation', {
          token,
          paymentData,
        });
        result = response.data;
      } catch (error: any) {
        console.error('❌ Erreur traitement consultation:', error.message);
        result = {
          success: false,
          message: error.message || 'Erreur de traitement du paiement',
        };
      }

      // ========== 4. GÉRER LE RÉSULTAT ==========
      const resultConsultationId = result.consultationId || null;
      const resultDownloadUrl = result.downloadUrl || null;

      // Mettre à jour les états
      setConsultationId(resultConsultationId);
      setDownloadUrl(resultDownloadUrl);

      // ========== 5. CONNECTER SSE IMMÉDIATEMENT SI consultationId DISPONIBLE ==========
      if (resultConsultationId) {
        // 🔥 CONNEXION SSE DIRECTE (pas d'attente d'un useEffect)
        setupSSEConnection(resultConsultationId);

        setIsGeneratingAnalysis(true); // Confirmer que la génération est active
        setShouldAutoRedirect(true);
      } else {
        console.error('❌ Pas de consultationId, impossible de lancer SSE');
        setIsGeneratingAnalysis(false);
      }

      // ========== 6. DÉFINIR LE STATUT FINAL ==========
      if (result.success) {
        setStatus('paid');
      } else {
        const msg = (result.message || '').toLowerCase();
        const isAlreadyProcessed = msg.includes('déjà') || msg.includes('already');

        if (isAlreadyProcessed) {
          setStatus('already_used');
        } else {
          setStatus('error');
          setError(result.message || 'Erreur, mais génération en cours...');
        }
      }

    } catch (err: any) {
      console.error('❌ Erreur globale:', err);
      setStatus('error');
      setError(err?.message || 'Une erreur inattendue est survenue');
      setIsGeneratingAnalysis(false);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  }, [token, setupSSEConnection]);

  // ==================== CLEANUP SSE ====================

  useEffect(() => {
    // Cleanup SSE au démontage du composant
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        isSSEConnectedRef.current = false;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, []);

  // ==================== ACTIONS ====================

  const handleViewConsultation = useCallback(() => {
    if (consultationId) {
      router.push(`/secured/consultations/${consultationId}`);
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
    router.push('/secured/profil');
  }, [router]);

  const handleAutoRedirect = useCallback(() => {
    if (downloadUrl) {
      router.push('/secured/bibliotheque');
    } else if (consultationId) {
      router.push(`/secured/consultations/${consultationId}`);
    } else {
      router.push('/secured/consultations');
    }
  }, [consultationId, downloadUrl, router]);

  // ==================== STATUS CONFIG ====================

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
        description:
          'Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.',
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
        description:
          'Cette transaction a déjà été validée. Retrouvez votre contenu dans vos consultations ou votre bibliothèque.',
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

  // ==================== EFFECTS ====================

  // Initialiser au montage
  useEffect(() => {
    initializePayment();
  }, [initializePayment]);

  // Arrêter la génération quand l'analyse est terminée
  useEffect(() => {
    if (sseCompleted) {
      setIsGeneratingAnalysis(false);
    }
  }, [sseCompleted]);

  // Compte à rebours auto-redirect
  useEffect(() => {
    if (!shouldAutoRedirect || !sseCompleted) return;

    const interval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldAutoRedirect, sseCompleted, handleAutoRedirect]);

  // ==================== RETURN ====================

  return {
    // États globaux
    isLoading,
    isProcessing,
    status,
    statusConfig,

    // Analyse
    analysisStages: ANALYSIS_STAGES,
    isGeneratingAnalysis,
    analysisCompleted: sseCompleted,
    analysisProgress: sseProgress,
    currentStageIndex: sseStageIndex,
    currentStageMessage: sseStageMessage || 'Préparation...',
    currentStage,
    sseConnected,

    // Données
    consultationId,
    downloadUrl,

    // Redirection
    shouldAutoRedirect,
    autoRedirectCountdown,

    // Actions
    handleViewConsultation,
    handleDownloadBook,
    handleRetry,
    handleGoHome,
  };
}
