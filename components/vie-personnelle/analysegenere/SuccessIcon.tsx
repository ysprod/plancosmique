import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

const SuccessIcon = memo(() => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: "spring",
      stiffness: 280,
      damping: 22
    }}
    className="relative mx-auto mb-6 sm:mb-8"
    role="img"
    aria-label="Succès - Votre consultation a été enregistrée"
  >
    {/* Glow effect */}
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.6, 0.4]
      }}
      transition={{ 
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 -translate-x-2 sm:-translate-x-3 -translate-y-2 sm:-translate-y-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-2xl"
    />
    
    {/* Main icon */}
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/50 ring-4 ring-white/30 dark:ring-slate-900/30">
      <CheckCircle2 className="w-11 h-11 sm:w-13 sm:h-13 text-white drop-shadow-2xl" strokeWidth={2.8} />
    </div>
    
    {/* Sparkle badge */}
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ 
        scale: 1, 
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        scale: {
          type: "spring",
          stiffness: 320,
          damping: 18,
          delay: 0.3
        },
        rotate: {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }
      }}
      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/50 ring-2 ring-yellow-200 dark:ring-yellow-600"
    >
      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-900" strokeWidth={2.8} />
    </motion.div>
  </motion.div>
));

SuccessIcon.displayName = 'SuccessIcon';

export default SuccessIcon;
