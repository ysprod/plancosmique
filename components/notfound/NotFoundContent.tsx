'use client';
import { motion } from 'framer-motion';
import CacheLink from '@/components/commons/CacheLink';
import { Home } from 'lucide-react';
import IconGroup from './IconGroup';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.6
    }
  }
};

export default function NotFoundContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center z-10 max-w-2xl"
    >
      <IconGroup />
      <motion.h1
        className="text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-2xl mb-3 sm:mb-4 tracking-tight"
        animate={{
          textShadow: [
            '0 0 20px rgba(168, 85, 247, 0.4)',
            '0 0 40px rgba(236, 72, 153, 0.6)',
            '0 0 20px rgba(168, 85, 247, 0.4)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-200 mb-2 px-4"
      >
        Oups ! Étoile perdue...
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm sm:text-base md:text-lg text-indigo-100 mb-6 sm:mb-8 leading-relaxed px-4"
      >
        La page que tu cherches s'est égarée dans la galaxie.
        <br className="hidden sm:block" />
        <span className="block sm:inline"> Mais l'univers de </span>
        <span className="font-semibold text-purple-300">Mon Etoile</span>
        <span className="block sm:inline"> regorge de merveilles !</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
      >
        <CacheLink
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl hover:scale-105 hover:from-pink-600 hover:to-purple-500 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Revenir à l'accueil</span>
        </CacheLink>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sm:mt-8 text-xs sm:text-sm text-indigo-300/70 italic px-4"
      >
        "Chaque détour est une nouvelle constellation à découvrir ✨"
      </motion.p>
    </motion.div>
  );
}