/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DisplayConsultationCard from '@/components/admin/consultations/DisplayConsultationCard';
import { api } from '@/lib/api/client';
import { AnalyseAstrologique } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Loader2,
  Sparkles,
  X
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

const Toast = memo(({
  message,
  type = 'info',
  onClose
}: {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = useMemo(() => {
    const configs = {
      success: {
        gradient: 'from-emerald-600 to-green-600',
        icon: <Sparkles className="w-4 h-4 animate-pulse" />
      },
      error: {
        gradient: 'from-rose-600 to-red-600',
        icon: <AlertCircle className="w-4 h-4 animate-pulse" />
      },
      info: {
        gradient: 'from-indigo-600 to-purple-600',
        icon: <Bell className="w-4 h-4 animate-pulse" />
      }
    };
    return configs[type];
  }, [type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className={`bg-gradient-to-r ${config.gradient} text-white 
                    px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 
                    border border-white/20 backdrop-blur-sm`}>
        <span className="flex-shrink-0">{config.icon}</span>
        <p className="text-sm font-medium flex-1 leading-tight">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Fermer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
});
Toast.displayName = 'Toast';

const LoadingSkeleton = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-3">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center
                 border border-white/20 shadow-2xl"
    >
      {/* Spinner animé */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="w-16 h-16 mx-auto mb-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-xl" />
        <Loader2 className="w-full h-full text-white relative z-10" strokeWidth={2.5} />
      </motion.div>

      {/* Texte avec effet shimmer */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-bold text-white mb-2"
      >
        Chargement de l'analyse
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-purple-200 text-sm mb-4"
      >
        Préparation de votre thème  ...
      </motion.p>

      {/* Points de chargement animés */}
      <div className="flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-2 bg-purple-300 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  </div>
));
LoadingSkeleton.displayName = 'LoadingSkeleton';

const ErrorState = memo(({
  error,
  onRetry
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 flex items-center justify-center p-3">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center
                 border border-white/20 shadow-2xl"
    >
      {/* Icon avec effet pulse */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative w-16 h-16 mx-auto mb-4"
      >
        <div className="absolute inset-0 bg-red-400/30 rounded-full blur-xl" />
        <AlertCircle className="w-full h-full text-red-300 relative z-10" strokeWidth={2} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl sm:text-2xl font-bold text-white mb-2"
      >
        Erreur de chargement
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-red-200 text-sm mb-6 leading-relaxed"
      >
        {error || 'Analyse non disponible'}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 
                 backdrop-blur-sm rounded-xl font-semibold text-white 
                 transition-all border border-white/30 shadow-lg
                 flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux consultations
      </motion.button>
    </motion.div>
  </div>
));
ErrorState.displayName = 'ErrorState';

const PageHeader = memo(({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl"
  >
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                   text-white/90 hover:text-white hover:bg-white/10
                   transition-all group border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm font-semibold">Retour</span>
        </motion.button>

        {/* Badge décoration */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 
                   bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-bold text-white">Analyse Complète</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
));
PageHeader.displayName = 'PageHeader';

 
export default function ConsultationResultPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  // États séparés pour performance optimale
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // =====================================================
  // MEMOIZED VALUES
  // =====================================================
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  }, []);

  // =====================================================
  // DATA FETCHING
  // =====================================================
  const loadAnalysis = useCallback(async () => {
    if (!consultationId) {
      setError('ID de consultation manquant');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/consultations/analysis/${consultationId}`);

      if (response.status !== 200) {
        throw new Error('Analyse non trouvée');
      }

      const data = response.data;

      if (data?.analyse) {
        setAnalyse(data.analyse);
      } else {
        throw new Error('Analyse non disponible');
      }
    } catch (err: any) {
      console.error('❌ Erreur récupération analyse:', err);
      setError(err.message || 'Impossible de récupérer l\'analyse');
    } finally {
      setLoading(false);
    }
  }, [consultationId]);

  useEffect(() => {
    loadAnalysis();
  }, [loadAnalysis]);

  // =====================================================
  // EVENT HANDLERS (Memoized)
  // =====================================================
  const handleBack = useCallback(() => {
    router.push('/admin/consultations/');
  }, [router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    router.push(`/secured/genereanalyse?id=${id}`);
  }, [router]);

  const handleNotifyUser = useCallback(async (id: string) => {
    try {
      const res = await api.post(`/consultations/${id}/notify-user`);

      if (res.status === 200 || res.status === 201) {
        showToast('📧 Notification envoyée avec succès !', 'success');
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (err: any) {
      console.error('❌ Erreur notification:', err);
      showToast('❌ Erreur lors de l\'envoi', 'error');
    }
  }, [showToast]);
 
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !analyse) {
    return <ErrorState error={error || 'Analyse introuvable'} onRetry={handleBack} />;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <PageHeader onBack={handleBack} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          delay: 0.1
        }}
        className="max-w-7xl mx-auto"
      >
        <DisplayConsultationCard
          consultation={analyse}
          onModifyAnalysis={handleModifyAnalysis}
          onNotifyUser={handleNotifyUser}
        />
      </motion.div>
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}