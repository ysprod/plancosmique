'use client';
import { memo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Music,
  Volume2,
  Sliders,
  Waves,
  Radio,
  Disc,
  Mic2,
  Drumstick,
  Piano,
  Headphones,
  Users,
  Sparkles,
  Play,
  Settings,
  ChevronRight,
  Info,
  CheckCircle2
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
      staggerChildren: 0.1,
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

// Sound wave particles
function SoundWaveParticles() {
  const waves = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    width: Math.random() * 3 + 1,
    height: Math.random() * 60 + 20,
    x: Math.random() * 100,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-center gap-1">
        {waves.map((w) => (
          <motion.div
            key={w.id}
            className="bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full"
            style={{
              width: w.width,
              height: w.height,
            }}
            animate={{
              scaleY: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: w.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: w.delay
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Studio background
function StudioBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blue/cyan ambient */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Purple glow */}
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Green accent */}
      <motion.div
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], y: [0, 30, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Bottom studio glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-gradient-to-t from-slate-800/50 to-transparent"
      />
    </div>
  );
}

// Equalizer visualization
function EqualizerBars() {
  const bars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 100 + 30,
    delay: i * 0.05
  }));

  return (
    <div className="flex items-end justify-center gap-1 h-32">
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-2 sm:w-3 bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 rounded-t-full"
          animate={{
            height: [bar.height * 0.3, bar.height, bar.height * 0.5, bar.height * 0.8, bar.height * 0.3]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: bar.delay
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
        {/* Floating icons */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400/50"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Volume2 className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-purple-400/50"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Sliders className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-emerald-400/50"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Waves className="w-9 h-9 sm:w-12 sm:h-12" />
        </motion.div>

        {/* Icon */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.div
            className="inline-block p-5 rounded-full bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-cyan-500/30"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sliders className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-cyan-400/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎛️ OFFOLOMOU STUDIO 🎛️
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight mb-4"
        >
          RÉGLAGE ACCOUSTIQUE
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-200/90 mb-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(34, 211, 238, 0.3)',
              '0 0 40px rgba(168, 85, 247, 0.5)',
              '0 0 20px rgba(34, 211, 238, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Niveau Primaire
        </motion.h2>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-cyan-300/70 font-light italic max-w-2xl mx-auto mb-8"
        >
          La science du son parfait • Maîtrisez votre mix
        </motion.p>

        {/* Equalizer visualization */}
        <motion.div variants={scaleIn} className="mb-8">
          <EqualizerBars />
        </motion.div>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-40 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
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
        {/* Studio badge */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-900/30 border border-cyan-500/30"
            animate={{ 
              borderColor: ['rgba(34, 211, 238, 0.3)', 'rgba(168, 85, 247, 0.5)', 'rgba(34, 211, 238, 0.3)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Headphones className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-cyan-300 font-medium">CONSOLE DE MIXAGE</span>
          </motion.div>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Sound wave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
              style={{
                border: '2px solid rgba(34, 211, 238, 0.3)',
              }}
              animate={{
                scale: [1, 1.3, 1.5],
                opacity: [0.4, 0.15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* VU meter lights */}
          <motion.div
            className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-2 rounded-sm ${
                  i < 3 ? 'bg-red-500' : i < 5 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale }}
            className="relative z-10"
          >
            {/* Glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated border */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 opacity-80" />

              {/* Image */}
              <div className="relative w-[300px] h-[200px] sm:w-[480px] sm:h-[320px] md:w-[580px] md:h-[380px] rounded-2xl overflow-hidden border-4 border-slate-900">
                <Image
                  src="/accoustique.jpg"
                  alt="Console de Mixage - Réglage Accoustique OFFOLOMOU"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 480px, 580px"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-cyan-900/20" />

                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* VU meter right */}
          <motion.div
            className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-2 rounded-sm ${
                  i < 3 ? 'bg-red-500' : i < 5 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: (9 - i) * 0.1
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Mixing table data
const mixingData = [
  { instrument: 'Guitare Principale', icon: Music, gain: '+4dB', fader: '0dB', pan: 'L20%', comment: 'Clarté dans le mix, non agressive', color: 'from-amber-500 to-orange-600' },
  { instrument: 'Basse', icon: Waves, gain: '+6dB', fader: '-1dB', pan: 'Centre', comment: 'Base du groove, jamais dominante', color: 'from-purple-500 to-indigo-600' },
  { instrument: 'Voix Principale', icon: Mic2, gain: '+3dB', fader: '+2dB', pan: 'Centre', comment: 'Toujours audible, porte le texte', color: 'from-pink-500 to-rose-600' },
  { instrument: 'Snare / Caisse', icon: Drumstick, gain: '+5dB', fader: '-1dB', pan: 'Centre', comment: 'Punch rythmique, équilibre mix', color: 'from-red-500 to-red-700' },
  { instrument: 'Kick / Grosse caisse', icon: Disc, gain: '+6dB', fader: '-2dB', pan: 'Centre', comment: 'Base rythmique, perceptible partout', color: 'from-slate-600 to-slate-800' },
  { instrument: 'Hi-Hat / Claps', icon: Radio, gain: '+2dB', fader: '-3dB', pan: 'L/R30%', comment: 'Couleur rythmique, subtil', color: 'from-cyan-500 to-teal-600' },
  { instrument: 'Claviers / Synthés', icon: Piano, gain: '+2dB', fader: '-4dB', pan: 'L/R40%', comment: 'Fond harmonique, atmosphère légère', color: 'from-blue-500 to-blue-700' },
  { instrument: 'Chœurs / Back vocals', icon: Users, gain: '+3dB', fader: '-2dB', pan: 'L/R50%', comment: 'Soutien harmonique, fond sonore', color: 'from-emerald-500 to-green-600' },
  { instrument: 'Effets (Reverb/Delay)', icon: Sparkles, gain: '+1dB', fader: '-5dB', pan: 'Centre', comment: "Crée de l'espace, pas dominant", color: 'from-violet-500 to-purple-700' }
];

// Instrument row component
function InstrumentRow({ 
  data, 
  index 
}: { 
  data: typeof mixingData[0]; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className={`p-4 sm:p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 ${
          isHovered ? 'border-cyan-500/50' : ''
        } transition-all duration-300`}
        whileHover={{ scale: 1.02, y: -4 }}
      >
        {/* Glow on hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon and name */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <motion.div
              className={`p-3 rounded-lg bg-gradient-to-br ${data.color}`}
              animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-semibold text-white">{data.instrument}</span>
          </div>

          {/* Values */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase">Gain</span>
              <span className={`font-mono font-bold ${
                data.gain.includes('+') ? 'text-green-400' : 'text-red-400'
              }`}>{data.gain}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase">Fader</span>
              <span className={`font-mono font-bold ${
                data.fader.includes('+') ? 'text-cyan-400' : data.fader === '0dB' ? 'text-white' : 'text-purple-400'
              }`}>{data.fader}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase">Pan</span>
              <span className="font-mono text-yellow-300">{data.pan}</span>
            </div>
          </div>

          {/* Comment */}
          <div className="flex-1 text-sm text-slate-400 italic">
            {data.comment}
          </div>
        </div>

        {/* Fader visualization */}
        <motion.div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${data.color} rounded-full`}
            initial={{ width: '0%' }}
            animate={{ width: `${60 + index * 4}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Mixing table section
function MixingTableSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📊</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Table de Mixage
          </h2>
          <p className="text-cyan-300/70">Configuration des niveaux pour chaque instrument</p>
        </motion.div>

        {/* Table header */}
        <motion.div 
          variants={fadeInUp}
          className="hidden sm:grid grid-cols-[200px_1fr_1fr_1fr_2fr] gap-4 px-6 py-3 mb-4 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-700"
        >
          <span>Instrument</span>
          <span>Gain</span>
          <span>Fader</span>
          <span>Pan</span>
          <span>Commentaire</span>
        </motion.div>

        {/* Instruments */}
        <div className="space-y-4">
          {mixingData.map((data, index) => (
            <InstrumentRow key={data.instrument} data={data} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// Instructions section
function InstructionsSection() {
  const instructions = [
    { step: 1, text: "Commence par régler guitare, basse et voix principale, ils forment le cœur du mix.", icon: Music },
    { step: 2, text: "Ajoute les percussions (snare, kick, hi-hat) en suivant la dynamique du morceau.", icon: Drumstick },
    { step: 3, text: "Les instruments secondaires et effets viennent en dernier pour enrichir le mix sans masquer l'essentiel.", icon: Piano },
    { step: 4, text: "Vérifie l'équilibre en écoute mono et stéréo.", icon: Headphones },
    { step: 5, text: "Ajuste les faders finement en ±1 dB selon la salle ou le système de diffusion.", icon: Sliders }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-4xl mb-4 block">📋</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Instructions d'Utilisation
          </h2>
          <p className="text-purple-300/70">Suivez ces étapes pour un mix parfait</p>
        </motion.div>

        <div className="space-y-6">
          {instructions.map((instruction, index) => (
            <motion.div
              key={instruction.step}
              variants={fadeInUp}
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-purple-900/20 border border-purple-500/20"
            >
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xl font-bold text-white">{instruction.step}</span>
              </motion.div>
              <div className="flex-1">
                <p className="text-white text-lg">{instruction.text}</p>
              </div>
              <instruction.icon className="w-6 h-6 text-purple-400 flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Pro tip */}
        <motion.div 
          variants={scaleIn}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-cyan-900/30 border border-emerald-500/30"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">Conseil Pro</h3>
              <p className="text-emerald-200/80">
                Les valeurs indiquées sont des points de départ. Chaque production est unique : 
                faites confiance à vos oreilles et adaptez selon le contexte musical.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function AccoustiquePrimaire() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <StudioBackground />
      <SoundWaveParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <MixingTableSection />
        <InstructionsSection />

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
            <Sliders className="w-12 h-12 text-cyan-500/60" />
          </motion.div>
          <p className="text-cyan-400/60 text-sm">
            🎛️ Réglage Accoustique Primaire — OFFOLOMOU Studio 🎛️
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(AccoustiquePrimaire);
