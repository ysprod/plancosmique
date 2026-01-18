'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ConsulterGoldErrorToastProps {
  message: string;
  onClose: () => void;
}

const ConsulterGoldErrorToast = ({ message, onClose }: ConsulterGoldErrorToastProps) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3"
        role="alert"
        aria-live="assertive"
      >
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white/80 hover:text-white font-bold">&times;</button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConsulterGoldErrorToast;
