'use client';

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { LifeCyclesSection } from './LifeCyclesSection';
import { OfferingsSection } from './OfferingsSection';
import { SynthesisSection } from './SynthesisSection';
import { CyclesSection } from './CyclesSection';
import { ThemeNaissanceSection } from './ThemeNaissanceSection';
import { WisdomSection } from './WisdomSection';
 

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// COMPOSANTS MÉMORISÉS
// ============================================================================

const Header = React.memo<{ consultation: any }>(({ consultation }) => {
  const formData = consultation.formData || {};
  const prenoms = formData.prenoms || formData.firstName || '';
  const nom = formData.nom || formData.lastName || '';
  const fullName = `${prenoms} ${nom}`.trim();

  return (
    <motion.header
      variants={headerVariants}
      className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-800/60 to-pink-800/60 p-6 backdrop-blur-md sm:mb-12 sm:p-8"
    >
      {/* Ornements décoratifs */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" />

      {/* Contenu */}
      <div className="relative z-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Sparkles className="h-7 w-7 text-yellow-400 sm:h-8 sm:w-8" />
          <h1 className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl lg:text-5xl">
            {consultation.title}
          </h1>
          <Sparkles className="h-7 w-7 text-yellow-400 sm:h-8 sm:w-8" />
        </div>

        {fullName && (
          <p className="mb-3 text-xl font-medium text-purple-100 sm:text-2xl">
            {fullName}
          </p>
        )}

        {formData.dateOfBirth && (
          <div className="mb-4 flex items-center justify-center gap-2 text-purple-300">
            <Calendar className="h-5 w-5" />
            <time dateTime={formData.dateOfBirth}>
              {new Date(formData.dateOfBirth).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        )}

        {consultation.description && (
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-purple-200 sm:text-base">
            {consultation.description}
          </p>
        )}

        {consultation.completedDate && (
          <p className="mt-4 text-xs text-purple-400">
            Complété le{' '}
            <time dateTime={consultation.completedDate}>
              {new Date(consultation.completedDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </p>
        )}
      </div>
    </motion.header>
  );
});
Header.displayName = 'Header';

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

interface Props {
  consultation: any;
}

export default function NumerologyResultClient({ consultation }: Props) {
  // Extraction des données d'analyse
  const analyse = useMemo(() => consultation.analyse || {}, [consultation.analyse]);

  const hasTheme = useMemo(
    () => Boolean(analyse.themeDeNaissance),
    [analyse.themeDeNaissance]
  );

  const hasCycles = useMemo(
    () => Boolean(analyse.cyclesEnMouvement),
    [analyse.cyclesEnMouvement]
  );

  const hasSynthesis = useMemo(
    () => Boolean(analyse.syntheseEtTiming),
    [analyse.syntheseEtTiming]
  );

  const hasLifeCycles = useMemo(
    () => Boolean(analyse.cyclesDeVieGrands?.length),
    [analyse.cyclesDeVieGrands]
  );

  const hasWisdom = useMemo(
    () => Boolean(analyse.sagessAfricaine),
    [analyse.sagessAfricaine]
  );

  const hasOfferings = useMemo(
    () => Boolean(consultation.alternatives?.length),
    [consultation.alternatives]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 py-6 px-3 sm:py-12 sm:px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl"
        role="article"
        aria-label="Résultats de consultation numérologique"
      >
        {/* Header */}
        <Header consultation={consultation} />

        {/* Sections principales */}
        <div className="space-y-6 sm:space-y-10">
          {/* Thème de Naissance */}
          {hasTheme && (
            <ThemeNaissanceSection data={analyse.themeDeNaissance} />
          )}

          {/* Cycles en Mouvement */}
          {hasCycles && (
            <CyclesSection data={analyse.cyclesEnMouvement} />
          )}

          {/* Synthèse et Timing */}
          {hasSynthesis && (
            <SynthesisSection data={analyse.syntheseEtTiming} />
          )}

          {/* Cycles de Vie Grands */}
          {hasLifeCycles && (
            <LifeCyclesSection data={analyse.cyclesDeVieGrands} />
          )}

          {/* Sagesse Africaine */}
          {hasWisdom && (
            <WisdomSection data={analyse.sagessAfricaine} />
          )}

         
        </div>
      </motion.div>
    </div>
  );
}
