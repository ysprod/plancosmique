import { MoonPhaseWidget } from '@/components/astrologie-africaine/MoonPhaseWidget';
import { motion } from 'framer-motion';
import { memo } from 'react';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

export const CalendrierLunaireContent = memo(() => (
  <motion.div
    key="calendrier"
    variants={tabVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4 sm:space-y-6"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-indigo-200/60 dark:border-indigo-800/40 shadow-xl"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 w-40 h-40 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
      />

      <div className="relative">
        <MoonPhaseWidget />
      </div>
    </motion.div>
  </motion.div>
));

CalendrierLunaireContent.displayName = 'CalendrierLunaireContent';