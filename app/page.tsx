'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Eye, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import StatsCounter from '../components/StatsCounter';

const QUESTIONS = [
  { q: "QUI SUIS-JE ?", icon: Eye },
  { q: "D'OÙ VIENS-JE ?", icon: Compass },
  { q: "OÙ VAIS-JE ?", icon: Star }
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar mobile-optimized */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 z-50" />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Logo ultra-compact mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6"
        >
          <Image
            src="/logo.png"
            alt="Mon Étoile"
            width={80}
            height={80}
            className="mx-auto mb-2"
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-black text-black">MON ÉTOILE</h1>
        </motion.div>

        {/* Compteurs crédibilité */}
        <StatsCounter />

        {/* Intro ultra-compacte */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-sm sm:text-base text-gray-700 mb-5 px-2"
        >
          Bienvenue dans ce temple virtuel, où chacun vient chercher une réponse aux trois grandes
          questions de l’existence :
        </motion.p>

        {/* Questions en stack mobile, inline desktop */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-6">
          {QUESTIONS.map((item, i) => (
            <Link key={item.q} href="/protected/profil" className="w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 shadow-md active:shadow-lg transition-all flex items-center justify-center gap-2 sm:inline-flex"
              >
                <item.icon className="w-4 h-4 text-black flex-shrink-0" />
                <span className="font-bold text-black text-sm">{item.q}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bloc Mission ultra-compact mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-amber-100 shadow-lg relative overflow-hidden"
        >
          {/* Déco légère */}
          <Sparkles className="absolute top-2 right-2 w-8 h-8 text-amber-200 opacity-20" />
          <Star className="absolute bottom-2 left-2 w-10 h-10 text-orange-200 opacity-15" />

          <div className="relative z-10 text-center space-y-3">
            <p className="text-xs sm:text-sm text-gray-700 leading-snug">
              Basée sur les connaissances initiatiques africaines et éclairée par la lecture des astres, notre guidance vous aide à mieux vous connaître, comprendre votre mission de vie, révéler vos talents, harmoniser vos relations, et avancer avec clarté sur votre chemin spirituel.

              Parce qu'il existe un Plan Cosmique qui organise votre vie, votre thème astral devient ici une boussole sacrée, une mémoire profonde et une lumière qui vous éclaire, inspire vos choix et guide vos décisions.
            </p>



            <p className="text-base sm:text-lg font-black text-black leading-tight">
              Votre naissance a un but.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 font-semibold">
              Découvrez ce que votre âme est venue accomplir.
            </p>

            {/* CTA mobile-optimized */}
            <Link href="/protected/profil" className="block">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-lg active:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span className="text-xs sm:text-sm">DEMANDER UNE CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div> 
      </div>
    </div>
  );
}
