'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const ReportsLoadingState = memo(() => (
  <div className="min-h-screen w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50/40 to-sky-50/40 dark:from-blue-950 dark:via-cyan-950/30 dark:to-sky-950/30 rounded-xl">
    <motion.div
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -20, 20, 0],
        scale: [1, 1.15, 1.05, 1],
        opacity: [0.3, 0.5, 0.4, 0.3],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-sky-400/20 dark:from-blue-600/10 dark:via-cyan-600/10 dark:to-sky-600/10 blur-3xl"
    />

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-4"
    >
      <motion.div
        variants={itemVariants}
        className="relative mb-6"
      >
        {/* Pulsing glow */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 blur-xl opacity-40"
        />

        {/* Main icon card */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 p-[2.5px] shadow-2xl"
        >
          <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <TrendingUp className="w-9 h-9 sm:w-11 sm:h-11 text-cyan-600 dark:text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Rising bubbles effect */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, -40],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
            className="absolute bottom-0 w-2 h-2 rounded-full bg-cyan-500/60"
            style={{
              left: `${25 + i * 25}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Content card */}
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl px-6 py-4 shadow-2xl border border-white/30 dark:border-gray-700/30 text-center max-w-xs"
      >
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-blue-400 dark:via-cyan-400 dark:to-sky-400 bg-clip-text text-transparent mb-3"
        >
          Chargement des rapports...
        </motion.p>

        {/* Animated loading line */}
        <motion.div
          variants={itemVariants}
          className="relative h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"
          />
        </motion.div>

        {/* Percentage dots */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-1.5 mt-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
));

ReportsLoadingState.displayName = 'ReportsLoadingState';

export default ReportsLoadingState;