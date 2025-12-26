'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Eye, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const QUESTIONS = [
  { q: "QUI SUIS-JE ?", icon: Eye },
  { q: "D'OÙ VIENS-JE ?", icon: Compass },
  { q: "OÙ VAIS-JE ?", icon: Star }
];

export default function WelcomePage() {
  return (
    <div className=" bg-white">
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
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-sm sm:text-base text-gray-700 mb-5 px-2 leading-relaxed"
        >
          Bienvenue dans ce temple virtuel, où chacun vient chercher une réponse aux trois grandes
          questions de l'existence :
        </motion.p>
  
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-6">
          {QUESTIONS.map((item, i) => (
            <Link key={item.q} href="/secured/profil" className="w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border-2 border-gray-200 hover:border-amber-300 
                           rounded-xl px-4 py-3 shadow-md hover:shadow-lg 
                           transition-all flex items-center justify-center gap-2 
                           sm:inline-flex cursor-pointer"
              >
                <item.icon className="w-4 h-4 text-black flex-shrink-0" />
                <span className="font-bold text-black text-sm">{item.q}</span>
              </motion.div>
            </Link>
          ))}
        </div>
 
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl 
                     p-5 sm:p-6 border-2 border-amber-100 shadow-lg 
                     relative overflow-hidden"
        >
          {/* Déco légère animée */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-2 right-2"
          >
            <Sparkles className="w-8 h-8 text-amber-200 opacity-20" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.05, 1]
            }}
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
              Votre naissance a un but.
              <br />
              Découvrez ce que votre âme est venue accomplir.
            </p>

            <Link href="/secured/profil" className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 
                           text-white px-5 py-3.5 rounded-xl font-bold text-sm 
                           shadow-lg hover:shadow-xl transition-all 
                           flex items-center justify-center gap-2"
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