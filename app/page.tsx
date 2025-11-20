'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Moon,
  Star,
  Eye,
  Compass,
  Sun,
  Briefcase,
  Heart,
  Building2,
  Flame,
  Hash,
  Palmtree,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconMap = {
  Eye,
  Compass,
  Sparkles,
  Star,
  Briefcase,
  Palmtree,
  Heart,
  Building2,
  Flame,
  Hash
} as const;

const cosmicQuestions = [
  {
    question: "Qui suis-je ?",
    iconName: "Eye" as const,
    gradient: "from-violet-500 via-purple-400 to-pink-400",
    bgGradient: "from-violet-50 to-purple-50",
    shadowColor: "shadow-violet-200/50"
  },
  {
    question: "D'où viens-je ?",
    iconName: "Compass" as const,
    gradient: "from-cyan-500 via-blue-400 to-indigo-400",
    bgGradient: "from-cyan-50 to-blue-50",
    shadowColor: "shadow-cyan-200/50"
  },
  {
    question: "Où vais-je ?",
    iconName: "Sparkles" as const,
    gradient: "from-amber-500 via-orange-400 to-rose-400",
    bgGradient: "from-amber-50 to-orange-50",
    shadowColor: "shadow-amber-200/50"
  }
];

const categories = [
  {
    id: "horoscope",
    title: "Horoscope par Signe",
    iconName: "Star" as const,
    gradient: "from-yellow-400 to-amber-500",
    bgGradient: "from-yellow-50 to-amber-50",
    description: "Prédictions quotidiennes, mensuelles et annuelles",
    href: "/horoscope",
    count: "4 services",
    accentColor: "text-amber-600"
  },
  {
    id: "personal",
    title: "Ma Vie Personnelle",
    iconName: "Briefcase" as const,
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
    description: "Thème astral, mission de vie et talents cachés",
    href: "/vie-personnelle",
    count: "10 services",
    accentColor: "text-purple-600"
  },
  {
    id: "african",
    title: "Astrologie Africaine",
    iconName: "Palmtree" as const,
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    description: "Traditions et sagesses ancestrales millénaires",
    href: "/astrologie-africaine",
    count: "4 services",
    accentColor: "text-teal-600"
  },
  {
    id: "relationships",
    title: "Famille & Couple",
    iconName: "Heart" as const,
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
    description: "Compatibilités et relations karmiques",
    href: "/relations",
    count: "5 services",
    accentColor: "text-rose-600"
  },
  {
    id: "business",
    title: "Monde Professionnel",
    iconName: "Building2" as const,
    gradient: "from-sky-400 to-cyan-500",
    bgGradient: "from-sky-50 to-cyan-50",
    description: "Team building et astropsychologie collective",
    href: "/professionnel",
    count: "4 services",
    accentColor: "text-cyan-600"
  },
  {
    id: "spirituality",
    title: "Spiritualité Africaine",
    iconName: "Flame" as const,
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    description: "Rituels sacrés et méditations guidées",
    href: "/spiritualite",
    count: "5 services",
    accentColor: "text-orange-600"
  },
  {
    id: "numerology",
    title: "Numérologie",
    iconName: "Hash" as const,
    gradient: "from-indigo-400 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
    description: "Les secrets cachés dans vos nombres",
    href: "/numerologie",
    count: "5 services",
    accentColor: "text-indigo-600"
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-cyan-200/30 via-blue-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-gradient-to-bl from-amber-200/25 via-orange-200/15 to-transparent rounded-full blur-3xl" />
        
        {/* Decorative stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-2 h-2 text-amber-400/40 fill-amber-400/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-8 lg:mb-12"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-200 to-amber-200 rounded-full blur-2xl opacity-40 animate-pulse" />
              <Image
                src="/logo.png"
                alt="Mon Etoile Logo"
                width={144}
                height={144}
                priority
                className="relative w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500">
              MON ETOILE
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed px-4"
          >
            Un espace sacré pour comprendre votre chemin, révéler votre essence et illuminer votre destinée
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mt-8 max-w-xs mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
            <Moon className="w-3 h-3 text-purple-400" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Cosmic Questions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-20 lg:mb-28 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl w-full">
            {cosmicQuestions.map((item) => {
              const IconComponent = iconMap[item.iconName];
              return (
                <motion.div
                  key={item.question}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <div className={`relative bg-gradient-to-br ${item.bgGradient} rounded-2xl p-8 shadow-lg ${item.shadowColor} hover:shadow-xl transition-all duration-300 border border-white/50`}>
                    <div className={`w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 text-center">
                      {item.question}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20 lg:mb-28 px-4"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-lg border border-slate-200/50">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center mb-6">
              Inspiré des <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">sagesses africaines</span> et éclairé par la <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">lecture des astres</span>, notre plateforme vous accompagne dans votre quête spirituelle.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-300" />
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-300" />
            </div>
            <p className="text-sm text-slate-600 italic text-center">
              Votre thème astral devient une boussole, une mémoire et une lumière
            </p>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-24 lg:mb-28 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => {
              const IconComponent = iconMap[category.iconName];
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={category.href}>
                    <div className={`group relative bg-gradient-to-br ${category.bgGradient} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white/50 h-full`}>
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className={`text-lg font-bold ${category.accentColor} mb-2 leading-tight`}>
                        {category.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/50">
                        <span className="text-xs text-slate-500 font-medium">{category.count}</span>
                        <div className="flex items-center gap-1 text-slate-700 group-hover:translate-x-1 transition-transform duration-300">
                          <span className="text-sm font-semibold">Découvrir</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mb-20 px-4"
        >
          <Link href="/consultation">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative px-12 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Commencer votre voyage spirituel
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-center pt-12 border-t border-slate-200 px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4 opacity-50">
            <Moon className="w-3 h-3 text-purple-500" />
            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <Sun className="w-3 h-3 text-orange-500" />
          </div>
          <p className="text-xs text-slate-500 mb-2">
            © 2025 Mon Etoile - Tous droits réservés
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Guidé par la lumière des astres et la sagesse ancestrale
          </p>
        </motion.div>
      </div>
    </div>
  );
}
