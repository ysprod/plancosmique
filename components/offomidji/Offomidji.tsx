'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Droplets,
  Star,
  Moon,
  Sparkles,
  Waves,
  Globe,
  Eye,
  Clock,
  Heart,
  Compass,
  Orbit,
  CircleDot,
  CloudRain,
  Wind,
  Zap
} from 'lucide-react';

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
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Section wrapper
function AnimatedSection({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Water droplet particles
function WaterParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: Math.random() > 0.6 
              ? `radial-gradient(circle, rgba(56, 189, 248, 0.6), transparent)` 
              : `radial-gradient(circle, rgba(147, 197, 253, 0.5), transparent)`,
            boxShadow: Math.random() > 0.7 ? '0 0 10px rgba(56, 189, 248, 0.4)' : 'none',
          }}
          animate={{
            y: [0, 80, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
}

// Celestial ocean background
function CelestialOceanBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep ocean blue center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-950/60 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Cyan starlight glow */}
      <motion.div
        className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], y: [0, 40, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Purple astral energy */}
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Teal water flow */}
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-60 bg-gradient-to-t from-teal-600/30 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2], scaleX: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Indigo depths */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// Floating stars
function FloatingStars() {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 60,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay
          }}
        />
      ))}
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating water/star icons */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400/50"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Droplets className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-purple-400/50"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Star className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-teal-400/50"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Waves className="w-9 h-9 sm:w-12 sm:h-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-20 text-blue-300/50"
          animate={{ y: [0, 20, 0], scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        >
          <Moon className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>

        {/* Water orb icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.div
            className="inline-block p-6 rounded-full bg-gradient-to-br from-cyan-900/40 to-blue-900/60 border border-cyan-500/30"
            animate={{ 
              rotate: [0, 5, -5, 0], 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 30px rgba(56, 189, 248, 0.2)',
                '0 0 60px rgba(56, 189, 248, 0.4)',
                '0 0 30px rgba(56, 189, 248, 0.2)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Globe className="w-14 h-14 sm:w-20 sm:h-20 text-cyan-300" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-cyan-400/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌊 OFFOLAND 🌌
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 leading-tight mb-4"
        >
          OFFOMIJI
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-200/90 mb-4"
          animate={{
            textShadow: [
              '0 0 20px rgba(56, 189, 248, 0.3)',
              '0 0 40px rgba(147, 51, 234, 0.5)',
              '0 0 20px rgba(56, 189, 248, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌊 Déesse de l'Eau et des Astres
        </motion.h2>

        <motion.h3 
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-300/80 mb-6"
        >
          ✨ Souveraine des Océans Célestes • Gardienne des Courants Stellaires
        </motion.h3>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-blue-200/70 font-light italic max-w-2xl mx-auto"
        >
          "L'eau porte la mémoire des étoiles."
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-40 h-1 mx-auto mt-10 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-cyan-500/60 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// Hero image section
function HeroImageSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.08, 0.95]);

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Slogan */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-900/30 border border-cyan-500/30"
            animate={{ 
              borderColor: ['rgba(56, 189, 248, 0.3)', 'rgba(147, 51, 234, 0.5)', 'rgba(56, 189, 248, 0.3)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Orbit className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-cyan-300 font-medium italic">"Là où coule Offomiji, le destin s'écrit."</span>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Water ripple rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
              style={{
                border: '2px solid rgba(56, 189, 248, 0.3)',
              }}
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Astral orbit ring */}
          <motion.div
            className="absolute w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(56, 189, 248, 0.3), rgba(147, 51, 234, 0.2), rgba(56, 189, 248, 0.1), rgba(147, 51, 234, 0.3), rgba(56, 189, 248, 0.3))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating celestial elements */}
          {[Droplets, Star, Moon, Sparkles, CircleDot, CloudRain].map((Icon, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 280;
            return (
              <motion.div
                key={i}
                className="absolute text-cyan-400/60"
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle) * radius],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 18 + i * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.8,
                }}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
            );
          })}

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Water glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-cyan-500/40 via-blue-600/30 to-purple-600/40 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated water border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-cyan-400"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 opacity-80" />

              {/* Image */}
              <div className="relative w-[300px] h-[200px] sm:w-[480px] sm:h-[320px] md:w-[580px] md:h-[380px] rounded-2xl overflow-hidden border-4 border-slate-900">
                <Image
                  src="/offomidji.jpg"
                  alt="Offomiji - Déesse de l'Eau et des Astres"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 480px, 580px"
                  priority
                />

                {/* Water overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-cyan-900/30" />

                {/* Shimmer wave */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Corner water decorations */}
          <motion.div
            className="absolute -top-10 -left-10 text-cyan-400/60"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Droplets className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-10 -right-10 text-purple-400/50"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Star className="w-16 h-16 sm:w-24 sm:h-24" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Function section
function FunctionSection() {
  const functions = [
    { label: 'Les eaux sacrées de la Terre', icon: Waves, color: 'from-cyan-500 to-teal-600' },
    { label: 'Les astres du ciel ancestral', icon: Star, color: 'from-purple-500 to-indigo-600' },
    { label: 'Les cycles du temps', icon: Clock, color: 'from-blue-500 to-cyan-600' },
    { label: 'La sagesse des prophéties', icon: Eye, color: 'from-violet-500 to-purple-700' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚖️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
            Fonction dans OFFOLAND
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Offomiji est l'entité cosmique chargée de préserver l'équilibre entre :
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
        >
          {functions.map((func, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900/60 border border-cyan-500/20"
            >
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${func.color} mb-4`}
                whileHover={{ rotate: 10 }}
              >
                <func.icon className="w-7 h-7 text-white" />
              </motion.div>
              <p className="text-lg font-semibold text-cyan-100">{func.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission statement */}
        <motion.div 
          variants={scaleIn}
          className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-400/20 text-center"
        >
          <motion.p 
            className="text-lg sm:text-xl text-cyan-200/90 leading-relaxed"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Elle veille sur <span className="text-cyan-300 font-semibold">la fluidité du monde</span>, 
            <span className="text-purple-300 font-semibold"> la paix des esprits</span>, et 
            <span className="text-blue-300 font-semibold"> la lecture du destin</span>.
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Narrative section
function NarrativeSection() {
  const paragraphs = [
    "Offomiji est la Déesse de l'Eau et des Astres dans OFFOLAND.",
    "Elle détient le pouvoir des marées spirituelles et des constellations ancestrales.",
    "Son eau n'est pas un simple élément : c'est un miroir cosmique où les ancêtres déposent leurs messages.",
    "Elle guide les voyageurs sacrés, apaise les guerres, et ouvre les portes du futur."
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📖</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
            Description Narrative
          </h2>
          <p className="text-purple-300/70 italic">Version livre / application</p>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((text, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 to-purple-950/30 border border-blue-500/20"
            >
              <p className="text-lg text-blue-100/90 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Encyclopedia section
function EncyclopediaSection() {
  const entries = [
    { label: 'Nom', value: 'Offomiji', icon: CircleDot },
    { label: 'Titre', value: "Déesse de l'Eau et des Astres", icon: Star },
    { label: 'Élément', value: 'Océan céleste', icon: Waves },
    { label: 'Temple', value: 'Sanctuaire des Étoiles Liquides', icon: Globe },
    { label: 'Rôle', value: 'Destin – Harmonie – Prophétie', icon: Compass },
    { label: 'Symbole', value: 'Globe d\'eau et cercle astral', icon: Orbit }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📜</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
            Signature Encyclopédique
          </h2>
          <p className="text-blue-300/70">OFFOLAND — Registre Sacré</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-5 rounded-xl bg-gradient-to-br from-slate-800/80 to-blue-900/40 border border-cyan-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <entry.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm uppercase tracking-wider text-cyan-400/80">{entry.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{entry.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Invocation */}
        <motion.div 
          variants={scaleIn}
          className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-400/30 text-center"
        >
          <h3 className="text-lg font-semibold text-purple-300 mb-4">✨ Invocation</h3>
          <motion.p 
            className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 font-bold italic"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            "Offo-Miji, eau des étoiles, révèle ma voie."
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Ritual phrase section
function RitualSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-blue-950 to-purple-950/60 border border-cyan-400/30 text-center overflow-hidden"
        >
          {/* Water waves background */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.15), transparent 50%)',
                'radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.15), transparent 50%)',
                'radial-gradient(circle at 30% 70%, rgba(56, 189, 248, 0.15), transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-8"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Droplets className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400" />
            </motion.div>

            <h3 className="text-lg font-semibold text-cyan-300 mb-6">🌊 Phrase Rituelle — Sanctuaire Aquatique</h3>

            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 leading-relaxed"
              animate={{
                textShadow: [
                  '0 0 30px rgba(56, 189, 248, 0.3)',
                  '0 0 60px rgba(147, 51, 234, 0.4)',
                  '0 0 30px rgba(56, 189, 248, 0.3)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              "Celui qui écoute l'eau entend aussi le ciel."
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-6 right-6 text-purple-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-cyan-400/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Waves className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Four pillars section
function FourPillarsSection() {
  const pillars = [
    { name: 'Offola', function: 'Reine du Feu', element: '🔥 Purification', color: 'from-red-500 to-orange-600' },
    { name: 'Offowa', function: 'Gardienne du Son', element: '🎶 Harmonie', color: 'from-pink-500 to-purple-600' },
    { name: 'Offocolo', function: 'Roi Ancêtre Central', element: '👑 Autorité', color: 'from-amber-500 to-yellow-600' },
    { name: 'Offomiji', function: 'Déesse Eau & Astres', element: '🌊🌌 Destin', color: 'from-cyan-500 to-blue-600', highlight: true }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">✅</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
            Les 4 Piliers Sacrés d'OFFOLAND
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`p-6 rounded-2xl border ${
                pillar.highlight 
                  ? 'bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-400/40' 
                  : 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/40'
              }`}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 mx-auto`}
                animate={pillar.highlight ? { 
                  boxShadow: [
                    '0 0 20px rgba(56, 189, 248, 0.3)',
                    '0 0 40px rgba(56, 189, 248, 0.5)',
                    '0 0 20px rgba(56, 189, 248, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl font-bold text-white">{pillar.name.charAt(0)}</span>
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${pillar.highlight ? 'text-cyan-200' : 'text-white'}`}>
                {pillar.name}
              </h3>
              <p className="text-sm text-slate-300 mb-2">{pillar.function}</p>
              <p className="text-sm font-medium text-purple-300">{pillar.element}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Modern branding section
function BrandingSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🌌</span>
          <h2 className="text-xl sm:text-2xl text-purple-300/80 font-medium mb-2">
            Version Moderne / Branding
          </h2>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950/80 border border-purple-400/30 text-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(147, 51, 234, 0.1))',
                'linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(56, 189, 248, 0.05))',
                'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(147, 51, 234, 0.1))'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.1)',
                  '0 0 40px rgba(56, 189, 248, 0.3)',
                  '0 0 20px rgba(255, 255, 255, 0.1)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              OFFOMIJI
            </motion.h2>
            <p className="text-xl text-purple-300 mb-6">Water & Star Goddess</p>
            
            <motion.div 
              className="flex justify-center gap-4 flex-wrap"
              variants={staggerContainer}
            >
              {['Flow', 'Destiny', 'Universe'].map((word, i) => (
                <motion.span
                  key={word}
                  variants={fadeInUp}
                  className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Recommended version */}
        <motion.div 
          variants={fadeInUp}
          className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-4">⭐ Version Recommandée pour l'Univers Officiel</h3>
              <div className="text-center p-6 rounded-xl bg-black/30">
                <h4 className="text-2xl font-bold text-cyan-200 mb-2">OFFOMIJI</h4>
                <p className="text-lg text-purple-300">🌊 Déesse de l'Eau et des Astres</p>
                <p className="text-purple-200/80">Gardienne des Courants Stellaires</p>
                <p className="text-sm text-cyan-300/60 mt-4">OFFOLAND — Sagesse Ancestrale</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function Offomidji() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/50 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <CelestialOceanBackground />
      <WaterParticles />
      <FloatingStars />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <FunctionSection />
        <NarrativeSection />
        <EncyclopediaSection />
        <RitualSection />
        <FourPillarsSection />
        <BrandingSection />

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Droplets className="w-12 h-12 text-cyan-500/60" />
          </motion.div>
          <p className="text-cyan-400/60 text-sm">
            🌊 OFFOMIJI — Déesse de l'Eau et des Astres — OFFOLAND 🌌
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(Offomidji);
