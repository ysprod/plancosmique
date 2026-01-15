import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { memo } from 'react';
import { IncantationCard } from './IncantationCard';

const INCANTATIONS_DATA = [
  { name: "Invocation de Protection", purpose: "Bouclier spirituel et sécurité", element: "Terre" },
  { name: "Invocation d'Amour", purpose: "Attirer l'amour et l'harmonie", element: "Eau" },
  { name: "Invocation de Prospérité", purpose: "Abondance et richesse", element: "Or" },
  { name: "Invocation de Sagesse", purpose: "Clarté mentale et intuition", element: "Air" },
  { name: "Invocation de Guérison", purpose: "Santé et vitalité", element: "Lumière" },
  { name: "Invocation des Ancêtres", purpose: "Guidance et bénédiction", element: "Esprit" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

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

export const IncantationsContent = memo(() => (
  <motion.div
    key="incantations"
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
      className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-200/60 dark:border-pink-800/40 shadow-xl overflow-hidden"
    >
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 w-40 h-40 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
      />

      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-600 dark:via-purple-600 dark:to-indigo-600 flex items-center justify-center shadow-xl"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Incantations
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              Appels sacrés aux forces spirituelles
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6"
        >
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Les invocations sont des <span className="font-bold text-pink-600 dark:text-pink-400">appels sacrés</span> aux forces spirituelles et aux divinités.
            Prononcez ces paroles avec <span className="font-semibold">respect et intention</span> pour établir une connexion divine
            et manifester vos désirs dans le monde physique.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {INCANTATIONS_DATA.map((incantation, idx) => (
            <IncantationCard key={idx} incantation={incantation} index={idx} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
));

IncantationsContent.displayName = 'IncantationsContent';
