'use client';

import { motion } from "framer-motion";

export default function OfferingStepHeader() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
      className="text-center text-2xl sm:text-2xl md:text-2xl font-extrabold mb-8 select-none relative"
    >
      <span
        className="block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg"
        style={{
          WebkitTextStroke: '1px rgba(80,0,80,0.08)',
          filter: 'drop-shadow(0 2px 16px #e879f9aa) drop-shadow(0 0px 8px #a21caf66)'
        }}
      >
        <motion.span
          initial={{ textShadow: '0 0 0px #190404ff' }}
          className="inline-block"
        >
          OFFRANDES
        </motion.span>
      </span>
    </motion.h1>
  );
}
