/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowRight,
    BookOpen,
    CheckCircle,
    CheckCircle2,
    Clock,
    Compass,
    Download,
    Eye,
    Heart,
    Home,
    Loader2,
    PartyPopper,
    RefreshCw,
    ShieldAlert,
    Sparkles,
    Stars,
    Target,
    Telescope,
    XCircle,
    Zap
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface PaymentData {
  _id: string;
  tokenPay: string;
  numeroSend: string;
  nomclient: string;
  numeroTransaction?: string;
  Montant: number;
  frais: number;
  statut: 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used';
  moyen?: string;
  return_url?: string;
  createdAt: string;
  personal_Info?: Array<{
    userId?: string;
    consultationId?: string;
    bookId?: string;
    type?: 'consultation' | 'book';
  }>;
}

interface ApiResponse {
  success: boolean;
  status: string;
  data?: PaymentData;
  message?: string;
  consultationId?: string;
  analysisId?: string;
  downloadUrl?: string;
  analysisGenerated?: boolean;
}

type PaymentStatus = 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used' | 'error';

interface AnalysisStage {
  progress: number;
  label: string;
  icon: any;
  color: string;
  description: string;
  duration: number;
}

const PaymentCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // États
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentStageMessage, setCurrentStageMessage] = useState('');
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number>(15);
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);

  // 🎯 Définition des étapes de génération d'analyse
  const analysisStages: AnalysisStage[] = useMemo(() => [
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
  ], []);

  // 🔹 Vérifier et normaliser le statut du paiement
  const normalizePaymentStatus = useCallback((apiStatus: string): PaymentStatus => {
    const statusMap: Record<string, PaymentStatus> = {
      'pending': 'pending',
      'paid': 'paid',
      'failure': 'failure',
      'no paid': 'no paid',
      'already_used': 'already_used',
    };
    return statusMap[apiStatus] || 'error';
  }, []);

  // 🔹 Vérifier le statut du paiement via MoneyFusion
  const verifyPayment = useCallback(async (paymentToken: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        `https://www.pay.moneyfusion.net/paiementNotif/${paymentToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (!result.statut || !result.data) {
        throw new Error('Format de réponse invalide de MoneyFusion');
      }

      return {
        success: true,
        status: result.data.statut,
        data: result.data,
        message: result.message || 'Paiement vérifié',
      };
    } catch (error: any) {
      console.error('❌ Erreur vérification paiement:', error);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de vérification du paiement',
      };
    }
  }, []);

  // 🔹 Traiter le paiement après vérification (créer consultation/livre + analyser)
  const processPaymentCallback = useCallback(async (
    paymentToken: string,
    paymentDetails: PaymentData
  ): Promise<ApiResponse> => {
    try {
      const personalInfo = paymentDetails.personal_Info?.[0];
      const type = personalInfo?.type || 'consultation';
      
      const callbackEndpoint = type === 'book' 
        ? '/api/payment/callback/books'
        : '/api/payment/callback';
      
      const response = await fetch(callbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: paymentToken,
          status: paymentDetails.statut,
          paymentData: paymentDetails,
          type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        status: 'paid',
        consultationId: result.consultationId,
        analysisId: result.analysisId,
        downloadUrl: result.downloadUrl,
        analysisGenerated: result.analysisGenerated,
        message: result.message || 'Paiement traité avec succès',
      };
    } catch (error: any) {
      console.error('❌ Erreur traitement callback:', error);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de traitement du paiement',
      };
    }
  }, []);

  // 🔹 Animation de progression RÉALISTE de l'analyse
  useEffect(() => {
    if (!isGeneratingAnalysis) {
      setAnalysisProgress(0);
      setCurrentStageIndex(0);
      setCurrentStageMessage('');
      setAnalysisCompleted(false);
      return;
    }

    let isCancelled = false;

    const animateStages = async () => {
      for (let i = 0; i < analysisStages.length && !isCancelled; i++) {
        const stage = analysisStages[i];
        setCurrentStageIndex(i);
        setCurrentStageMessage(stage.description);

        // Animation progressive vers le prochain palier
        const startProgress = i === 0 ? 0 : analysisStages[i - 1].progress;
        const endProgress = stage.progress;
        const steps = 20;
        const stepDuration = stage.duration / steps;

        for (let step = 0; step <= steps && !isCancelled; step++) {
          const progress = startProgress + ((endProgress - startProgress) * step) / steps;
          setAnalysisProgress(Math.round(progress));
          await new Promise(resolve => setTimeout(resolve, stepDuration));
        }

        // Pause légère à chaque étape
        if (i < analysisStages.length - 1 && !isCancelled) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // 🎉 Analyse terminée !
      if (!isCancelled) {
        setAnalysisCompleted(true);
        console.log('✅ Analyse terminée, activation de la redirection...');
      }
    };

    animateStages();

    return () => {
      isCancelled = true;
    };
  }, [isGeneratingAnalysis, analysisStages]);

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

        const normalizedStatus = normalizePaymentStatus(verificationResult.data.statut);
        setPaymentData(verificationResult.data);
        setStatus(normalizedStatus);

        if (normalizedStatus === 'paid') {
          console.log('✅ Paiement confirmé, traitement du callback...');
          setIsGeneratingAnalysis(true);
          const callbackResult = await processPaymentCallback(token, verificationResult.data);
          setIsGeneratingAnalysis(false);

          if (callbackResult.success) {
            setConsultationId(callbackResult.consultationId || null);
            setDownloadUrl(callbackResult.downloadUrl || null);
            setShouldAutoRedirect(true);
          } else {
            setStatus('error');
            setError(callbackResult.message || 'Erreur lors du traitement du paiement');
          }
        } else if (normalizedStatus === 'already_used') {
          console.log('⚠️ Token déjà utilisé');
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
  }, [token, verifyPayment, processPaymentCallback, normalizePaymentStatus]);

  // 🔹 Redirection automatique intelligente
  const handleAutoRedirect = useCallback(() => {
    const personalInfo = paymentData?.personal_Info?.[0];
    const type = personalInfo?.type || 'consultation';

    if (type === 'book' && downloadUrl) {
      router.push('/protected/bibliotheque');
    } else if (consultationId) {
      router.push(`/protected/consultations/${consultationId}`);
    } else {
      router.push('/protected/consultations');
    }
  }, [paymentData, downloadUrl, consultationId, router]);

  // 🔹 Gestion du compte à rebours - NE DÉMARRE QU'APRÈS L'ANALYSE
  useEffect(() => {
    if (!shouldAutoRedirect || !analysisCompleted || autoRedirectCountdown <= 0) return;

    console.log('⏱️ Démarrage du compte à rebours de redirection...');

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
  }, [shouldAutoRedirect, analysisCompleted, autoRedirectCountdown, handleAutoRedirect]);

  // 🔹 Actions manuelles
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

  // 🎨 Configuration des statuts visuels
  const statusConfig = useMemo(() => {
    const configs: Record<PaymentStatus, {
      icon: any;
      title: string;
      description: string;
      color: string;
      gradient: string;
      iconBg: string;
      iconColor: string;
      showDetails: boolean;
    }> = {
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
        description: 'Le paiement n\'a pas été complété. Vous pouvez réessayer depuis votre profil.',
        color: 'text-orange-600',
        gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        showDetails: false,
      },
      already_used: {
        icon: ShieldAlert,
        title: 'Transaction déjà traitée',
        description: 'Ce paiement a déjà été traité. Consultez vos consultations pour la retrouver.',
        color: 'text-indigo-600',
        gradient: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20',
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
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

  // 🎨 Étape actuelle
  const currentStage = useMemo(() => {
    return analysisStages[currentStageIndex] || analysisStages[0];
  }, [currentStageIndex, analysisStages]);

  // 🎨 Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const celebrationVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: [0, 1.2, 1],
      rotate: [180, 0, 360],
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // 🌟 Loader initial
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

  const StatusIcon = statusConfig.icon;
  const CurrentStageIcon = currentStage.icon;

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
          {/* 🔮 VISUEL GÉNÉRATION D'ANALYSE - ULTRA PREMIUM */}
          {isGeneratingAnalysis && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 relative">
                {/* Étoiles animées en arrière-plan */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white rounded-full"
                      style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Contenu principal */}
                <div className="relative z-10">
                  {/* Icône centrale animée de l'étape actuelle */}
                  <div className="flex justify-center mb-5 sm:mb-6">
                    <motion.div
                      key={currentStageIndex}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="relative"
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${currentStage.color} rounded-full blur-2xl opacity-60`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-5 sm:p-6">
                        <CurrentStageIcon className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Titre dynamique */}
                  <motion.h2
                    key={`title-${currentStageIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2"
                  >
                    ✨ {currentStage.label}
                  </motion.h2>

                  {/* Message dynamique */}
                  <motion.p
                    key={`msg-${currentStageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/90 text-center text-xs sm:text-base mb-5 sm:mb-6 px-2 min-h-[40px] sm:min-h-[48px]"
                  >
                    {currentStageMessage}
                  </motion.p>

                  {/* 📊 BARRE DE PROGRESSION ULTRA-PREMIUM */}
                  <div className="space-y-3 mb-5 sm:mb-6">
                    {/* Barre de progression avec indicateur intégré */}
                    <div className="relative">
                      {/* Container de la barre */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-full h-8 sm:h-10 overflow-hidden shadow-inner relative">
                        {/* Barre de progression principale */}
                        <motion.div
                          className={`h-full bg-gradient-to-r ${currentStage.color} rounded-full relative shadow-lg flex items-center justify-end pr-3 sm:pr-4`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${analysisProgress}%` }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          {/* Effet brillant qui traverse */}
                          <motion.div
                            className="absolute inset-0 bg-white/40"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          
                          {/* Pourcentage DANS la barre (si largeur > 30%) */}
                          {analysisProgress > 30 && (
                            <motion.span
                              key={`inner-${analysisProgress}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative z-10 text-white font-bold text-sm sm:text-lg drop-shadow-lg"
                            >
                              {analysisProgress}%
                            </motion.span>
                          )}
                        </motion.div>

                        {/* Pourcentage HORS de la barre (si largeur < 30%) */}
                        {analysisProgress <= 30 && (
                          <motion.div
                            key={`outer-${analysisProgress}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="text-white font-bold text-sm sm:text-lg drop-shadow-lg">
                              {analysisProgress}%
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Indicateur de pulsation sur le bord de la progression */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-lg ring-2 ring-white/50"
                        animate={{
                          left: `${analysisProgress}%`,
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          left: { duration: 0.3, ease: 'easeOut' },
                          scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                        }}
                      />
                    </div>

                    {/* Informations détaillées sous la barre */}
                    <div className="flex justify-between items-center px-2">
                      {/* Étape actuelle */}
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentStage.color} animate-pulse`} />
                        <p className="text-white/80 text-[10px] sm:text-sm font-medium">
                          Étape {currentStageIndex + 1}/{analysisStages.length}
                        </p>
                      </div>

                      {/* Temps estimé restant */}
                      <motion.div
                        key={`time-${currentStageIndex}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1"
                      >
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
                        <p className="text-white/80 text-[10px] sm:text-xs font-medium">
                          ~{Math.ceil((100 - analysisProgress) / 3)}s restantes
                        </p>
                      </motion.div>
                    </div>

                    {/* Barre de segments (mini-visualisation des étapes) */}
                    <div className="flex gap-0.5 sm:gap-1 px-2">
                      {analysisStages.map((stage, index) => {
                        const isCompleted = analysisProgress >= stage.progress;
                        const isActive = index === currentStageIndex;
                        
                        return (
                          <motion.div
                            key={index}
                            className={`flex-1 h-1 sm:h-1.5 rounded-full transition-all ${
                              isCompleted
                                ? 'bg-gradient-to-r ' + stage.color
                                : isActive
                                ? 'bg-white/40'
                                : 'bg-white/10'
                            }`}
                            animate={
                              isActive
                                ? {
                                    opacity: [0.4, 1, 0.4],
                                    transition: { duration: 1, repeat: Infinity },
                                  }
                                : {}
                            }
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Liste des étapes avec indicateurs visuels */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-3 mb-4 sm:mb-6">
                    {analysisStages.slice(0, -1).map((stage, index) => {
                      const isCompleted = analysisProgress >= stage.progress;
                      const isActive = index === currentStageIndex;
                      const StageIcon = stage.icon;

                      return (
                        <motion.div
                          key={index}
                          className={`relative rounded-lg sm:rounded-xl p-1.5 sm:p-3 text-center transition-all ${
                            isCompleted
                              ? 'bg-white/25 ring-1 sm:ring-2 ring-white/50'
                              : isActive
                              ? 'bg-white/15 ring-1 ring-white/30'
                              : 'bg-white/5'
                          }`}
                          animate={
                            isActive
                              ? {
                                  scale: [1, 1.05, 1],
                                  transition: { duration: 0.5, repeat: Infinity },
                                }
                              : {}
                          }
                        >
                          <StageIcon
                            className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-0.5 sm:mb-1 ${
                              isCompleted
                                ? 'text-yellow-300'
                                : isActive
                                ? 'text-white'
                                : 'text-white/40'
                            }`}
                          />
                          <p
                            className={`text-[9px] sm:text-xs font-medium leading-tight ${
                              isCompleted
                                ? 'text-white'
                                : isActive
                                ? 'text-white/90'
                                : 'text-white/40'
                            }`}
                          >
                            {stage.label}
                          </p>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                            >
                              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Message d'attente */}
                  <motion.p
                    className="text-white/70 text-center text-[10px] sm:text-sm italic"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⏳ Ne fermez pas cette page, la génération est en cours...
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🎉 BANNIÈRE DE SUCCÈS APRÈS ANALYSE */}
          {analysisCompleted && !isGeneratingAnalysis && (
            <motion.div
              variants={celebrationVariants}
              initial="initial"
              animate="animate"
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10 text-center">
                  <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-3" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    🎊 Analyse Complétée !
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    Votre thème astral complet est prêt à être consulté
                  </p>
                </div>
              </div>
            </motion.div>
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
              {statusConfig.showDetails && paymentData && (
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 space-y-2 sm:space-y-3"
                >
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
                    Détails de la transaction
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-sm">
                    <div>
                      <span className="text-gray-600">Montant :</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {paymentData.Montant.toLocaleString()} FCFA
                      </span>
                    </div>
                    
                    {paymentData.frais > 0 && (
                      <div>
                        <span className="text-gray-600">Frais :</span>
                        <span className="font-semibold text-gray-900 ml-2">
                          {paymentData.frais.toLocaleString()} FCFA
                        </span>
                      </div>
                    )}
                    
                    {paymentData.numeroTransaction && (
                      <div className="sm:col-span-2">
                        <span className="text-gray-600">N° Transaction :</span>
                        <span className="font-mono text-[9px] sm:text-xs text-gray-900 ml-2 break-all">
                          {paymentData.numeroTransaction}
                        </span>
                      </div>
                    )}
                    
                    {paymentData.moyen && (
                      <div>
                        <span className="text-gray-600">Moyen :</span>
                        <span className="font-semibold text-gray-900 ml-2 capitalize">
                          {paymentData.moyen}
                        </span>
                      </div>
                    )}
                    
                    <div className="sm:col-span-2">
                      <span className="text-gray-600">Client :</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {paymentData.nomclient}
                      </span>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <span className="text-gray-600">Date :</span>
                      <span className="font-semibold text-gray-900 ml-2 text-[10px] sm:text-sm">
                        {new Date(paymentData.createdAt).toLocaleString('fr-FR', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Statut de traitement */}
              {isProcessing && !isGeneratingAnalysis && (
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3"
                >
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <p className="text-blue-800 text-[10px] sm:text-sm">
                    Traitement de votre commande en cours...
                  </p>
                </motion.div>
              )}

              {/* ⚠️ COMPTE À REBOURS - UNIQUEMENT APRÈS ANALYSE */}
              {shouldAutoRedirect && analysisCompleted && autoRedirectCountdown > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    <p className="text-purple-800 text-sm sm:text-base font-semibold">
                      Redirection automatique dans
                    </p>
                  </div>
                  <motion.div
                    key={autoRedirectCountdown}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-4xl sm:text-6xl font-bold text-purple-600 mb-2"
                  >
                    {autoRedirectCountdown}
                  </motion.div>
                  <p className="text-purple-700 text-xs sm:text-sm">
                    secondes...
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4"
              >
                {status === 'paid' && downloadUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadBook}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Télécharger le livre
                  </motion.button>
                )}

                {status === 'paid' && consultationId && !downloadUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewConsultation}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    Voir ma consultation
                  </motion.button>
                )}

                {(status === 'failure' || status === 'error') && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRetry}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Réessayer
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoHome}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Retour au profil</span>
                  <span className="sm:hidden">Profil</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Note de sécurité */}
          <motion.div
            variants={itemVariants}
            className="mt-3 sm:mt-6 text-center text-[10px] sm:text-sm text-gray-600 px-4"
          >
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
