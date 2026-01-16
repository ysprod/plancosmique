'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { categories } from './voyanceData';

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
}

const VoyanceCategorySelector = ({ selectedCategory, setSelectedCategory }: Props) => (
  <div className="mb-8">
    <label className="block text-lg font-bold text-purple-200 mb-4">
      <Star className="inline w-5 h-5 mr-2" />
      Choisissez votre domaine de prédiction
    </label>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat: { id: string; label: string; color: string; icon: any }) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(cat.id)}
          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedCategory === cat.id
            ? 'border-purple-400 bg-purple-500/20'
            : 'border-purple-500/30 bg-slate-700/30 hover:border-purple-400/60'
            }`}
        >
          <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
            <cat.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold text-white">{cat.label}</span>
        </motion.button>
      ))}
    </div>
  </div>
);

export default VoyanceCategorySelector;