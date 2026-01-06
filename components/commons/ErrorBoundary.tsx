"use client";
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log vers un service d'analyse d'erreurs (Sentry, LogRocket, etc.)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className=" flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-red-700">
                Une erreur est survenue
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              Nous sommes désolés, quelque chose s'est mal passé.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { memo } from 'react';

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const orbitVariants = {
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

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ============================================================
// COMPOSANT: OrbitingStar (Mémoïsé)
// ============================================================

interface OrbitingStarProps {
  delay: number;
  duration: number;
  radius: number;
}

const OrbitingStar = memo<OrbitingStarProps>(({ delay, duration, radius }) => (
  <motion.div
    className="absolute"
    animate={{
      rotate: 360
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
      delay
    }}
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      marginLeft: -radius,
      marginTop: -radius
    }}
  >
    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 absolute top-0 left-1/2 -translate-x-1/2" />
  </motion.div>
), (prev, next) => prev.delay === next.delay);

OrbitingStar.displayName = 'OrbitingStar';

// ============================================================
// COMPOSANT: FloatingParticle (Mémoïsé)
// ============================================================

interface FloatingParticleProps {
  delay: number;
  x: string;
  y: string;
}

const FloatingParticle = memo<FloatingParticleProps>(({ delay, x, y }) => (
  <motion.div
    className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-300 rounded-full"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 1, 0.2]
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
// COMPOSANT PRINCIPAL
// ============================================================

function LoadingFallbackComponent() {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br 
                  from-purple-900 via-indigo-900 to-purple-950 
                  relative overflow-hidden">

      {/* Background Animated Gradient Orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
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
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 
                   bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticle delay={0} x="10%" y="20%" />
      <FloatingParticle delay={0.5} x="85%" y="30%" />
      <FloatingParticle delay={1} x="20%" y="70%" />
      <FloatingParticle delay={1.5} x="90%" y="60%" />
      <FloatingParticle delay={2} x="50%" y="15%" />
      <FloatingParticle delay={2.5} x="15%" y="85%" />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10"
      >
        {/* Central Loading Spinner with Orbits */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8">
          {/* Central Core - Pulsing */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 
                     bg-gradient-to-br from-purple-400 to-pink-500 
                     rounded-full shadow-2xl shadow-purple-500/50 
                     flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
          </motion.div>

          {/* Rotating Ring 1 - Fast */}
          <motion.div
            variants={orbitVariants}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 border-4 border-purple-400/30 border-t-purple-400 
                     rounded-full"
          />

          {/* Rotating Ring 2 - Medium */}
          <motion.div
            variants={orbitVariants}
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-2 border-4 border-pink-400/30 border-b-pink-400 
                     rounded-full"
          />

          {/* Rotating Ring 3 - Slow */}
          <motion.div
            variants={orbitVariants}
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-4 border-4 border-indigo-400/30 border-r-indigo-400 
                     rounded-full"
          />

          {/* Orbiting Stars */}
          <OrbitingStar delay={0} duration={4} radius={60} />
          <OrbitingStar delay={1} duration={5} radius={70} />
          <OrbitingStar delay={2} duration={6} radius={55} />
        </div>

        {/* Text Content - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #fff, #a855f7, #ec4899, #fff)',
              backgroundSize: '200% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mon Etoile
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-purple-200 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Consultation des astres en cours...
          </motion.p>

          {/* Loading Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full"
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

        {/* Loading Steps - Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 sm:mt-10 space-y-2"
        >
          {[
            { icon: '🌙', text: 'Analyse des phases lunaires', delay: 0 },
            { icon: '⭐', text: 'Calcul des positions planétaires', delay: 0.3 },
            { icon: '✨', text: 'Préparation de votre guidance', delay: 0.6 }
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
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-purple-300"
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: step.delay
                }}
              >
                {step.icon}
              </motion.span>
              <span>{step.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ============================================================
// EXPORT MÉMOÏSÉ
// ============================================================

export const LoadingFallback = memo(LoadingFallbackComponent, () => true);

