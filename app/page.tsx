'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Moon,
  Star,
  Eye,
  Zap,
  Briefcase,
  Heart,
  Users,
  Compass,
  Target,
  Lightbulb,
  TrendingUp,
  Gem,
  Shield,
  DollarSign,
  Calendar,
  Sparkle,
  FileText,
  Globe,
  Baby,
  Link2,
  UserCheck,
  Building2,
  UsersRound,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Three cosmic questions with new colors
const cosmicQuestions = [
  {
    question: "Qui suis-je ?",
    icon: Eye,
    color: "from-amber-600 via-orange-500 to-red-500",
    bgColor: "from-amber-900/30 to-orange-900/30",
    borderColor: "border-amber-500/40"
  },
  {
    question: "D'où viens-je ?",
    icon: Compass,
    color: "from-indigo-600 via-purple-500 to-fuchsia-500",
    bgColor: "from-indigo-900/30 to-purple-900/30",
    borderColor: "border-indigo-500/40"
  },
  {
    question: "Où vais-je ?",
    icon: Sparkles,
    color: "from-teal-600 via-cyan-500 to-sky-500",
    bgColor: "from-teal-900/30 to-cyan-900/30",
    borderColor: "border-teal-500/40"
  }
];

// Main categories with enhanced color schemes
const categories = [
  {
    id: "professional",
    title: "MA VIE PROFESSIONNELLE",
    icon: Briefcase,
    color: "from-violet-600 via-purple-600 to-fuchsia-600",
    lightColor: "from-violet-400 to-fuchsia-400",
    glowColor: "violet-500",
    description: "Découvrez votre mission de vie, révélez vos talents cachés et alignez-vous avec votre véritable destinée professionnelle",
    services: [
      { icon: Eye, title: "Qui suis-je ?", description: "Les traits généraux de votre signe astrologique", href: "/qui-suis-je" },
      { icon: Target, title: "Ma mission de vie", description: "Ce pour quoi vous êtes venu(e) sur Terre", href: "/mission-de-vie" },
      { icon: Briefcase, title: "Ma vocation professionnelle", description: "Le métier qui vous fait vibrer", href: "/vocation" },
      { icon: Lightbulb, title: "Mes talents naturels", description: "Ces dons souvent cachés ou oubliés", href: "/talents" },
      { icon: Shield, title: "Mes blessures karmiques", description: "Ce que votre âme est venue guérir", href: "/blessures-karmiques" },
      { icon: Heart, title: "Ma manière d'aimer", description: "Comment j'aime et je suis aimé(e)", href: "/maniere-aimer" },
      { icon: DollarSign, title: "Mon rapport à l'argent", description: "Argent, travail et succès", href: "/rapport-argent" },
      { icon: Gem, title: "Ma stabilité émotionnelle", description: "Équilibre intérieur et émotionnel", href: "/stabilite" },
      { icon: Calendar, title: "Les grands cycles", description: "Les périodes clés de transformation", href: "/cycles-vie" },
      { icon: Sparkle, title: "Lien avec l'invisible", description: "Monde spirituel, rêves et intuition", href: "/spirituel" },
      { icon: FileText, title: "Thème astral complet", description: "Analyse approfondie de votre carte du ciel", href: "/theme-astral" },
      { icon: Globe, title: "Signe astrologique africain", description: "Votre signe selon la tradition africaine", href: "/signe-africain" },
      { icon: Star, title: "Ma divinité égyptienne", description: "La divinité qui vous guide", href: "/divinite-egyptienne" }
    ]
  },
  {
    id: "relationships",
    title: "FAMILLE, AMITIÉ ET COUPLE",
    icon: Heart,
    color: "from-rose-600 via-pink-600 to-red-600",
    lightColor: "from-rose-400 to-red-400",
    glowColor: "rose-500",
    description: "Comprenez la vérité énergétique de vos relations et harmonisez vos liens affectifs, familiaux et amoureux",
    services: [
      { icon: Users, title: "Affinités & Compatibilités", description: "La vérité énergétique de vos relations", href: "/compatibilites" },
      { icon: Heart, title: "Synastrie de Couple", description: "Lecture profonde de vos thèmes croisés", href: "/synastrie" },
      { icon: Link2, title: "Relations Karmiques", description: "Âme sœur, flamme jumelle ou contrat karmique", href: "/relations-karmiques" },
      { icon: Baby, title: "Thème Astral de l'Enfant", description: "Son âme, ses talents et sa mission de vie", href: "/theme-enfant" },
      { icon: TrendingUp, title: "Chemin Amoureux", description: "Évolution du couple et périodes clés", href: "/chemin-amoureux" }
    ]
  },
  {
    id: "business",
    title: "MONDE PROFESSIONNEL",
    icon: Building2,
    color: "from-cyan-600 via-teal-600 to-emerald-600",
    lightColor: "from-cyan-400 to-emerald-400",
    glowColor: "teal-500",
    description: "Optimisez vos équipes, recrutements et dynamiques collectives grâce à l'intelligence astrologique",
    services: [
      { icon: UserCheck, title: "Talent & Potentiel", description: "Évaluer personnalité, forces et fragilités d'un candidat", href: "/talent-potentiel" },
      { icon: UsersRound, title: "Synergie d'Équipe", description: "Identifier affinités et tensions dans votre équipe", href: "/synergie-equipe" },
      { icon: Target, title: "Team Building Astrologique", description: "Créer des équipes productives et complémentaires", href: "/team-building" },
      { icon: Users, title: "Astropsychologie Collective", description: "Comprendre la dynamique globale d'un service", href: "/astropsychologie" }
    ]
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cosmic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Stars - Multiple layers */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#a78bfa' : '#60a5fa',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced Floating orbs with new colors */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Logo with enhanced glow */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-block mb-8"
          >
            <div className="relative w-56 h-56 mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-violet-500 to-teal-500 rounded-full blur-3xl opacity-60"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative w-full h-full bg-gradient-to-br from-white via-amber-50 to-violet-50 rounded-full p-4 shadow-2xl border-4 border-amber-400/30">
                <Image
                  src="/logo.png"
                  alt="Plan Cosmique Logo"
                  width={224}
                  height={224}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Orbiting elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Moon className="w-8 h-8 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-4xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-violet-400 to-teal-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              PLAN COSMIQUE
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-8"
          >
            <p className="text-2xl md:text-4xl text-amber-200/90 font-light mb-3 max-w-4xl mx-auto leading-relaxed">
              Un temple virtuel où chaque être vient répondre
            </p>
            <p className="text-xl md:text-2xl text-violet-200/80 font-light max-w-4xl mx-auto">
              aux trois grandes questions de l'existence
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <Sun className="w-6 h-6 text-amber-400" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Three Cosmic Questions - Enhanced */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24"
        >
          {cosmicQuestions.map((item, index) => (
            <motion.div
              key={item.question}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-500`} />
              <div className={`relative bg-gradient-to-br ${item.bgColor} backdrop-blur-xl rounded-3xl p-10 border-2 ${item.borderColor} group-hover:border-opacity-80 transition-all duration-300 shadow-2xl`}>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <item.icon className="w-16 h-16 text-amber-300 mb-6 mx-auto drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                </motion.div>
                <h3 className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color} text-center leading-tight`}>
                  {item.question}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="max-w-5xl mx-auto mb-28 text-center"
        >
          <div className="relative bg-gradient-to-br from-amber-900/20 via-violet-900/20 to-teal-900/20 backdrop-blur-xl rounded-3xl p-12 border-2 border-amber-500/30 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.3),transparent_50%)]" />
            </div>

            <div className="relative">
              <p className="text-xl md:text-2xl text-amber-100/90 leading-relaxed mb-8">
                Inspiré des <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">sagesses africaines</span> et éclairé par la <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">lecture des astres</span>, nous vous aidons à{' '}
                <span className="font-semibold text-teal-200">mieux vous connaître</span>, comprendre votre{' '}
                <span className="font-semibold text-violet-200">mission de vie</span>, révéler vos{' '}
                <span className="font-semibold text-rose-200">talents</span>, harmoniser vos{' '}
                <span className="font-semibold text-amber-200">relations</span> et avancer avec clarté sur votre chemin spirituel.
              </p>
              <div className="flex items-center justify-center gap-3 text-violet-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="text-lg md:text-xl font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-violet-200 to-teal-200">
                  Votre thème astral devient une boussole, une mémoire, et une lumière
                </span>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Sections - Enhanced */}
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + categoryIndex * 0.2, duration: 0.8 }}
            className="mb-32"
          >
            {/* Category Header - Enhanced */}
            <div className="text-center mb-16">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block mb-8"
              >
                <div className={`absolute inset-0 bg-${category.glowColor} rounded-3xl blur-2xl opacity-50`} />
                <div className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-2xl border-2 border-white/20`}>
                  <category.icon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </motion.div>

              <h2 className={`text-4xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${category.lightColor} mb-6 tracking-tight`}>
                {category.title}
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Services Grid - Enhanced */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {category.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href={service.href}>
                    <div className="group relative h-full">
                      {/* Enhanced Glow effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500`} />

                      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-7 border-2 border-slate-700/50 group-hover:border-opacity-100 transition-all duration-300 h-full shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                        {/* Enhanced Shine effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100`}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />

                        {/* Icon with glow */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="relative mb-5"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl blur-md opacity-50`} />
                          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                            <service.icon className="w-7 h-7 text-white" />
                          </div>
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-lg font-black text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                          {service.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-5">
                          {service.description}
                        </p>

                        {/* Enhanced Arrow indicator */}
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 8 }}
                          className={`flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${category.color} font-bold text-sm`}
                        >
                          <span>Découvrir</span>
                          <Zap className="w-4 h-4 text-amber-400" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}

        {/* Final Message - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="relative bg-gradient-to-br from-amber-900/30 via-orange-900/30 to-red-900/30 backdrop-blur-xl rounded-3xl p-16 border-2 border-amber-500/50 shadow-2xl overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2),transparent_70%)]" />

            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Star className="w-20 h-20 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 mb-6 leading-tight">
                Votre naissance est un message cosmique
              </h3>
              <p className="text-3xl text-amber-100/90 font-light mb-4">
                Nous vous aidons à le déchiffrer
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/50" />
                <Sparkle className="w-5 h-5 text-amber-400" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/50" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="text-center mb-20"
        >
          <Link href="/consultation">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-16 py-7 rounded-full text-white font-black text-2xl shadow-2xl overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-600 via-violet-600 to-teal-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-200%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />

              <span className="relative z-10 flex items-center gap-4">
                <Sparkles className="w-7 h-7 animate-pulse" />
                Commencer votre voyage cosmique
                <Sparkles className="w-7 h-7 animate-pulse" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-center mt-20 pt-12 border-t border-amber-500/20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-violet-400" />
            <Star className="w-4 h-4 text-amber-400" />
            <Sun className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-2">
            © 2025 Plan Cosmique - Tous droits réservés
          </p>
          <p className="text-xs text-slate-500 italic max-w-md mx-auto">
            Guidez vos choix, vos projets et votre évolution intérieure à travers la sagesse des astres
          </p>
        </motion.div>
      </div>
    </div>
  );
}
