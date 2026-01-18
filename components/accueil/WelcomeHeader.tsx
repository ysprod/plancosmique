'use client';
import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-6 sm:mb-8 relative"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6"
      >
        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 dark:text-purple-300" />
      </motion.div>
      
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6"
      >
        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-400 dark:text-indigo-300" />
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/logo.png"
          alt="Mon Étoile"
          width={80}
          height={80}
          className="mx-auto mb-3 sm:mb-4 drop-shadow-2xl"
          priority
        />
      </motion.div>
      
      <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
        MON ÉTOILE
      </h1>
      
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-2 text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400"
      >
        ✨ Temple de guidance spirituelle ✨
      </motion.div>
    </motion.div>
  );
}

export default memo(WelcomeHeader);