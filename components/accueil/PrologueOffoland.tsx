'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Music, 
  Clock, 
  Heart, 
  Star, 
  Sparkles, 
  Infinity as InfinityIcon, 
  Moon,
  Sun,
  Zap,
  Layers,
  Users,
  BookOpen
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

// Floating particles background
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-400/40 to-pink-400/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
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

// Background cosmic orbs
function CosmicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 - White/Pure */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Orb 2 - Red/Creation */}
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 bg-red-500/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          x: [0, -30, 0],
          opacity: [0.1, 0.25, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Orb 3 - Green/Memory */}
      <motion.div
        className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.25, 1],
          y: [0, 40, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Orb 4 - Blue/Sacred */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.25, 0.1] 
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Orb 5 - Black/Time (dark gradient) */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-slate-900/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.2, 0.35, 0.2] 
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      
      {/* Orb 6 - Violet/Ancestral */}
      <motion.div
        className="absolute top-3/4 right-10 w-56 h-56 bg-violet-500/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          y: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      
      {/* Orb 7 - Purple/Fusion */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          rotate: [0, 10, 0],
          opacity: [0.05, 0.15, 0.05] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Hero image section - Stunning visual with enfant.jpg
function HeroImageSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-amber-300/80 font-medium mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ L'Enfant du Rythme ✦
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90">
            Gardien de l'éternité
          </h2>
        </motion.div>

        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent, rgba(236, 72, 153, 0.3), transparent, rgba(251, 191, 36, 0.3), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Second rotating ring (opposite direction) */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] rounded-full border-2 border-dashed border-purple-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Glowing pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                border: '1px solid rgba(168, 85, 247, 0.2)',
              }}
              animate={{
                scale: [1, 1.3, 1.5],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Floating orbs around image */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 200;
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#FBBF24'][i]}, transparent)`,
                  boxShadow: `0 0 20px ${['#9333EA', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#FBBF24'][i]}80`,
                }}
                animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle) * radius],
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            );
          })}

          {/* Main image with parallax */}
          <motion.div
            style={{ y, scale, rotate }}
            className="relative z-10"
          >
            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-amber-500/40 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container with animated border */}
            <div className="relative group">
              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 via-amber-500 to-purple-600 blur-sm"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner border */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-amber-400 opacity-75" />

              {/* Image */}
              <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-slate-900">
                <Image
                  src="/enfant.jpg"
                  alt="L'enfant du Coupé-Décalé - Gardien de l'éternité"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, 420px"
                  priority
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Musical note decorations */}
          <motion.div
            className="absolute -top-10 -left-10 text-purple-400/60"
            animate={{ y: [0, -15, 0], rotate: [-10, 10, -10], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Music className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-10 -right-10 text-pink-400/60"
            animate={{ y: [0, 15, 0], rotate: [10, -10, 10], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Star className="w-10 h-10 sm:w-14 sm:h-14" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-20 text-amber-400/60"
            animate={{ x: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </motion.div>

        {/* Caption */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 font-medium leading-relaxed"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            "Dans les yeux de l'enfant se reflète<br />l'éternité du Coupé-Décalé"
          </motion.p>
          <motion.p 
            className="text-sm sm:text-base text-purple-300/60 mt-4 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            — La transmission sacrée entre générations —
          </motion.p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
    </AnimatedSection>
  );
}

// Hero section header
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Musical notes floating */}
        <motion.div
          className="absolute top-20 left-10 text-purple-400/50"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Music className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-pink-400/50"
          animate={{ 
            y: [0, 15, 0], 
            rotate: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Star className="w-6 h-6 sm:w-10 sm:h-10" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-indigo-400/50"
          animate={{ 
            y: [0, -25, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Sparkles className="w-7 h-7 sm:w-11 sm:h-11" />
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-purple-300/80 font-medium mb-4"
            animate={{ 
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Offolomou ✦
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 leading-tight mb-6"
        >
          PROLOGUE RÉFLÉCHI
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-10"
          animate={{
            textShadow: [
              '0 0 20px rgba(168, 85, 247, 0.3)',
              '0 0 40px rgba(236, 72, 153, 0.5)',
              '0 0 20px rgba(168, 85, 247, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Comment rendre le Coupé-Décalé éternel ?
        </motion.h2>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// Intro section - The fleeting nature
function IntroSection() {
  const ephemeralItems = [
    { text: 'une danse dans la nuit', icon: Moon },
    { text: 'une note de guitare suspendue', icon: Music },
    { text: 'un cri de la jeunesse', icon: Users },
    { text: 'une lumière qui disparaît au matin', icon: Sun }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-purple-100/90 leading-relaxed font-light">
            Avant <span className="font-bold text-amber-300">Offoland</span>, le Coupé-Décalé était une énergie fugace :
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16"
        >
          {ephemeralItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group flex items-center gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500"
            >
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-500"
                whileHover={{ rotate: 10 }}
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
              </motion.div>
              <span className="text-base sm:text-lg text-white/80 font-light italic">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="text-center space-y-6"
        >
          <p className="text-base sm:text-lg md:text-xl text-purple-200/80 leading-relaxed">
            Mais comme toutes les choses belles et vivantes, 
            <br className="hidden sm:block" />
            il était menacé par le <span className="font-semibold text-pink-300">temps</span> et l'<span className="font-semibold text-pink-300">oubli</span>.
          </p>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-amber-200 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Alors une question naît :
          </motion.p>
          
          <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Comment rendre le Coupé-Décalé éternel ?
          </motion.h3>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Chapter sections
interface ChapterProps {
  number: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  accentColor: string;
  icon: React.ElementType;
}

function ChapterSection({ number, title, subtitle, content, accentColor, icon: Icon }: ChapterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Chapter number and icon */}
        <motion.div 
          variants={scaleIn}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div 
            className={`p-4 rounded-2xl bg-gradient-to-br ${accentColor} shadow-2xl`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.2)',
                '0 0 40px rgba(168, 85, 247, 0.4)',
                '0 0 20px rgba(168, 85, 247, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <span className="text-sm sm:text-base uppercase tracking-[0.2em] text-purple-300/60 font-medium">
            {number}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-purple-200/80 font-light italic">
            {subtitle}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={fadeInUp}
          className="relative p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
        >
          {/* Decorative glow */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accentColor} opacity-5 blur-xl`} />
          
          <div className="relative z-10 text-base sm:text-lg text-purple-100/90 leading-relaxed space-y-4">
            {content}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Dimensions table section
function DimensionsTable() {
  const dimensions = [
    { color: 'Blanc', function: 'Racines et fondation', bg: 'from-gray-100 to-white', text: 'text-gray-800' },
    { color: 'Rouge', function: 'Création et audace', bg: 'from-red-500 to-red-600', text: 'text-white' },
    { color: 'Vert', function: 'Mémoire et transmission', bg: 'from-emerald-500 to-emerald-600', text: 'text-white' },
    { color: 'Bleu', function: 'Sacré et bénédiction', bg: 'from-blue-500 to-blue-600', text: 'text-white' },
    { color: 'Noir', function: 'Temps et continuité', bg: 'from-slate-800 to-slate-900', text: 'text-white' },
    { color: 'Violet', function: 'Guidance ancestrale', bg: 'from-violet-500 to-violet-600', text: 'text-white' },
    { color: 'Pourpre', function: 'Célébration et fusion', bg: 'from-purple-600 to-purple-800', text: 'text-white' }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-32 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm sm:text-base uppercase tracking-[0.2em] text-purple-300/60 font-medium">
            IV
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            LA SYNTHÈSE DES DIMENSIONS
          </h2>
          <p className="text-lg sm:text-xl text-purple-200/80 font-light">
            Chaque couleur représente un pilier de l'éternité du Coupé-Décalé
          </p>
        </motion.div>

        {/* Dimensions grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
        >
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.color}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${dim.bg} p-6 shadow-xl cursor-pointer group`}
              style={{ 
                transitionDelay: `${index * 50}ms` 
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut'
                }}
              />
              
              <div className="relative z-10">
                <h3 className={`text-xl sm:text-2xl font-bold ${dim.text} mb-2`}>
                  {dim.color}
                </h3>
                <p className={`text-sm sm:text-base ${dim.text} opacity-90`}>
                  {dim.function}
                </p>
              </div>
              
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Summary text */}
        <motion.div 
          variants={fadeInUp}
          className="text-center p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <p className="text-base sm:text-lg md:text-xl text-purple-100/90 leading-relaxed">
            L'éternité naît de l'<span className="font-bold text-amber-300">interaction de ces dimensions</span>, 
            où chaque mouvement, chaque note et chaque pas devient un{' '}
            <span className="font-bold text-pink-300">vecteur universel</span>, 
            immortalisé dans <span className="font-bold text-purple-300">Offoland</span>.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Conclusion section
function ConclusionSection() {
  const conditions = [
    'Il est créé avec audace',
    'Il est transmis avec fidélité',
    'Il est bénit et respecté',
    'Il est intégré au temps et aux ancêtres',
    'Il est célébré de façon infinie'
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <motion.div 
            className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 3, repeat: Infinity }
            }}
          >
            <InfinityIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm sm:text-base uppercase tracking-[0.2em] text-purple-300/60 font-medium">
            V
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            LA CONCLUSION RÉFLÉCHIE
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 mb-10"
        >
          <p className="text-base sm:text-lg md:text-xl text-purple-100/90 leading-relaxed mb-8 text-center">
            Le Coupé-Décalé ne peut devenir <span className="font-bold text-amber-300">éternel</span> que si :
          </p>

          <motion.ul variants={staggerContainer} className="space-y-4">
            {conditions.map((condition, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                <motion.span 
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {index + 1}
                </motion.span>
                <span className="text-base sm:text-lg text-white/90">
                  {condition}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Final statement */}
        <motion.div 
          variants={scaleIn}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-400/20 text-center overflow-hidden"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                'inset 0 0 30px rgba(168, 85, 247, 0.1)',
                'inset 0 0 60px rgba(236, 72, 153, 0.2)',
                'inset 0 0 30px rgba(168, 85, 247, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.p 
            className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 leading-relaxed"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Ainsi, <span className="text-amber-300">Offoland</span> n'est pas seulement un univers :
            <br />
            c'est une <span className="text-pink-300">stratégie cosmique</span> pour l'éternité du Coupé-Décalé.
          </motion.p>
          
          {/* Sparkles */}
          <motion.div
            className="absolute top-4 right-4 text-amber-400/40"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 10, repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-purple-400/40"
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ rotate: { duration: 12, repeat: Infinity }, scale: { duration: 3, repeat: Infinity } }}
          >
            <Star className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Main component
function PrologueOffoland() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <CosmicBackground />
      <FloatingParticles />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        
        <HeroImageSection />
        
        <IntroSection />

        {/* Chapter I */}
        <ChapterSection
          number="I"
          title="LE RYTHME COMME MÉMOIRE"
          subtitle="Rendre le Coupé-Décalé éternel, c'est d'abord comprendre que le rythme est mémoire."
          accentColor="from-emerald-500 to-emerald-600"
          icon={BookOpen}
          content={
            <>
              <p>
                Chaque pas de danse contient <span className="font-semibold text-emerald-300">l'histoire de ceux qui l'ont inventé</span>.
              </p>
              <p>
                Chaque note de guitare porte <span className="font-semibold text-emerald-300">la trace de son interprète</span>.
              </p>
              <p>
                Chaque beat, chaque tempo, chaque oscillation est une onde qui <span className="font-semibold text-emerald-300">traverse le temps</span>.
              </p>
              <p className="pt-4 border-t border-white/10 mt-4 font-medium text-purple-200">
                Pour que le rythme survive, il faut l'ancrer dans la mémoire, la partager et la transmettre.
              </p>
            </>
          }
        />

        {/* Chapter II */}
        <ChapterSection
          number="II"
          title="LE RYTHME COMME VECTEUR DE VIE"
          subtitle="Rendre le Coupé-Décalé éternel, c'est le faire vivre constamment."
          accentColor="from-red-500 to-red-600"
          icon={Zap}
          content={
            <>
              <p>Une musique <span className="text-red-300 font-semibold">immobile</span> devient poussière.</p>
              <p>Une danse <span className="text-red-300 font-semibold">figée</span> devient souvenir.</p>
              <p>Le rythme doit être <span className="text-red-300 font-semibold">ressenti, recréé, réinventé</span> par chaque génération.</p>
              <p className="pt-4 border-t border-white/10 mt-4">
                C'est ici que le <span className="font-bold text-red-400">Rouge</span> intervient : 
                la création permanente, l'audace et le mouvement font que le Coupé-Décalé ne s'éteindra jamais.
              </p>
            </>
          }
        />

        {/* Chapter III */}
        <ChapterSection
          number="III"
          title="LE RYTHME COMME LIEN COSMIQUE"
          subtitle="Rendre le Coupé-Décalé éternel, c'est l'inscrire dans un continuum universel."
          accentColor="from-violet-500 to-indigo-600"
          icon={Layers}
          content={
            <>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-400" />
                  <span>Les ancêtres observent et bénissent les créations (<span className="text-blue-300 font-semibold">Bleu</span> et <span className="text-violet-300 font-semibold">Violet</span>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-slate-400" />
                  <span>Le temps est modulé pour que chaque note soit conservée (<span className="text-slate-300 font-semibold">Noir</span>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                  <span>La mémoire est archivée et vivante (<span className="text-emerald-300 font-semibold">Vert</span>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-200" />
                  <span>La racine est respectée (<span className="text-gray-200 font-semibold">Blanc</span>)</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-white/10 mt-4">
                Ainsi, le Coupé-Décalé n'est pas seulement une danse ou une musique, mais une{' '}
                <span className="font-bold text-purple-300">énergie cosmique</span>, une force vivante qui traverse les générations et les dimensions.
              </p>
            </>
          }
        />

        <DimensionsTable />

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
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Music className="w-12 h-12 text-purple-400/60" />
          </motion.div>
          <p className="text-purple-300/60 text-sm">
            ✦ Offoland — L'éternité du Coupé-Décalé ✦
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(PrologueOffoland);
