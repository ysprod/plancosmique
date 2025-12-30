'use client';
import { GenerationStep } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { memo } from 'react';
 
interface LoadingSpinnerProps {
  step: GenerationStep;
}

const STEP_CONFIG: Record<GenerationStep, { message: string; color: string }> = {
  loading: { message: 'Initialisation...', color: 'purple' },
  fetching: { message: 'Récupération en cours... Veuillez patienter', color: 'blue' },
  generating: { message: 'Génération de votre analyse...', color: 'purple' },
  success: { message: 'Analyse complète !', color: 'green' },
  error: { message: 'Une erreur est survenue', color: 'red' },
};

const AnimatedDot = memo(({ delay }: { delay: number }) => (
  <motion.div
    animate={{ y: [-8, 0, -8] }}
    transition={{ duration: 1.2, repeat: Infinity, delay }}
    className="w-2 h-2 rounded-full bg-purple-500"
  />
));
AnimatedDot.displayName = 'AnimatedDot';

const OrbitingSparkles = memo(() => (
  <div className="relative w-20 h-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0"
    >
      <Sparkles className="w-5 h-5 text-purple-400 absolute top-0 left-1/2 -translate-x-1/2" />
      <Sparkles className="w-5 h-5 text-pink-400 absolute bottom-0 right-0" />
      <Sparkles className="w-5 h-5 text-blue-400 absolute bottom-0 left-0" />
    </motion.div>

    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-1"
    >
      <div className="w-full h-full rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500" />
    </motion.div>

    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-3 rounded-full border border-purple-300/30"
    />
  </div>
));
OrbitingSparkles.displayName = 'OrbitingSparkles';

const LoadingSpinner = memo(({ step }: LoadingSpinnerProps) => {
  const config = STEP_CONFIG[step];
  const isLoading = step === 'loading' || step === 'fetching' || step === 'generating';

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center 
                  bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 
                  dark:from-gray-950/80 dark:via-purple-950/30 dark:to-gray-900/80 
                  backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 px-4"
      >
        {/* Spinner */}
        {isLoading && <OrbitingSparkles />}

        {/* Success State */}
        {step === 'success' && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                          flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {step === 'error' && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 
                          flex items-center justify-center shadow-2xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {config.message}
          </p>

          {/* Loading dots */}
          {isLoading && (
            <div className="flex items-center justify-center gap-1 mt-3">
              <AnimatedDot delay={0} />
              <AnimatedDot delay={0.15} />
              <AnimatedDot delay={0.3} />
            </div>
          )}
        </motion.div>

        {/* Subtitle */}
        {(step === 'fetching' || step === 'generating') && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-gray-600 dark:text-gray-400 max-w-xs text-center"
          >
            {step === 'generating'
              ? 'Analyse astrologique en cours. Cela peut prendre quelques secondes...'
              : 'Connexion au serveur...'}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;