'use client';
import TarotComingSoon from '@/components/tarot/TarotComingSoon';
import TarotHeader from '@/components/tarot/TarotHeader';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

        <TarotHeader />
        <TarotComingSoon />
      </div>
    </div>
  );
}