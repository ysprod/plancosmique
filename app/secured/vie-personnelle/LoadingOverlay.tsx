/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { motion } from 'framer-motion';

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white/50 dark:bg-gray-950/50 backdrop-blur-[2px] z-40 pointer-events-none"
  />
);

export default LoadingOverlay;
