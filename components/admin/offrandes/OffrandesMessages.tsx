'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

interface OffrandesMessagesProps {
  successMessage: string | null;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

export default function OffrandesMessages({ successMessage, errorMessage, setErrorMessage }: OffrandesMessagesProps) {
  return (
    <AnimatePresence>
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
          <span className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0">✅</span>
          <p className="text-sm font-semibold text-green-800 dark:text-green-300">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
          <span className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0">❌</span>
          <p className="text-sm font-semibold text-red-800 dark:text-red-300">{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">✖️</button>
        </div>
      )}
    </AnimatePresence>
  );
}