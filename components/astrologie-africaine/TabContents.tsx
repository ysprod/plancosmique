import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Moon, Sparkles } from 'lucide-react';
import { MoonPhaseWidget } from '@/components/astrologie-africaine/MoonPhaseWidget';
import React, { memo } from 'react';
import { RitualCard } from './RitualCard';
import { IncantationCard } from './IncantationCard';

export const RITUELS_DATA = [
  { name: "Rituel de Nouvelle Lune", phase: "Nouvelle Lune", goal: "Nouveaux départs, intentions" },
  { name: "Rituel de Lune Croissante", phase: "Croissante", goal: "Croissance, expansion" },
  { name: "Rituel de Pleine Lune", phase: "Pleine Lune", goal: "Manifestation, gratitude" },
  { name: "Rituel de Lune Décroissante", phase: "Décroissante", goal: "Libération, purification" },
  { name: "Rituel de Purification", phase: "Toutes phases", goal: "Nettoyage énergétique" },
  { name: "Rituel d'Abondance", phase: "Pleine Lune", goal: "Prospérité matérielle" }
];

export const INCANTATIONS_DATA = [
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

const CalendrierLunaireContent = memo(() => (
  <motion.div
    key="calendrier"
    variants={tabVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4 sm:space-y-6"
  >
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-indigo-200 shadow-lg">
    
      <MoonPhaseWidget />
    </div>
  </motion.div>
));
CalendrierLunaireContent.displayName = 'CalendrierLunaireContent';

const RituelsContent = memo(() => (
  <motion.div
    key="rituels"
    variants={tabVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4 sm:space-y-6"
  >
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">
            Rituels Magiques
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Cérémonies sacrées lunaires
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
          Les rituels sont des cérémonies sacrées qui alignent vos intentions avec les cycles cosmiques.
          Chaque rituel est conçu pour une phase lunaire spécifique afin de maximiser son efficacité.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6"
      >
        {RITUELS_DATA.map((ritual, idx) => (
          <RitualCard key={idx} ritual={ritual} index={idx} />
        ))}
      </motion.div>
    </div>
  </motion.div>
));
RituelsContent.displayName = 'RituelsContent';

const IncantationsContent = memo(() => (
  <motion.div
    key="incantations"
    variants={tabVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="space-y-4 sm:space-y-6"
  >
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-200 shadow-lg">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">
            Incantations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Appels sacrés aux forces spirituelles
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Les invocations sont des appels sacrés aux forces spirituelles et aux divinités.
          Prononcez ces paroles avec respect et intention pour établir une connexion divine
          et manifester vos désirs dans le monde physique.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6"
      >
        {INCANTATIONS_DATA.map((incantation, idx) => (
          <IncantationCard key={idx} incantation={incantation} index={idx} />
        ))}
      </motion.div>
    </div>
  </motion.div>
));
IncantationsContent.displayName = 'IncantationsContent';

export { CalendrierLunaireContent, RituelsContent, IncantationsContent };
