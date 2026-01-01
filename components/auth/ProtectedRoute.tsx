'use client';

import { config } from '@/lib/config';
import { useAuth } from '@/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Sparkles, Star, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, useEffect, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const shieldVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6
    }
  }
};

const glowVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const particleVariants = {
  float: (custom: number) => ({
    y: [0, -20, 0],
    x: [0, custom * 5, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.2
    }
  })
};

// ============================================================
// COMPOSANT: ShieldOrbit (Mémoïsé)
// ============================================================

interface ShieldOrbitProps {
  radius: number;
  duration: number;
  reverse?: boolean;
}

const ShieldOrbit = memo<ShieldOrbitProps>(({ radius, duration, reverse = false }) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <div
      className="absolute top-1/2 left-1/2 w-1 h-1 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"
      style={{
        transform: `translate(-50%, -50%) translateY(-${radius}px)`
      }}
    />
  </motion.div>
), (prev, next) => prev.radius === next.radius);

ShieldOrbit.displayName = 'ShieldOrbit';

// ============================================================
// COMPOSANT: FloatingParticle (Mémoïsé)
// ============================================================

interface FloatingParticleProps {
  Icon: React.ElementType;
  delay: number;
  x: string;
  y: string;
  color: string;
}

const FloatingParticle = memo<FloatingParticleProps>(({ Icon, delay, x, y, color }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    custom={delay}
    variants={particleVariants}
    animate="float"
  >
    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
  </motion.div>
), (prev, next) => prev.delay === next.delay);

FloatingParticle.displayName = 'FloatingParticle';

// ============================================================
// COMPOSANT: LoadingRing (Mémoïsé)
// ============================================================

interface LoadingRingProps {
  delay: number;
  duration: number;
  size: string;
  color: string;
}

const LoadingRing = memo<LoadingRingProps>(({ delay, duration, size, color }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.4, type: 'spring' }}
    className={`absolute ${size} border-4 ${color} rounded-full`}
  >
    <motion.div
      className="absolute inset-0 border-4 border-transparent rounded-full"
      style={{
        borderTopColor: 'currentColor',
        borderRightColor: 'currentColor'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  </motion.div>
), (prev, next) => prev.delay === next.delay);

LoadingRing.displayName = 'LoadingRing';

// ============================================================
// COMPOSANT: CosmicLoader (Mémoïsé)
// ============================================================

const CosmicLoader = memo(() => (
  <div className=" flex items-center justify-center bg-gradient-to-br 
                from-slate-900 via-violet-950 to-indigo-950 
                relative overflow-hidden">
    
    {/* Animated Background Orbs */}
    <div className="absolute inset-0 -z-10">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 
                 bg-violet-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 
                 bg-indigo-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 w-80 h-80 sm:w-[32rem] sm:h-[32rem] 
                 bg-purple-500/15 rounded-full blur-3xl"
      />
    </div>

    {/* Floating Particles */}
    <FloatingParticle Icon={Star} delay={0} x="15%" y="20%" color="text-violet-400" />
    <FloatingParticle Icon={Sparkles} delay={1} x="85%" y="25%" color="text-purple-400" />
    <FloatingParticle Icon={Zap} delay={2} x="20%" y="75%" color="text-indigo-400" />
    <FloatingParticle Icon={Star} delay={1.5} x="80%" y="70%" color="text-violet-300" />
    <FloatingParticle Icon={Sparkles} delay={0.5} x="10%" y="50%" color="text-purple-300" />
    <FloatingParticle Icon={Zap} delay={2.5} x="90%" y="45%" color="text-indigo-300" />

    {/* Main Content */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center z-10"
    >
      {/* Shield Loader System */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8">
        {/* Pulsing Glow Background */}
        <motion.div
          variants={glowVariants}
          animate="pulse"
          className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-purple-600/30 
                   rounded-full blur-2xl"
        />

        {/* Loading Rings */}
        <LoadingRing delay={0} duration={3} size="inset-0" color="border-violet-500/40" />
        <LoadingRing delay={0.1} duration={4} size="inset-3" color="border-purple-500/40" />
        <LoadingRing delay={0.2} duration={5} size="inset-6" color="border-indigo-500/40" />

        {/* Central Shield Icon */}
        <motion.div
          variants={shieldVariants}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* Shield Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-violet-500 rounded-full blur-xl"
            />
            
            {/* Shield Icon */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 
                          bg-gradient-to-br from-violet-500 to-purple-600 
                          rounded-2xl flex items-center justify-center
                          shadow-2xl shadow-violet-500/50">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <Lock className="absolute w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
            </div>
          </div>
        </motion.div>

        {/* Orbiting Particles */}
        <ShieldOrbit radius={70} duration={4} />
        <ShieldOrbit radius={80} duration={5} reverse />
        <ShieldOrbit radius={90} duration={6} />
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="space-y-3"
      >
        {/* Title with Gradient Animation */}
        <motion.h2
          className="text-2xl sm:text-3xl font-black tracking-tight"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd, #8b5cf6)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Vérification de votre accès
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base text-violet-200/80 font-medium"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Shield className="inline w-4 h-4 mr-2" />
          Authentification sécurisée en cours
        </motion.p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                backgroundColor: ['#8b5cf6', '#a78bfa', '#8b5cf6']
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Security Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-10 sm:mt-12 space-y-2"
      >
        {[
          { icon: Shield, text: 'Validation de vos identifiants', delay: 0 },
          { icon: Lock, text: 'Chiffrement de la session', delay: 0.3 },
          { icon: Sparkles, text: 'Préparation de votre espace', delay: 0.6 }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: step.delay,
              duration: 0.5,
              type: 'spring',
              stiffness: 300
            }}
            className="flex items-center justify-center gap-3 
                     text-xs sm:text-sm text-violet-300/80"
          >
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: step.delay
              }}
            >
              <step.icon className="w-4 h-4" />
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
              className="w-1.5 h-1.5 bg-violet-400 rounded-full"
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

function ProtectedRouteComponent({
  children,
  redirectTo = config.routes.login,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Mémoïser la construction de l'URL de redirection
  const loginUrl = useMemo(() => {
    if (typeof window === 'undefined') return redirectTo;
    const currentUrl = window.location.pathname + window.location.search;
    return `${redirectTo}?returnTo=${encodeURIComponent(currentUrl)}`;
  }, [redirectTo]);

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      console.log('[ProtectedRoute] 🚫 Non authentifié, redirection vers:', loginUrl);
      router.push(loginUrl);
    } else {
      console.log('[ProtectedRoute] ✅ Authentifié');
    }
  }, [isAuthenticated, isLoading, router, loginUrl]);

  // Afficher le loader cosmique pendant le chargement
  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <CosmicLoader />
      </AnimatePresence>
    );
  }

  // Si non authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  // Utilisateur authentifié, afficher le contenu protégé
  return <>{children}</>;
}

// ============================================================
// EXPORT MÉMOÏSÉ
// ============================================================

export const ProtectedRoute = memo(ProtectedRouteComponent, (prev, next) => {
  // Re-render seulement si redirectTo change
  return prev.redirectTo === next.redirectTo;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
