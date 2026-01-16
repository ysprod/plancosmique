'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { alertVariants } from './consultationFormVariants';

interface FormErrorMessageProps {
  message: string;
}

export const FormErrorMessage = memo<FormErrorMessageProps>(({ message }) => (
  <motion.div
    variants={alertVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="mx-auto mt-4 w-full max-w-xl rounded-xl border border-rose-200/50 bg-gradient-to-br from-rose-50 to-red-50/30 dark:from-rose-950/40 dark:to-red-950/20 dark:border-rose-900/40 p-3.5 text-sm shadow-lg backdrop-blur-sm"
    role="alert"
    aria-live="polite"
  >
    <div className="flex items-start gap-3">
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-shrink-0"
      >
        <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
      </motion.div>
      <p className="leading-snug text-rose-800 dark:text-rose-200 font-medium">{message}</p>
    </div>
  </motion.div>
));

FormErrorMessage.displayName = 'FormErrorMessage';
