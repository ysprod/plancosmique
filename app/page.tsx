'use client';
import { motion } from 'framer-motion';
import WelcomeHeader from '@/components/accueil/WelcomeHeader';
import WelcomeQuestions from '@/components/accueil/WelcomeQuestions';
import WelcomeIntro from '@/components/accueil/WelcomeIntro';

export default function WelcomePage() {

  return (
    <div className="bg-white">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 z-50 origin-left"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </motion.div>
      <WelcomeHeader />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-sm sm:text-base text-gray-700 mb-5 px-2 leading-relaxed"
        >
          Bienvenue dans ce temple, où chacun vient chercher une réponse aux trois grandes questions de l'existence :
        </motion.p>
        <WelcomeQuestions />
        <WelcomeIntro />
      </div>
    </div>
  );
}