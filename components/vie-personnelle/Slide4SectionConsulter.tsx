'use client';
import { WalletOffering } from '@/lib/interfaces';
import React from 'react';
import OfferingStep from './OfferingStep';

interface Slide4SectionConsulterProps {
  consultation: any;
  walletOfferings: WalletOffering[];
  handleOfferingValidation: (selected: any) => void;
}

const Slide4SectionConsulter: React.FC<Slide4SectionConsulterProps> = ({
  consultation,
  walletOfferings,
  handleOfferingValidation,
}) => (
  <div key="offering">
    <OfferingStep
      requiredOfferings={consultation.alternatives as any}
      walletOfferings={walletOfferings}
      onNext={handleOfferingValidation}
      consultationTitle={consultation?.title || ''}
    />
  </div>
);

export default Slide4SectionConsulter;