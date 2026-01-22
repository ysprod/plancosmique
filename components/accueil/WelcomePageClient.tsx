'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import WelcomeHeader from '@/components/accueil/WelcomeHeader';
import WelcomeQuestions from '@/components/accueil/WelcomeQuestions';
import WelcomeIntro from '@/components/accueil/WelcomeIntro';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function WelcomePageClient() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 z-50 origin-left"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto px-3 sm:px-6"
      >
        <motion.div variants={itemVariants}>
          <WelcomeHeader />
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-center mb-4 text-xs sm:text-sm text-gray-700 dark:text-slate-300 px-2 leading-relaxed"
        >
          Bienvenue dans ce temple, où chacun vient chercher une réponse aux trois grandes questions de l'existence :
        </motion.p>

        <motion.div variants={itemVariants} className="mb-2">
          <WelcomeQuestions />
        </motion.div>

        <motion.div variants={itemVariants}>
          <WelcomeIntro />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(WelcomePageClient);