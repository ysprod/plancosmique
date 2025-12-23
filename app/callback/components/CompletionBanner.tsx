'use client';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
 
export function CompletionBanner() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: [0, 1.2, 1],
        rotate: [180, 0, 360],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className="mb-4 sm:mb-6"
    >
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 relative overflow-hidden">
        {/* Gradient animé */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-3" />
          </motion.div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            🎊 Analyse Complétée !
          </h3>
          
          <p className="text-white/90 text-sm sm:text-base">
            Votre thème astral complet est prêt à être consulté
          </p>
        </div>
      </div>
    </motion.div>
  );
}