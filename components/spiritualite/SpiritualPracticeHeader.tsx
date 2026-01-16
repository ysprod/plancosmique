'use client';

import { Flame, Sparkle, ArrowLeft, BookOpen, CircleDollarSign, Feather, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const iconMap: Record<string, React.ReactNode> = {
  'BookOpen': <BookOpen className="w-6 h-6" />,
  'Shield': <Shield className="w-6 h-6" />,
  'CircleDollarSign': <CircleDollarSign className="w-6 h-6" />,
  'Feather': <Feather className="w-6 h-6" />,
  'Sparkle': <Sparkle className="w-6 h-6" />,
  'Flame': <Flame className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  'bases': 'from-purple-600 to-indigo-600',
  'protection': 'from-blue-600 to-cyan-600',
  'abondance': 'from-yellow-600 to-amber-600',
  'ancetres': 'from-orange-600 to-red-600',
  'meditations': 'from-pink-600 to-rose-600',
};

interface Practice {
  title: string;
  description: string;
  iconName: string;
  slug: string;
}

export default function SpiritualPracticeHeader({ practice }: { practice: Practice }) {
  const router = useRouter();
  const icon = iconMap[practice.iconName] || <Flame className="w-8 h-8" />;
  const color = colorMap[practice.slug] || 'from-purple-900 to-indigo-900';
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden bg-gradient-to-r ${color} text-white py-16 px-6`}
    >
      <div className="absolute inset-0 opacity-20">
        <Flame className="absolute w-32 h-32 top-4 right-8 animate-pulse" />
        <Sparkle className="absolute w-24 h-24 bottom-8 left-12 animate-pulse" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold">{practice.title}</h1>
              <p className="text-xl text-white/80 mt-2">{practice.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
