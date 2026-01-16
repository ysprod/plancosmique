'use client';

import { AnimatePresence } from 'framer-motion';
import ErrorToast from '@/components/vie-personnelle/ErrorToast';

interface AnalyseHoroscopeErrorToastProps {
  error: string | null;
  handleCloseError: () => void;
}

const AnalyseHoroscopeErrorToast = ({ error, handleCloseError }: AnalyseHoroscopeErrorToastProps) => (
  <AnimatePresence>
    {error && (
      <ErrorToast message={error} onClose={handleCloseError} />
    )}
  </AnimatePresence>
);

export { AnalyseHoroscopeErrorToast };