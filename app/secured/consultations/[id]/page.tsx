/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import { formatDate } from '@/lib/functions';
import { AnalyseAstrologique, SubjectInfo } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Sparkles,
  Star,
  User,
  Zap
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const loaderContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 25,
      duration: 0.4
    }
  }
};

// ============================================================
// COMPOSANT: CosmicOrbit (Mémoïsé)
// ============================================================

interface CosmicOrbitProps {
  radius: number;
  duration: number;
  Icon: React.ElementType;
  delay?: number;
}

const CosmicOrbit = memo<CosmicOrbitProps>(({ radius, duration, Icon, delay = 0 }) => (
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
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
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
}

const FloatingParticle = memo<FloatingParticleProps>(({ x, y, delay }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400/40"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.7, 0.2]
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
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-blue-950 
                flex items-center justify-center p-4 relative overflow-hidden">

    {/* Background Animated Orbs */}
    <div className="absolute inset-0 -z-10">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 
                 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, -40, 0],
          y: [0, 35, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 
                 bg-indigo-500/20 rounded-full blur-3xl"
      />
    </div>

    {/* Floating Particles */}
    <FloatingParticle x="12%" y="15%" delay={0} />
    <FloatingParticle x="88%" y="20%" delay={0.5} />
    <FloatingParticle x="15%" y="80%" delay={1} />
    <FloatingParticle x="85%" y="75%" delay={1.5} />
    <FloatingParticle x="50%" y="10%" delay={2} />
    <FloatingParticle x="10%" y="50%" delay={2.5} />

    {/* Main Content */}
    <motion.div
      variants={loaderContainerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-md w-full text-center
               border border-white/20 shadow-2xl"
    >
      {/* Cosmic Spinner */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
        {/* Pulsing Glow */}
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
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 
                          bg-gradient-to-br from-purple-600 to-indigo-600 
                          rounded-full flex items-center justify-center
                          shadow-2xl shadow-purple-500/50">
              <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
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
        <CosmicOrbit radius={55} duration={4} Icon={Sparkles} />
        <CosmicOrbit radius={65} duration={5} Icon={Star} delay={0.5} />
        <CosmicOrbit radius={60} duration={4.5} Icon={Zap} delay={1} />
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-black tracking-tight mb-3"
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
          Chargement de votre analyse
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base text-purple-200 mb-4"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          Préparation de votre thème natal complet...
        </motion.p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
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

        {/* Loading Steps */}
        <div className="space-y-2 text-xs sm:text-sm text-purple-300/70">
          {[
            { icon: Star, text: 'Calcul positions planétaires', delay: 0 },
            { icon: Sparkles, text: 'Analyse thème astral', delay: 0.3 },
            { icon: Zap, text: 'Génération interprétations', delay: 0.6 }
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
              className="flex items-center justify-center gap-2"
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
        </div>
      </motion.div>
    </motion.div>
  </div>
));

CosmicLoader.displayName = 'CosmicLoader';

// ============================================================
// COMPOSANT: SubjectHeader (Mémoïsé)
// ============================================================

interface SubjectHeaderProps {
  sujet: SubjectInfo;
}

const SubjectHeader = memo<SubjectHeaderProps>(({ sujet }) => (
  <motion.div
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg 
             rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/20 mb-6 sm:mb-8"
  >
    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 
                    rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
          {sujet.prenoms} {sujet.nom}
        </h2>
      </div>
    </div>

    <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-purple-300">Date de naissance</p>
          <p className="text-sm sm:text-base text-white font-semibold truncate">
            {formatDate(sujet.dateNaissance)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-purple-300">Heure de naissance</p>
          <p className="text-sm sm:text-base text-white font-semibold">
            {sujet.heureNaissance}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-purple-300">Lieu</p>
          <p className="text-sm sm:text-base text-white font-semibold truncate">
            {sujet.lieuNaissance}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
), (prev, next) =>
  prev.sujet.prenoms === next.sujet.prenoms &&
  prev.sujet.nom === next.sujet.nom
);

SubjectHeader.displayName = 'SubjectHeader';

// ============================================================
// COMPOSANT: MarkdownContent (Mémoïsé)
// ============================================================

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = memo<MarkdownContentProps>(({ content }) => {
  const markdownComponents = useMemo(() => ({
    h1: ({ ...props }: any) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-5 sm:mb-6 
                   flex items-center gap-2 sm:gap-3" {...props}>
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-300 flex-shrink-0" />
        <span>{props.children}</span>
      </h1>
    ),
    h2: ({ ...props }: any) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4 
                   flex items-center gap-2" {...props}>
        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 flex-shrink-0" />
        <span>{props.children}</span>
      </h2>
    ),
    h3: ({ ...props }: any) => (
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-200 mt-5 sm:mt-6 mb-3" {...props} />
    ),
    p: ({ ...props }: any) => (
      <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4" {...props} />
    ),
    ul: ({ ...props }: any) => (
      <ul className="space-y-2 sm:space-y-3 mb-4" {...props} />
    ),
    ol: ({ ...props }: any) => (
      <ol className="space-y-2 sm:space-y-3 mb-4 list-decimal list-inside" {...props} />
    ),
    li: ({ ...props }: any) => (
      <li className="text-sm sm:text-base text-white/90 flex items-start gap-2 sm:gap-3" {...props}>
        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0 mt-0.5" />
        <span className="flex-1">{props.children}</span>
      </li>
    ),
    strong: ({ ...props }: any) => (
      <strong className="text-amber-300 font-bold" {...props} />
    ),
    em: ({ ...props }: any) => (
      <em className="text-purple-300" {...props} />
    ),
    blockquote: ({ ...props }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 
                           bg-purple-500/10 rounded-r-lg text-sm sm:text-base" {...props} />
    ),
    hr: ({ ...props }: any) => (
      <hr className="my-6 sm:my-8 border-white/20" {...props} />
    ),
    code: ({ inline, ...props }: any) =>
      inline ? (
        <code className="bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded 
                       text-purple-300 text-xs sm:text-sm" {...props} />
      ) : (
        <code className="block bg-white/10 p-3 sm:p-4 rounded-lg text-purple-300 
                       text-xs sm:text-sm overflow-x-auto" {...props} />
      )
  }), []);

  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}, (prev, next) => prev.content === next.content);

MarkdownContent.displayName = 'MarkdownContent';

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function ConsultationResultPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);

  useEffect(() => {
    if (!consultationId) return;

    const loadAnalysis = async () => {
      try {
        console.log('[ConsultationResult] 📡 Loading analysis:', consultationId);

        const response = await api.get(`/consultations/analysis/${consultationId}`);

        if (response.status !== 200) {
          throw new Error('Analyse non trouvée');
        }

        const data = response.data;

        if (data.analyse) {
          setAnalyse(data.analyse);
          setLoading(false);
          console.log('[ConsultationResult] ✅ Analysis loaded');
        } else {
          setError('Analyse non disponible');
          setLoading(false);
        }
      } catch (err) {
        console.error('[ConsultationResult] ❌', err);
        setError('Impossible de récupérer votre analyse');
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [consultationId]);

  const handleBack = useCallback(() => {
    router.push('/secured/consultations');
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    const url = `/api/consultations/${consultationId}/download-pdf`;
    window.open(url, '_blank');
  }, [consultationId]);

  // Loading state
  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <CosmicLoader />
      </AnimatePresence>
    );
  }

  // Error state
  if (error || !analyse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-pink-900 
                    flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-md w-full 
                   text-center border border-white/20 shadow-2xl"
        >
          <AlertCircle className="w-14 h-14 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Erreur</h2>
          <p className="text-sm sm:text-base text-red-200 mb-6">
            {error || 'Analyse non disponible'}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl 
                     font-semibold text-white transition-all active:scale-95"
          >
            Retour aux consultations
          </button>
        </motion.div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/80 hover:text-white 
                       transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-semibold text-sm sm:text-base">Retour</span>
            </button>

            <div className="flex-1 text-center">
              <h1 className="text-base sm:text-lg md:text-xl font-black text-white 
                           flex items-center justify-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300" />
                <span>Analyse Astrologique</span>
              </h1>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:shadow-lg rounded-xl text-white font-semibold 
                       transition-all active:scale-95 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <SubjectHeader sujet={analyse.carteDuCiel.sujet} />

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl 
                   p-5 sm:p-6 md:p-8 border border-white/20"
        >
          <MarkdownContent content={analyse.missionDeVie.contenu} />
        </motion.div>
      </div>
    </div>
  );
}
