import React from 'react';
import { motion } from 'framer-motion';
import PaymentProcessing from './PaymentProcessing';
import { processingVariants } from '@/lib/animation.constants';

const Slide4SectionProcessing: React.FC = () => (
  <motion.div key="processing" variants={processingVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center justify-center min-h-[60vh]">
    <div className="w-full max-w-md px-4">
      <PaymentProcessing />
    </div>
  </motion.div>
);

export default Slide4SectionProcessing;
