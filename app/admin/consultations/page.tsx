/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ConsultationCard from '@/components/admin/consultations/ConsultationCard';
import PaginationControls from '@/components/admin/consultations/PaginationControls';
import StatusBadge from '@/components/admin/consultations/StatusBadge';
import Toast from '@/components/admin/consultations/Toast';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, FileText, RefreshCw, Sparkles, Star, Zap } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

// ============================================================
// TYPES
// ============================================================

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

// ============================================================
// CONSTANTS
// ============================================================

const ITEMS_PER_PAGE = 5;

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const loaderContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const orbitalVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

// ============================================================
// COMPOSANT: CosmicOrbit (Mémoïsé)
// ============================================================

interface CosmicOrbitProps {
  radius: number;
  duration: number;
  delay: number;
  Icon: React.ElementType;
}

const CosmicOrbit = memo<CosmicOrbitProps>(({ radius, duration, delay, Icon }) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: 360 }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
      delay
    }}
  >
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) translateY(-${radius}px)`
      }}
    >
      <Icon className="w-4 h-4 text-purple-400" />
    </div>
  </motion.div>
), (prev, next) => prev.radius === next.radius);

CosmicOrbit.displayName = 'CosmicOrbit';

// ============================================================
// COMPOSANT: FloatingParticle (Mémoïsé)
// ============================================================

interface FloatingParticleProps {
  x: string;
  y: string;
  delay: number;
  size: string;
}

const FloatingParticle = memo<FloatingParticleProps>(({ x, y, delay, size }) => (
  <motion.div
    className={`absolute ${size} rounded-full bg-purple-400/30`}
    style={{ left: x, top: y }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.2, 0.6, 0.2]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }}
  />
), (prev, next) => prev.delay === next.delay);

FloatingParticle.displayName = 'FloatingParticle';

// ============================================================
// COMPOSANT: CosmicLoader (Mémoïsé)
// ============================================================

const CosmicLoader = memo(() => (
  <div className="flex items-center justify-center min-h-screen 
                bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 
                relative overflow-hidden">

    {/* Animated Background */}
    <div className="absolute inset-0 -z-10">
      {/* Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 
                 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, -30, 0],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 
                 bg-indigo-500/20 rounded-full blur-3xl"
      />
    </div>

    {/* Floating Particles */}
    <FloatingParticle x="10%" y="20%" delay={0} size="w-2 h-2" />
    <FloatingParticle x="85%" y="25%" delay={0.5} size="w-1.5 h-1.5" />
    <FloatingParticle x="15%" y="75%" delay={1} size="w-2.5 h-2.5" />
    <FloatingParticle x="90%" y="60%" delay={1.5} size="w-1.5 h-1.5" />
    <FloatingParticle x="20%" y="40%" delay={2} size="w-2 h-2" />
    <FloatingParticle x="80%" y="80%" delay={2.5} size="w-1.5 h-1.5" />

    {/* Main Content */}
    <motion.div
      variants={loaderContainerVariants}
      initial="hidden"
      animate="visible"
      className="text-center z-10"
    >
      {/* Central Spinner System */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8">
        {/* Pulsing Core */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 
                   rounded-full blur-2xl"
        />

        {/* Central Icon */}
        <motion.div
          variants={orbitalVariants}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-purple-500 rounded-full blur-xl"
            />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 
                          bg-gradient-to-br from-purple-600 to-indigo-600 
                          rounded-full flex items-center justify-center
                          shadow-2xl shadow-purple-500/50">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Rotating Rings */}
        <motion.div
          variants={orbitalVariants}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 
                   rounded-full"
        />

        <motion.div
          variants={orbitalVariants}
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-2 border-4 border-indigo-500/30 border-b-indigo-500 
                   rounded-full"
        />

        {/* Orbiting Icons */}
        <CosmicOrbit radius={60} duration={4} delay={0} Icon={Sparkles} />
        <CosmicOrbit radius={70} duration={5} delay={0.5} Icon={Star} />
        <CosmicOrbit radius={65} duration={4.5} delay={1} Icon={Zap} />
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-black tracking-tight mb-2"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'linear-gradient(90deg, #a78bfa, #c4b5fd, #ddd6fe, #a78bfa)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Chargement des consultations
        </motion.h2>

        <motion.p
          className="text-xs sm:text-sm text-purple-200/70 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          Récupération des données en cours...
        </motion.p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Loading Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 sm:mt-10 space-y-2"
      >
        {[
          { icon: FileText, text: 'Analyse des consultations', delay: 0 },
          { icon: Sparkles, text: 'Tri des données', delay: 0.3 },
          { icon: Zap, text: 'Préparation de l\'affichage', delay: 0.6 }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: step.delay,
              duration: 0.4,
              type: 'spring',
              stiffness: 300
            }}
            className="flex items-center justify-center gap-2 
                     text-xs sm:text-sm text-purple-300/70"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: step.delay
              }}
            >
              <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
            <span>{step.text}</span>
            <motion.div
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: step.delay
              }}
              className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
));

CosmicLoader.displayName = 'CosmicLoader';

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [notifyingIds, setNotifyingIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mémoïser totalPages
  const totalPages = useMemo(() =>
    Math.ceil(total / ITEMS_PER_PAGE),
    [total]
  );

  // Handlers optimisés
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenerateAnalysis = useCallback(async (id: string) => {
    setGeneratingIds(prev => new Set(prev).add(id));
    try {
      console.log('[Consultations] 🎯 Génération analyse pour:', id);
      const res = await api.post(`/consultations/${id}/generate-analysis`);
      if (res.status === 200 || res.status === 201) {
        await refetch();
        setToastMessage('✨ Analyse générée avec succès !');
        console.log('[Consultations] ✅ Analyse générée');
      }
    } catch (err) {
      setToastMessage('❌ Erreur lors de la génération');
      console.error('[Consultations] ❌', err);
    } finally {
      setGeneratingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, [refetch]);

  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Loading state avec Cosmic Loader
  if (loading) {
    return <CosmicLoader />;
  }


  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl 
                   border border-gray-200 dark:border-gray-800 p-6"
        >
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700
                     text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-purple-600 to-purple-700 
                            rounded-lg shadow-md">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Consultations
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  {total} au total
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className={`p-1.5 rounded-lg transition-all shadow-sm ${isRefreshing || loading
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 py-3 space-y-2.5">
        {consultations && consultations.length > 0 ? (
          <>
            <AnimatePresence mode="popLayout">
              {consultations.map((consultation: any) => (
                <div key={consultation.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <StatusBadge status={consultation.status} />
                  </div>
                  <ConsultationCard
                    consultation={consultation}
                    onGenerateAnalysis={handleGenerateAnalysis}
                    isGenerating={generatingIds.has(consultation.id)}
                    isNotifying={notifyingIds.has(consultation.id)}
                  />
                </div>
              ))}
            </AnimatePresence>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
                     dark:border-gray-800 p-12 text-center"
          >
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
              Aucune consultation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Les consultations apparaîtront ici.
            </p>
          </motion.div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={handleToastClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
