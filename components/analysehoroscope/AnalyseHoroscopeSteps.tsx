'use client';
import { AnimatePresence, motion } from 'framer-motion';
import PaymentProcessing from '@/components/vie-personnelle/PaymentProcessing';
import OfferingStep from '@/components/vie-personnelle/OfferingStep';
import AnalyseGenere from '@/components/vie-personnelle/AnalyseGenere';
import { processingVariants } from '@/lib/animation.constants';
import { StepType } from '../../hooks/analysehoroscope/useAnalyseHoroscopePage';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';

interface AnalyseHoroscopeStepsProps {
  step: StepType;
  paymentLoading: boolean;
  consultation: any;
  walletOfferings: WalletOffering[];
  handleOfferingValidation: (selected: OfferingAlternative) => void;
  handleBack: () => void;
}

const AnalyseHoroscopeSteps = ({
  step,
  paymentLoading,
  consultation,
  walletOfferings,
  handleOfferingValidation,
  handleBack,
}: AnalyseHoroscopeStepsProps) => (
  <AnimatePresence mode="wait">
    {paymentLoading && (
      <motion.div
        key="processing"
        variants={processingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex justify-center min-h-[60vh]"
      >
        <PaymentProcessing />
      </motion.div>
    )}
    {step === 'consulter' && consultation && (
      <OfferingStep
        requiredOfferings={consultation.alternatives}
        walletOfferings={walletOfferings}
        onNext={handleOfferingValidation}

        consultationTitle={consultation.title}
      />
    )}
    {step === 'genereanalyse' && <AnalyseGenere />}
  </AnimatePresence>
);

export { AnalyseHoroscopeSteps };