/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Download,
  RefreshCw,
  Home,
  Eye,
  ShieldAlert
} from 'lucide-react';

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
}

type PaymentStatus = 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used' | 'error';

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
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number>(60);
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);

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

      // Vérifier la structure de la réponse MoneyFusion
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
      
      // Déterminer l'endpoint callback approprié
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

        // Étape 1 : Vérifier le statut via MoneyFusion
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

        // Étape 2 : Si le paiement est réussi, traiter le callback
        if (normalizedStatus === 'paid') {
          console.log('✅ Paiement confirmé, traitement du callback...');
          const callbackResult = await processPaymentCallback(token, verificationResult.data);

          if (callbackResult.success) {
            setConsultationId(callbackResult.consultationId || null);
            setDownloadUrl(callbackResult.downloadUrl || null);
            setShouldAutoRedirect(true);
          } else {
            // Paiement réussi mais problème de traitement backend
            setStatus('error');
            setError(callbackResult.message || 'Erreur lors du traitement du paiement');
          }
        } else if (normalizedStatus === 'already_used') {
          // Token déjà utilisé, pas d'erreur mais pas de traitement
          console.log('⚠️ Token déjà utilisé');
          setShouldAutoRedirect(true);
        } else if (normalizedStatus === 'pending') {
          // Paiement en attente, on pourrait implémenter un polling
          console.log('⏳ Paiement en attente...');
        } else {
          // Échec ou non payé
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

  // 🔹 Gestion du compte à rebours pour redirection automatique
  useEffect(() => {
    if (!shouldAutoRedirect || autoRedirectCountdown <= 0) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoRedirect, autoRedirectCountdown]);

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
          : 'Votre consultation a été créée avec succès et l\'analyse est en cours de génération.',
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
        description: 'Ce paiement a déjà été traité. Consultez votre profil pour voir votre commande.',
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <Loader2 className="w-16 h-16 text-purple-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vérification du paiement
          </h2>
          <p className="text-gray-600">
            Veuillez patienter pendant que nous vérifions votre transaction...
          </p>
        </motion.div>
      </div>
    );
  }

  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-2xl"
        >
          {/* Carte principale */}
          <motion.div
            className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100`}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Header avec gradient */}
            <div className={`bg-gradient-to-r ${statusConfig.gradient} p-8 text-center relative overflow-hidden`}>
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  x: ['0%', '100%'],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Icône de statut */}
              <motion.div
                variants={pulseVariants}
                animate={status === 'pending' ? 'pulse' : ''}
                className="relative inline-block mb-6"
              >
                <div className={`${statusConfig.iconBg} rounded-full p-6 inline-block`}>
                  <StatusIcon className={`w-16 h-16 ${statusConfig.iconColor}`} />
                </div>
              </motion.div>

              {/* Titre */}
              <motion.h1
                variants={itemVariants}
                className={`text-3xl md:text-4xl font-bold ${statusConfig.color} mb-2`}
              >
                {statusConfig.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-700 text-lg max-w-xl mx-auto"
              >
                {statusConfig.description}
              </motion.p>
            </div>

            {/* Corps de la carte */}
            <div className="p-8">
              {/* Détails du paiement */}
              {statusConfig.showDetails && paymentData && (
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Détails de la transaction
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                      <div>
                        <span className="text-gray-600">N° Transaction :</span>
                        <span className="font-mono text-xs text-gray-900 ml-2">
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
                    
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Client :</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {paymentData.nomclient}
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Date :</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {new Date(paymentData.createdAt).toLocaleString('fr-FR', {
                          dateStyle: 'full',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Statut de traitement */}
              {isProcessing && (
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
                >
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <p className="text-blue-800 text-sm">
                    Traitement de votre commande en cours...
                  </p>
                </motion.div>
              )}

              {/* Compte à rebours pour redirection */}
              {shouldAutoRedirect && autoRedirectCountdown > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 text-center"
                >
                  <p className="text-purple-800 text-sm">
                    Redirection automatique dans{' '}
                    <span className="font-bold text-lg">{autoRedirectCountdown}</span> secondes...
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Action principale selon le statut */}
                {status === 'paid' && downloadUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadBook}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger le livre
                  </motion.button>
                )}

                {status === 'paid' && consultationId && !downloadUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewConsultation}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Voir ma consultation
                  </motion.button>
                )}

                {(status === 'failure' || status === 'error') && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRetry}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Réessayer
                  </motion.button>
                )}

                {/* Bouton retour profil */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoHome}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Retour au profil
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Note de sécurité */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-sm text-gray-600 px-4"
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
