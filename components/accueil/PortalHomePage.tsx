'use client';

import { memo, useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Music,
  Sparkles,
  Star,
  ArrowRight,
  Globe,
  Heart,
  Flame,
  Sun,
  Crown,
  Lock,
  Sliders,
  Watch,
  Guitar,
  Cpu,
  Droplets,
  Radar,
  Waves,
  TreePine,
  Languages,
  BookOpen
} from 'lucide-react';
import PortalCard from './PortalCard';
import ThemeToggle from '@/components/theme/ThemeToggle';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }
};

/** Surcouche “tech portal”: grille holographique + scanlines */
function PortalAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* base */}
      <div className="
        absolute inset-0
        bg-gradient-to-b
        from-slate-950 via-purple-950/40 to-slate-950
        transition-colors
      " />

      {/* orbes (dark) */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl
          bg-gradient-to-br from-purple-600/25 to-pink-600/10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl
          bg-gradient-to-br from-cyan-500/20 to-blue-600/12"
        animate={{ scale: [1, 1.25, 1], x: [0, -50, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl
          bg-gradient-to-br from-amber-500/15 to-orange-600/8"
        animate={{ scale: [1, 1.2, 1], y: [0, 60, 0], opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* grille holographique */}
      <div
        className="
          absolute inset-0 opacity-[0.12]
          [background-image:linear-gradient(to_right,rgba(168,85,247,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.3)_1px,transparent_1px)]
          [background-size:100px_100px]
          transition-opacity
        "
      />

      {/* scanlines CRT style */}
      <div
        className="
          absolute inset-0 opacity-[0.08]
          [background-image:linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]
          [background-size:100%_3px]
          mix-blend-overlay
          transition-opacity
        "
      />

      {/* holographic effect */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(168,85,247,0.15) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(59,130,246,0.12) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(236,72,153,0.08) 0%, transparent 45%)',
      }} />

      {/* vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

/** Particules adaptées light/dark */
function FloatingParticles() {
  const particles = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 5,
    colorType: i % 3
  }));

  const colorGradients = [
    'from-cyan-400/50 to-blue-500/30',
    'from-purple-400/50 to-pink-500/30',
    'from-amber-400/40 to-orange-500/20'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`
            absolute rounded-full blur-[1px]
            bg-gradient-to-br ${colorGradients[p.colorType]}
            shadow-[0_0_20px_rgba(168,85,247,0.5)]
          `}
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ 
            y: [0, -60, 0], 
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.8, 0.1], 
            scale: [1, 1.5, 1] 
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

/** Top bar flottante + switch */
function TopBar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-40 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="
          flex items-center justify-between
          rounded-full px-5 py-3
          bg-slate-900/70 dark:bg-slate-950/80
          border border-purple-500/20
          backdrop-blur-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        ">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="OFFOLOMOU Logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                OFFOLOMOU
              </div>
              <div className="text-xs text-slate-600 dark:text-white/60">
                Portail • Art • Musique • Tech
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/star/offoland"
              className="
                hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                bg-slate-900 text-white
                dark:bg-white/10 dark:text-white
                hover:opacity-90 transition
              "
            >
              <Waves className="w-4 h-4" />
              Entrer
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero section
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative min-h-[88vh] flex items-center justify-center px-4 pt-28 pb-16"
    >
      <div className="text-center max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div variants={scaleIn} className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-purple-500/30 dark:border-purple-400/40 shadow-2xl shadow-purple-500/25">
            <Image
              src="/logo.jpg"
              alt="OFFOLOMOU Logo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 160px, 192px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-purple-950/20" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            />
          </div>
        </motion.div>


        {/* badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.span
            className="
              inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full
              bg-gradient-to-r from-purple-500/20 to-cyan-500/10
              border border-purple-500/30
              text-xs sm:text-sm uppercase tracking-[0.3em]
              text-cyan-300
              font-semibold
              backdrop-blur-xl
              shadow-[0_0_20px_rgba(168,85,247,0.3)]
            "
            animate={{ opacity: [0.7, 1, 0.7], boxShadow: ['0_0_20px_rgba(168,85,247,0.3)', '0_0_40px_rgba(168,85,247,0.5)', '0_0_20px_rgba(168,85,247,0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>✦ PORTAIL TECHNOLOGIQUE AVANCÉ ✦</span>
          </motion.span>
        </motion.div>

        {/* titre principal */}
        <motion.h1
          variants={fadeInUp}
          className="
            text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6
            text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
          "
        >
          OFFOLOMOU
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-6 tracking-wide"
        >
          Où la création <span className="text-cyan-400">devient</span> technologie
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Traverse des univers: <span className="text-purple-400">mythologie</span>, <span className="text-cyan-400">consoles sonores</span>, <span className="text-pink-400">objets connectés</span>, <span className="text-amber-400">récits cosmiques</span>.
          <br />
          <span className="text-white/60">L'art ne suit pas la tech — il la <strong>commande</strong>.</span>
        </motion.p>

        {/* icônes */}
        <motion.div variants={fadeInUp} className="flex justify-center gap-6 mb-12">
          {[
            { Icon: Watch, label: 'Tempo', color: 'from-purple-500/30 to-purple-600/10 border-purple-500/30', txt: 'text-purple-300' },
            { Icon: Guitar, label: 'Créativité', color: 'from-pink-500/30 to-pink-600/10 border-pink-500/30', txt: 'text-pink-300' },
            { Icon: Sliders, label: 'Technologie', color: 'from-cyan-500/30 to-cyan-600/10 border-cyan-500/30', txt: 'text-cyan-300' }
          ].map(({ Icon, label, color, txt }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              className={`
                flex flex-col items-center gap-2
                p-4 rounded-xl
                bg-gradient-to-br ${color}
                border ${color.split(' ')[2]}
                backdrop-blur
              `}
            >
              <Icon className={`w-6 h-6 ${txt}`} />
              <span className="text-xs font-semibold text-white/70">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/star/offoland"
            className="
              group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full
              bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white
              font-bold text-lg
              hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300
              shadow-[0_0_20px_rgba(168,85,247,0.4)] relative overflow-hidden
            "
          >
            <span className="relative z-10">ACCÉDER AU PORTAIL</span>
            <motion.div 
              animate={{ x: [0, 8, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

          <Link
            href="#univers"
            className="
              inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full
              bg-gradient-to-r from-slate-800 to-slate-900
              border border-purple-500/30
              text-white/90
              font-semibold text-lg
              hover:border-purple-500/60 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-800 transition-all
              backdrop-blur
          "
          >
            <Globe className="w-5 h-5 text-cyan-400" />
            EXPLORER
          </Link>
        </motion.div>

        {/* divider */}
        <motion.div
          variants={scaleIn}
          className="mt-14 w-40 h-[2px] mx-auto bg-gradient-to-r from-transparent via-purple-500/60 to-transparent rounded-full"
        />
      </div>
    </motion.section>
  );
}

// Portals section (ton dataset est excellent: je garde, j’améliore l’enrobage)
function PortalsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const portals = [
    {
      id: 'offoland',
      title: 'Offoland',
      description:
        "Plongez dans l'univers mystique du Coupé-Décalé, où le rythme devient mémoire éternelle. Découvrez comment une énergie musicale peut transcender le temps à travers sept dimensions cosmiques.",
      imageSrc: '/enfant.jpg',
      imageAlt: "L'enfant du Coupé-Décalé - Gardien de l'éternité",
      href: '/star/offoland',
      icon: Music,
      accentColor: 'from-purple-600 to-pink-600'
    },
    {
      id: 'temple',
      title: 'Le Temple des Ancêtres',
      description:
        "Un sanctuaire sacré hors du temps, où la mémoire africaine respire encore. Les pionniers du Coupé-Décalé deviennent des esprits-guides, gardiens de la coutume et de la transmission.",
      imageSrc: '/temple.jpg',
      imageAlt: 'Le Temple des Ancêtres - Sanctuaire de la Coutume',
      href: '/star/temple',
      icon: Flame,
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      id: 'avecdieu',
      title: 'Avec Dieu',
      description:
        "Un dialogue céleste entre Ciel et Terre. Découvrez une conversation philosophique et humoristique où les grandes questions de l'existence rencontrent la sagesse divine.",
      imageSrc: '/avecdieu.jpg',
      imageAlt: 'Dialogue avec Dieu - Conversation Céleste',
      href: '/star/avecdieu',
      icon: Sun,
      accentColor: 'from-yellow-500 to-sky-500'
    },
    {
      id: 'reineoffola',
      title: 'Reine Offola',
      description:
        "Souveraine du Feu Originel, Gardienne du Premier Brasier et Protectrice du Temple des Ancêtres. Son flambeau n'est pas une arme : c'est une lumière de vérité.",
      imageSrc: '/reineoffola.jpg',
      imageAlt: 'Reine Offola - Souveraine du Feu Originel',
      href: '/star/reineoffola',
      icon: Crown,
      accentColor: 'from-red-500 to-yellow-500'
    },
    {
      id: 'interdit',
      title: 'Le Lieu des Interdits',
      description:
        "Sanctuaire Caché d'Offoland. Une dimension verrouillée accessible uniquement après le Rituel des Ancêtres, où reposent les vérités cachées et le Cœur des Interdits.",
      imageSrc: '/interdit.jpg',
      imageAlt: "Le Lieu des Interdits - Sanctuaire Caché d'Offoland",
      href: '/star/interdit',
      icon: Lock,
      accentColor: 'from-red-700 to-black'
    },
    {
      id: 'accoustique',
      title: 'Réglage Accoustique',
      description:
        "Console de mixage niveau primaire. Maîtrisez les réglages de gain, fader et panoramique pour créer le mix parfait avec la science du son OFFOLOMOU.",
      imageSrc: '/accoustique.jpg',
      imageAlt: 'Réglage Accoustique Primaire - Console de Mixage',
      href: '/star/accoustique',
      icon: Sliders,
      accentColor: 'from-cyan-500 to-purple-600'
    },
    {
      id: 'offomidji',
      title: 'Offomiji',
      description:
        "Déesse de l'Eau et des Astres, Souveraine des Océans Célestes et Gardienne des Courants Stellaires. L'eau porte la mémoire des étoiles.",
      imageSrc: '/offomidji.jpg',
      imageAlt: "Offomiji - Déesse de l'Eau et des Astres",
      href: '/star/offomidji',
      icon: Droplets,
      accentColor: 'from-cyan-400 to-blue-600'
    },
    {
      id: 'offocolo',
      title: 'Roi Offocolo',
      description:
        "Roi Ancêtre Central, Souverain du Trône Originel et Gardien du Pacte Sacré. Là où siège Offocolo, le temps s'incline.",
      imageSrc: '/offocolo.jpg',
      imageAlt: 'Roi Offocolo - Roi Ancêtre Central',
      href: '/star/offocolo',
      icon: Crown,
      accentColor: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'offo',
      title: 'OFFO',
      description:
        "Dieu Suprême d'OFFOLAND, Créateur des Mondes et des Éléments, Souverain des Divinités et des Ancêtres. Tout commence et finit par Offo.",
      imageSrc: '/offo.jpg',
      imageAlt: "OFFO - Dieu Suprême d'OFFOLAND",
      href: '/star/offo',
      icon: Sun,
      accentColor: 'from-amber-400 to-blue-500'
    },
    {
      id: 'foret',
      title: 'Forêt des Ancêtres',
      description:
        "Mémoire vivante des Esprits des Pionniers. Elle apparaît seulement à ceux qui portent encore le respect du rythme originel.",
      imageSrc: '/foret.jpg',
      imageAlt: 'La Forêt des Ancêtres - Esprits des Pionniers',
      href: '/star/foret',
      icon: TreePine,
      accentColor: 'from-emerald-500 to-amber-600'
    },
    {
      id: 'offolandais',
      title: 'Parler Offolandais',
      description:
        "La langue sacrée d'OFFOLAND. Le code qui ouvre le portail interdimensionnel pour accéder aux secrets de la connaissance des sept dimensions.",
      imageSrc: '/offolandais.jpg',
      imageAlt: 'Parler Offolandais - La Langue Sacrée',
      href: '/star/offolandais',
      icon: Languages,
      accentColor: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'methode',
      title: 'Les 7 Couleurs',
      description:
        "OFFOLAND — TOME 1 : Chroniques Fondatrices du Continuum Offolomou. Le livre sacré qui révèle les sept dimensions cosmiques du Coupé-Décalé.",
      imageSrc: '/methode.jpg',
      imageAlt: 'Les 7 Couleurs - Tome 1',
      href: '/star/methode',
      icon: BookOpen,
      accentColor: 'from-amber-500 to-purple-600'
    }
  ];

  return (
    <motion.section
      id="univers"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-28 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <motion.span
            className="
              inline-block text-xs sm:text-sm uppercase tracking-[0.34em]
              text-slate-600 dark:text-amber-300/80 font-semibold mb-4
            "
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Cartographie des univers ✦
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Univers connectés
          </h2>

          <p className="text-slate-600 dark:text-purple-200/70 text-base sm:text-lg max-w-2xl mx-auto">
            Chaque carte est un nœud: histoire, son, rituel, technologie — une navigation entre dimensions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portals.map((portal, index) => (
            <PortalCard
              key={portal.id}
              title={portal.title}
              description={portal.description}
              imageSrc={portal.imageSrc}
              imageAlt={portal.imageAlt}
              href={portal.href}
              icon={portal.icon}
              accentColor={portal.accentColor}
              delay={index}
            />
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center mt-16">
          <div className="
            inline-flex items-center gap-3 px-6 py-3 rounded-full
            bg-white/70 dark:bg-white/5
            border border-black/5 dark:border-white/10
            backdrop-blur
          ">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="text-slate-700 dark:text-purple-200/70 text-sm sm:text-base">
              Nouveaux portails en préparation…
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Book Section - Les 7 Couleurs
function BookSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const colorBalls = [
    { color: 'bg-gray-100', glow: 'shadow-white/40' },
    { color: 'bg-red-500', glow: 'shadow-red-500/50' },
    { color: 'bg-green-500', glow: 'shadow-green-500/50' },
    { color: 'bg-blue-500', glow: 'shadow-blue-500/50' },
    { color: 'bg-gray-800', glow: 'shadow-gray-600/40' },
    { color: 'bg-violet-500', glow: 'shadow-violet-500/50' },
    { color: 'bg-fuchsia-600', glow: 'shadow-fuchsia-500/50' },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.span
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
              bg-amber-500/10 dark:bg-amber-500/20
              border border-amber-500/30
              text-amber-700 dark:text-amber-300
              text-sm font-medium
            "
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BookOpen className="w-4 h-4" />
            <span>OFFOLAND — TOME 1</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Les 7 Couleurs
          </h2>
          <p className="text-lg text-slate-600 dark:text-purple-200/70 max-w-2xl mx-auto">
            Chroniques Fondatrices du Continuum Offolomou
          </p>
        </motion.div>

        {/* Book showcase */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Book cover */}
          <motion.div variants={scaleIn} className="relative">
            <div className="relative mx-auto w-[260px] sm:w-[300px]" style={{ perspective: '1000px' }}>
              {/* Shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/25 dark:bg-black/40 blur-xl rounded-full" />
              
              {/* 3D Book */}
              <motion.div
                className="relative"
                animate={{ rotateY: [0, 4, 0, -4, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Spine */}
                <div 
                  className="absolute left-0 top-0 w-5 h-full bg-gradient-to-r from-amber-800 to-amber-700 rounded-l-md"
                  style={{ transform: 'rotateY(-90deg) translateX(-10px)', transformOrigin: 'left' }}
                />
                
                {/* Cover */}
                <div className="relative rounded-r-xl rounded-l-sm overflow-hidden border-2 border-amber-500/40 dark:border-amber-500/50 shadow-2xl shadow-amber-500/20">
                  <div className="relative w-[260px] h-[380px] sm:w-[300px] sm:h-[420px]">
                    <Image
                      src="/methode.jpg"
                      alt="Les 7 Couleurs - Tome 1"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 260px, 300px"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-purple-950/20" />
                    
                    {/* Title on cover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                      <p className="text-xs uppercase tracking-[0.35em] text-amber-400/90 mb-1">TOME 1</p>
                      <h3 className="text-xl sm:text-2xl font-black text-white">LES 7 COULEURS</h3>
                    </div>
                    
                    {/* Shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 7 color balls */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center gap-2 mt-8"
            >
              {colorBalls.map((ball, i) => (
                <motion.div
                  key={i}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${ball.color} shadow-lg ${ball.glow}`}
                  animate={{ 
                    scale: [1, 1.15, 1],
                    boxShadow: ['0 0 15px currentColor', '0 0 25px currentColor', '0 0 15px currentColor']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Book info */}
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className="text-slate-700 dark:text-white/80 leading-relaxed">
              Découvrez l'origine mystique d'<strong className="text-purple-600 dark:text-amber-300">Offoland</strong>, 
              un continuum où le <strong className="text-pink-600 dark:text-purple-300">Coupé-Décalé</strong> transcende le temps. 
              À travers <strong className="text-amber-600 dark:text-amber-300">sept dimensions cosmiques</strong>, explorez les secrets 
              du <strong className="text-purple-600 dark:text-purple-300">Rythmion</strong>, la présence des 
              <strong className="text-violet-600 dark:text-violet-300"> Ondes-Mères</strong>, et la puissance de la 
              <strong className="text-green-600 dark:text-green-300"> Bible Offolomou</strong>.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {[
                { label: 'Chapitres', value: '12', icon: BookOpen },
                { label: 'Dimensions', value: '7', icon: Sparkles },
                { label: 'Serments', value: '7', icon: Heart }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-xl
                    bg-white/60 dark:bg-white/5
                    border border-black/5 dark:border-white/10
                  "
                >
                  <stat.icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-slate-500 dark:text-white/60 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Chapters preview */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm font-semibold text-slate-700 dark:text-white/70 mb-3">Dimensions explorées :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: '⚪', name: 'Blanc', sub: 'Racines' },
                  { emoji: '🔴', name: 'Rouge', sub: 'Concepts' },
                  { emoji: '🟢', name: 'Vert', sub: 'Bibliothèque' },
                  { emoji: '🔵', name: 'Bleu', sub: 'Temple' },
                  { emoji: '⚫', name: 'Noir', sub: 'Fleuve' },
                  { emoji: '🟣', name: 'Violet', sub: 'Forêt' },
                  { emoji: '🟪', name: 'Pourpre', sub: 'Festival' }
                ].map((dim, i) => (
                  <span 
                    key={i}
                    className="
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                      bg-slate-100 dark:bg-white/10
                      text-slate-700 dark:text-white/80
                    "
                  >
                    <span>{dim.emoji}</span>
                    <span className="font-medium">{dim.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/star/methode"
                className="
                  group inline-flex items-center gap-3 px-7 py-3.5 rounded-full
                  bg-gradient-to-r from-amber-500 to-purple-600
                  text-white font-semibold
                  hover:from-amber-400 hover:to-purple-500 transition-all
                  shadow-lg shadow-purple-500/25
                "
              >
                <BookOpen className="w-5 h-5" />
                <span>Découvrir le Livre</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// CTA
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-28 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={scaleIn}
          className="
            relative overflow-hidden rounded-3xl p-10 sm:p-14
            bg-white/70 dark:bg-gradient-to-br dark:from-purple-900/45 dark:to-pink-900/35
            border border-black/5 dark:border-purple-400/20
            backdrop-blur
          "
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              background:
                'radial-gradient(800px 300px at 30% 10%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(700px 260px at 80% 60%, rgba(236,72,153,0.14), transparent 55%)'
            }}
          />

          <motion.div variants={fadeInUp} className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                bg-gradient-to-br from-pink-500/20 to-purple-500/10
                border border-black/5 dark:border-white/10"
              animate={{ scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-pink-600 dark:text-pink-300" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Synchronise ton imaginaire
            </h2>

            <p className="text-slate-600 dark:text-purple-200/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Une exploration créative t’attend: découvre, écoute, fabrique.
              OFFOLOMOU est une interface — pas une simple page.
            </p>

            <Link
              href="/star/offoland"
              className="
                group inline-flex items-center gap-3 px-8 py-4 rounded-full
                bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg
                hover:from-purple-500 hover:to-pink-500 transition-all
                shadow-lg shadow-purple-500/25
              "
            >
              <span>Commencer l’exploration</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PortalHomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div
      ref={containerRef}
      className="
        min-h-screen
        text-slate-900 dark:text-white
        overflow-x-hidden
        transition-colors
      "
    >
      <PortalAtmosphere />
      <FloatingParticles />
      <TopBar />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50
          bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <HeroSection />
        <BookSection />
        <PortalsSection />
        <CTASection />

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Globe className="w-12 h-12 text-purple-700/40 dark:text-purple-400/60" />
          </motion.div>
          <p className="text-slate-600 dark:text-purple-300/60 text-sm">
            ✦ OFFOLOMOU — Art • Musique • Technologies Innovantes ✦
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(PortalHomePage);
