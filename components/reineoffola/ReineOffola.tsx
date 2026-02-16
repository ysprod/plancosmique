'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Flame,
  Crown,
  Shield,
  BookOpen,
  Sparkles,
  Star,
  Sun,
  Eye,
  Zap,
  Heart,
  ScrollText
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

// Floating flames
function FloatingFlames() {
  const flames = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flames.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 1.5,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `linear-gradient(to top, 
              ${Math.random() > 0.5 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(251, 146, 60, 0.9)'}, 
              ${Math.random() > 0.5 ? 'rgba(251, 191, 36, 0.6)' : 'rgba(234, 179, 8, 0.7)'}, 
              transparent)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          animate={{
            y: [0, -80, -150],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.3],
            rotate: [0, Math.random() * 30 - 15, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeOut',
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
}

// Royal fire background
function RoyalFireBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Intense crimson glow */}
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/25 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Gold royal essence */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Orange fire energy */}
      <motion.div
        className="absolute top-1/2 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], y: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Deep crimson bottom */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[600px] h-96 bg-red-900/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Amber sacred glow */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating royal symbols */}
        <motion.div
          className="absolute top-20 left-10 text-red-500/50"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Flame className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-yellow-500/50"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Crown className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-orange-400/50"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Sun className="w-9 h-9 sm:w-12 sm:h-12" />
        </motion.div>

        {/* Crown icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.div
            className="inline-block p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-red-500/20"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-yellow-400/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            👑 OFFOLAND 👑
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-orange-400 leading-tight mb-4"
        >
          REINE OFFOLA
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-200/90 mb-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(239, 68, 68, 0.3)',
              '0 0 40px rgba(251, 146, 60, 0.5)',
              '0 0 20px rgba(239, 68, 68, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🔥 Souveraine du Feu Originel 🔥
        </motion.h2>

        <motion.p 
          variants={fadeInUp}
          className="text-lg sm:text-xl text-red-200/80 font-light italic max-w-2xl mx-auto"
        >
          Gardienne du Premier Brasier • Protectrice du Temple des Ancêtres
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-40 h-1 mx-auto mt-10 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-red-400/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-red-400/60 rounded-full"
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
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-yellow-200 to-orange-300 font-bold"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🔥 « Là où naît la flamme, naît la mémoire. » 🔥
          </motion.p>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Royal fire rings */}
          <motion.div
            className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(239, 68, 68, 0.4), rgba(251, 146, 60, 0.3), rgba(234, 179, 8, 0.4), rgba(239, 68, 68, 0.3), rgba(251, 146, 60, 0.4))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          {/* Crown pattern ring */}
          <motion.div
            className="absolute w-[340px] h-[340px] sm:w-[470px] sm:h-[470px] md:w-[570px] md:h-[570px] rounded-full border-4 border-dashed border-yellow-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pulsing fire aura */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full"
              style={{
                border: '2px solid rgba(239, 68, 68, 0.4)',
                boxShadow: 'inset 0 0 60px rgba(251, 146, 60, 0.2)',
              }}
              animate={{
                scale: [1, 1.4, 1.6],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Floating fire symbols */}
          {[Flame, Crown, Sun, Star, Zap, Shield].map((Icon, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 240;
            return (
              <motion.div
                key={i}
                className="absolute text-red-400/60"
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI / 3) * radius, Math.cos(angle) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI / 3) * radius, Math.sin(angle) * radius],
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.9, 0.4],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
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
            {/* Royal fire glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-full bg-gradient-to-br from-red-500/50 via-orange-500/40 to-yellow-500/50 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated royal border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-r from-red-600 via-yellow-500 via-orange-500 to-red-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Crown decoration on top */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 drop-shadow-lg" />
              </motion.div>

              {/* Inner border */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-red-500 via-yellow-400 to-orange-500 opacity-80" />

              {/* Image */}
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-4 border-slate-900">
                <Image
                  src="/reineoffola.jpg"
                  alt="Reine Offola - Souveraine du Feu Originel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, 480px"
                  priority
                />

                {/* Fire overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Royal shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Flame decorations */}
          <motion.div
            className="absolute -top-12 -left-12 text-red-500/70"
            animate={{ y: [0, -15, 0], scale: [1, 1.3, 1], rotate: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-12 -right-12 text-orange-500/70"
            animate={{ y: [0, 15, 0], scale: [1, 1.4, 1], rotate: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <Flame className="w-16 h-16 sm:w-24 sm:h-24" />
          </motion.div>
        </motion.div>

        {/* Alternative slogan */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-lg sm:text-xl text-red-200/70 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            « Le feu ne détruit pas : il révèle. »
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Functions section
function FunctionsSection() {
  const functions = [
    {
      icon: Flame,
      title: 'Gardienne du Premier Brasier',
      description: 'Elle préserve la flamme originelle qui donna naissance à OFFOLAND.',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Protectrice du Temple des Ancêtres',
      description: 'Elle veille sur le sanctuaire sacré où reposent les mémoires ancestrales.',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      icon: Heart,
      title: 'Source de Renaissance Spirituelle',
      description: 'Par le feu, elle purifie et permet la renaissance de chaque âme.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
            Fonction dans OFFOLAND
          </h2>
          <p className="text-red-200/70 text-base sm:text-lg">
            Version institutionnelle
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {functions.map((func, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/20 text-center overflow-hidden group"
            >
              {/* Glow on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${func.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${func.color} mb-4`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <func.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg sm:text-xl font-bold text-yellow-100 mb-3">{func.title}</h3>
              <p className="text-red-200/70 text-sm sm:text-base">{func.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Narrative section
function NarrativeSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <BookOpen className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
            Description Narrative
          </h2>
          <p className="text-red-200/70 text-base sm:text-lg">
            Pour le livre ou l'application
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-red-900/40 to-orange-900/30 border border-yellow-500/20 overflow-hidden"
        >
          {/* Decorative flames */}
          <motion.div
            className="absolute top-4 right-4 text-red-500/30"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Flame className="w-12 h-12" />
          </motion.div>
          
          <div className="relative z-10 space-y-6 text-center">
            <p className="text-lg sm:text-xl md:text-2xl text-yellow-100/90 leading-relaxed">
              <span className="font-bold text-red-300">Reine Offola</span> est l'incarnation du feu sacré dans <span className="font-bold text-yellow-300">OFFOLAND</span>.
            </p>
            <p className="text-base sm:text-lg text-red-200/80 leading-relaxed">
              Elle préside les rites de purification, protège les archives ancestrales et veille sur la transmission des savoirs interdits.
            </p>
            <motion.p 
              className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-200 to-red-300 font-medium"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Son flambeau n'est pas une arme : c'est une lumière de vérité.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Official signature section
function SignatureSection() {
  const attributes = [
    { label: 'Nom', value: 'Offola', icon: Crown },
    { label: 'Titre', value: 'Reine du Feu', icon: Flame },
    { label: 'Élément', value: 'Flammes originelles', icon: Zap },
    { label: 'Temple', value: 'Sanctuaire du Brasier', icon: Shield },
    { label: 'Rôle', value: 'Purification – Justice – Renaissance', icon: Heart },
    { label: 'Symbole', value: "Torche d'or et cercle solaire", icon: Sun },
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <ScrollText className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
            Signature Officielle
          </h2>
          <p className="text-red-200/70 text-base sm:text-lg">
            Format encyclopédie OFFOLAND
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-yellow-900/30 to-red-900/20 border border-yellow-500/30"
        >
          <motion.div variants={staggerContainer} className="space-y-4">
            {attributes.map((attr, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-4 rounded-xl bg-red-900/20 border border-red-500/10 hover:border-yellow-500/30 transition-all duration-300"
                whileHover={{ x: 8 }}
              >
                <motion.div
                  className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-red-500/20"
                  whileHover={{ rotate: 10 }}
                >
                  <attr.icon className="w-5 h-5 text-yellow-400" />
                </motion.div>
                <div>
                  <span className="text-yellow-400/70 text-sm font-medium">{attr.label}</span>
                  <p className="text-yellow-100 font-semibold">{attr.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Invocation */}
          <motion.div 
            variants={scaleIn}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-red-800/30 to-orange-800/30 border border-yellow-400/20 text-center"
          >
            <p className="text-yellow-400/70 text-sm font-medium uppercase tracking-wider mb-2">Invocation</p>
            <motion.p 
              className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              "Offo-Kan, feu des ancêtres, éclaire ma voie."
            </motion.p>
          </motion.div>
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
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-red-900/50 to-orange-900/40 border border-red-400/30 text-center overflow-hidden"
        >
          {/* Animated fire glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                'inset 0 0 50px rgba(239, 68, 68, 0.2)',
                'inset 0 0 100px rgba(251, 146, 60, 0.3)',
                'inset 0 0 50px rgba(239, 68, 68, 0.2)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-5xl">🕯️</span>
            </motion.div>

            <p className="text-yellow-400/70 text-sm font-medium uppercase tracking-wider mb-4">
              Phrase Rituelle — Blébichage Sanctuaire
            </p>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-yellow-100 to-orange-200 leading-relaxed"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              « Aucun esprit n'entre dans OFFOLAND<br />
              sans passer par le feu d'Offola. »
            </motion.p>
          </motion.div>

          {/* Corner flames */}
          <motion.div
            className="absolute top-6 right-6 text-red-500/40"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-orange-500/40"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <Flame className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Marketing section
function MarketingSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Affiche événementielle */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-red-900/40 to-yellow-900/30 border border-yellow-500/20 text-center"
          >
            <p className="text-yellow-400/70 text-xs font-medium uppercase tracking-wider mb-4">
              Format Affiche Événementielle
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-100 mb-2">REINE OFFOLA</h3>
            <p className="text-lg text-red-300 mb-4">🔥 La Flamme des Origines</p>
            <p className="text-red-200/70">Première Gardienne du Temple Sacré</p>
            <p className="text-yellow-400 font-semibold mt-4">OFFOLAND — Sagesse Ancestrale</p>
          </motion.div>

          {/* Marketing moderne */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-red-900/30 border border-red-500/20 text-center"
          >
            <p className="text-red-400/70 text-xs font-medium uppercase tracking-wider mb-4">
              Version Marketing Moderne
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">OFFOLA</h3>
            <p className="text-lg text-red-400 mb-4">Queen of Fire</p>
            <div className="flex justify-center gap-4 text-red-300">
              <span>🔥 Power</span>
              <span>•</span>
              <span>Legacy</span>
              <span>•</span>
              <span>Purification</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Final recommendation section
function RecommendationSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <span className="text-4xl mb-4 block">🎯</span>
          <h2 className="text-xl sm:text-2xl text-yellow-400/80 font-medium mb-2">
            Le meilleur "blébichage" recommandé
          </h2>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-yellow-800/40 to-red-900/40 border-2 border-yellow-500/40 text-center overflow-hidden"
        >
          {/* Royal glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                '0 0 60px rgba(234, 179, 8, 0.1)',
                '0 0 120px rgba(239, 68, 68, 0.2)',
                '0 0 60px rgba(234, 179, 8, 0.1)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Crown className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" />
            </motion.div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-yellow-200 to-orange-300 mb-4">
              REINE OFFOLA
            </h3>
            
            <p className="text-xl sm:text-2xl text-red-300 font-bold mb-4">
              🔥 Gardienne du Feu Originel
            </p>
            
            <p className="text-lg text-yellow-200/80 mb-6">
              Protectrice du Temple des Ancêtres
            </p>

            <motion.p 
              className="text-xl sm:text-2xl font-bold text-yellow-400"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              OFFOLAND — Sagesse Ancestrale
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-4 right-4 text-yellow-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sun className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-red-400/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function ReineOffola() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/40 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <RoyalFireBackground />
      <FloatingFlames />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <FunctionsSection />
        <NarrativeSection />
        <SignatureSection />
        <RitualSection />
        <MarketingSection />
        <RecommendationSection />

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Flame className="w-12 h-12 text-red-500/60" />
          </motion.div>
          <p className="text-red-400/60 text-sm">
            👑 Reine Offola — Souveraine du Feu Originel — OFFOLAND 👑
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(ReineOffola);
