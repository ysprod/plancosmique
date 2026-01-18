'use client';
import { AnimatePresence } from 'framer-motion';
import LoadingOverlay from '@/components/vie-personnelle/LoadingOverlay';

interface AnalyseHoroscopeLoadingOverlayProps {
  paymentLoading: boolean;
  step: string;
}

const AnalyseHoroscopeLoadingOverlay = ({ paymentLoading, step }: AnalyseHoroscopeLoadingOverlayProps) => (
  <AnimatePresence>
    {paymentLoading && step === 'selection' && <LoadingOverlay />}
  </AnimatePresence>
);

export { AnalyseHoroscopeLoadingOverlay };