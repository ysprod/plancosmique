import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorToast from './ErrorToast';

interface Slide4SectionErrorToastProps {
  showErrorToast: boolean;
  apiError: string | null;
  handleCloseError: () => void;
}

const Slide4SectionErrorToast: React.FC<Slide4SectionErrorToastProps> = ({ showErrorToast, apiError, handleCloseError }) => (
  <AnimatePresence>
    {showErrorToast && (
      <ErrorToast message={apiError!} onClose={handleCloseError} />
    )}
  </AnimatePresence>
);

export default Slide4SectionErrorToast;
