import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { memo } from "react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const LoadingState = memo(() => (
  <div className="flex items-center justify-center min-h-[250px] relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-cyan-50/40 dark:from-emerald-950 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-xl">
    {/* Animated gradient orbs */}
    <motion.div
      animate={{
        rotate: [0, 120, 240, 360],
        scale: [1, 1.2, 1.1, 1],
        opacity: [0.25, 0.45, 0.35, 0.25],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 dark:from-emerald-600/10 dark:via-teal-600/10 dark:to-cyan-600/10 blur-3xl"
    />

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-4"
    >
      {/* Chart icon with animated bars */}
      <motion.div
        variants={itemVariants}
        className="relative mb-6"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-2xl opacity-50"
        />

        {/* Main container */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[3px] shadow-2xl"
        >
          <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600 dark:text-teal-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Animated data points */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            className="absolute"
            style={{
              left: `${30 + i * 20}%`,
              top: '-5px',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content card */}
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl px-8 py-5 shadow-2xl border border-white/30 dark:border-gray-700/30 text-center max-w-sm"
      >
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2"
        >
          Chargement des rapports...
        </motion.p>

        {/* Progress indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-1 mb-3"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              className="w-1 h-4 rounded-full bg-gradient-to-t from-emerald-500 to-teal-500"
            />
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium"
        >
          Analyse des données en cours...
        </motion.p>
      </motion.div>
    </motion.div>
  </div>
));

LoadingState.displayName = 'LoadingState';
export default LoadingState;