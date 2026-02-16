'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-4 sm:mb-6 relative"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/logo.png"
          alt="OFFOLOMOU"
          width={80}
          height={80}
          className="mx-auto mb-2 sm:mb-3 drop-shadow-2xl"
          priority
        />
      </motion.div>

      <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
        OFFOLOMOU
      </h1>
    </motion.div>
  );
}

export default memo(WelcomeHeader);