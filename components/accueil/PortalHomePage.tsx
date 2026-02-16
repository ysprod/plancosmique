'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Music, 
  Sparkles, 
  Star,
  ArrowRight,
  Compass,
  Globe,
  Heart,
  Flame,
  Sun,
  Crown,
  Lock,
  Sliders,
  Watch,
  Guitar,
  Cpu,
  Droplets
} from 'lucide-react';
import PortalCard from './PortalCard';

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

// Floating particles background
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
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

// Cosmic background orbs
function CosmicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// Hero section
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative min-h-[80vh] flex items-center justify-center px-4 py-20"
    >
      <div className="text-center max-w-5xl mx-auto">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 text-purple-400/50"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Star className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-pink-400/50"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Sparkles className="w-6 h-6 sm:w-10 sm:h-10" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-amber-400/50"
          animate={{ y: [0, -25, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Globe className="w-7 h-7 sm:w-11 sm:h-11" />
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm sm:text-base uppercase tracking-[0.2em] text-purple-300/80 font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Cpu className="w-4 h-4" />
            <span>Art • Musique • Innovation</span>
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 leading-tight mb-6"
        >
          OFFOLOMOU
        </motion.h1>

        <motion.p 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-6"
        >
          Portail Technologique et Artistique de Haut Niveau
        </motion.p>

        <motion.p 
          variants={fadeInUp}
          className="text-base sm:text-lg text-purple-200/70 max-w-2xl mx-auto mb-10"
        >
          Explorez l'intersection de l'art, de la musique et des technologies innovantes — 
          montres connectées, guitares du futur, et créations sonores révolutionnaires.
        </motion.p>

        {/* Tech icons */}
        <motion.div variants={fadeInUp} className="flex justify-center gap-6 mb-10">
          <motion.div
            className="p-3 rounded-full bg-purple-500/20 border border-purple-400/30"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Watch className="w-6 h-6 text-purple-300" />
          </motion.div>
          <motion.div
            className="p-3 rounded-full bg-pink-500/20 border border-pink-400/30"
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <Guitar className="w-6 h-6 text-pink-300" />
          </motion.div>
          <motion.div
            className="p-3 rounded-full bg-amber-500/20 border border-amber-400/30"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Sliders className="w-6 h-6 text-amber-300" />
          </motion.div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div 
          variants={scaleIn}
          className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
        />

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
      </div>
    </motion.section>
  );
}

// Portal cards section
function PortalsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Portal data - easily extensible for future additions
  const portals = [
    {
      id: 'offoland',
      title: 'Offoland',
      description: "Plongez dans l'univers mystique du Coupé-Décalé, où le rythme devient mémoire éternelle. Découvrez comment une énergie musicale peut transcender le temps à travers sept dimensions cosmiques.",
      imageSrc: '/enfant.jpg',
      imageAlt: "L'enfant du Coupé-Décalé - Gardien de l'éternité",
      href: '/star/offoland',
      icon: Music,
      accentColor: 'from-purple-600 to-pink-600'
    },
    {
      id: 'temple',
      title: 'Le Temple des Ancêtres',
      description: "Un sanctuaire sacré hors du temps, où la mémoire africaine respire encore. Les pionniers du Coupé-Décalé deviennent des esprits-guides, gardiens de la coutume et de la transmission.",
      imageSrc: '/temple.jpg',
      imageAlt: "Le Temple des Ancêtres - Sanctuaire de la Coutume",
      href: '/star/temple',
      icon: Flame,
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      id: 'avecdieu',
      title: 'Avec Dieu',
      description: "Un dialogue céleste entre Ciel et Terre. Découvrez une conversation philosophique et humoristique où les grandes questions de l'existence rencontrent la sagesse divine.",
      imageSrc: '/avecdieu.jpg',
      imageAlt: "Dialogue avec Dieu - Conversation Céleste",
      href: '/star/avecdieu',
      icon: Sun,
      accentColor: 'from-yellow-500 to-sky-500'
    },
    {
      id: 'reineoffola',
      title: 'Reine Offola',
      description: "Souveraine du Feu Originel, Gardienne du Premier Brasier et Protectrice du Temple des Ancêtres. Son flambeau n'est pas une arme : c'est une lumière de vérité.",
      imageSrc: '/reineoffola.jpg',
      imageAlt: "Reine Offola - Souveraine du Feu Originel",
      href: '/star/reineoffola',
      icon: Crown,
      accentColor: 'from-red-500 to-yellow-500'
    },
    {
      id: 'interdit',
      title: 'Le Lieu des Interdits',
      description: "Sanctuaire Caché d'Offoland. Une dimension verrouillée accessible uniquement après le Rituel des Ancêtres, où reposent les vérités cachées et le Cœur des Interdits.",
      imageSrc: '/interdit.jpg',
      imageAlt: "Le Lieu des Interdits - Sanctuaire Caché d'Offoland",
      href: '/star/interdit',
      icon: Lock,
      accentColor: 'from-red-700 to-black'
    },
    {
      id: 'accoustique',
      title: 'Réglage Accoustique',
      description: "Console de mixage niveau primaire. Maîtrisez les réglages de gain, fader et panoramique pour créer le mix parfait avec la science du son OFFOLOMOU.",
      imageSrc: '/accoustique.jpg',
      imageAlt: "Réglage Accoustique Primaire - Console de Mixage",
      href: '/star/accoustique',
      icon: Sliders,
      accentColor: 'from-cyan-500 to-purple-600'
    },
    {
      id: 'offomidji',
      title: 'Offomiji',
      description: "Déesse de l'Eau et des Astres, Souveraine des Océans Célestes et Gardienne des Courants Stellaires. L'eau porte la mémoire des étoiles.",
      imageSrc: '/offomidji.jpg',
      imageAlt: "Offomiji - Déesse de l'Eau et des Astres",
      href: '/star/offomidji',
      icon: Droplets,
      accentColor: 'from-cyan-400 to-blue-600'
    }
    // Future portals will be added here
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20 sm:py-32 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-amber-300/80 font-medium mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Explorez ✦
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nos Univers
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg max-w-2xl mx-auto">
            Chaque portail ouvre une porte vers une expérience unique, 
            fusionnant art, musique et technologies innovantes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portals.map((portal, index) => (
            <PortalCard
              key={portal.id}
              title={portal.title}
              description={portal.description}
              imageSrc={portal.imageSrc}
              imageAlt={portal.imageAlt}
              href={portal.href}
              icon={portal.icon}
              accentColor={portal.accentColor}
              delay={index}
            />
          ))}
        </div>

        {/* Coming soon indicator */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
            animate={{ 
              borderColor: ['rgba(255,255,255,0.1)', 'rgba(168,85,247,0.3)', 'rgba(255,255,255,0.1)'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-purple-200/70 text-sm sm:text-base">
              Plus d'univers à venir...
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Call to action section
function CTASection() {
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
        <motion.div 
          variants={scaleIn}
          className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-400/20 text-center overflow-hidden"
        >
          {/* Animated glow */}
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

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez l'Aventure
            </h2>
            
            <p className="text-purple-200/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Un voyage créatif vous attend. Explorez, découvrez et laissez-vous transporter 
              dans des dimensions où l'impossible devient réalité.
            </p>

            <Link 
              href="/star/offoland" 
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <span>Commencer l'exploration</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-4 right-4 text-amber-400/30"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 10, repeat: Infinity }, scale: { duration: 2, repeat: Infinity } }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-purple-400/30"
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
function PortalHomePage() {
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
        <PortalsSection />
        <CTASection />

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Globe className="w-12 h-12 text-purple-400/60" />
          </motion.div>
          <p className="text-purple-300/60 text-sm">
            ✦ OFFOLOMOU — Art • Musique • Technologies Innovantes ✦
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(PortalHomePage);
