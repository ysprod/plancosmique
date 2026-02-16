'use client';
import { memo, useRef, useState } from 'react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Circle,
  Flame,
  Leaf,
  Waves,
  Moon,
  Sparkles,
  Crown,
  Music,
  Star,
  TreePine,
  Zap,
  Heart,
  Eye,
  Scroll,
  Users,
  Clock,
  Home
} from 'lucide-react';

// Types
interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  icon: React.ElementType;
  emoji?: string;
}

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
      delayChildren: 0.1
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

// Book particles
function BookParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    color: ['amber', 'purple', 'blue', 'green', 'red'][Math.floor(Math.random() * 5)]
  }));

  const colorMap: Record<string, string> = {
    amber: 'rgba(251, 191, 36, 0.5)',
    purple: 'rgba(168, 85, 247, 0.5)',
    blue: 'rgba(59, 130, 246, 0.5)',
    green: 'rgba(34, 197, 94, 0.5)',
    red: 'rgba(239, 68, 68, 0.5)'
  };

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
            background: `radial-gradient(circle, ${colorMap[p.color]}, transparent)`,
            boxShadow: `0 0 10px ${colorMap[p.color]}`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0],
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

// Chapters data
const chapters: Chapter[] = [
  { id: 0, title: 'Prologue', subtitle: 'Quand le Rythme Devient Monde', color: 'text-amber-300', bgGradient: 'from-amber-950/50 to-slate-950', icon: Scroll, emoji: '📜' },
  { id: 1, title: 'Chapitre 1', subtitle: 'La Naissance d\'Offoland', color: 'text-amber-300', bgGradient: 'from-amber-900/40 to-slate-950', icon: Star, emoji: '⭐' },
  { id: 2, title: 'Chapitre 2', subtitle: 'Le Rythmion — La Matière du Rythme', color: 'text-purple-300', bgGradient: 'from-purple-900/40 to-slate-950', icon: Music, emoji: '🎵' },
  { id: 3, title: 'Chapitre 3', subtitle: 'Les Ondes-Mères — La Présence des Ancêtres', color: 'text-violet-300', bgGradient: 'from-violet-900/40 to-slate-950', icon: TreePine, emoji: '🌿' },
  { id: 4, title: 'Chapitre 4', subtitle: 'La Singularité Offolomou', color: 'text-green-300', bgGradient: 'from-green-900/40 to-slate-950', icon: BookOpen, emoji: '📗' },
  { id: 5, title: 'Chapitre 5', subtitle: 'Blanc — La Terre des Racines', color: 'text-gray-100', bgGradient: 'from-gray-800/50 to-slate-950', icon: Circle, emoji: '⚪' },
  { id: 6, title: 'Chapitre 6', subtitle: 'Rouge — La Ville des Concepts', color: 'text-red-400', bgGradient: 'from-red-900/50 to-slate-950', icon: Flame, emoji: '🔴' },
  { id: 7, title: 'Chapitre 7', subtitle: 'Vert — La Bibliothèque Sacrée', color: 'text-green-400', bgGradient: 'from-green-900/50 to-slate-950', icon: Leaf, emoji: '🟢' },
  { id: 8, title: 'Chapitre 8', subtitle: 'Bleu — Le Temple des Ancêtres', color: 'text-blue-400', bgGradient: 'from-blue-900/50 to-slate-950', icon: Waves, emoji: '🔵' },
  { id: 9, title: 'Chapitre 9', subtitle: 'Noir — Le Fleuve du Tempo', color: 'text-gray-300', bgGradient: 'from-gray-900/70 to-slate-950', icon: Moon, emoji: '⚫' },
  { id: 10, title: 'Chapitre 10', subtitle: 'Violet — La Forêt des Ondes-Mères', color: 'text-violet-400', bgGradient: 'from-violet-900/50 to-slate-950', icon: TreePine, emoji: '🟣' },
  { id: 11, title: 'Chapitre 11', subtitle: 'Pourpre — Le Grand Festival Éternel', color: 'text-fuchsia-400', bgGradient: 'from-fuchsia-900/50 to-slate-950', icon: Crown, emoji: '🟪' },
];

// Cover page component
function CoverPage({ onStart }: { onStart: () => void }) {
  // Preview of the 7 colors
  const colorPreviews = [
    { emoji: '⚪', name: 'Blanc', desc: 'Les Racines', color: 'bg-gray-100', glow: 'rgba(255,255,255,0.4)' },
    { emoji: '🔴', name: 'Rouge', desc: 'Les Concepts', color: 'bg-red-500', glow: 'rgba(239,68,68,0.5)' },
    { emoji: '🟢', name: 'Vert', desc: 'La Bibliothèque', color: 'bg-green-500', glow: 'rgba(34,197,94,0.5)' },
    { emoji: '🔵', name: 'Bleu', desc: 'Le Temple', color: 'bg-blue-500', glow: 'rgba(59,130,246,0.5)' },
    { emoji: '⚫', name: 'Noir', desc: 'Le Fleuve', color: 'bg-gray-800', glow: 'rgba(100,100,100,0.4)' },
    { emoji: '🟣', name: 'Violet', desc: 'La Forêt', color: 'bg-violet-500', glow: 'rgba(139,92,246,0.5)' },
    { emoji: '🟪', name: 'Pourpre', desc: 'Le Festival', color: 'bg-fuchsia-600', glow: 'rgba(192,38,211,0.5)' },
  ];

  return (
    <div className="relative min-h-screen px-4 py-12 sm:py-20">
      {/* Hero section with book */}
      <AnimatedSection className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Book cover - 3D effect */}
          <motion.div variants={scaleIn} className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-[280px] sm:w-[320px]" style={{ perspective: '1000px' }}>
              {/* Book shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/40 blur-2xl rounded-full" />
              
              {/* Book 3D container */}
              <motion.div
                className="relative"
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Book spine */}
                <div 
                  className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-amber-800 to-amber-700 rounded-l-md"
                  style={{ transform: 'rotateY(-90deg) translateX(-12px)', transformOrigin: 'left' }}
                />
                
                {/* Book cover */}
                <div className="relative rounded-r-xl rounded-l-sm overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20">
                  <div className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[460px]">
                    <Image
                      src="/methode.jpg"
                      alt="Les 7 Couleurs - Tome 1"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, 320px"
                      priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-purple-950/20" />
                    
                    {/* Book title on cover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <p className="text-xs uppercase tracking-[0.4em] text-amber-400/90 mb-1">TOME 1</p>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">LES 7 COULEURS</h3>
                      <p className="text-xs text-purple-300/80 mt-2">Charly Guitare</p>
                    </div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Book info */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-medium mb-6">
                📚 OFFOLAND — TOME 1
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-300 to-amber-200 leading-tight mb-4"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              LES 7 COULEURS
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-purple-200/90 font-light mb-2"
            >
              Chroniques Fondatrices du Continuum Offolomou
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="text-base text-amber-300/70 italic mb-8"
            >
              Version Canon — Charly Guitare
            </motion.p>

            {/* Book stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {[
                { label: 'Chapitres', value: '12', icon: Scroll },
                { label: 'Dimensions', value: '7', icon: Sparkles },
                { label: 'Serments', value: '7', icon: Heart }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-bold">{stat.value}</span>
                  <span className="text-white/60 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Synopsis */}
            <motion.div variants={fadeInUp} className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-slate-900/50 border border-purple-500/20 mb-8">
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                Découvrez l'origine mystique d'<strong className="text-amber-300">Offoland</strong>, un continuum où le 
                <strong className="text-purple-300"> Coupé-Décalé</strong> transcende le temps. À travers <strong className="text-amber-300">sept 
                dimensions cosmiques</strong>, explorez les secrets du <strong className="text-purple-300">Rythmion</strong>, la 
                présence des <strong className="text-violet-300">Ondes-Mères</strong>, et la puissance de la 
                <strong className="text-green-300"> Bible Offolomou</strong>.
              </p>
            </motion.div>

            {/* CTA button */}
            <motion.button
              variants={fadeInUp}
              onClick={onStart}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl shadow-purple-500/25 transition-shadow"
            >
              <BookOpen className="w-6 h-6" />
              Découvrir le Contenu
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </AnimatedSection>

      {/* 7 Colors preview section */}
      <AnimatedSection className="max-w-5xl mx-auto mt-20 sm:mt-28">
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
            ✨ Les 7 Dimensions Cosmiques
          </h2>
          <p className="text-purple-300/70">Chaque couleur est un monde, chaque monde est un tempo</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3"
        >
          {colorPreviews.map((color, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.08, y: -8 }}
              className="relative p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 text-center group cursor-pointer"
              onClick={onStart}
            >
              <motion.div
                className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full ${color.color} mb-3 shadow-lg`}
                animate={{ 
                  boxShadow: [
                    `0 0 20px ${color.glow}`,
                    `0 0 35px ${color.glow}`,
                    `0 0 20px ${color.glow}`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <p className="text-sm font-bold text-white mb-0.5">{color.name}</p>
              <p className="text-xs text-white/50 hidden sm:block">{color.desc}</p>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>

        {/* Chapters preview link */}
        <motion.div variants={fadeInUp} className="text-center mt-10">
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors group"
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium">Voir tous les chapitres</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </AnimatedSection>

      {/* What you'll discover section */}
      <AnimatedSection className="max-w-4xl mx-auto mt-20 sm:mt-28">
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
            📖 Ce que vous découvrirez
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Le Rythmion', desc: 'La particule fondamentale du son, matière du rythme cosmique', icon: Music, color: 'text-purple-400' },
            { title: 'Les Ondes-Mères', desc: 'La fréquence vivante des ancêtres guides', icon: TreePine, color: 'text-violet-400' },
            { title: 'La Bible Offolomou', desc: 'Le livre-singularité qui fabrique l\'avenir', icon: BookOpen, color: 'text-green-400' },
            { title: 'Les 7 Tempos', desc: 'Souche, Flamme, Vivant, Bénédiction, Flot, Multidimensionnel, Universel', icon: Clock, color: 'text-amber-400' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="p-5 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 flex gap-4 items-start transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className={`font-bold ${item.color} mb-1`}>{item.title}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold text-xl shadow-2xl shadow-purple-500/30"
          >
            <Sparkles className="w-6 h-6" />
            Commencer la Lecture
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

// Table of contents
function TableOfContents({ onSelectChapter }: { onSelectChapter: (id: number) => void }) {
  return (
    <AnimatedSection className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-3xl mb-4 block">📚</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 mb-2">SOMMAIRE</h2>
          <p className="text-purple-300/70">Naviguez à travers les dimensions</p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-3">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter.id}
              variants={fadeInUp}
              onClick={() => onSelectChapter(chapter.id)}
              whileHover={{ scale: 1.02, x: 10 }}
              className={`w-full p-4 rounded-xl bg-gradient-to-r ${chapter.bgGradient} border border-white/10 text-left flex items-center gap-4 group transition-all`}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <chapter.icon className={`w-6 h-6 ${chapter.color}`} />
              </motion.div>
              <div className="flex-1">
                <h3 className={`font-bold ${chapter.color}`}>
                  {chapter.emoji} {chapter.title}
                </h3>
                <p className="text-sm text-white/60">{chapter.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter navigation
function ChapterNav({ 
  currentChapter, 
  onPrev, 
  onNext, 
  onTOC 
}: { 
  currentChapter: number;
  onPrev: () => void;
  onNext: () => void;
  onTOC: () => void;
}) {
  const chapter = chapters[currentChapter];
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-lg shadow-xl"
      >
        <button
          onClick={onPrev}
          disabled={currentChapter === 0}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={onTOC}
          className="px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <span className={`text-sm font-medium ${chapter.color}`}>
            {chapter.emoji} {chapter.title}
          </span>
        </button>
        
        <button
          onClick={onNext}
          disabled={currentChapter === chapters.length - 1}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </motion.div>
    </div>
  );
}

// Prologue content
function PrologueContent() {
  return (
    <div className="space-y-6">
      <p className="text-xl text-amber-100 leading-relaxed">
        Avant Offoland, il n'y avait que la danse du présent.
      </p>
      <p className="text-lg text-amber-200/80">
        Des nuits pleines de lumière.<br />
        Des foules en feu.<br />
        Des guitares comme des éclairs.
      </p>
      <p className="text-lg text-amber-200/80 italic">
        Mais quelque chose manquait.
      </p>
      <div className="p-6 rounded-xl bg-amber-900/30 border border-amber-500/30">
        <p className="text-lg text-amber-100">
          Car le rythme, s'il n'est pas transmis, <span className="text-amber-300 font-semibold">disparaît</span>.<br />
          Et la culture, si elle n'est pas écrite, <span className="text-amber-300 font-semibold">se dissout dans le vent</span>.
        </p>
      </div>
      <p className="text-xl text-purple-300 font-semibold text-center">
        Alors naquit une question ancestrale :<br />
        <span className="text-2xl">Comment rendre le Coupé-Décalé éternel ?</span>
      </p>
      <div className="space-y-4 text-lg text-amber-200/80">
        <p>C'est à cet instant précis que l'univers se courba.</p>
        <p>Non pas sous une force physique… <em>Mais sous une force culturelle.</em></p>
        <p>Le premier <span className="text-purple-300">Rythmion</span> apparut.</p>
        <p>La première <span className="text-violet-300">Onde-Mère</span> se réveilla.</p>
        <p>Et la <span className="text-green-300">Bible Offolomou</span> s'ouvrit comme une singularité.</p>
      </div>
      <p className="text-2xl text-amber-300 font-bold text-center pt-4">
        Ainsi commença Offoland.
      </p>
    </div>
  );
}

// Chapter 1 content
function Chapter1Content() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-lg text-amber-200/90">
        <p><strong className="text-amber-300">Offoland n'est pas un pays.</strong></p>
        <p><strong className="text-amber-300">Offoland n'est pas une fiction.</strong></p>
        <p><span className="text-amber-100 text-xl">Offoland est un <strong>continuum</strong></span> : un espace où la tradition africaine marche avec la jeunesse.</p>
      </div>
      
      <div className="p-6 rounded-xl bg-amber-900/30 border border-amber-500/30">
        <p className="text-lg text-amber-100">
          Ici, les ancêtres ne sont pas des souvenirs, mais des <span className="text-purple-300 font-semibold">fréquences vivantes</span>.<br /><br />
          Et la guitare n'est pas un instrument, mais un <span className="text-blue-300 font-semibold">gouvernail temporel</span>.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-amber-300 mb-4">Offoland est né de trois forces :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'la Terre', desc: '(racines)', icon: Home, color: 'from-green-600 to-emerald-700' },
            { label: 'le Rythme', desc: '(mouvement)', icon: Music, color: 'from-red-600 to-orange-700' },
            { label: 'la Mémoire', desc: '(transmission)', icon: BookOpen, color: 'from-blue-600 to-indigo-700' }
          ].map((force, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`p-5 rounded-xl bg-gradient-to-br ${force.color} text-center`}
            >
              <force.icon className="w-10 h-10 text-white mx-auto mb-3" />
              <p className="text-white font-bold">{force.label}</p>
              <p className="text-white/70 text-sm">{force.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-xl text-amber-300 font-semibold text-center pt-6">
        Ces trois forces ont ouvert les <span className="text-2xl">7 couleurs</span>.
      </p>
    </div>
  );
}

// Chapter 2 content
function Chapter2Content() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-purple-900/30 border border-purple-500/30">
        <p className="text-xl text-purple-100">
          Dans le monde ordinaire, le son est invisible.<br />
          <span className="text-purple-300 font-bold">Dans Offoland, le son est matière.</span>
        </p>
      </div>

      <p className="text-lg text-purple-200/90">
        Chaque note contient une particule fondamentale : <strong className="text-purple-300">le Rythmion</strong>.
      </p>

      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-bold text-purple-300">Le Rythmion permet :</h3>
        <div className="space-y-3">
          {[
            'au passé de rester vivant',
            'à la danse de devenir archive',
            'au tempo de traverser le temps'
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-4 rounded-lg bg-purple-800/30 border-l-4 border-purple-500"
            >
              <p className="text-purple-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-purple-500/30 mt-8">
        <p className="text-lg text-purple-100">
          Quand un tambour bat, il libère des <span className="text-pink-300">rythmions</span>.<br />
          Quand une guitare pleure, elle trace un <span className="text-blue-300">tempo-vector</span>.
        </p>
      </div>

      <p className="text-xl text-purple-300 font-bold text-center pt-4">
        Le rythme devient alors une énergie cosmique.
      </p>
    </div>
  );
}

// Chapter 3 content
function Chapter3Content() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-violet-900/30 border border-violet-500/30">
        <p className="text-xl text-violet-100">
          Les ancêtres ne sont pas morts.<br />
          Ils sont passés dans une autre forme : <span className="text-violet-300 font-bold">la fréquence</span>.
        </p>
      </div>

      <div className="space-y-4 text-lg text-violet-200/90">
        <p>Dans la <span className="text-violet-300">Forêt Violette</span>, leurs voix existent encore.</p>
        <p>Dans le <span className="text-blue-300">Temple Bleu</span>, leurs bénédictions circulent.</p>
        <p>Dans le <span className="text-fuchsia-300">Festival Pourpre</span>, ils dansent avec les vivants.</p>
      </div>

      <div className="text-center py-6">
        <p className="text-2xl text-violet-300 font-bold">On les appelle : les Ondes-Mères.</p>
      </div>

      <p className="text-lg text-violet-200/90">
        Chaque pionnier du Coupé-Décalé laisse une <strong className="text-amber-300">onde-mère</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[
          { action: 'Jouer', result: "c'est invoquer", icon: Music },
          { action: 'Danser', result: "c'est réveiller", icon: Zap },
          { action: 'Transmettre', result: "c'est éterniser", icon: Heart }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-5 rounded-xl bg-violet-800/40 border border-violet-500/30 text-center"
          >
            <item.icon className="w-10 h-10 text-violet-400 mx-auto mb-3" />
            <p className="text-violet-200 font-bold">{item.action}</p>
            <p className="text-violet-300/80 text-sm italic">{item.result}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Chapter 4 content
function Chapter4Content() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-green-900/30 border border-green-500/30">
        <p className="text-lg text-green-200/90">
          Au centre de la Dimension Verte, un livre existe.<br />
          Pas un simple livre. <span className="text-green-300 font-bold">Un point gravitationnel</span>.
        </p>
      </div>

      <div className="text-center py-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block"
        >
          <BookOpen className="w-20 h-20 text-green-400 mx-auto" />
        </motion.div>
        <h3 className="text-3xl font-bold text-green-300 mt-4">La Bible Offolomou</h3>
      </div>

      <div className="space-y-3">
        <p className="text-lg text-green-200/90">Quand elle s'ouvre :</p>
        {[
          'les noms reviennent',
          'les époques se projettent',
          'la jeunesse reçoit la mission'
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10 }}
            className="p-4 rounded-lg bg-green-800/30 border-l-4 border-green-500"
          >
            <p className="text-green-100">{item}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/30 border border-green-500/30 mt-8 text-center">
        <p className="text-xl text-green-100">
          Ce livre est la <span className="text-green-300 font-bold">singularité</span> d'Offoland.
        </p>
        <p className="text-lg text-green-200/80 mt-4">
          Il ne garde pas le passé.<br />
          <span className="text-green-300 font-semibold">Il fabrique l'avenir.</span>
        </p>
      </div>
    </div>
  );
}

// Dimension chapter component (chapters 5-11)
function DimensionChapter({ 
  chapter,
  content 
}: { 
  chapter: Chapter;
  content: {
    intro: string[];
    description: string;
    gardiens?: string[];
    rites?: { name: string; desc: string }[];
    tempo?: { name: string; desc: string };
    serment: string[];
  };
}) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className={`p-6 rounded-xl bg-gradient-to-br ${chapter.bgGradient} border border-white/20`}>
        {content.intro.map((line, i) => (
          <p key={i} className={`text-lg ${chapter.color} ${i > 0 ? 'mt-2' : ''}`}>{line}</p>
        ))}
      </div>

      {/* Description */}
      <p className="text-lg text-white/80">{content.description}</p>

      {/* Gardiens */}
      {content.gardiens && (
        <div className="space-y-4">
          <h3 className={`text-xl font-bold ${chapter.color}`}>
            <Users className="w-5 h-5 inline mr-2" />
            Gardiens
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.gardiens.map((g, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Rites */}
      {content.rites && (
        <div className="space-y-4">
          <h3 className={`text-xl font-bold ${chapter.color}`}>
            <Sparkles className="w-5 h-5 inline mr-2" />
            Rites Sacrés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.rites.map((rite, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <h4 className={`font-bold ${chapter.color}`}>{rite.name}</h4>
                <p className="text-sm text-white/60 mt-1">{rite.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tempo */}
      {content.tempo && (
        <div className={`p-6 rounded-xl bg-white/5 border border-white/20`}>
          <div className="flex items-center gap-3 mb-2">
            <Clock className={`w-6 h-6 ${chapter.color}`} />
            <h3 className={`text-xl font-bold ${chapter.color}`}>{content.tempo.name}</h3>
          </div>
          <p className="text-white/70">{content.tempo.desc}</p>
        </div>
      )}

      {/* Serment */}
      <div className={`p-8 rounded-2xl bg-gradient-to-br ${chapter.bgGradient} border-2 border-white/20`}>
        <h3 className={`text-xl font-bold ${chapter.color} mb-4 text-center`}>
          ✨ Serment du Disciple
        </h3>
        <div className="text-center space-y-2">
          {content.serment.map((line, i) => (
            <p key={i} className={`${i === content.serment.length - 1 ? 'text-lg font-bold text-amber-300 mt-4' : 'text-white/80 italic'}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Chapter content renderer
function ChapterContent({ chapterId }: { chapterId: number }) {
  const chapter = chapters[chapterId];
  
  // Content for chapters 5-11
  const dimensionContents: Record<number, any> = {
    5: {
      intro: [
        'Le Blanc n\'est pas une absence.',
        'Le Blanc est une origine.',
        'C\'est la dimension où Offoland prend racine.'
      ],
      description: 'La Dimension Blanche est une vaste étendue ivoirienne mythique, faite de savanes calmes, de grands fromagers sacrés, de villages circulaires et de feu de bois qui parle la nuit.',
      gardiens: ['Vieux-Pères du Tempo', 'Mères de Transmission', 'Porteuses de Parole', 'Forgerons du Premier Son'],
      rites: [
        { name: 'Rite de la Parole', desc: 'Annoncer son intention avant de jouer' },
        { name: 'Rite du Nom', desc: 'Recevoir un nom symbolique, une mission' },
        { name: 'Rite de la Terre', desc: 'Se rappeler que la musique vient du sol' }
      ],
      tempo: { name: 'Tempo-Souche', desc: 'Le rythme des cérémonies : funérailles, mariages, initiations' },
      serment: [
        'Je reconnais la Terre.',
        'Je reconnais les Anciens.',
        'Je ne construirai pas Offoland sur l\'oubli.',
        'Je porterai la racine dans le futur.',
        'Coupé-Décalé est éternel parce qu\'il vient de la Terre.'
      ]
    },
    6: {
      intro: [
        'Le Rouge est le feu de la jeunesse.',
        'L\'audace du créateur.',
        'Le mouvement perpétuel.'
      ],
      description: 'La Ville Rouge est un écosystème vivant où les idées naissent, circulent, se rencontrent et explosent. Des rues ondulantes, des scènes suspendues, des murs peints de motifs ancestraux.',
      gardiens: ['Faiseurs de Mouvement', 'Sculpteurs de Son', 'Porteurs de Feu', 'Visionnaires'],
      rites: [
        { name: 'Danse d\'Ouverture', desc: 'Bouger ensemble pour réveiller la ville' },
        { name: 'Inspiration Partagée', desc: 'Offrir une idée gravée sur les murs lumineux' },
        { name: 'Cercle des Feux', desc: 'Rassemblement de tambours et lumières' }
      ],
      tempo: { name: 'Tempo-Flamme', desc: 'Rapide mais maîtrisé, imprévisible mais harmonieux' },
      serment: [
        'Je reçois le feu.',
        'Je deviens mouvement.',
        'Je transforme mes idées en danse et mes concepts en vie.',
        'Rouge m\'inspire. Blanc me retient.',
        'Coupé-Décalé est éternel.'
      ]
    },
    7: {
      intro: [
        'Le Vert n\'est pas un musée.',
        'Le Vert est un organisme vivant :',
        'les archives respirent, les notes vibrent, les textes chantent.'
      ],
      description: 'La Bibliothèque Sacrée est une ville verticale : des tours de feuilles lumineuses, des couloirs d\'archives infinies, des chambres de lecture suspendues dans l\'air.',
      gardiens: ['Archivistes', 'Conservateurs du Tempo', 'Lecteurs Sacrés'],
      rites: [
        { name: 'Lecture initiatique', desc: 'Lire la Bible Offolomou' },
        { name: 'Écriture des créations', desc: 'Inscrire chaque note dans les archives' },
        { name: 'Méditation des Ondes-Mères', desc: 'Relier les créations aux ancêtres' }
      ],
      tempo: { name: 'Tempo-Vivant', desc: 'Plus profond que le Rouge, capable de relier passé et futur' },
      serment: [
        'Je reçois la mémoire.',
        'Je respecte les racines et le feu vivant.',
        'Chaque création que je touche devient vivante.',
        'Vert m\'inspire. Blanc me retient. Rouge m\'élance.',
        'Coupé-Décalé est éternel.'
      ]
    },
    8: {
      intro: [
        'Le Bleu est la vibration de l\'invisible.',
        'La voix silencieuse des ancêtres.',
        'Le sanctuaire des bénédictions.'
      ],
      description: 'Le Temple Bleu est un espace à la fois intérieur et extérieur : des piliers lumineux flottants, des cascades de lumière bleue, des salles de silence et de vibration.',
      gardiens: ['Veilleurs des Ondes'],
      rites: [
        { name: 'Cercle des Ancêtres', desc: 'Émettre un rythme pour réveiller les Ondes-Mères' },
        { name: 'Appel des Noms', desc: 'Prononcer les noms des maîtres, vibration par vibration' },
        { name: 'Méditation du Silence', desc: 'Une heure où les ancêtres se manifestent' }
      ],
      tempo: { name: 'Tempo-Bénédiction', desc: 'Lent mais puissant, transforme la mémoire en bénédiction' },
      serment: [
        'J\'écoute les ancêtres.',
        'Je reçois leur souffle.',
        'Mon rythme devient prière. Mon pas devient pont.',
        'Bleu m\'inspire. Vert me retient. Rouge m\'élance. Blanc me fonde.',
        'Coupé-Décalé est éternel.'
      ]
    },
    9: {
      intro: [
        'Le Noir n\'est pas une couleur de fin.',
        'C\'est le flux.',
        'La profondeur temporelle où le temps se plie et se chevauche.'
      ],
      description: 'Un fleuve infini, sombre comme l\'encre, mais luminescent de rythmions. Ses eaux touchent le Blanc, traversent le Rouge, effleurent le Vert, caressent le Bleu.',
      gardiens: ['Chronistes', 'Maîtres du Battement', 'Navigateurs'],
      rites: [
        { name: 'L\'Immersion', desc: 'Entrer dans le fleuve, ressentir chaque dimension' },
        { name: 'La Synchronisation', desc: 'Aligner les rythmes pour le tempo vectoriel' },
        { name: 'Le Passage', desc: 'Laisser une trace dans le continuum' }
      ],
      tempo: { name: 'Tempo-Flot', desc: 'Profond, fluide, capable de transporter la conscience' },
      serment: [
        'Je respecte le flux.',
        'Je laisse mes pas suivre le courant.',
        'Le passé, le présent et le futur se rejoignent en moi.',
        'Je deviens vecteur du temps.',
        'Coupé-Décalé est éternel.'
      ]
    },
    10: {
      intro: [
        'Le Violet est la spiritualité absolue.',
        'La synthèse de toutes les dimensions.',
        'L\'espace où les pionniers guident les vivants.'
      ],
      description: 'La Forêt Violette est immense : arbres géants aux feuilles scintillant de rythmions, clairières où la lumière vibre comme des cordes de guitare, ruisseaux qui transportent les fréquences des ancêtres.',
      gardiens: ['Anciens Vivants', 'Guides Sacrés', 'Protecteurs du Continuum'],
      rites: [
        { name: 'Éveil des Ondes', desc: 'Ressentir chaque fréquence ancestrale' },
        { name: 'Communion des Fréquences', desc: 'Synchroniser son tempo avec les ancêtres' },
        { name: 'Offrande de la Création', desc: 'Déposer sa création pour bénédiction' }
      ],
      tempo: { name: 'Tempo-Multidimensionnel', desc: 'Relie le temps à toutes les dimensions' },
      serment: [
        'Je ressens les ancêtres.',
        'Je deviens vecteur de leur fréquence.',
        'Mon rythme est sacré. Ma création est bénie.',
        'Violet m\'inspire. Toutes les couleurs me guident.',
        'Coupé-Décalé est éternel.'
      ]
    },
    11: {
      intro: [
        'Le Pourpre est l\'apothéose.',
        'La fusion de toutes les dimensions.',
        'La célébration universelle du Coupé-Décalé.'
      ],
      description: 'Un immense cercle cosmique illuminé par des faisceaux pourpres et des rythmions scintillants, des estrades flottantes, des clairières suspendues, des ponts de lumière.',
      gardiens: ['Porteurs du Tempo Éternel', 'Harmonistes Sacrés', 'Architectes de la Célébration'],
      rites: [
        { name: 'Ouverture Cosmique', desc: 'Avancer depuis le Blanc jusqu\'au Violet' },
        { name: 'Danse des Dimensions', desc: 'Chaque couleur se manifeste' },
        { name: 'Éclat du Coupé-Décalé', desc: 'Le point culminant, vortex de lumière et son' }
      ],
      tempo: { name: 'Tempo Universel', desc: 'Infini, contient toutes les variations' },
      serment: [
        'Je fusionne avec toutes les dimensions.',
        'Je deviens rythme, lumière et vecteur.',
        'Blanc, Rouge, Vert, Bleu, Noir, Violet : je vous honore.',
        'Mon corps, ma voix et ma création sont le pont entre les mondes.',
        'Coupé-Décalé est éternel.'
      ]
    }
  };

  return (
    <AnimatedSection className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Chapter header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <chapter.icon className={`w-16 h-16 ${chapter.color}`} />
          </motion.div>
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2">{chapter.title}</p>
          <h2 className={`text-3xl sm:text-4xl font-bold ${chapter.color}`}>
            {chapter.emoji} {chapter.subtitle}
          </h2>
        </motion.div>

        {/* Chapter content */}
        <motion.div variants={fadeInUp}>
          {chapterId === 0 && <PrologueContent />}
          {chapterId === 1 && <Chapter1Content />}
          {chapterId === 2 && <Chapter2Content />}
          {chapterId === 3 && <Chapter3Content />}
          {chapterId === 4 && <Chapter4Content />}
          {chapterId >= 5 && chapterId <= 11 && (
            <DimensionChapter 
              chapter={chapter} 
              content={dimensionContents[chapterId]} 
            />
          )}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function MethodeBook() {
  const [view, setView] = useState<'cover' | 'toc' | 'chapter'>('cover');
  const [currentChapter, setCurrentChapter] = useState(0);
  const { scrollYProgress } = useScroll();

  const handleStart = () => {
    setView('toc');
  };

  const handleSelectChapter = (id: number) => {
    setCurrentChapter(id);
    setView('chapter');
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter(c => c - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(c => c + 1);
    }
  };

  const handleTOC = () => {
    setView('toc');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-x-hidden">
      {/* Background */}
      <BookParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'cover' && (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CoverPage onStart={handleStart} />
            </motion.div>
          )}

          {view === 'toc' && (
            <motion.div
              key="toc"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <TableOfContents onSelectChapter={handleSelectChapter} />
            </motion.div>
          )}

          {view === 'chapter' && (
            <motion.div
              key={`chapter-${currentChapter}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <ChapterContent chapterId={currentChapter} />
              <ChapterNav 
                currentChapter={currentChapter}
                onPrev={handlePrev}
                onNext={handleNext}
                onTOC={handleTOC}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - only on cover */}
        {view === 'cover' && (
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-16 text-center"
          >
            <p className="text-purple-300/60 text-sm">
              📚 OFFOLAND — TOME 1 — LES 7 COULEURS — Chroniques Fondatrices 📚
            </p>
          </motion.footer>
        )}
      </div>
    </div>
  );
}

export default memo(MethodeBook);
