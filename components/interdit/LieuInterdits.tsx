'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Lock,
  Eye,
  EyeOff,
  Skull,
  Sparkles,
  Star,
  Moon,
  Zap,
  Shield,
  Clock,
  Swords,
  Key,
  Brain,
  Compass,
  Circle
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

// Floating dark particles
function FloatingDarkParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 6,
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
            background: Math.random() > 0.7 
              ? `radial-gradient(circle, rgba(220, 38, 38, 0.6), transparent)` 
              : `radial-gradient(circle, rgba(30, 30, 30, 0.8), transparent)`,
            boxShadow: Math.random() > 0.8 ? '0 0 8px rgba(220, 38, 38, 0.4)' : 'none',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
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

// Forbidden void background
function ForbiddenBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep void center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.95, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Red forbidden glow */}
      <motion.div
        className="absolute top-1/3 -left-20 w-96 h-96 bg-red-900/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Gold ancient energy */}
      <motion.div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-yellow-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], y: [0, -40, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Deep crimson bottom */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-80 bg-red-950/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Vertical light beam */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-b from-yellow-400/20 via-red-500/10 to-transparent"
        animate={{ opacity: [0.1, 0.4, 0.1], scaleX: [1, 2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Rotating ancient symbols
function AncientSymbols() {
  const symbols = ['⚕', '☥', '⚶', '✧', '◈', '⬡', '◯', '△'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const radius = 300;
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 text-2xl sm:text-4xl text-red-500/30"
            style={{
              x: Math.cos(angle) * radius - 20,
              y: Math.sin(angle) * radius - 20,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 30 + i * 5, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 4, repeat: Infinity, delay: i * 0.5 },
              scale: { duration: 6, repeat: Infinity, delay: i * 0.3 }
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating forbidden symbols */}
        <motion.div
          className="absolute top-20 left-10 text-red-600/50"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Lock className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-yellow-500/40"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Eye className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-red-500/40"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Skull className="w-9 h-9 sm:w-12 sm:h-12" />
        </motion.div>

        {/* Lock icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.div
            className="inline-block p-5 rounded-full bg-gradient-to-br from-red-900/40 to-black/60 border border-red-500/30"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-red-400/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚠ OFFOLAND ⚠
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 leading-tight mb-4"
        >
          LE LIEU DES INTERDITS
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-red-200/90 mb-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(220, 38, 38, 0.3)',
              '0 0 40px rgba(239, 68, 68, 0.5)',
              '0 0 20px rgba(220, 38, 38, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Sanctuaire Caché d'Offoland
        </motion.h2>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-red-300/70 font-light italic max-w-2xl mx-auto"
        >
          Une dimension verrouillée • Accessible uniquement après le Rituel des Ancêtres
        </motion.p>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-40 h-1 mx-auto mt-10 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-red-500/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-red-500/60 rounded-full"
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
        {/* Warning text */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-900/30 border border-red-500/30"
            animate={{ 
              borderColor: ['rgba(220, 38, 38, 0.3)', 'rgba(220, 38, 38, 0.6)', 'rgba(220, 38, 38, 0.3)'] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <EyeOff className="w-5 h-5 text-red-400" />
            </motion.div>
            <span className="text-red-300 font-medium">ACCÈS RESTREINT</span>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Void portal rings */}
          <motion.div
            className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(0, 0, 0, 0.8), rgba(220, 38, 38, 0.3), rgba(0, 0, 0, 0.9), rgba(234, 179, 8, 0.2), rgba(0, 0, 0, 0.8))',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          {/* Sacred seal pattern */}
          <motion.div
            className="absolute w-[350px] h-[350px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full border-2 border-dashed border-red-600/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />

          {/* Incandescent seal glow */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[330px] h-[330px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] rounded-full"
              style={{
                border: '2px solid rgba(220, 38, 38, 0.5)',
                boxShadow: 'inset 0 0 80px rgba(220, 38, 38, 0.2)',
              }}
              animate={{
                scale: [1, 1.3, 1.5],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Floating forbidden symbols */}
          {[Lock, Eye, Skull, Key, Shield, Moon].map((Icon, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 260;
            return (
              <motion.div
                key={i}
                className="absolute text-red-500/50"
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle) * radius],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 15 + i * 3,
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
            {/* Void glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-black via-red-900/50 to-black blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated forbidden border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-2xl bg-gradient-to-r from-red-700 via-black via-yellow-600 to-red-700"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-600 via-black to-yellow-500 opacity-80" />

              {/* Image */}
              <div className="relative w-[300px] h-[200px] sm:w-[480px] sm:h-[320px] md:w-[580px] md:h-[380px] rounded-2xl overflow-hidden border-4 border-slate-900">
                <Image
                  src="/interdit.jpg"
                  alt="Le Lieu des Interdits - Sanctuaire Caché d'Offoland"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 480px, 580px"
                  priority
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Forbidden shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Corner lock decorations */}
          <motion.div
            className="absolute -top-10 -left-10 text-red-600/60"
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Lock className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-10 -right-10 text-yellow-500/50"
            animate={{ y: [0, 10, 0], rotate: [0, -15, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Key className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Nature section
function NatureSection() {
  const locations = [
    'Entre le monde visible et la dimension des Ancêtres',
    'Sous le sceau sacré gravé au sol',
    'Dans une faille ouverte par la lumière verticale centrale'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">I</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-100 mb-4">
            Nature du Lieu
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-black/60 to-red-950/30 border border-red-500/20 mb-8"
        >
          <p className="text-red-100/90 text-lg sm:text-xl text-center mb-6">
            Ce n'est pas un simple endroit physique.
          </p>
          <p className="text-red-200/80 text-center mb-8 italic">
            C'est une <span className="text-yellow-300 font-bold">dimension verrouillée</span>, accessible uniquement après le <span className="text-red-300 font-bold">Rituel des Ancêtres</span>.
          </p>

          <div className="space-y-4">
            <p className="text-red-300/80 text-center mb-4">Il se situe :</p>
            {locations.map((loc, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-4 rounded-xl bg-red-900/20 border border-red-500/10"
                whileHover={{ x: 8 }}
              >
                <motion.span 
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <Compass className="w-4 h-4 text-white" />
                </motion.span>
                <span className="text-red-200/90">{loc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Why Forbidden section
function WhyForbiddenSection() {
  const contents = [
    { text: "Les vérités cachées d'Offoland", icon: Eye },
    { text: "Les pouvoirs non maîtrisés", icon: Zap },
    { text: "Les mémoires effacées des anciens rois", icon: Brain },
    { text: "Les artefacts que seuls les initiés peuvent toucher", icon: Key }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">II</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-100 mb-4">
            Pourquoi "Interdits" ?
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-red-950/40 to-black/60 border border-red-500/20 mb-8"
        >
          <p className="text-red-200/80 text-center mb-8">
            Parce que ce lieu contient :
          </p>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {contents.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-red-500/20"
              >
                <item.icon className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-200/90">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={scaleIn}
            className="p-6 rounded-2xl bg-gradient-to-br from-red-900/50 to-black/60 border border-red-600/30 text-center"
          >
            <motion.p 
              className="text-lg sm:text-xl text-red-300 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ⚠️ Celui qui entre sans préparation…<br />
              <span className="text-yellow-300 font-bold">perd son énergie ou sa mémoire.</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Visual description section
function VisualDescriptionSection() {
  const portalOpens = [
    'Le ciel devient noir profond',
    'Les étoiles disparaissent',
    'Le sceau au sol devient rouge incandescent',
    'Les divinités ferment les yeux'
  ];

  const playerDescends = [
    'Un espace circulaire infini',
    'Flottant dans le vide cosmique',
    'Avec des symboles anciens qui tournent lentement autour'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">III</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-100 mb-4">
            Description Visuelle
          </h2>
          <p className="text-red-300/70 italic">Inspirée de l'image</p>
        </motion.div>

        <div className="space-y-8">
          {/* Portal opens */}
          <motion.div 
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-black/70 to-red-950/30 border border-red-500/20"
          >
            <h3 className="text-lg font-semibold text-yellow-300 mb-4">Lorsque le portail s'ouvre :</h3>
            <ul className="space-y-2">
              {portalOpens.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-red-200/80">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Player descends */}
          <motion.div 
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-black/70 border border-yellow-500/20"
          >
            <h3 className="text-lg font-semibold text-yellow-300 mb-4">Le joueur descend dans :</h3>
            <ul className="space-y-2">
              {playerDescends.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-red-200/80">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-yellow-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Heart of Forbidden */}
          <motion.div 
            variants={scaleIn}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-black to-red-950/50 border border-yellow-500/30 text-center overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at center, rgba(0,0,0,0.9), rgba(220,38,38,0.2))',
                  'radial-gradient(circle at center, rgba(0,0,0,0.95), rgba(234,179,8,0.15))',
                  'radial-gradient(circle at center, rgba(0,0,0,0.9), rgba(220,38,38,0.2))'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-red-300 mb-4">Au centre :</h3>
              <motion.div
                className="inline-block p-6 rounded-full bg-gradient-to-br from-black to-yellow-900/30 border-2 border-yellow-500/40 mb-4"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
              >
                <Circle className="w-12 h-12 text-yellow-400" />
              </motion.div>
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-yellow-300 to-black">
                Une sphère noire et dorée —
              </p>
              <p className="text-2xl sm:text-3xl font-black text-yellow-300 mt-2">
                Le Cœur des Interdits.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Game functions section
function GameFunctionsSection() {
  const functions = [
    { icon: Key, label: '🔓 Débloquer les pouvoirs ultimes', color: 'from-yellow-500 to-amber-600' },
    { icon: Zap, label: '🧬 Modifier la réalité du jeu', color: 'from-purple-500 to-indigo-600' },
    { icon: Clock, label: '🕰 Voyager dans le passé des ancêtres', color: 'from-blue-500 to-cyan-600' },
    { icon: Swords, label: '⚔ Affronter une version sombre de soi-même', color: 'from-red-600 to-red-800' }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">IV</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-100 mb-4">
            Fonction dans le Jeu
          </h2>
          <p className="text-red-300/70">Dans Offoland, ce lieu peut servir à :</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {functions.map((func, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/60 to-red-950/30 border border-red-500/20 group"
            >
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${func.color} mb-4`}
                whileHover={{ rotate: 10 }}
              >
                <func.icon className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-lg font-semibold text-red-100">{func.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Poetic section
function PoeticSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <span className="text-4xl mb-4 block">V</span>
          <h2 className="text-xl sm:text-2xl text-red-300/80 font-medium mb-2">
            Version Poétique
          </h2>
          <p className="text-red-400/60 text-sm">À intégrer dans le livre</p>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-black to-red-950/40 border border-red-400/30 text-center overflow-hidden"
        >
          {/* Void glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                'inset 0 0 60px rgba(0, 0, 0, 0.8)',
                'inset 0 0 100px rgba(220, 38, 38, 0.2)',
                'inset 0 0 60px rgba(0, 0, 0, 0.8)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-8"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <EyeOff className="w-16 h-16 sm:w-20 sm:h-20 text-red-500/60" />
            </motion.div>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-yellow-200 to-red-300 leading-relaxed"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              "Le Lieu des Interdits n'est pas caché par les dieux…<br /><br />
              Il est caché par la peur de ceux qui ne sont pas prêts."
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-6 right-6 text-red-600/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-6 left-6 text-yellow-500/30"
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

// Main component
function LieuInterdits() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/30 to-black text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <ForbiddenBackground />
      <FloatingDarkParticles />
      <AncientSymbols />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <NatureSection />
        <WhyForbiddenSection />
        <VisualDescriptionSection />
        <GameFunctionsSection />
        <PoeticSection />

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
            <Lock className="w-12 h-12 text-red-600/60" />
          </motion.div>
          <p className="text-red-500/60 text-sm">
            ⚠ Le Lieu des Interdits — Sanctuaire Caché d'OFFOLAND ⚠
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(LieuInterdits);
