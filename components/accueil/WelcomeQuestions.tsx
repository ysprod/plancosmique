'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Compass, Eye, Star } from 'lucide-react';
import Link from 'next/link';

const QUESTIONS = [
  { q: "QUI SUIS-JE ?", icon: Eye, gradient: "from-purple-500 to-indigo-500" },
  { q: "D'OÙ VIENS-JE ?", icon: Compass, gradient: "from-indigo-500 to-blue-500" },
  { q: "OÙ VAIS-JE ?", icon: Star, gradient: "from-blue-500 to-pink-500" }
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 }
  }
};

function WelcomeQuestions() {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3">
      {QUESTIONS.map((item, i) => (
        <Link key={item.q} href="/secured/profil" className="w-full sm:w-auto">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`backdrop-blur-md bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 cursor-pointer border border-white/20 dark:border-white/10`}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            </motion.div>
            <span className="font-bold text-white text-xs sm:text-sm tracking-wide">
              {item.q}
            </span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

export default memo(WelcomeQuestions);
