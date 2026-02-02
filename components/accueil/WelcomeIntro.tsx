'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Star, Compass, ArrowRight } from 'lucide-react';

function WelcomeIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="backdrop-blur-xl bg-gradient-to-br from-purple-100/80 via-indigo-100/80 to-pink-100/80 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-pink-900/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200/50 dark:border-purple-700/50 shadow-2xl relative overflow-hidden"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-2 right-2 sm:top-3 sm:right-3"
      >
        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 dark:text-purple-300" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -10, 10, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3"
      >
        <Star className="w-7 h-7 sm:w-10 sm:h-10 text-indigo-400 dark:text-indigo-300" />
      </motion.div>

      <div className="relative z-10 text-center space-y-2.5 sm:space-y-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm text-gray-800 dark:text-slate-200 leading-relaxed"
        >
          Basée sur les connaissances initiatiques africaines et éclairée par la lecture des astres,
          notre guidance vous aide à mieux vous connaître, comprendre votre mission de vie, révéler
          vos talents, harmoniser vos relations, et avancer avec clarté sur votre chemin spirituel.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-gray-800 dark:text-slate-200 leading-relaxed"
        >
          Parce qu'il existe un plan cosmique qui organise votre vie, votre thème astral devient ici
          une boussole sacrée, une mémoire profonde et une lumière qui vous éclaire, inspire vos choix
          et guide vos décisions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-sm sm:text-lg font-black bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 dark:from-purple-300 dark:via-indigo-300 dark:to-pink-300 bg-clip-text text-transparent leading-tight pt-1"
        >
          Votre naissance a un but.<br />Découvrez ce que votre âme est venue accomplir.
        </motion.p>

        <Link href="/star/profil" className="block">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <span>DEMANDER UNE CONSULTATION</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default memo(WelcomeIntro);
