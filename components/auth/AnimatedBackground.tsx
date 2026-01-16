'use client';

import { motion } from "framer-motion";

export const AnimatedBackground = () => (
  <>
    <motion.div
      animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-violet-500/15 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1.15, 1, 1.15], rotate: [60, 0, 60] }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/15 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-fuchsia-500/8 rounded-full blur-3xl"
    />
  </>
);