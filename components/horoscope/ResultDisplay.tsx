'use client';
import ZodiacSymbol from './ZodiacSymbol';
import AnimatedBadge from './AnimatedBadge';
import SectionCard from './SectionCard';
import InfoCard from './InfoCard';
import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Sparkles, Heart, Briefcase, Activity, Star, Moon, Zap, Sun } from 'lucide-react';
import { HoroscopeResult } from '@/lib/interfaces';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
};

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const SECTION_ICONS = {
  love: Heart,
  work: Briefcase,
  health: Activity
} as const;

const SECTION_COLORS = {
  love: {
    icon: 'text-rose-600',
    bg: 'bg-rose-100',
    hover: 'hover:border-rose-300',
    gradient: 'from-rose-50 to-pink-50'
  },
  work: {
    icon: 'text-blue-600',
    bg: 'bg-blue-100',
    hover: 'hover:border-blue-300',
    gradient: 'from-blue-50 to-indigo-50'
  },
  health: {
    icon: 'text-green-600',
    bg: 'bg-green-100',
    hover: 'hover:border-green-300',
    gradient: 'from-green-50 to-emerald-50'
  }
} as const;

interface ResultDisplayProps {
  result: HoroscopeResult;
}

const ResultDisplay = memo<ResultDisplayProps>(({ result }) => {
  const prefersReducedMotion = useReducedMotion();

  const sections = useMemo(() => [
    { key: 'love', title: 'Amour & Relations', content: result.love },
    { key: 'work', title: 'Travail & Carrière', content: result.work },
    { key: 'health', title: 'Santé & Bien-être', content: result.health }
  ] as const, [result.love, result.work, result.health]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 mt-8"
    >
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        className="relative text-center pb-6 border-b-2 border-gray-200"
      >
        {/* Background glow */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              className="w-64 h-64 bg-gradient-to-br from-purple-200 via-pink-200 to-amber-200 
                       rounded-full blur-3xl opacity-20"
            />
          </div>
        )}

        {/* Zodiac Symbol */}
        <div className="relative mb-4">
          <ZodiacSymbol symbol={result.symbol} />
        </div>

        {/* Zodiac Sign */}
        <motion.h3
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-black text-gray-900 mb-3
                   bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 
                   bg-clip-text text-transparent"
        >
          {result.zodiacSign}
        </motion.h3>

        {/* Period */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 font-semibold text-base mb-3"
        >
          {result.period}
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <AnimatedBadge text={result.element} color="bg-purple-50 text-purple-700" />
          <AnimatedBadge text={result.horoscopeType} color="bg-blue-50 text-blue-700" />
        </motion.div>
      </motion.div>

      {/* General Forecast */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                   rounded-3xl p-6 border-2 border-purple-200 overflow-hidden group"
      >
        {/* Animated background pattern */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 
                       rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-lg">Prévisions Générales</h4>
              <div className="flex items-center gap-1 mt-1">
                <Sun className="w-3 h-3 text-amber-500" />
                <Zap className="w-3 h-3 text-purple-500" />
                <Moon className="w-3 h-3 text-indigo-500" />
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {result.generalForecast}
          </p>
        </div>
      </motion.div>

      {/* Sections Grid */}
      <div className="grid gap-4">
        {sections.map(({ key, title, content }) => (
          <SectionCard
            key={key}
            icon={SECTION_ICONS[key]}
            title={title}
            content={content}
            colors={SECTION_COLORS[key]}
          />
        ))}
      </div>

      {/* Spiritual Advice */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 
                   rounded-3xl p-6 border-2 border-amber-300 overflow-hidden group"
      >
        {/* Decorative stars */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-4 right-4 text-amber-300/30"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <Star className="w-16 h-16" fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-orange-300/30"
              animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
              transition={{ duration: 15, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
          </>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Star className="w-6 h-6 text-amber-600" fill="currentColor" />
            </motion.div>
            <h4 className="font-bold text-amber-900 text-base sm:text-lg">
              Sagesse Ancestrale
            </h4>
          </div>
          <blockquote className="text-amber-800 italic leading-relaxed text-sm sm:text-base
                               border-l-4 border-amber-400 pl-4">
            "{result.spiritualAdvice}"
          </blockquote>
        </div>
      </motion.div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <InfoCard
          icon={Moon}
          label="Planète Dominante"
          value={result.dominantPlanet}
          color="from-purple-500 to-indigo-500"
        />
        <InfoCard
          icon={Sparkles}
          label="Couleur Porte-bonheur"
          value={result.luckyColor}
          color="from-amber-500 to-orange-500"
        />
      </div>
    </motion.div>
  );
}, (prev, next) =>
  prev.result.zodiacSign === next.result.zodiacSign &&
  prev.result.generalForecast === next.result.generalForecast &&
  prev.result.love === next.result.love &&
  prev.result.work === next.result.work &&
  prev.result.health === next.result.health
);

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;