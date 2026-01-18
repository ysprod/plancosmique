'use client';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { memo } from 'react';
import { RitualCard } from './RitualCard';

const RITUELS_DATA = [
  { name: "Rituel de Nouvelle Lune", phase: "Nouvelle Lune", goal: "Nouveaux départs, intentions" },
  { name: "Rituel de Lune Croissante", phase: "Croissante", goal: "Croissance, expansion" },
  { name: "Rituel de Pleine Lune", phase: "Pleine Lune", goal: "Manifestation, gratitude" },
  { name: "Rituel de Lune Décroissante", phase: "Décroissante", goal: "Libération, purification" },
  { name: "Rituel de Purification", phase: "Toutes phases", goal: "Nettoyage énergétique" },
  { name: "Rituel d'Abondance", phase: "Pleine Lune", goal: "Prospérité matérielle" }
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

export const RituelsContent = memo(() => (
  <motion.div
    key="rituels"
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
      className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-rose-950/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200/60 dark:border-purple-800/40 shadow-xl overflow-hidden"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl"
      />

      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 dark:from-purple-600 dark:via-pink-600 dark:to-rose-600 flex items-center justify-center shadow-xl"
          >
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              Rituels Magiques
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              Cérémonies sacrées lunaires
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
            Les rituels sont des <span className="font-bold text-purple-600 dark:text-purple-400">cérémonies sacrées</span> qui alignent vos intentions avec les cycles cosmiques.
            Chaque rituel est conçu pour une phase lunaire spécifique afin de <span className="font-semibold">maximiser son efficacité</span>.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {RITUELS_DATA.map((ritual, idx) => (
            <RitualCard key={idx} ritual={ritual} index={idx} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
));

RituelsContent.displayName = 'RituelsContent'