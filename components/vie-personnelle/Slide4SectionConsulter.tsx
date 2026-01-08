import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OfferingStep from './OfferingStep';
import { WalletOffering } from '@/lib/interfaces';

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
  <motion.div key="consulter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div key="offering" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <OfferingStep
              requiredOfferings={consultation.alternatives as any}
              walletOfferings={walletOfferings}
              onNext={handleOfferingValidation}
              onBack={handleBack}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
);

export default Slide4SectionConsulter;
