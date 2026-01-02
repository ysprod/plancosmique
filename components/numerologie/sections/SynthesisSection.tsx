'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface SynthesisData {
  accord: string;
  opportunites: string;
  defisActuels: string;
  conseilsPratiques: string[];
  prochainsJoursFavorables: Array<{
    date: string;
    jourPersonnel: number;
    pourquoi: string;
  }>;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// COMPOSANTS
// ============================================================================

const InfoCard = React.memo<{
  icon: React.ReactNode;
  title: string;
  content: string;
  gradient: string;
}>(({ icon, title, content, gradient }) => (
  <motion.div
    variants={cardVariants}
    className="group rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/20 sm:p-6"
  >
    <div className="mb-4 flex items-center gap-3">
      <div className={`rounded-xl bg-gradient-to-r ${gradient} p-3 text-white shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-purple-100 sm:text-xl">{title}</h3>
    </div>
    <p className="text-sm leading-relaxed text-purple-200 sm:text-base">{content}</p>
  </motion.div>
));
InfoCard.displayName = 'InfoCard';

const FavorableDay = React.memo<{
  date: string;
  jourPersonnel: number;
  pourquoi: string;
}>(({ date, jourPersonnel, pourquoi }) => (
  <motion.div
    variants={cardVariants}
    className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 backdrop-blur-sm"
  >
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-xl font-bold text-white shadow-lg">
      {jourPersonnel}
    </div>
    <div className="flex-1">
      <p className="mb-1 font-semibold text-green-200">
        {new Date(date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <p className="text-sm text-green-100">{pourquoi}</p>
    </div>
  </motion.div>
));
FavorableDay.displayName = 'FavorableDay';

// ============================================================================
// SECTION PRINCIPALE
// ============================================================================

interface Props {
  data: SynthesisData;
}

export const SynthesisSection = React.memo<Props>(({ data }) => (
  <motion.section
    variants={sectionVariants}
    className="rounded-3xl bg-gradient-to-br from-blue-800/40 to-indigo-800/40 p-5 backdrop-blur-sm sm:p-8"
    aria-labelledby="synthesis-title"
  >
    {/* En-tête */}
    <div className="mb-8 text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <Lightbulb className="h-6 w-6 text-yellow-400" />
        <h2
          id="synthesis-title"
          className="text-2xl font-bold text-purple-100 sm:text-3xl"
        >
          Synthèse & Timing
        </h2>
        <Lightbulb className="h-6 w-6 text-yellow-400" />
      </div>
      <p className="text-sm text-purple-300">
        Comprendre les énergies actuelles et saisir les opportunités
      </p>
    </div>

    {/* Cartes principales */}
    <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
      <InfoCard
        icon={<TrendingUp className="h-6 w-6" />}
        title="Accord Énergétique"
        content={data.accord}
        gradient="from-blue-500 to-cyan-500"
      />

      <InfoCard
        icon={<CheckCircle className="h-6 w-6" />}
        title="Opportunités"
        content={data.opportunites}
        gradient="from-green-500 to-emerald-500"
      />

      <InfoCard
        icon={<AlertTriangle className="h-6 w-6" />}
        title="Défis Actuels"
        content={data.defisActuels}
        gradient="from-orange-500 to-red-500"
      />
    </div>

    {/* Conseils Pratiques */}
    {data.conseilsPratiques?.length > 0 && (
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-purple-100">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          Conseils Pratiques
        </h3>
        <div className="space-y-3">
          {data.conseilsPratiques.map((conseil, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex gap-3 rounded-xl bg-yellow-500/10 p-4 backdrop-blur-sm"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-yellow-900">
                {index + 1}
              </span>
              <p className="text-sm text-yellow-100 sm:text-base">{conseil}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )}

    {/* Prochains Jours Favorables */}
    {data.prochainsJoursFavorables?.length > 0 && (
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-purple-100">
          <Calendar className="h-5 w-5 text-green-400" />
          Prochains Jours Favorables
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.prochainsJoursFavorables.map((day, index) => (
            <FavorableDay key={index} {...day} />
          ))}
        </div>
      </div>
    )}
  </motion.section>
));

SynthesisSection.displayName = 'SynthesisSection';
