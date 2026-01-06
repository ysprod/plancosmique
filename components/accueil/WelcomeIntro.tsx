import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Star, Compass, ArrowRight } from 'lucide-react';

export default function WelcomeIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-100 shadow-lg relative overflow-hidden"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-2 right-2"
      >
        <Sparkles className="w-8 h-8 text-amber-200 opacity-20" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-2 left-2"
      >
        <Star className="w-10 h-10 text-orange-200 opacity-15" />
      </motion.div>
      <div className="relative z-10 text-center space-y-3">
        <p className="text-xs sm:text-sm text-gray-700 leading-snug">
          Basée sur les connaissances initiatiques africaines et éclairée par la lecture des astres,
          notre guidance vous aide à mieux vous connaître, comprendre votre mission de vie, révéler
          vos talents, harmoniser vos relations, et avancer avec clarté sur votre chemin spirituel.
        </p>
        <p className="text-xs sm:text-sm text-gray-700 leading-snug">
          Parce qu'il existe un Plan Cosmique qui organise votre vie, votre thème astral devient ici
          une boussole sacrée, une mémoire profonde et une lumière qui vous éclaire, inspire vos choix
          et guide vos décisions.
        </p>
        <p className="text-base sm:text-lg font-black text-black leading-tight">
          Votre naissance a un but.<br />Découvrez ce que votre âme est venue accomplir.
        </p>
        <Link href="/secured/profil" className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span className="text-xs sm:text-sm">DEMANDER UNE CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}