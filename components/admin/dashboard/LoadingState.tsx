import { memo } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const LoadingState = memo(() => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] relative overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-purple-950/20 dark:to-indigo-950/20">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-indigo-400/20 to-pink-400/20 dark:from-purple-600/10 dark:via-indigo-600/10 dark:to-pink-600/10 blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-4"
      >
        {/* Main spinner with glow effect */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 blur-xl opacity-50"
          />

          {/* Main spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 p-[3px]"
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
          </motion.div>

          {/* Center pulsing dot */}
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
          </motion.div>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl px-8 py-6 shadow-2xl border border-white/20 dark:border-gray-700/30 text-center max-w-sm"
        >
          {/* Title with gradient */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Chargement du tableau de bord
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium"
          >
            Veuillez patienter quelques instants...
          </motion.p>

          {/* Progress dots */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';

export default LoadingState;