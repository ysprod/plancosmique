'use client';
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

const symbolVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.2
    }
  }
};

const floatingVariants: Variants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
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

const shimmerVariants: Variants = {
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// ========================================
// 🎨 ICON MAPPING
// ========================================

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

// ========================================
// 🎨 SUB-COMPONENTS (Memoized)
// ========================================

/**
 * Zodiac Symbol avec animations avancées
 */
const ZodiacSymbol = memo<{ symbol: string }>(({ symbol }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={symbolVariants}
      className="relative inline-block"
    >
      {/* Glow effect */}
      <motion.div
        variants={pulseVariants}
        animate="pulse"
        className="absolute inset-0 blur-2xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
      />
      
      {/* Symbol */}
      <motion.div
        className="relative text-6xl sm:text-7xl md:text-8xl"
        animate={prefersReducedMotion ? {} : {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut'
        }}
      >
        {symbol}
      </motion.div>

      {/* Sparkles autour */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 text-yellow-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 text-purple-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: 0.5
            }}
          >
            <Star className="w-4 h-4" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}, (prev, next) => prev.symbol === next.symbol);

ZodiacSymbol.displayName = 'ZodiacSymbol';

/**
 * Badge animé
 */
const AnimatedBadge = memo<{ text: string; color: string }>(({ text, color }) => (
  <motion.span
    whileHover={{ scale: 1.1, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-1.5 ${color} rounded-full font-bold text-xs sm:text-sm
               shadow-sm hover:shadow-md transition-shadow cursor-default
               relative overflow-hidden`}
  >
    {/* Shimmer effect */}
    <motion.div
      variants={shimmerVariants}
      animate="shimmer"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      style={{ backgroundSize: '200% 100%' }}
    />
    <span className="relative z-10">{text}</span>
  </motion.span>
), (prev, next) => prev.text === next.text && prev.color === next.color);

AnimatedBadge.displayName = 'AnimatedBadge';

/**
 * Section Card avec animations avancées
 */
interface SectionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  colors: {
    icon: string;
    bg: string;
    hover: string;
    gradient: string;
  };
}

const SectionCard = memo<SectionCardProps>(({ icon: Icon, title, content, colors }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.02, 
        y: -4,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 
                 border-2 border-gray-100 ${colors.hover} 
                 transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-xl 
                     flex items-center justify-center flex-shrink-0
                     shadow-md group-hover:shadow-lg transition-shadow`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
        </motion.div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base
                       group-hover:text-gray-800 transition-colors">
            {title}
          </h4>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed
                      group-hover:text-gray-700 transition-colors">
            {content}
          </p>
        </div>
      </div>

      {/* Decorative corner */}
      <motion.div
        className="absolute -top-1 -right-1 w-20 h-20 opacity-10"
        animate={prefersReducedMotion ? {} : {
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Icon className={`w-full h-full ${colors.icon}`} />
      </motion.div>
    </motion.div>
  );
}, (prev, next) => 
  prev.title === next.title && 
  prev.content === next.content
);

SectionCard.displayName = 'SectionCard';

/**
 * Info Card avec animations
 */
interface InfoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}

const InfoCard = memo<InfoCardProps>(({ icon: Icon, label, value, color }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className="relative bg-white rounded-2xl p-4 border-2 border-gray-100 
               hover:border-gray-200 transition-all text-center overflow-hidden
               group cursor-pointer"
  >
    {/* Animated background */}
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 
                 group-hover:opacity-10 transition-opacity duration-300`}
    />

    {/* Content */}
    <div className="relative z-10">
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="inline-block"
      >
        <Icon className={`w-6 h-6 mx-auto mb-2 text-${color.split('-')[1]}-600`} />
      </motion.div>
      <p className="text-xs text-gray-600 mb-1 font-medium">{label}</p>
      <p className="font-bold text-gray-900 text-sm leading-tight">{value}</p>
    </div>

    {/* Shimmer effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{
        x: ['-100%', '100%']
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeInOut'
      }}
    />
  </motion.div>
), (prev, next) => 
  prev.label === next.label && 
  prev.value === next.value
);

InfoCard.displayName = 'InfoCard';

// ========================================
// 🎯 MAIN COMPONENT
// ========================================

interface ResultDisplayProps {
  result: HoroscopeResult;
}

const ResultDisplay = memo<ResultDisplayProps>(({ result }) => {
  const prefersReducedMotion = useReducedMotion();

  // Memoize sections data
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
