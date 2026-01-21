import React from 'react';
import { motion } from 'framer-motion';

interface EditPromptShellProps {
  children: React.ReactNode;
  error?: string | null;
}

export const EditPromptShell: React.FC<EditPromptShellProps> = ({ children, error }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-2 sm:px-4 py-6"
  >
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
      {error ? (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center w-full mb-6">
          <p className="font-semibold">{error}</p>
        </div>
      ) : null}
      {children}
    </div>
  </motion.div>
);
