import { memo } from 'react';
import { motion } from 'framer-motion';

const spinnerVariants = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.1, 0.95, 1],
    transition: {
      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  },
};

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const textVariants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const OffrandesLoading = memo(() => (
  <div className="flex items-center justify-center min-h-[30vh] sm:min-h-[40vh] w-full px-2 sm:px-4">
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center gap-3 p-4 sm:p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-md border border-violet-200/50 dark:border-violet-800/50 max-w-[280px] sm:max-w-xs w-full"
    >
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className="relative"
      >
        <div className="absolute inset-0 bg-violet-500/20 dark:bg-violet-400/20 rounded-full blur-xl" />
        <span className="relative block w-12 h-12 sm:w-14 sm:h-14 text-violet-600 dark:text-violet-400 text-4xl sm:text-5xl select-none">
          🛍️
        </span>
      </motion.div>
      <motion.p
        variants={textVariants}
        animate="animate"
        className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide text-center px-2"
      >
        Chargement des offrandes...
      </motion.p>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400"
          />
        ))}
      </div>
    </motion.div>
  </div>
));

OffrandesLoading.displayName = 'OffrandesLoading';

export { OffrandesLoading };
