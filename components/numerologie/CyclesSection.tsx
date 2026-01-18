'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Calendar, Sun, Moon, Globe } from 'lucide-react';
 
interface CycleData {
  valeur: number;
  calcul: string;
  signification: string;
  interpretation: string;
  conseil?: string;
  mois?: string;
  date?: string;
}

interface CyclesData {
  description: string;
  anneeUniverselle: CycleData;
  anneePersonnelle: CycleData;
  moisPersonnel: CycleData;
  jourPersonnel: CycleData;
}
 
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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cycleCardVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
 
const CycleCard = React.memo<{
  title: string;
  icon: React.ReactNode;
  data: CycleData;
  gradient: string;
  subtitle?: string;
}>(({ title, icon, data, gradient, subtitle }) => (
  <motion.article
    variants={cycleCardVariants}
    className="group overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:shadow-purple-500/20"
  >
    {/* Header */}
    <div className="p-5 sm:p-6">
      {/* Titre et nombre */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <div className={`rounded-lg bg-gradient-to-r ${gradient} p-2 text-white shadow-lg`}>
              {icon}
            </div>
            <h3 className="text-base font-bold text-purple-100 sm:text-lg">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="ml-10 text-xs capitalize text-purple-300">{subtitle}</p>
          )}
        </div>
        
        {/* Nombre circulaire */}
        <motion.div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${gradient} text-2xl font-bold text-white shadow-xl sm:h-16 sm:w-16 sm:text-3xl`}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {data.valeur}
        </motion.div>
      </div>

      {/* Signification */}
      <div className="mb-3 rounded-lg bg-black/20 p-3">
        <p className="text-xs italic text-purple-300 sm:text-sm">
          {data.signification}
        </p>
      </div>

      {/* Interprétation */}
      <p className="mb-3 text-xs leading-relaxed text-purple-200 sm:text-sm">
        {data.interpretation}
      </p>

      {/* Conseil (si présent) */}
      {data.conseil && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
        >
          <p className="flex items-start gap-2 text-xs font-medium text-yellow-200 sm:text-sm">
            <span className="text-lg">💡</span>
            <span>{data.conseil}</span>
          </p>
        </motion.div>
      )}
    </div>
  </motion.article>
));
CycleCard.displayName = 'CycleCard';
 
interface Props {
  data: CyclesData;
}

export const CyclesSection = React.memo<Props>(({ data }) => (
  <motion.section
    variants={sectionVariants}
    className="rounded-3xl bg-gradient-to-br from-indigo-800/40 to-purple-800/40 p-5 backdrop-blur-sm sm:p-8"
    aria-labelledby="cycles-title"
  >
    {/* En-tête */}
    <div className="mb-8 text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <TrendingUp className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
        <h2
          id="cycles-title"
          className="text-2xl font-bold text-purple-100 sm:text-3xl lg:text-4xl"
        >
          Cycles en Mouvement
        </h2>
        <TrendingUp className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
      </div>
      <p className="text-sm text-purple-300 sm:text-base">{data.description}</p>
    </div>

    {/* Grille de cycles */}
    <motion.div
      variants={gridVariants}
      className="grid gap-5 sm:grid-cols-2 lg:gap-6"
    >
      {/* Année Universelle */}
      <CycleCard
        title="Année Universelle"
        icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
        data={data.anneeUniverselle}
        gradient="from-cyan-500 to-blue-500"
      />

      {/* Année Personnelle */}
      <CycleCard
        title="Année Personnelle"
        icon={<Sun className="h-5 w-5 sm:h-6 sm:w-6" />}
        data={data.anneePersonnelle}
        gradient="from-orange-500 to-pink-500"
      />

      {/* Mois Personnel */}
      <CycleCard
        title="Mois Personnel"
        icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />}
        data={data.moisPersonnel}
        gradient="from-purple-500 to-indigo-500"
        subtitle={data.moisPersonnel.mois}
      />

      {/* Jour Personnel */}
      <CycleCard
        title="Jour Personnel"
        icon={<Moon className="h-5 w-5 sm:h-6 sm:w-6" />}
        data={data.jourPersonnel}
        gradient="from-pink-500 to-rose-500"
        subtitle={data.jourPersonnel.date}
      />
    </motion.div>
  </motion.section>
));

CyclesSection.displayName = 'CyclesSection';