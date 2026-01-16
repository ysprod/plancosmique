'use client';

import { motion } from 'framer-motion';

export default function SpiritualiteBlogHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center sm:mb-12"
    >
      <h1 className="mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
        Blog Spiritualité
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
        Explorez nos articles, pratiques et enseignements spirituels
      </p>
    </motion.header>
  );
}
