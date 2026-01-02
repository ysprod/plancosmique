'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Star, Heart, Sparkles, Eye } from 'lucide-react';
import { NumberCard } from '../NumberCard';
 

// ============================================================================
// TYPES
// ============================================================================

interface NumberData {
  valeur: number | string;
  calcul: string;
  signification: string;
  interpretation: string;
}

interface ThemeData {
  description: string;
  cheminDeVie: NumberData;
  nombreExpression: NumberData;
  nombreAme: NumberData;
  nombrePersonnalite: NumberData;
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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

interface Props {
  data: ThemeData;
}

export const ThemeNaissanceSection = React.memo<Props>(({ data }) => {
  return (
    <motion.section
      variants={sectionVariants}
      className="rounded-3xl bg-gradient-to-br from-purple-800/40 to-pink-800/40 p-5 backdrop-blur-sm sm:p-8"
      aria-labelledby="theme-title"
    >
      {/* En-tête */}
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Star className="h-6 w-6 text-yellow-400 sm:h-7 sm:w-7" />
          <h2
            id="theme-title"
            className="text-2xl font-bold text-purple-100 sm:text-3xl lg:text-4xl"
          >
            Thème de Naissance
          </h2>
          <Star className="h-6 w-6 text-yellow-400 sm:h-7 sm:w-7" />
        </div>
        <p className="text-sm text-purple-300 sm:text-base">{data.description}</p>
      </div>

      {/* Grille de nombres */}
      <motion.div
        variants={gridVariants}
        className="grid gap-5 sm:grid-cols-2 lg:gap-6"
      >
        {/* Chemin de Vie */}
        <NumberCard
          title="Chemin de Vie"
          icon={<Star className="h-5 w-5 sm:h-6 sm:w-6" />}
          number={data.cheminDeVie.valeur}
          calcul={data.cheminDeVie.calcul}
          signification={data.cheminDeVie.signification}
          interpretation={data.cheminDeVie.interpretation}
          gradient="from-yellow-500 to-orange-500"
          badge="★ Le Plus Important"
        />

        {/* Nombre d'Expression */}
        <NumberCard
          title="Nombre d'Expression"
          icon={<Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />}
          number={data.nombreExpression.valeur}
          calcul={data.nombreExpression.calcul}
          signification={data.nombreExpression.signification}
          interpretation={data.nombreExpression.interpretation}
          gradient="from-pink-500 to-purple-500"
        />

        {/* Nombre d'Âme */}
        <NumberCard
          title="Nombre d'Âme"
          icon={<Heart className="h-5 w-5 sm:h-6 sm:w-6" />}
          number={data.nombreAme.valeur}
          calcul={data.nombreAme.calcul}
          signification={data.nombreAme.signification}
          interpretation={data.nombreAme.interpretation}
          gradient="from-purple-500 to-indigo-500"
        />

        {/* Nombre de Personnalité */}
        <NumberCard
          title="Nombre de Personnalité"
          icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
          number={data.nombrePersonnalite.valeur}
          calcul={data.nombrePersonnalite.calcul}
          signification={data.nombrePersonnalite.signification}
          interpretation={data.nombrePersonnalite.interpretation}
          gradient="from-blue-500 to-cyan-500"
        />
      </motion.div>
    </motion.section>
  );
});

ThemeNaissanceSection.displayName = 'ThemeNaissanceSection';
