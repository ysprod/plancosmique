'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Flame,
  TreePine,
  Users,
  BookOpen,
  Sparkles,
  Music,
  Heart,
  Star,
  Moon,
  Sun,
  Crown,
  Eye
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

// Section wrapper with scroll animation
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

// Floating embers/particles
function FloatingEmbers() {
  const embers = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {embers.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? 'rgba(251, 146, 60, 0.8)' : 'rgba(239, 68, 68, 0.6)'
            }, transparent)`,
          }}
          animate={{
            y: [0, -60, -120],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.3]
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

// Sacred background with warm tones
function SacredBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Warm amber glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Deep red ancestral energy */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-red-900/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Earth brown grounding */}
      <motion.div
        className="absolute top-1/2 -left-20 w-80 h-80 bg-yellow-900/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Gold sacred light */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Deep forest green */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

// Hero image section with temple
function HeroImageSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-amber-400/80 font-medium mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🏛️ Le Sanctuaire Sacré 🏛️
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100/90">
            Là où la mémoire africaine respire encore
          </h2>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Sacred geometric rings */}
          <motion.div
            className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(251, 146, 60, 0.3), transparent, rgba(234, 179, 8, 0.3), transparent, rgba(239, 68, 68, 0.2), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ritual ring */}
          <motion.div
            className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full border-2 border-dashed border-amber-500/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pulsing ancestral energy */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] rounded-full"
              style={{
                border: '1px solid rgba(251, 146, 60, 0.3)',
              }}
              animate={{
                scale: [1, 1.4, 1.6],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Floating sacred symbols */}
          {[Flame, Moon, Sun, Star, Crown, Eye].map((Icon, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 220;
            return (
              <motion.div
                key={i}
                className="absolute text-amber-400/60"
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI / 3) * radius, Math.cos(angle) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI / 3) * radius, Math.sin(angle) * radius],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            );
          })}

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Sacred glow behind image */}
            <motion.div
              className="absolute inset-0 -m-10 rounded-3xl bg-gradient-to-br from-amber-500/40 via-red-500/30 to-yellow-600/40 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated golden border */}
              <motion.div
                className="absolute -inset-1 sm:-inset-2 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 via-red-500 to-amber-600 blur-sm"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-amber-400 via-red-500 to-yellow-500 opacity-75" />

              {/* Image */}
              <div className="relative w-[280px] h-[200px] sm:w-[450px] sm:h-[320px] md:w-[550px] md:h-[380px] rounded-2xl overflow-hidden border-4 border-slate-900">
                <Image
                  src="/temple.jpg"
                  alt="Le Temple des Ancêtres - Sanctuaire de la Coutume"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 450px, 550px"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Sacred shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Flame decorations */}
          <motion.div
            className="absolute -top-8 -left-8 text-orange-400/60"
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-10 h-10 sm:w-14 sm:h-14" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 -right-8 text-red-400/60"
            animate={{ y: [0, 10, 0], scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <Flame className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        </motion.div>

        {/* Sacred quote */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 font-medium leading-relaxed"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            "Quand les ancêtres dansent encore,<br />la culture ne meurt jamais."
          </motion.p>
          <motion.p 
            className="text-sm sm:text-base text-amber-300/60 mt-4 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            — Parole officielle du Temple —
          </motion.p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Hero section header
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Sacred symbols floating */}
        <motion.div
          className="absolute top-20 left-10 text-amber-500/50"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Flame className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-yellow-500/50"
          animate={{ 
            y: [0, 15, 0], 
            rotate: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Crown className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-orange-400/50"
          animate={{ 
            y: [0, -25, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Moon className="w-9 h-9 sm:w-13 sm:h-13" />
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-amber-400/80 font-medium mb-4"
            animate={{ 
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Offoland ✦
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 leading-tight mb-6"
        >
          LE TEMPLE DES ANCÊTRES
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-100/90 mb-10"
          animate={{
            textShadow: [
              '0 0 20px rgba(251, 146, 60, 0.3)',
              '0 0 40px rgba(234, 179, 8, 0.5)',
              '0 0 20px rgba(251, 146, 60, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Le Sanctuaire de la Coutume
        </motion.h2>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-amber-400/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-amber-400/60 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// Introduction section
function IntroSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          className="text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-amber-900/20 backdrop-blur-sm border border-amber-500/20"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100/90 leading-relaxed">
            Dans l'univers d'<span className="font-bold text-yellow-300">Offoland</span>, le Temple des Ancêtres n'est pas un simple lieu.
          </p>
          <p className="text-base sm:text-lg text-amber-200/80 leading-relaxed">
            C'est un <span className="font-semibold text-orange-300">espace sacré</span>, hors du temps, où la mémoire africaine respire encore.
          </p>
          <p className="text-base sm:text-lg text-amber-200/80 leading-relaxed">
            Un sanctuaire où les pionniers du Coupé-Décalé deviennent des <span className="font-semibold text-yellow-300">esprits-guides</span>, comme dans la tradition.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Architecture section
function ArchitectureSection() {
  const elements = [
    'murs en banco gravés de motifs Akan et Sénoufo',
    'grandes colonnes sculptées représentant les lignées',
    'portes en bois rouge décorées de symboles de protection',
    'totems et masques rituels aux entrées'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🏛️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Architecture sacrée
          </h2>
          <p className="text-lg sm:text-xl text-amber-300/80 font-light">
            Un temple de terre, d'or et de symboles
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-900/30 to-yellow-900/20 backdrop-blur-sm border border-amber-500/20 mb-8"
        >
          <p className="text-amber-100/90 text-base sm:text-lg mb-6">
            Le Temple est construit dans le respect des codes ancestraux :
          </p>
          
          <ul className="space-y-4">
            {elements.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-3 rounded-xl bg-amber-800/20 border border-amber-500/10"
                whileHover={{ x: 8 }}
              >
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500" />
                <span className="text-amber-200/90">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="text-center space-y-4 p-6 rounded-2xl bg-amber-950/30 border border-amber-600/20"
        >
          <p className="text-amber-100/80 italic">Chaque pierre raconte une histoire.</p>
          <p className="text-amber-200/70">
            La lumière n'est pas électrique :<br />
            elle vient des <span className="text-orange-300">lampes à huile</span>, des <span className="text-red-400">braises</span>, et d'une <span className="text-yellow-300">énergie invisible</span>.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Atmosphere section
function AtmosphereSection() {
  const naturElements = [
    'arbres géants centenaires',
    'racines comme des veines du passé',
    'tambours suspendus aux branches',
    'chants lointains portés par le vent'
  ];

  const scents = [
    'encens africain',
    'feuilles de kola',
    'fumée de bois sacré'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🔥</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            L'atmosphère
          </h2>
          <p className="text-lg sm:text-xl text-amber-300/80 font-light">
            Entre forêt mystique et cour royale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Nature elements */}
          <motion.div 
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-emerald-900/20 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <TreePine className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-100">La forêt sacrée</h3>
            </div>
            <ul className="space-y-2">
              {naturElements.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Scents */}
          <motion.div 
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-orange-900/20 border border-orange-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-orange-100">Les parfums</h3>
            </div>
            <p className="text-orange-200/70 mb-3">L'air est chaud, parfumé de :</p>
            <ul className="space-y-2">
              {scents.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-orange-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={fadeInUp}
          className="text-center p-6 rounded-2xl bg-amber-900/20 border border-amber-500/20"
        >
          <Music className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-amber-200/80 italic">
            On entend parfois un balafon…<br />
            <span className="text-yellow-300">comme si les ancêtres murmuraient.</span>
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Guardians section
function GuardiansSection() {
  const guardians = [
    'vieux maîtres en boubous brodés',
    'chefs spirituels portant des colliers de perles',
    'femmes initiées, gardiennes des récits'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">👴🏿</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Les Gardiens
          </h2>
          <p className="text-lg sm:text-xl text-amber-300/80 font-light">
            Les sages de la tradition
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border border-yellow-500/20 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <p className="text-amber-100/90">Dans la cour intérieure vivent les Gardiens :</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            {guardians.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-yellow-900/20 border border-yellow-500/10"
                whileHover={{ x: 8 }}
              >
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-yellow-200/90">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="text-center space-y-2 pt-6 border-t border-yellow-500/20">
            <p className="text-amber-200/70 italic">Ils parlent peu.</p>
            <p className="text-amber-200/70 italic">Mais chaque mot est une leçon.</p>
          </div>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-800/40 to-orange-900/40 border border-amber-400/30 text-center"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                'inset 0 0 20px rgba(251, 146, 60, 0.1)',
                'inset 0 0 40px rgba(234, 179, 8, 0.2)',
                'inset 0 0 20px rgba(251, 146, 60, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p className="relative z-10 text-amber-100/90 text-lg sm:text-xl leading-relaxed">
            Ils accueillent les jeunes avec cette phrase :<br /><br />
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
              « Ici, on ne danse pas seulement…<br />
              Ici, on hérite. »
            </span>
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Rituals section
function RitualsSection() {
  const rituals = [
    {
      title: 'La Salutation aux Ancêtres',
      description: 'On touche le sol, puis le cœur.'
    },
    {
      title: "L'Offrande symbolique",
      description: 'Une note de musique, une parole, un souvenir.'
    },
    {
      title: 'La Lecture du Livre Mémoire',
      description: 'Un passage de la Bible du Coupé-Décalé est récité comme une parole sacrée.'
    },
    {
      title: 'La Bénédiction du Rythme',
      description: 'Le tambour retentit : le jeune reçoit sa mission.'
    }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🕯️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Les Rituels
          </h2>
          <p className="text-lg sm:text-xl text-amber-300/80 font-light">
            Transmission et bénédiction culturelle
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-6">
          <p className="text-center text-amber-100/80 mb-8">
            Chaque visite au Temple suit un rite :
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {rituals.map((ritual, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300"
              whileHover={{ x: 8 }}
            >
              <motion.span 
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {index + 1}
              </motion.span>
              <div>
                <h3 className="text-lg font-semibold text-amber-100 mb-1">{ritual.title}</h3>
                <p className="text-amber-200/70">{ritual.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Spirits of Pioneers section
function SpiritsSection() {
  const manifestations = [
    'des présences protectrices',
    'des voix dans le vent',
    'des guides invisibles'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🌌</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Les Esprits des Pionniers
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/20 mb-8"
        >
          <p className="text-indigo-100/90 text-center mb-6">
            Dans la grande salle centrale, des silhouettes apparaissent parfois :
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['les fondateurs', 'les pionniers', 'les légendes du mouvement'].map((item, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full bg-indigo-800/30 border border-indigo-400/30 text-indigo-200"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.span>
            ))}
          </div>

          <div className="text-center space-y-2 pt-6 border-t border-indigo-500/20">
            <p className="text-indigo-200/70 italic">Ils ne parlent pas comme des fantômes.</p>
            <p className="text-indigo-200/80">Ils apparaissent comme dans la coutume :</p>
            
            <ul className="space-y-2 mt-4">
              {manifestations.map((item, index) => (
                <li key={index} className="text-indigo-300/80">{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          variants={scaleIn}
          className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-400/30 text-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1), transparent)',
                'radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.1), transparent)',
                'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1), transparent)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <p className="relative z-10 text-lg sm:text-xl text-indigo-100/90 mb-4">
            Leur message est clair :
          </p>
          <p className="relative z-10 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-violet-300">
            « Continue. Transmets. Respecte. »
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Temple meaning section
function TempleMeaningSection() {
  const meanings = [
    'la coutume',
    'la mémoire',
    'le respect',
    'la transmission aux jeunes',
    'la spiritualité africaine dans la musique'
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">🎶</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 mb-4">
            Le Temple comme lien
          </h2>
          <p className="text-lg sm:text-xl text-amber-300/80 font-light">
            Entre tradition et modernité
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-500/20 mb-8"
        >
          <p className="text-amber-100/90 text-center mb-6">
            Dans Offoland, le Temple des Ancêtres représente :
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {meanings.map((item, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-800/40 to-yellow-800/40 border border-amber-400/30 text-amber-100"
                whileHover={{ scale: 1.05, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="text-center space-y-4 p-6 rounded-2xl bg-amber-950/30 border border-amber-600/20"
        >
          <p className="text-amber-200/80">
            Car le Coupé-Décalé n'est pas seulement une fête…
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
            C'est une lignée.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Conclusion section
function ConclusionSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={scaleIn}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-amber-400/30 text-center overflow-hidden"
        >
          {/* Animated glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                'inset 0 0 40px rgba(251, 146, 60, 0.1)',
                'inset 0 0 80px rgba(234, 179, 8, 0.2)',
                'inset 0 0 40px rgba(251, 146, 60, 0.1)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <span className="text-5xl mb-6 block">✨</span>
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-amber-400/60 font-medium mb-4">
              Phrase officielle du Temple
            </p>
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-200 leading-relaxed"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              "Quand les ancêtres dansent encore,<br />
              la culture ne meurt jamais."
            </motion.p>
          </motion.div>

          {/* Corner flames */}
          <motion.div
            className="absolute top-4 right-4 text-orange-400/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-amber-400/40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Flame className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function TempleAncetres() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/30 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <SacredBackground />
      <FloatingEmbers />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <IntroSection />
        <ArchitectureSection />
        <AtmosphereSection />
        <GuardiansSection />
        <RitualsSection />
        <SpiritsSection />
        <TempleMeaningSection />
        <ConclusionSection />

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
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Flame className="w-12 h-12 text-amber-500/60" />
          </motion.div>
          <p className="text-amber-400/60 text-sm">
            ✦ Le Temple des Ancêtres — Offoland ✦
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(TempleAncetres);
