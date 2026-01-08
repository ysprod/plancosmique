import React from 'react';
import { motion } from 'framer-motion';
 
import { GenerationStep } from '@/lib/interfaces';
import LoadingSpinner from '@/components/admin/genereanalyse/LoadingSpinner';

interface GenereAnalyseLoadingProps {
  step: GenerationStep;
}

export const GenereAnalyseLoading: React.FC<GenereAnalyseLoadingProps> = ({ step }) => (
  <motion.div key="loading">
    <LoadingSpinner step={step} />
  </motion.div>
);