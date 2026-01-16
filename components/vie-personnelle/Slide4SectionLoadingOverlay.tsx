'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingOverlay from './LoadingOverlay';

interface Slide4SectionLoadingOverlayProps {
  paymentLoading: boolean;
  step: string;
}

const Slide4SectionLoadingOverlay: React.FC<Slide4SectionLoadingOverlayProps> = ({ paymentLoading, step }) => (
  <AnimatePresence>
    {paymentLoading && step === 'selection' && <LoadingOverlay />}
  </AnimatePresence>
);

export default Slide4SectionLoadingOverlay;
