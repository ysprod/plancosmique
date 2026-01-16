'use client';
import { motion } from "framer-motion";
import { memo } from "react";

const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 hidden sm:block">
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
      transition={{ duration: 20, repeat: Infinity }}
      className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
      transition={{ duration: 25, repeat: Infinity, delay: 2 }}
      className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-pink-400 rounded-full blur-3xl"
    />
  </div>
));
AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
