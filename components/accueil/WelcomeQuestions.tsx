'use client';
import { motion } from 'framer-motion';
import { Compass, Eye, Star } from 'lucide-react';
import Link from 'next/link';

const QUESTIONS = [
  { q: "QUI SUIS-JE ?", icon: Eye },
  { q: "D'OÙ VIENS-JE ?", icon: Compass },
  { q: "OÙ VAIS-JE ?", icon: Star }
];

export default function WelcomeQuestions() {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-6">
      {QUESTIONS.map((item, i) => (
        <Link key={item.q} href="/secured/profil" className="w-full sm:w-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white border-2 border-gray-200 hover:border-amber-300 rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 sm:inline-flex cursor-pointer"
          >
            <item.icon className="w-4 h-4 text-black flex-shrink-0" />
            <span className="font-bold text-black text-sm">{item.q}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}