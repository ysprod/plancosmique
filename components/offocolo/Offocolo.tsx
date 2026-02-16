'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Crown,
  Shield,
  Swords,
  Scale,
  Scroll,
  Users,
  Eye,
  Star,
  Sparkles,
  Compass,
  CircleDot,
  Landmark,
  BookOpen,
  Flame,
  Waves
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

// Royal gold particles
function RoyalParticles() {
  const particles = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
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
            background: Math.random() > 0.5 
              ? `radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent)` 
              : `radial-gradient(circle, rgba(217, 119, 6, 0.5), transparent)`,
            boxShadow: Math.random() > 0.7 ? '0 0 10px rgba(251, 191, 36, 0.4)' : 'none',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 15 - 7, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1]
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

// Royal throne background
function ThroneBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Golden center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Left royal gold */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Right amber glow */}
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Bottom throne glow */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-60 bg-gradient-to-t from-amber-950/40 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Deep brown base */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-stone-800/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// Lion guardian symbol
function LionSymbol() {
  return (
    <motion.div
      className="text-6xl sm:text-8xl"
      animate={{ 
        scale: [1, 1.05, 1],
        textShadow: [
          '0 0 20px rgba(251, 191, 36, 0.3)',
          '0 0 40px rgba(251, 191, 36, 0.5)',
          '0 0 20px rgba(251, 191, 36, 0.3)'
        ]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      🦁
    </motion.div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating royal icons */}
        <motion.div
          className="absolute top-20 left-10 text-amber-400/50"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Crown className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-yellow-500/50"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Shield className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-orange-400/50"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Swords className="w-9 h-9 sm:w-12 sm:h-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-20 text-amber-300/50"
          animate={{ y: [0, 20, 0], scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        >
          <Scale className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>

        {/* Crown icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.div
            className="inline-block p-6 rounded-full bg-gradient-to-br from-amber-900/40 to-yellow-900/60 border border-amber-500/30"
            animate={{ 
              rotate: [0, 3, -3, 0], 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 30px rgba(251, 191, 36, 0.2)',
                '0 0 60px rgba(251, 191, 36, 0.4)',
                '0 0 30px rgba(251, 191, 36, 0.2)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-14 h-14 sm:w-20 sm:h-20 text-amber-400" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-amber-400/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            👑 OFFOLAND 👑
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 leading-tight mb-4"
        >
          ROI OFFOCOLO
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-200/90 mb-4"
          animate={{
            textShadow: [
              '0 0 20px rgba(251, 191, 36, 0.3)',
              '0 0 40px rgba(217, 119, 6, 0.5)',
              '0 0 20px rgba(251, 191, 36, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          👑 Roi Ancêtre Central
        </motion.h2>

        <motion.h3 
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-300/80 mb-6"
        >
          ⚜️ Souverain du Trône Originel • Maître des Ancêtres et Gardien du Pacte Sacré
        </motion.h3>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-amber-200/70 font-light italic max-w-2xl mx-auto"
        >
          "Là où siège Offocolo, le temps s'incline."
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-40 h-1 mx-auto mt-10 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-amber-500/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-amber-500/60 rounded-full"
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-900/30 border border-amber-500/30"
            animate={{ 
              borderColor: ['rgba(251, 191, 36, 0.3)', 'rgba(217, 119, 6, 0.5)', 'rgba(251, 191, 36, 0.3)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Swords className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="text-amber-300 font-medium italic">"Le Trône n'est pas un pouvoir… c'est une mémoire vivante."</span>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Royal crown rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
              style={{
                border: '2px solid rgba(251, 191, 36, 0.3)',
              }}
              animate={{
                scale: [1, 1.3, 1.5],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Royal crest orbit */}
          <motion.div
            className="absolute w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(251, 191, 36, 0.3), rgba(217, 119, 6, 0.2), rgba(251, 191, 36, 0.1), rgba(180, 83, 9, 0.3), rgba(251, 191, 36, 0.3))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating royal symbols */}
          {[Crown, Shield, Swords, Scale, Scroll, Landmark].map((Icon, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 280;
            return (
              <motion.div
                key={i}
                className="absolute text-amber-400/60"
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
            {/* Golden glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-amber-500/40 via-yellow-600/30 to-orange-600/40 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated royal border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 via-orange-500 to-amber-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 opacity-80" />

              {/* Image */}
              <div className="relative w-[300px] h-[200px] sm:w-[480px] sm:h-[320px] md:w-[580px] md:h-[380px] rounded-2xl overflow-hidden border-4 border-slate-900">
                <Image
                  src="/offocolo.jpg"
                  alt="Roi Offocolo - Roi Ancêtre Central"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 480px, 580px"
                  priority
                />

                {/* Royal overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-yellow-900/20" />

                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute -top-10 -left-10 text-amber-400/60"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 -right-8"
            animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <LionSymbol />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Function section
function FunctionSection() {
  const functions = [
    { label: 'La loi ancestrale', icon: Scale, color: 'from-amber-500 to-yellow-600' },
    { label: 'La continuité des lignées', icon: Users, color: 'from-orange-500 to-amber-600' },
    { label: 'La sagesse des rois disparus', icon: BookOpen, color: 'from-yellow-500 to-amber-600' },
    { label: 'Le pacte entre les vivants et les esprits', icon: Scroll, color: 'from-amber-600 to-orange-700' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">⚜️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Fonction dans OFFOLAND
          </h2>
          <p className="text-amber-200/80 max-w-2xl mx-auto text-lg">
            Offocolo est l'<span className="text-yellow-300 font-bold">autorité suprême</span> du monde sacré.
          </p>
          <p className="text-amber-300/70 mt-4">Il représente :</p>
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
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-slate-900/60 border border-amber-500/20"
            >
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${func.color} mb-4`}
                whileHover={{ rotate: 10 }}
              >
                <func.icon className="w-7 h-7 text-white" />
              </motion.div>
              <p className="text-lg font-semibold text-amber-100">{func.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission statement */}
        <motion.div 
          variants={scaleIn}
          className="p-8 rounded-3xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-400/20 text-center"
        >
          <motion.p 
            className="text-lg sm:text-xl text-amber-200/90 leading-relaxed"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Il veille sur <span className="text-yellow-300 font-semibold">l'ordre spirituel d'OFFOLAND</span> et sur 
            <span className="text-orange-300 font-semibold"> l'équilibre des quatre forces sacrées</span>.
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Narrative section
function NarrativeSection() {
  const paragraphs = [
    "Offocolo est le Roi Ancêtre Central, le pilier du Temple des Origines.",
    "Il porte en lui la mémoire de tous les souverains anciens.",
    "Son regard traverse les âges, et son trône est un sanctuaire vivant.",
    "Le lion qui l'accompagne symbolise la puissance royale et la vigilance éternelle.",
    "Offocolo n'impose pas : il guide, il juge, il protège."
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📖</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Description Narrative
          </h2>
          <p className="text-yellow-300/70 italic">Version livre / application</p>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((text, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 to-slate-900/50 border border-amber-500/20"
            >
              <p className="text-lg text-amber-100/90 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Lion symbol */}
        <motion.div 
          variants={scaleIn}
          className="flex justify-center mt-10"
        >
          <LionSymbol />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Encyclopedia section
function EncyclopediaSection() {
  const entries = [
    { label: 'Nom', value: 'Offocolo', icon: CircleDot },
    { label: 'Titre', value: 'Roi Ancêtre Central', icon: Crown },
    { label: 'Élément', value: 'Trône éternel', icon: Landmark },
    { label: 'Temple', value: 'Palais des Ancêtres', icon: Compass },
    { label: 'Rôle', value: 'Autorité – Justice – Transmission', icon: Scale },
    { label: 'Symbole', value: 'Couronne sacrée et Lion gardien', icon: Shield }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📜</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Signature Encyclopédique
          </h2>
          <p className="text-amber-300/70">OFFOLAND — Registre Royal</p>
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
              className="p-5 rounded-xl bg-gradient-to-br from-slate-800/80 to-amber-900/40 border border-amber-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <entry.icon className="w-5 h-5 text-amber-400" />
                <span className="text-sm uppercase tracking-wider text-amber-400/80">{entry.label}</span>
              </div>
              <p className="text-lg font-semibold text-white">{entry.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Invocation */}
        <motion.div 
          variants={scaleIn}
          className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-400/30 text-center"
        >
          <h3 className="text-lg font-semibold text-yellow-300 mb-4">✨ Invocation</h3>
          <motion.p 
            className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 font-bold italic"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            "Offo-Colo, roi des temps anciens, ouvre la voie du pacte."
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
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-amber-950 to-slate-950/80 border border-amber-400/30 text-center overflow-hidden"
        >
          {/* Golden throne glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 50% 70%, rgba(251, 191, 36, 0.15), transparent 50%)',
                'radial-gradient(circle at 50% 30%, rgba(217, 119, 6, 0.15), transparent 50%)',
                'radial-gradient(circle at 50% 70%, rgba(251, 191, 36, 0.15), transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <LionSymbol />
            </motion.div>

            <h3 className="text-lg font-semibold text-amber-300 mb-6">🦁 Phrase Rituelle — Trône Ancestral</h3>

            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 leading-relaxed"
              animate={{
                textShadow: [
                  '0 0 30px rgba(251, 191, 36, 0.3)',
                  '0 0 60px rgba(217, 119, 6, 0.4)',
                  '0 0 30px rgba(251, 191, 36, 0.3)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              "Nul ne gouverne OFFOLAND sans recevoir la parole d'Offocolo."
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
            className="absolute bottom-6 left-6 text-yellow-400/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Four pillars section
function FourPillarsSection() {
  const pillars = [
    { name: 'Offola', element: '🔥 Feu', power: 'Purification', color: 'from-red-500 to-orange-600' },
    { name: 'Offowa', element: '🎶 Son', power: 'Harmonie', color: 'from-pink-500 to-purple-600' },
    { name: 'Offocolo', element: '👑 Trône', power: 'Loi ancestrale', color: 'from-amber-500 to-yellow-600', highlight: true },
    { name: 'Offomiji', element: '🌊🌌 Eau & Astres', power: 'Destin', color: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🔥</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Les 4 Divinités d'OFFOLAND
          </h2>
          <p className="text-amber-300/70">Le rôle des 4 divinités est maintenant parfait</p>
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
                  ? 'bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/40' 
                  : 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/40'
              }`}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 mx-auto`}
                animate={pillar.highlight ? { 
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.3)',
                    '0 0 40px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl font-bold text-white">{pillar.name.charAt(0)}</span>
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${pillar.highlight ? 'text-amber-200' : 'text-white'}`}>
                {pillar.name}
              </h3>
              <p className="text-sm text-slate-300 mb-2">{pillar.element}</p>
              <p className="text-sm font-medium text-yellow-300">{pillar.power}</p>
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
          <span className="text-4xl mb-4 block">👑</span>
          <h2 className="text-xl sm:text-2xl text-amber-300/80 font-medium mb-2">
            Version Moderne / Branding
          </h2>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-slate-900 to-amber-950/80 border border-amber-400/30 text-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(217, 119, 6, 0.1))',
                'linear-gradient(225deg, rgba(217, 119, 6, 0.1), rgba(251, 191, 36, 0.05))',
                'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(217, 119, 6, 0.1))'
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
                  '0 0 40px rgba(251, 191, 36, 0.3)',
                  '0 0 20px rgba(255, 255, 255, 0.1)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              OFFOCOLO
            </motion.h2>
            <p className="text-xl text-amber-300 mb-6">Ancestor King</p>
            
            <motion.div 
              className="flex justify-center gap-4 flex-wrap"
              variants={staggerContainer}
            >
              {['Power', 'Legacy', 'Law'].map((word) => (
                <motion.span
                  key={word}
                  variants={fadeInUp}
                  className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200"
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
          className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-500/30"
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
                <h4 className="text-2xl font-bold text-amber-200 mb-2">ROI OFFOCOLO</h4>
                <p className="text-lg text-yellow-300">👑 Roi Ancêtre Central</p>
                <p className="text-amber-200/80">Gardien du Pacte Sacré</p>
                <p className="text-sm text-amber-300/60 mt-4">OFFOLAND — Sagesse Ancestrale</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function Offocolo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/30 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <ThroneBackground />
      <RoyalParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 origin-left z-50"
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
            <Crown className="w-12 h-12 text-amber-500/60" />
          </motion.div>
          <p className="text-amber-400/60 text-sm">
            👑 ROI OFFOCOLO — Roi Ancêtre Central — OFFOLAND 👑
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(Offocolo);
