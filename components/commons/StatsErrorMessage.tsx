'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full max-w-md bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
  >
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-red-700 text-sm font-medium">{message}</p>
      <button
        onClick={onRetry}
        className="text-red-600 hover:text-red-800 text-xs font-semibold mt-2 underline"
      >
        Réessayer
      </button>
    </div>
  </motion.div>
);
