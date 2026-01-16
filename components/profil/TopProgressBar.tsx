'use client';
import { motion } from "framer-motion";
import { memo } from "react";

const TopProgressBar = memo(() => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 z-50"
    animate={{ scaleX: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{ transformOrigin: 'left' }}
  />
));
TopProgressBar.displayName = 'TopProgressBar';
export default TopProgressBar;
