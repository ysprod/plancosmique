'use client';
import { memo, useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Sun,
  Sparkles,
  Star,
  Cloud,
  Heart,
  Infinity as InfinityIcon,
  MessageCircle,
  User,
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

// Floating light particles
function FloatingLights() {
  const lights = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lights.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(250, 204, 21, 0.7)'
            }, transparent)`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 1, 0.3],
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

// Divine background with celestial tones
function DivineBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Heavenly golden light */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-300/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Pure white divine ray */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-[600px] bg-white/10 blur-3xl"
        animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Soft blue celestial */}
      <motion.div
        className="absolute top-1/3 -left-20 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Warm divine presence */}
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* Cloud-like mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white/5 to-transparent"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// Hero section
function HeroSection() {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-5xl mx-auto">
        {/* Celestial symbols */}
        <motion.div
          className="absolute top-20 left-10 text-yellow-400/50"
          animate={{ y: [0, -20, 0], rotate: [0, 360], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Sun className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-white/50"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Cloud className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-sky-300/50"
          animate={{ y: [0, -25, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <Star className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>

        {/* Main title */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.span 
            className="inline-block text-sm sm:text-base uppercase tracking-[0.3em] text-yellow-300/80 font-medium mb-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Dialogue Céleste ✦
          </motion.span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-sky-200 leading-tight mb-6"
        >
          AVEC DIEU
        </motion.h1>

        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-10"
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 255, 255, 0.3)',
              '0 0 40px rgba(250, 204, 21, 0.5)',
              '0 0 20px rgba(255, 255, 255, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Une conversation entre Ciel et Terre
        </motion.h2>

        {/* Decorative line */}
        <motion.div 
          variants={scaleIn}
          className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
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

// Hero image section
function HeroImageSection() {
  const ref = useRef(null);

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Main image container */}
        <motion.div 
          variants={scaleIn}
          className="relative flex justify-center items-center"
        >
          {/* Divine light rays */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-64 sm:h-80 bg-gradient-to-b from-yellow-300/30 to-transparent origin-bottom"
              style={{
                rotate: `${i * 30}deg`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scaleY: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Pulsing divine aura */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.1)',
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

          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Divine glow */}
            <motion.div
              className="absolute inset-0 -m-12 rounded-full bg-gradient-to-br from-yellow-300/40 via-white/30 to-sky-300/40 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image container */}
            <div className="relative group">
              {/* Animated halo border */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-300 via-white via-sky-300 to-yellow-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-200 via-white to-sky-200 opacity-75" />

              {/* Image */}
              <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-slate-900">
                <Image
                  src="/avecdieu.jpg"
                  alt="Dialogue avec Dieu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 420px"
                  priority
                />

                {/* Overlay shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating symbols */}
          <motion.div
            className="absolute -top-10 -left-10 text-yellow-400/60"
            animate={{ y: [0, -15, 0], rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <InfinityIcon className="w-10 h-10 sm:w-14 sm:h-14" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-10 -right-10 text-sky-300/60"
            animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            <Heart className="w-12 h-12 sm:w-16 sm:h-16" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Dialogue message component
interface DialogueMessageProps {
  speaker: 'fils' | 'dieu';
  message: string;
  delay?: number;
}

function DialogueMessage({ speaker, message, delay = 0 }: DialogueMessageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const isFils = speaker === 'fils';
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isFils ? -50 : 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: 'easeOut' }}
      className={`flex items-start gap-3 sm:gap-4 ${isFils ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <motion.div 
        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
          isFils 
            ? 'bg-gradient-to-br from-sky-500 to-blue-600' 
            : 'bg-gradient-to-br from-yellow-400 to-amber-500'
        } shadow-lg`}
        whileHover={{ scale: 1.1 }}
      >
        {isFils ? (
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </motion.div>

      {/* Message bubble */}
      <motion.div 
        className={`relative max-w-[75%] sm:max-w-[70%] p-4 sm:p-5 rounded-2xl ${
          isFils 
            ? 'bg-sky-900/40 border border-sky-500/30 rounded-tl-none' 
            : 'bg-amber-900/40 border border-amber-500/30 rounded-tr-none'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {/* Speaker label */}
        <span className={`text-xs font-medium uppercase tracking-wider ${
          isFils ? 'text-sky-400' : 'text-amber-400'
        }`}>
          {isFils ? 'Le Fils' : 'PAPA Éternel'}
        </span>
        
        {/* Message */}
        <p className={`mt-2 text-base sm:text-lg leading-relaxed ${
          isFils ? 'text-sky-100' : 'text-amber-100'
        }`}>
          {message}
        </p>

        {/* Message icon */}
        <MessageCircle className={`absolute -bottom-1 ${
          isFils ? '-left-1' : '-right-1'
        } w-4 h-4 ${
          isFils ? 'text-sky-500/50' : 'text-amber-500/50'
        }`} />
      </motion.div>
    </motion.div>
  );
}

// Dialogue section
function DialogueSection() {
  const dialogue = [
    { speaker: 'fils' as const, message: "Bonjour PAPA éternel Mon dieu Tous mes respects" },
    { speaker: 'dieu' as const, message: "Oui fils je t'écoute" },
    { speaker: 'fils' as const, message: "Je peux te poser une question ?" },
    { speaker: 'fils' as const, message: "Qu'est-ce que tu penses de ceux qui ne croient pas en Dieu ?" },
    { speaker: 'dieu' as const, message: "C'est parce que croire c'est courir le risque de douter et comme ils n'ont pas d'assurance tous risques ils préfèrent ne pas prendre de risque. C'est simple." },
    { speaker: 'fils' as const, message: "Que représente un million d'années pour toi ?" },
    { speaker: 'dieu' as const, message: "Une seconde" },
    { speaker: 'fils' as const, message: "Que signifie un milliard d'euros alors ?" },
    { speaker: 'dieu' as const, message: "1 cent" },
    { speaker: 'fils' as const, message: "Ah ok est-ce que je peux avoir un cent ?" },
    { speaker: 'dieu' as const, message: "Attends une seconde" },
    { speaker: 'fils' as const, message: "Ah..." },
    { speaker: 'dieu' as const, message: "Ça fait quand même un milliard de nanosecondes ça te laisse le temps de faire beaucoup d'autres choses pas vrai ?" },
    { speaker: 'fils' as const, message: "Si et si je meurs avant ?" },
    { speaker: 'dieu' as const, message: "Ah non là je t'arrête tout de suite. Tu n'as aucune idée de ce que vaut une vie. Je ne peux la détruire. C'est quasi impossible. Je ne peux pas m'autodétruire." },
    { speaker: 'fils' as const, message: "Je ne comprends pas" },
    { speaker: 'dieu' as const, message: "Quand nous avons créé l'homme, nous avons créé le meilleur modèle économique de tous les temps. Nous avons dit « Créons l'homme à notre image » À la comptabilité, on gère bien les amortissements dès qu'un corps vieillit il est déjà amorti on trouve un autre corps pour celui qui revient. J'ai dit amorti je n'ai pas dit mort." },
    { speaker: 'fils' as const, message: "Ah ça alors la vie est un business quoi ?" },
    { speaker: 'dieu' as const, message: "Attends qu'est-ce que tu crois ? quand on te donne de l'oxygène tu rejettes du gaz carbonique. On te donne la nourriture tu nous sers la m… en tout cas ça pue. Et qui va payer la facture de tout ça ?" },
    { speaker: 'fils' as const, message: "Ça alors !! quelle histoire ?" },
    { speaker: 'dieu' as const, message: "La fabrication d'une vie dépasse de loin plusieurs milliers de milliards d'euros. La vie coûte cher et nous devons faire du bénéfice. Il faut un bon retour sur investissement non ?" },
    { speaker: 'fils' as const, message: "Eh Dieu et si les hommes refusent de faire des enfants votre business va-t-il s'écrouler ?" },
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            className="inline-block p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-sky-500/20 mb-6"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <MessageCircle className="w-8 h-8 text-yellow-300" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Le Dialogue
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Une conversation qui transcende les dimensions
          </p>
        </motion.div>

        {/* Dialogue messages */}
        <div className="space-y-6 sm:space-y-8">
          {dialogue.map((item, index) => (
            <DialogueMessage
              key={index}
              speaker={item.speaker}
              message={item.message}
              delay={index}
            />
          ))}
        </div>

        {/* To be continued */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
            animate={{ 
              borderColor: ['rgba(255,255,255,0.1)', 'rgba(250,204,21,0.3)', 'rgba(255,255,255,0.1)'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <span className="text-white/70 text-sm sm:text-base italic">
              La conversation continue...
            </span>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Wisdom section
function WisdomSection() {
  const wisdoms = [
    {
      icon: Zap,
      title: "Le Temps Divin",
      text: "Un million d'années = une seconde",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: InfinityIcon,
      title: "La Valeur Divine",
      text: "Un milliard d'euros = 1 cent",
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "La Vie Éternelle",
      text: "Amorti ne veut pas dire mort",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <AnimatedSection className="relative py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Les Sagesses Révélées
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {wisdoms.map((wisdom, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <motion.div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${wisdom.color} mb-4`}
                whileHover={{ rotate: 10 }}
              >
                <wisdom.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">{wisdom.title}</h3>
              <p className="text-white/70">{wisdom.text}</p>
            </motion.div>
          ))}
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
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-yellow-900/30 to-sky-900/30 border border-yellow-400/20 text-center overflow-hidden"
        >
          {/* Divine glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                'inset 0 0 40px rgba(250, 204, 21, 0.1)',
                'inset 0 0 80px rgba(255, 255, 255, 0.15)',
                'inset 0 0 40px rgba(250, 204, 21, 0.1)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div variants={fadeInUp} className="relative z-10">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
              transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            >
              <Sun className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" />
            </motion.div>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-sky-200 leading-relaxed"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              style={{ backgroundSize: '200% 200%' }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              "La vie est le plus grand investissement de l'univers.<br />
              Chaque souffle est un dividende du divin."
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-4 right-4 text-yellow-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-sky-400/30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Main component
function AvecDieu() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950 text-white overflow-x-hidden">
      {/* Fixed backgrounds */}
      <DivineBackground />
      <FloatingLights />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-white to-sky-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <HeroImageSection />
        <DialogueSection />
        <WisdomSection />
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
              rotate: [0, 360]
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
            }}
            className="inline-block mb-6"
          >
            <InfinityIcon className="w-12 h-12 text-yellow-400/60" />
          </motion.div>
          <p className="text-white/40 text-sm">
            ✦ Avec Dieu — Dialogue Céleste ✦
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default memo(AvecDieu);
