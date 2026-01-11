import { containerVariants } from '@/lib/animation.constants';
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Slide4SectionBackground from './Slide4SectionBackground';
import Slide4SectionConsulter from './Slide4SectionConsulter';
import Slide4SectionErrorToast from './Slide4SectionErrorToast';
import Slide4SectionGenereAnalyse from './Slide4SectionGenereAnalyse';
import Slide4SectionLoadingOverlay from './Slide4SectionLoadingOverlay';
import Slide4SectionProcessing from './Slide4SectionProcessing';
import Slide4SectionSelection from './Slide4SectionSelection';
import { Slide4SectionMainProps } from './useSlide4Section';

const Slide4SectionMain: React.FC<Slide4SectionMainProps> = ({
  step,
  paymentLoading,
  choices,
  alreadyDoneChoices,
  handleSelectConsultation,
  consultationId,
  consultation,
  walletOfferings,
  handleOfferingValidation,
  handleBack,
  apiError,
  showErrorToast,
  handleCloseError
}) => (
  <div className="bg-gradient-to-br from-purple-50/80 via-pink-50/50 to-orange-50/80 dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-900 relative overflow-hidden">
    <Slide4SectionBackground />
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <AnimatePresence mode="wait">
        {step === 'selection' && !paymentLoading && (
          <motion.div key="selection" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Slide4SectionSelection
              onSelect={handleSelectConsultation}
              choices={choices}
              alreadyDoneChoices={alreadyDoneChoices}
            />
          </motion.div>
        )}
        {paymentLoading && <Slide4SectionProcessing />}
        {step === 'consulter' && consultationId && consultation && (
          <Slide4SectionConsulter
            consultation={consultation}
            walletOfferings={walletOfferings}
            handleOfferingValidation={handleOfferingValidation}
            handleBack={handleBack}
          />
        )}
        {step === 'genereanalyse' && consultationId && <Slide4SectionGenereAnalyse />}
      </AnimatePresence>
    </div>
    <Slide4SectionErrorToast showErrorToast={showErrorToast} apiError={apiError} handleCloseError={handleCloseError} />
    <Slide4SectionLoadingOverlay paymentLoading={paymentLoading} step={step} />
  </div>
);

export default Slide4SectionMain;