'use client';

import { WalletOffering } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';
import OfferingStep from './OfferingStep';

interface Slide4SectionConsulterProps {
  consultation: any;
  walletOfferings: WalletOffering[];
  handleOfferingValidation: (selected: any) => void;
  handleBack: () => void;
}

const Slide4SectionConsulter: React.FC<Slide4SectionConsulterProps> = ({
  consultation,
  walletOfferings,
  handleOfferingValidation,
  handleBack
}) => (
  <motion.div key="offering" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
    <OfferingStep
      requiredOfferings={consultation.alternatives as any}
      walletOfferings={walletOfferings}
      onNext={handleOfferingValidation}
      onBack={handleBack}
    />
  </motion.div>
);

export default Slide4SectionConsulter;