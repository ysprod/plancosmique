'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  TreePine,
  Flame,
  Eye,
  Sparkles,
  Heart,
  Wind,
  Music,
  Ear,
  Shield,
  Star,
  Users,
  Footprints,
  Leaf,
  Sun,
  Moon,
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

// Forest particles (leaves and fireflies)
function ForestParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    type: Math.random() > 0.6 ? 'firefly' : 'leaf'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.type === 'firefly' 
              ? `radial-gradient(circle, rgba(251, 191, 36, 0.9), transparent)` 
              : `radial-gradient(circle, rgba(34, 197, 94, 0.5), transparent)`,
            boxShadow: p.type === 'firefly' 
              ? '0 0 12px rgba(251, 191, 36, 0.7)' 
              : 'none',
            borderRadius: p.type === 'leaf' ? '50% 0 50% 0' : '50%',
          }}
          animate={{
            y: p.type === 'leaf' ? [0, 100, 200] : [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.9, 0.3],
            rotate: p.type === 'leaf' ? [0, 360, 720] : 0,
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

// Forest background
function ForestBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep forest glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(34, 197, 94, 0.08), transparent 60%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Fire glow from center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.05), transparent 70%)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Left forest shadow */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-[600px] bg-emerald-950/30 rounded-tr-full blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Right forest shadow */}
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-[500px] bg-green-950/30 rounded-tl-full blur-3xl"
        animate={{ opacity: [0.15, 0.35, 0.15], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Mystical mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-emerald-950/40 via-slate-950/20 to-transparent"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating forest icons */}
        <motion.div
          className="absolute top-16 left-10 text-emerald-400/60"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <TreePine className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-12 text-orange-400/60"
          animate={{ y: [0, 15, 0], scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Flame className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-36 left-16 text-green-400/50"
          animate={{ y: [0, -25, 0], rotate: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Leaf className="w-11 h-11 sm:w-14 sm:h-14" />
        </motion.div>

        <motion.div
          className="absolute bottom-28 right-16 text-amber-300/50"
          animate={{ y: [0, 20, 0], scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        >
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>

        {/* Forest tree emblem */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.div
            className="inline-block p-8 rounded-full bg-gradient-to-br from-emerald-800/40 via-green-900/30 to-amber-900/30 border-2 border-emerald-500/40"
            animate={{ 
              scale: [1, 1.06, 1],
              boxShadow: [
                '0 0 40px rgba(34, 197, 94, 0.2), 0 0 80px rgba(251, 146, 60, 0.1)',
                '0 0 60px rgba(34, 197, 94, 0.4), 0 0 100px rgba(251, 146, 60, 0.2)',
                '0 0 40px rgba(34, 197, 94, 0.2), 0 0 80px rgba(251, 146, 60, 0.1)'
              ]
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity },
              boxShadow: { duration: 3, repeat: Infinity }
            }}
          >
            <TreePine className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-300" />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={fadeInUp} className="mb-4">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.4em] text-emerald-400/90 font-medium mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌳 Esprits des Pionniers 🌳
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-300 via-amber-300 to-emerald-200 leading-none mb-6"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          style={{ backgroundSize: '200% 200%' }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          LA FORÊT
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">DES ANCÊTRES</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="space-y-3 mb-8">
          <motion.p 
            className="text-lg sm:text-xl text-emerald-200/80 font-light max-w-2xl mx-auto"
          >
            La Forêt des Ancêtres n'est pas un simple lieu.
          </motion.p>
          <motion.p 
            className="text-xl sm:text-2xl text-amber-300/90 font-semibold"
            animate={{
              textShadow: [
                '0 0 20px rgba(251, 191, 36, 0.3)',
                '0 0 40px rgba(251, 191, 36, 0.5)',
                '0 0 20px rgba(251, 191, 36, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            C'est une mémoire vivante.
          </motion.p>
        </motion.div>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-green-200/70 font-light italic max-w-xl mx-auto"
        >
          Elle ne se trouve sur aucune carte.<br />
          Elle apparaît seulement à ceux qui portent encore le respect du rythme originel.
        </motion.p>

        {/* Divider */}
        <motion.div 
          variants={scaleIn}
          className="w-48 h-1 mx-auto mt-12 bg-gradient-to-r from-transparent via-emerald-500 via-amber-500 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-emerald-400/40 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-emerald-400/70 rounded-full"
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
        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Tree root rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full"
              style={{
                border: `2px solid rgba(34, 197, 94, ${0.3 - i * 0.1})`,
              }}
              animate={{
                scale: [1, 1.3, 1.6],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Fire glow effect behind image */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.1), transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Forest glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-emerald-500/30 via-amber-500/20 to-green-500/30 blur-3xl"
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
                className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-r from-emerald-500 via-amber-500 via-green-500 to-emerald-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-emerald-600 via-amber-600 to-green-600 opacity-70" />

              {/* Image */}
              <div className="relative w-[300px] h-[400px] sm:w-[420px] sm:h-[560px] md:w-[520px] md:h-[700px] rounded-2xl overflow-hidden border-2 border-slate-900">
                <Image
                  src="/foret.jpg"
                  alt="La Forêt des Ancêtres - Esprits des Pionniers"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 420px, 520px"
                  priority
                />

                {/* Mystical overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-green-950/30" />

                {/* Light rays */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-amber-300/20 via-transparent to-transparent"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating forest elements */}
          <motion.div
            className="absolute -top-8 left-1/4 text-emerald-400/70"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Leaf className="w-10 h-10 sm:w-14 sm:h-14" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-6 right-1/4 text-amber-400/70"
            animate={{ y: [0, 15, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <Flame className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter I - L'Entrée du Silence
function EntreeSilenceSection() {
  const points = [
    "le poids de l'histoire",
    "la chaleur du feu sacré",
    "la présence invisible des pionniers"
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">👂</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-100 mb-4">
            I. L'Entrée du Silence
          </h2>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-green-950/40 border border-emerald-500/20"
          >
            <div className="flex items-start gap-4">
              <Ear className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
              <div className="space-y-4 text-emerald-100/90">
                <p className="text-lg font-semibold">On n'entre pas dans la forêt en marchant.</p>
                <p className="text-lg text-amber-300">On y entre en écoutant.</p>
                <p className="text-base text-emerald-200/80">Lorsque le tumulte du monde s'éteint, un sentier invisible s'ouvre.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-green-950/30 border border-amber-500/20"
          >
            <p className="text-lg text-emerald-100/90 mb-4">
              Les arbres forment une arche naturelle, leurs racines entrelacées comme des <span className="text-amber-300 font-semibold">cordes de guitare anciennes</span>.
            </p>
            <p className="text-base text-green-200/80 italic">
              Chaque feuille vibre d'un son imperceptible. Un tempo primitif. Le battement du premier tambour.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-emerald-950/40 border border-emerald-500/20"
          >
            <p className="text-lg text-emerald-100/90 mb-4">
              Celui qui franchit l'entrée sent immédiatement :
            </p>
            <div className="flex flex-wrap gap-3">
              {points.map((point, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 rounded-full bg-emerald-800/40 border border-emerald-500/30 text-emerald-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {point}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Chapter II - Le Cercle du Feu Éternel
function FeuEternelSection() {
  const sparks = [
    "un sacrifice",
    "une lutte artistique",
    "une nuit passée à créer",
    "un rêve devenu mouvement"
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.span 
            className="text-4xl mb-4 block"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            II. Le Cercle du Feu Éternel
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-orange-950/50 via-red-950/40 to-amber-950/50 border border-orange-500/30 mb-8"
        >
          {/* Fire glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1), transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.2), transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1), transparent 60%)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400" />
            </motion.div>
            <p className="text-xl sm:text-2xl text-amber-100 font-semibold mb-4">
              Au centre de la forêt brûle un feu qui ne s'éteint jamais.
            </p>
            <p className="text-lg text-orange-200/90 mb-2">Il ne consume pas le bois.</p>
            <p className="text-xl text-amber-300 font-bold">Il consume l'oubli.</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900/40 border border-amber-500/20 mb-6"
        >
          <p className="text-lg text-amber-100/90 mb-4">
            Autour de lui siègent les <span className="text-amber-300 font-semibold">Esprits des Pionniers</span>.
          </p>
          <p className="text-base text-emerald-200/80 italic">
            Ils ne parlent pas avec des mots. Ils transmettent par vibration.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <p className="text-lg text-emerald-100/90 mb-4 text-center">
            Chaque étincelle représente :
          </p>
          <div className="grid grid-cols-2 gap-4">
            {sparks.map((spark, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-red-900/20 border border-orange-500/20 text-center"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-amber-200">{spark}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-2xl bg-gradient-to-br from-red-950/50 to-orange-950/40 border border-red-500/20 text-center"
        >
          <p className="text-lg text-amber-100/90 mb-2">
            Le feu est le symbole du <span className="text-orange-300 font-bold">Coupé-Décalé originel</span> :
          </p>
          <p className="text-xl text-amber-300 font-semibold">
            énergie brute, vérité, audace.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter III - Les Gardiens de la Mémoire
function GardiensSection() {
  const protections = [
    { label: "le rythme authentique", icon: Music },
    { label: "la noblesse du geste", icon: Heart },
    { label: "la transmission aux générations futures", icon: Users }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">👁️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-100 mb-4">
            III. Les Gardiens de la Mémoire
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-emerald-950/40 border border-emerald-500/20 mb-8"
        >
          <div className="flex items-start gap-4">
            <Eye className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-lg text-emerald-100/90 mb-2">
                Les silhouettes que l'on voit dans la forêt ne sont pas des fantômes.
              </p>
              <p className="text-xl text-amber-300 font-semibold">
                Ce sont des gardiens.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <p className="text-lg text-emerald-100/90 mb-4 text-center">Ils protègent :</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {protections.map((item, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl bg-gradient-to-br from-emerald-900/40 to-green-900/30 border border-emerald-500/20 text-center"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <item.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <p className="text-emerald-200">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/50 to-orange-950/40 border border-amber-500/30 text-center"
        >
          <p className="text-lg text-emerald-100/90 mb-4">
            Ils observent ceux qui veulent entrer dans l'histoire.<br />
            Car tout artiste finit un jour devant le feu.
          </p>
          <p className="text-base text-amber-200/80 mb-4 italic">
            Et le feu pose une seule question :
          </p>
          <motion.p 
            className="text-2xl sm:text-3xl text-amber-300 font-bold"
            animate={{
              textShadow: [
                '0 0 20px rgba(251, 191, 36, 0.3)',
                '0 0 40px rgba(251, 191, 36, 0.6)',
                '0 0 20px rgba(251, 191, 36, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            « Crées-tu pour briller… ou pour transmettre ? »
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter IV - Le Rituel de Transmission
function RituelTransmissionSection() {
  const gifts = [
    { label: "inspiration", icon: Zap },
    { label: "vision", icon: Eye },
    { label: "leadership artistique", icon: Star },
    { label: "responsabilité culturelle", icon: Shield }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.span 
            className="text-4xl mb-4 block"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            IV. Le Rituel de Transmission
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/50 to-orange-950/40 border border-amber-500/30 mb-8 text-center"
        >
          <p className="text-lg text-amber-100/90 mb-2">
            Celui qui est jugé digne reçoit une <span className="text-orange-300 font-bold">braise sacrée</span>.
          </p>
          <p className="text-base text-emerald-200/80 italic mb-4">
            Invisible à l'œil humain. Mais elle brûle dans le cœur.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <p className="text-lg text-emerald-100/90 mb-4 text-center">Cette braise devient :</p>
          <div className="grid grid-cols-2 gap-4">
            {gifts.map((gift, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl bg-gradient-to-br from-orange-900/30 to-amber-900/30 border border-orange-500/20 text-center"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <gift.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                </motion.div>
                <p className="text-amber-200 font-semibold">{gift.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-green-950/40 border border-emerald-500/20 text-center"
        >
          <p className="text-lg text-emerald-100/90 mb-2">
            La forêt ne donne pas la gloire.
          </p>
          <p className="text-xl text-amber-300 font-bold">
            Elle donne la légitimité.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter V - La Sortie… ou l'Éveil
function EveilSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">🌅</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-100 mb-4">
            V. La Sortie… ou l'Éveil
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/50 via-amber-950/30 to-green-950/50 border border-emerald-500/30 text-center"
        >
          <motion.div
            className="inline-block mb-8"
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sun className="w-16 h-16 text-amber-400" />
          </motion.div>

          <p className="text-xl text-amber-100 font-semibold mb-6">
            On ne quitte jamais vraiment la Forêt des Ancêtres.
          </p>

          <p className="text-lg text-emerald-200/90 mb-8">
            On en ressort transformé.<br />
            <span className="text-amber-300">Plus humble.</span><br />
            <span className="text-emerald-300">Plus conscient.</span><br />
            <span className="text-green-300">Plus aligné avec la mission.</span>
          </p>

          <motion.div
            className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-emerald-500 to-transparent mb-8"
          />

          <p className="text-base text-emerald-200/80 italic mb-6">
            Car comprendre les pionniers, c'est comprendre que :
          </p>

          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-green-900/30 border border-amber-500/30 inline-block"
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 197, 94, 0.2)',
                '0 0 40px rgba(251, 191, 36, 0.3)',
                '0 0 20px rgba(34, 197, 94, 0.2)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-lg text-amber-200/90 mb-2">
              Le mouvement ne nous appartient pas.
            </p>
            <motion.p 
              className="text-2xl sm:text-3xl text-amber-300 font-bold"
              animate={{
                textShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(251, 191, 36, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Nous appartenons au mouvement.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function ForetAncetres() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/30 via-green-950/20 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <ForestBackground />
      <ForestParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-green-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <EntreeSilenceSection />
        <FeuEternelSection />
        <GardiensSection />
        <RituelTransmissionSection />
        <EveilSection />

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
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <TreePine className="w-14 h-14 text-emerald-400/70" />
          </motion.div>
          <p className="text-emerald-300/60 text-sm">
            🌳 LA FORÊT DES ANCÊTRES — Esprits des Pionniers — Mémoire Vivante 🌳
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(ForetAncetres);
