'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowLeft, Sparkles } from 'lucide-react';

export default function TarotPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center gap-2 text-purple-300 hover:text-purple-100 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
              <Star className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 mb-4">
            Tarot Cosmique
          </h1>
          <p className="text-xl text-blue-200">
            Tirage des cartes guidé par l'univers
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/30 shadow-2xl text-blue-100"
        >
          <div className="flex items-center gap-2 text-blue-300 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Bientôt disponible</span>
          </div>
          <p>
            Cette section proposera un tirage interactif en 3 cartes
            avec interprétations cosmiques. Revenez très bientôt ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}