import { memo } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const containerVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const dotsVariants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.3, 1, 0.3],
  },
};

export const RubriquesOverviewLoading = memo(function RubriquesOverviewLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-zinc-900/90 dark:to-zinc-800/90 backdrop-blur-md border border-slate-200/50 dark:border-zinc-700/50 max-w-sm w-full"
      >
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className="relative"
        >
          <div className="absolute inset-0 bg-violet-500/20 dark:bg-violet-400/20 rounded-full blur-2xl" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-500 dark:via-purple-500 dark:to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm sm:text-base font-bold text-slate-800 dark:text-zinc-100"
          >
            Chargement de l'architecture
          </motion.p>

          <div className="flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={dotsVariants}
                animate="animate"
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
});
