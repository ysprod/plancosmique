'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  BookOpen,
  Key,
  Eye,
  Sparkles,
  Scroll,
  Languages,
  Code,
  Zap,
  Star,
  Lock,
  Unlock,
  Crown,
  Globe,
  MessageSquare
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

// Mystical hieroglyphic particles
function HieroglyphParticles() {
  const symbols = ['𓂀', '𓇋', '𓅓', '𓃰', '𓊃', '𓌂', '𓈖', '𓋴', '☥', '✦', '◯', '△', '◁'];
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    size: Math.random() * 1.2 + 0.6
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-amber-400/30 font-serif"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}

// Ancient scroll background
function ScrollBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Papyrus-like warm glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(251, 191, 36, 0.08), transparent 60%)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Golden mystical center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1), rgba(217, 119, 6, 0.05), transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Left ancient glow */}
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-[500px] bg-amber-900/20 rounded-tr-full blur-3xl"
        animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Right mystical shadow */}
      <motion.div
        className="absolute top-1/4 right-0 w-72 h-[400px] bg-yellow-900/15 rounded-l-full blur-3xl"
        animate={{ opacity: [0.1, 0.25, 0.1], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating mystical icons */}
        <motion.div
          className="absolute top-16 left-10 text-amber-400/60"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Scroll className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-28 right-12 text-yellow-400/60"
          animate={{ y: [0, 15, 0], scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Key className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-36 left-16 text-amber-300/50"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Languages className="w-11 h-11 sm:w-14 sm:h-14" />
        </motion.div>

        <motion.div
          className="absolute bottom-28 right-16 text-yellow-300/50"
          animate={{ y: [0, 20, 0], scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        >
          <Eye className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>

        {/* Book/scroll emblem */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.div
            className="inline-block p-8 rounded-full bg-gradient-to-br from-amber-800/40 via-yellow-900/30 to-amber-900/40 border-2 border-amber-500/50"
            animate={{ 
              scale: [1, 1.06, 1],
              boxShadow: [
                '0 0 40px rgba(251, 191, 36, 0.2), 0 0 80px rgba(217, 119, 6, 0.1)',
                '0 0 70px rgba(251, 191, 36, 0.4), 0 0 120px rgba(217, 119, 6, 0.2)',
                '0 0 40px rgba(251, 191, 36, 0.2), 0 0 80px rgba(217, 119, 6, 0.1)'
              ]
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity },
              boxShadow: { duration: 3, repeat: Infinity }
            }}
          >
            <BookOpen className="w-20 h-20 sm:w-28 sm:h-28 text-amber-300" />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.4em] text-amber-400/90 font-medium mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📜 La Langue Sacrée d'OFFOLAND 📜
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 via-amber-400 to-yellow-200 leading-none mb-6"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          style={{ backgroundSize: '200% 200%' }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          PARLER
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">OFFOLANDAIS</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="space-y-3 mb-8">
          <motion.p 
            className="text-lg sm:text-xl text-amber-200/80 font-light max-w-2xl mx-auto"
          >
            Le code sacré qui ouvre les portails interdimensionnels
          </motion.p>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={scaleIn}
          className="w-48 h-1 mx-auto mt-8 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"
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
        {/* French original phrase */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-block px-8 py-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-yellow-900/30 border border-amber-500/40"
            animate={{ 
              borderColor: ['rgba(251, 191, 36, 0.4)', 'rgba(234, 179, 8, 0.6)', 'rgba(251, 191, 36, 0.4)'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-sm text-amber-400 uppercase tracking-widest mb-3">Phrase originale en français</p>
            <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed max-w-3xl italic">
              « Celui qui connaît la méthode Charly Guitare pourra déchiffrer le code d'activation décrit dans la Bible du Coupé Décalé et activer Offola Watch, la clé qui ouvre le portail interdimensionnel pour accéder aux secrets de la connaissance des sept dimensions et régner sur les mondes comme un dieu. »
            </p>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Scroll/papyrus rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full"
              style={{
                border: `2px solid rgba(251, 191, 36, ${0.3 - i * 0.1})`,
              }}
              animate={{
                scale: [1, 1.3, 1.6],
                opacity: [0.5, 0.2, 0],
                rotate: [0, 60, 120],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Golden mystical glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-600/30 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 via-amber-400 to-amber-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-600 opacity-70" />

              {/* Image */}
              <div className="relative w-[300px] h-[400px] sm:w-[420px] sm:h-[560px] md:w-[520px] md:h-[700px] rounded-2xl overflow-hidden border-2 border-slate-900">
                <Image
                  src="/offolandais.jpg"
                  alt="Parler Offolandais - La Langue Sacrée"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 420px, 520px"
                  priority
                />

                {/* Ancient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-yellow-950/30" />

                {/* Golden shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating mystical elements */}
          <motion.div
            className="absolute -top-8 left-1/4 text-amber-400/70"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Code className="w-10 h-10 sm:w-14 sm:h-14" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-6 right-1/4 text-yellow-400/70"
            animate={{ y: [0, 15, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <Key className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Translation table section
function TranslationTableSection() {
  const translations = [
    { french: 'Celui qui connaît', offolandais: '𓂀│◯ 𓁀△ 𓇋◯│' },
    { french: 'la méthode Charly Guitare', offolandais: '𓃰△ 𓇋◯ 𓅓│ 𓂀◯ 𓅓◯ 𓇋△ 𓂀◁ 𓅓△' },
    { french: 'pourra déchiffrer', offolandais: '𓇋◁ 𓂀△ 𓌂◯ 𓂀│ 𓅓◯' },
    { french: "le code d'activation", offolandais: '𓃰△ 𓊃◯ 𓂀△ 𓇋△◯ 𓂀│ 𓇋◁△' },
    { french: 'décrit dans la Bible', offolandais: '𓌂△ 𓈖◯ 𓃰△ 𓂀△ 𓃰◯ 𓂀△' },
    { french: 'du Coupé Décalé', offolandais: '𓅓▽ 𓂀◁ 𓇋△ 𓂀△ 𓌂◯ 𓇋△' },
    { french: 'et activer Offola Watch', offolandais: '△ 𓂀◯ 𓇋△ 𓇋◯ 𓂀▽ ✦ 🔑' },
    { french: 'la clé', offolandais: '𓃰△ 🔑' },
    { french: 'qui ouvre le portail interdimensionnel', offolandais: '𓁀◯ 𓇋◁ 𓃰△ ✦ ◁𓉔 𓈖◯ 𓍯△' },
    { french: 'pour accéder aux secrets', offolandais: '𓇋◯ 𓂀▽ △ 𓋴◯ 𓈖◯ 𓅓△' },
    { french: 'de la connaissance', offolandais: '𓌂△ 𓃰△ 🜁' },
    { french: 'des sept dimensions', offolandais: '𓌂△ 𓋴◯ 𓅓△ △ ◁ 𓇋◯' },
    { french: 'et régner sur les mondes', offolandais: '△ 𓊃◯ ⚡ 𓅓◯ 𓇋△ 𓂀◯' },
    { french: 'comme un dieu', offolandais: '𓃰◯ 𓂀│ ☥' },
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">📖</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Traduction codée en Offolandais
          </h2>
          <p className="text-amber-300/70">Table de correspondance des symboles sacrés</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="space-y-3"
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-amber-800/40 border border-amber-500/40"
          >
            <div className="text-amber-200 font-bold text-center">Mot / Concept</div>
            <div className="text-amber-200 font-bold text-center">Symboles Offolandais</div>
          </motion.div>

          {/* Rows */}
          {translations.map((row, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, x: 5 }}
              className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-amber-900/30 border border-amber-500/20"
            >
              <div className="text-amber-100/90 text-sm sm:text-base">{row.french}</div>
              <motion.div 
                className="text-amber-300 font-serif text-lg sm:text-xl tracking-wider text-center"
                animate={{ 
                  textShadow: [
                    '0 0 5px rgba(251, 191, 36, 0.3)',
                    '0 0 15px rgba(251, 191, 36, 0.5)',
                    '0 0 5px rgba(251, 191, 36, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                {row.offolandais}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Condensed mystical version
function CondensedVersionSection() {
  const condensedCode = "𓂀│◯ 𓁀△ 𓇋◯│ 𓃰△ 𓇋◯ 𓅓│ 𓂀◯ 𓅓◯ 𓇋△ 𓂀◁ 𓅓△ 𓇋◁ 𓂀△ 𓌂◯ 𓂀│ 𓅓◯ 𓃰△ 𓊃◯ 𓂀△ 𓇋△◯ 𓂀│ 𓇋◁△ 𓌂△ 𓈖◯ 𓃰△ 𓂀△ 𓃰◯ 𓂀△ 𓅓▽ 𓂀◁ 𓇋△ 𓂀△ 𓌂◯ 𓇋△ △ 𓂀◯ 𓇋△ 𓇋◯ 𓂀▽ ✦ 🔑 𓃰△ 🔑 𓁀◯ 𓇋◁ 𓃰△ ✦ ◁𓉔 𓈖◯ 𓍯△ 𓇋◯ 𓂀▽ △ 𓋴◯ 𓈖◯ 𓅓△ 𓌂△ 𓃰△ 🜁 𓌂△ 𓋴◯ 𓅓△ △ ◁ 𓇋◯ △ 𓊃◯ ⚡ 𓅓◯ 𓇋△ 𓂀◯ 𓃰◯ 𓂀│ ☥";

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.span 
            className="text-4xl mb-4 block"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Version condensée, style Offolandais mystique
          </h2>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-amber-950/60 via-yellow-950/40 to-amber-950/60 border-2 border-amber-500/40 overflow-hidden"
        >
          {/* Mystical glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.15), transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.15), transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.15), transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Eye symbol */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Eye className="w-16 h-16 text-amber-400" />
            </motion.div>

            {/* The sacred code */}
            <motion.div
              className="text-center"
              animate={{
                textShadow: [
                  '0 0 10px rgba(251, 191, 36, 0.3)',
                  '0 0 30px rgba(251, 191, 36, 0.6)',
                  '0 0 10px rgba(251, 191, 36, 0.3)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl text-amber-200 font-serif leading-relaxed tracking-wide break-words">
                {condensedCode}
              </p>
            </motion.div>

            {/* Copy hint */}
            <motion.div
              className="mt-8 text-center"
              variants={fadeInUp}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-800/30 border border-amber-500/30 text-amber-300/80 text-sm">
                <Code className="w-4 h-4" />
                Code sacré complet
              </span>
            </motion.div>
          </div>

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
            <Key className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Key concepts section
function KeyConceptsSection() {
  const concepts = [
    { icon: Key, label: '🔑 La Clé', description: "Offola Watch - l'outil d'activation" },
    { icon: Globe, label: '✦ Portail', description: 'Accès interdimensionnel' },
    { icon: Eye, label: '𓂀 Vision', description: 'La connaissance sacrée' },
    { icon: Crown, label: '☥ Divine', description: 'Régner comme un dieu' },
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">🗝️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Concepts Clés du Code
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {concepts.map((concept, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -8 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-amber-900/40 to-yellow-900/30 border border-amber-500/30 text-center"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mx-auto mb-4"
                animate={{ 
                  boxShadow: [
                    '0 0 15px rgba(251, 191, 36, 0.3)',
                    '0 0 30px rgba(251, 191, 36, 0.5)',
                    '0 0 15px rgba(251, 191, 36, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
              >
                <concept.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-amber-200 mb-1">{concept.label}</h3>
              <p className="text-sm text-amber-300/70">{concept.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function Offolandais() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 via-yellow-950/10 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <ScrollBackground />
      <HieroglyphParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <TranslationTableSection />
        <CondensedVersionSection />
        <KeyConceptsSection />

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.9, 0.5],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <BookOpen className="w-14 h-14 text-amber-400/70" />
          </motion.div>
          <p className="text-amber-300/60 text-sm">
            📜 PARLER OFFOLANDAIS — La Langue Sacrée d'OFFOLAND — Code d'Activation ☥
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(Offolandais);
