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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {  PaymentData, PaymentStatus, StatusConfig } from '../../components/callback/types';



export function usePaymentCallback(token: string | null) {


  // States
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [error, setError] = useState<string>('');
  const [currentStage, setCurrentStage] = useState('init');
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(15);


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
          const processRes = await api.post('/payments/process-consultation', {
            token,
            paymentData,
          });


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


  // Auto-redirect countdown
  useEffect(() => {
    if (!shouldAutoRedirect) return;

    const interval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (downloadUrl) {
            window.location.href = '/star/bibliotheque';
          } else if (consultationId) {
            window.location.href = `/star/consultations/${consultationId}`;
          } else {
            window.location.href = '/star/consultations';
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldAutoRedirect, consultationId, downloadUrl]);

  // Actions
  const handleViewConsultation = useCallback(() => {
    if (consultationId) {
      window.location.href = `/star/consultations/${consultationId}`;
    }
  }, [consultationId]);

  const handleDownloadBook = useCallback(() => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  }, [downloadUrl]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    window.location.href = '/star/profil';
  }, []);

  return {
    isLoading,
    isProcessing,
    status,
    statusConfig,
    isGeneratingAnalysis,
    currentStageMessage: 'Préparation...',
    currentStage,
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
