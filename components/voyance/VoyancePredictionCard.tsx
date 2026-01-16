'use client';

import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';
import { categories } from './voyanceData';

interface Props {
  prediction: string;
  selectedCategory: string | null;
  name: string;
}

const VoyancePredictionCard = ({ prediction, selectedCategory, name }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-400/50 shadow-2xl relative overflow-hidden"
  >
    {/* Animated glow */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-8 h-8 text-purple-400" />
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Votre Prédiction Cosmique
        </h3>
      </div>
      <p className="text-xl leading-relaxed text-purple-100 font-medium mb-6">
        {prediction}
      </p>
      <div className="flex items-center gap-2 text-purple-300 text-sm">
        <Sparkles className="w-4 h-4" />
        <span>Guidance cosmique pour {categories.find(c => c.id === selectedCategory)?.label}</span>
      </div>
    </div>
  </motion.div>
);

export default VoyancePredictionCard;
