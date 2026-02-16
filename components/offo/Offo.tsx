'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Sun,
  Star,
  Sparkles,
  Crown,
  Hand,
  Orbit,
  Flame,
  Waves,
  Music,
  Zap,
  Globe,
  MessageCircle,
  Volume2,
  Lightbulb,
  Infinity as InfinityIcon,
  Shield,
  Landmark
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

// Divine light particles
function DivineParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 6 + 4,
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
            background: Math.random() > 0.5 
              ? `radial-gradient(circle, rgba(251, 191, 36, 0.7), transparent)` 
              : `radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)`,
            boxShadow: Math.random() > 0.6 ? '0 0 15px rgba(251, 191, 36, 0.5)' : '0 0 12px rgba(59, 130, 246, 0.4)',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.5, 1]
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

// Cosmic constellation background
function CosmicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Central divine glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2), rgba(59, 130, 246, 0.1), transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Golden divine light */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Blue cosmic energy */}
      <motion.div
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], x: [0, 40, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Right purple mystical glow */}
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Vertical divine beam */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b from-amber-400/30 via-blue-400/10 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Animated constellation stars
function ConstellationStars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 80,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 3
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
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(251, 191, 36, 0.5)',
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.8, 1]
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
        {/* Floating divine icons */}
        <motion.div
          className="absolute top-16 left-10 text-amber-400/60"
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Sun className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-28 right-12 text-blue-400/60"
          animate={{ y: [0, 20, 0], scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Star className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-36 left-16 text-purple-400/50"
          animate={{ y: [0, -30, 0], rotate: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Globe className="w-11 h-11 sm:w-14 sm:h-14" />
        </motion.div>

        <motion.div
          className="absolute bottom-28 right-16 text-amber-300/50"
          animate={{ y: [0, 25, 0], scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        >
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>

        {/* Divine crown halo */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.div
            className="inline-block p-8 rounded-full bg-gradient-to-br from-amber-600/30 via-blue-600/20 to-purple-600/30 border-2 border-amber-400/40"
            animate={{ 
              rotate: [0, 360], 
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 40px rgba(251, 191, 36, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)',
                '0 0 80px rgba(251, 191, 36, 0.5), 0 0 120px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(251, 191, 36, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)'
              ]
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4, repeat: Infinity },
              boxShadow: { duration: 3, repeat: Infinity }
            }}
          >
            <Sun className="w-20 h-20 sm:w-28 sm:h-28 text-amber-300" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.4em] text-amber-400/90 font-medium mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ DIEU SUPRÊME D'OFFOLAND ✨
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 via-amber-400 to-blue-300 leading-none mb-6"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            textShadow: [
              '0 0 40px rgba(251, 191, 36, 0.4)',
              '0 0 80px rgba(251, 191, 36, 0.6)',
              '0 0 40px rgba(251, 191, 36, 0.4)'
            ]
          }}
          style={{ backgroundSize: '200% 200%' }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          OFFO
        </motion.h1>

        <motion.div variants={fadeInUp} className="space-y-3 mb-8">
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl font-bold text-amber-200/90"
            animate={{
              textShadow: [
                '0 0 20px rgba(251, 191, 36, 0.3)',
                '0 0 40px rgba(251, 191, 36, 0.5)',
                '0 0 20px rgba(251, 191, 36, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Créateur des Mondes et des Éléments
          </motion.h2>
          <h3 className="text-base sm:text-lg text-blue-300/80">
            Souverain des Divinités et des Ancêtres
          </h3>
          <h3 className="text-base sm:text-lg text-purple-300/80">
            Maître de la Vie et du Temps
          </h3>
        </motion.div>

        <motion.p 
          variants={fadeInUp}
          className="text-lg sm:text-xl text-amber-200/80 font-light italic max-w-2xl mx-auto"
        >
          🌌 "Tout commence et finit par Offo."
        </motion.p>

        {/* Divine line */}
        <motion.div 
          variants={scaleIn}
          className="w-48 h-1 mx-auto mt-12 bg-gradient-to-r from-transparent via-amber-400 via-blue-400 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-amber-400/40 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-amber-400/70 rounded-full"
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
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.95]);

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Sacred slogan */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-900/30 via-blue-900/20 to-amber-900/30 border border-amber-400/40"
            animate={{ 
              borderColor: ['rgba(251, 191, 36, 0.4)', 'rgba(59, 130, 246, 0.5)', 'rgba(251, 191, 36, 0.4)'],
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.1)',
                '0 0 40px rgba(59, 130, 246, 0.2)',
                '0 0 20px rgba(251, 191, 36, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
            >
              <Zap className="w-6 h-6 text-amber-400" />
            </motion.div>
            <span className="text-amber-200 font-medium text-lg italic">"Offo éclaire la voie, et le monde suit son souffle."</span>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Divine cosmic rings */}
          <motion.div
            className="absolute w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(251, 191, 36, 0.4), rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.2), rgba(251, 191, 36, 0.4))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Outer halo pulse */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[650px] md:h-[650px] rounded-full"
              style={{
                border: '3px solid rgba(251, 191, 36, 0.4)',
                boxShadow: 'inset 0 0 60px rgba(251, 191, 36, 0.1)',
              }}
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.6, 0.25, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Four pillar orbiting symbols */}
          {[
            { Icon: Flame, color: 'text-orange-400', label: 'Feu' },
            { Icon: Music, color: 'text-pink-400', label: 'Son' },
            { Icon: Crown, color: 'text-amber-400', label: 'Trône' },
            { Icon: Waves, color: 'text-cyan-400', label: 'Eau' }
          ].map((pillar, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const radius = 320;
            return (
              <motion.div
                key={i}
                className={`absolute ${pillar.color}`}
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius],
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  x: { duration: 20, repeat: Infinity, ease: 'linear' },
                  y: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                  opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                }}
              >
                <pillar.Icon className="w-8 h-8 sm:w-12 sm:h-12" />
              </motion.div>
            );
          })}

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Divine golden-blue glow */}
            <motion.div
              className="absolute inset-0 -m-16 rounded-full bg-gradient-to-br from-amber-400/50 via-blue-500/30 to-purple-500/40 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated divine border */}
              <motion.div
                className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-amber-400 via-blue-400 via-purple-400 to-amber-400"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow border */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-500 via-blue-500 to-amber-500 opacity-80" />

              {/* Image - circular for supreme deity */}
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-4 border-slate-900">
                <Image
                  src="/offo.jpg"
                  alt="OFFO - Dieu Suprême d'OFFOLAND"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, 500px"
                  priority
                />

                {/* Divine overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-amber-900/40" />

                {/* Golden shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Corner divine symbols */}
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-300"
            animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-16 h-16 sm:w-24 sm:h-24" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-blue-300/70"
            animate={{ y: [0, 10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Hand className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Four pillars function section
function FourPillarsSection() {
  const pillars = [
    { name: 'Offola', element: 'Feu', icon: Flame, color: 'from-red-500 to-orange-600', emoji: '🔥' },
    { name: 'Offowa', element: 'Son', icon: Music, color: 'from-pink-500 to-purple-600', emoji: '🎶' },
    { name: 'Offocolo', element: 'Trône / Autorité', icon: Crown, color: 'from-amber-500 to-yellow-600', emoji: '👑' },
    { name: 'Offomiji', element: 'Eau & Astres', icon: Waves, color: 'from-cyan-500 to-blue-600', emoji: '🌊🌌' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚜️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Créateur des Quatre Piliers Sacrés
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Offo supervise et donne vie aux quatre divinités fondamentales d'OFFOLAND
          </p>
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
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-amber-500/20 text-center"
            >
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 mx-auto`}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.2)',
                    '0 0 40px rgba(251, 191, 36, 0.4)',
                    '0 0 20px rgba(251, 191, 36, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <pillar.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{pillar.name}</h3>
              <p className="text-lg text-amber-300">{pillar.emoji} {pillar.element}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Function section
function FunctionSection() {
  const functions = [
    { label: 'Contrôle des cycles de vie et de mort', icon: InfinityIcon, color: 'from-purple-500 to-indigo-600' },
    { label: 'Source de la sagesse et des enseignements pour les mortels', icon: Lightbulb, color: 'from-amber-500 to-yellow-600' },
    { label: 'Garant du pacte sacré entre les vivants et les ancêtres', icon: Shield, color: 'from-blue-500 to-cyan-600' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🌟</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Fonction dans OFFOLAND
          </h2>
        </motion.div>

        <div className="space-y-6">
          {functions.map((func, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, x: 10 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/30 to-blue-900/30 border border-amber-500/20"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-br ${func.color}`}
                  whileHover={{ rotate: 10 }}
                >
                  <func.icon className="w-7 h-7 text-white" />
                </motion.div>
                <p className="text-lg font-semibold text-amber-100">{func.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Narrative section
function NarrativeSection() {
  const paragraphs = [
    "Offo est l'incarnation de la puissance créatrice et de la sagesse infinie.",
    "Il est à la fois lumière et souffle, force et guidance.",
    "Son aura enveloppe OFFOLAND et donne vie aux quatre divinités piliers.",
    "Offo ne se limite pas au jugement : il inspire, protège et révèle les mystères du cosmos."
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📖</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Description Narrative
          </h2>
          <p className="text-blue-300/70 italic">Version livre / application</p>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((text, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 via-blue-950/30 to-purple-950/40 border border-amber-500/20"
            >
              <p className="text-lg text-amber-100/90 leading-relaxed text-center">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Symbols section
function SymbolsSection() {
  const symbols = [
    { label: 'Couronne cosmique illuminée', icon: Crown },
    { label: 'Sceptre de lumière divine', icon: Zap },
    { label: 'Cercle des étoiles et éléments fondamentaux', icon: Orbit },
    { label: 'Aura dorée et bleue entourée de constellations animées', icon: Sparkles },
    { label: 'Main tendue symbolisant guidance et communication', icon: Hand }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚜️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Symboles et Attributs
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {symbols.map((symbol, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-5 rounded-xl bg-gradient-to-br from-slate-800/80 to-amber-900/40 border border-amber-500/20"
            >
              <div className="flex items-center gap-4">
                <symbol.icon className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <p className="text-white font-medium">{symbol.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Invocation section
function InvocationSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={scaleIn}
          className="relative p-12 sm:p-20 rounded-3xl bg-gradient-to-br from-amber-950/60 via-blue-950/40 to-purple-950/50 border border-amber-400/40 text-center overflow-hidden"
        >
          {/* Divine cosmic glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2), transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2), transparent 60%)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-8"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Sun className="w-20 h-20 sm:w-28 sm:h-28 text-amber-300" />
            </motion.div>

            <h3 className="text-lg font-semibold text-amber-300 mb-8">🌟 Invocation / Phrase Rituelle</h3>

            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-blue-200 to-amber-200 leading-relaxed"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  '0 0 40px rgba(251, 191, 36, 0.4)',
                  '0 0 80px rgba(59, 130, 246, 0.4)',
                  '0 0 40px rgba(251, 191, 36, 0.4)'
                ]
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              "Offo, maître des temps et des mondes, éclaire notre chemin et veille sur OFFOLAND."
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-6 right-6 text-amber-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-blue-400/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Application role section
function ApplicationRoleSection() {
  const features = [
    { 
      title: 'Sanctuaire Suprême', 
      description: 'Lieu où l\'utilisateur peut dialoguer avec Offo (ancienne conversation "Conversation avec Dieu" renommée "Conversation avec Offo")',
      icon: Landmark
    },
    { 
      title: 'Module Interactif', 
      description: 'Le dialogue philosophique, interactif et immersif avec le Dieu suprême',
      icon: MessageCircle
    },
    { 
      title: 'Effets Visuels et Audio', 
      description: 'Lumière sacrée, halo mystique, musique céleste',
      icon: Volume2
    },
    { 
      title: 'Lien avec les Divinités', 
      description: 'Chaque réponse peut invoquer Offola, Offowa, Offocolo ou Offomiji pour illustrer un enseignement',
      icon: Orbit
    }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📱</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Rôle dans l'Application OFFOLAND
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/30 border border-blue-500/20"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-blue-600 flex items-center justify-center mb-4"
                whileHover={{ rotate: 10 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-amber-200 mb-2">{feature.title}</h3>
              <p className="text-blue-200/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function Offo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <CosmicBackground />
      <DivineParticles />
      <ConstellationStars />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-blue-400 to-purple-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <FourPillarsSection />
        <FunctionSection />
        <NarrativeSection />
        <SymbolsSection />
        <InvocationSection />
        <ApplicationRoleSection />

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
              opacity: [0.5, 0.9, 0.5],
              rotate: [0, 360]
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity },
              opacity: { duration: 4, repeat: Infinity },
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
            }}
            className="inline-block mb-6"
          >
            <Sun className="w-16 h-16 text-amber-400/70" />
          </motion.div>
          <p className="text-amber-300/60 text-sm">
            ✨ OFFO — Dieu Suprême d'OFFOLAND — Créateur des Mondes ✨
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(Offo);
