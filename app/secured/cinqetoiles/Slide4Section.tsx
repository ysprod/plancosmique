"use client";
import { Slide4SectionBackButton } from '@/components/cinqetoiles/Slide4SectionBackButton';
import { Slide4SectionForm } from '@/components/cinqetoiles/Slide4SectionForm';
import { Slide4SectionGold } from '@/components/cinqetoiles/Slide4SectionGold';
import { Slide4SectionProcessing } from '@/components/cinqetoiles/Slide4SectionProcessing';
import { Slide4SectionSelection } from '@/components/cinqetoiles/Slide4SectionSelection';
import { containerVariants, fadeVariants, itemVariants } from '@/components/cinqetoiles/slide4SectionVariants';
import { useCinqEtoilesSlide4Section } from '@/hooks/cinqetoiles/useCinqEtoilesSlide4Section';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

function Slide4Section() {
  const {
    selected, form, errors, apiError, step, consultationId, choices,
    paymentLoading, walletOfferings, consultation, loading, showBackButton,
    handleChange, handleSelect, resetSelection, handleSubmit,
  } = useCinqEtoilesSlide4Section();

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
    
      <Slide4SectionBackButton show={showBackButton} onClick={resetSelection} />
      
      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <AnimatePresence mode="wait">
          {step === 'selection' && (
            <Slide4SectionSelection
              loading={loading}
              choices={choices}
              handleSelect={handleSelect}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              fadeVariants={fadeVariants}
            />
          )}
          {step === 'form' && selected && !paymentLoading && (
            <motion.div key="form" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
              <Slide4SectionForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={resetSelection}
              />
            </motion.div>
          )}
          {paymentLoading && (
            <motion.div key="processing" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
              <Slide4SectionProcessing />
            </motion.div>
          )}
          {step === 'gold' && consultationId && !paymentLoading && consultation && (
            <motion.div key="gold" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
              <Slide4SectionGold
                consultationId={consultationId}
                walletOfferings={walletOfferings}
                consultation={consultation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>      
    </div>
  );
}

export default memo(Slide4Section);