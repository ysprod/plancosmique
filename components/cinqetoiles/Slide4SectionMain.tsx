import { AnimatePresence, motion } from 'framer-motion';
import { Slide4SectionBackButton } from '@/components/cinqetoiles/Slide4SectionBackButton';
import { Slide4SectionSelection } from '@/components/cinqetoiles/Slide4SectionSelection';
import { Slide4SectionForm } from '@/components/cinqetoiles/Slide4SectionForm';
import { Slide4SectionProcessing } from '@/components/cinqetoiles/Slide4SectionProcessing';
import { Slide4SectionGold } from '@/components/cinqetoiles/Slide4SectionGold';
import { containerVariants, itemVariants, fadeVariants } from '@/components/cinqetoiles/slide4SectionVariants';
import { useSlide4SectionMain } from '@/hooks/commons/useSlide4SectionMain';
import { User } from '@/lib/interfaces';
import { useCinqEtoilesSlide4Section } from '@/hooks/cinqetoiles/useCinqEtoilesSlide4Section';

interface Slide4SectionProps {
  userdata?: User;
}


export default function Slide4SectionMain({ userdata }: Slide4SectionProps) {
  const {
    selected,
    form,
    errors,
    apiError,
    step,
    consultationId,
    paymentLoading,
    walletOfferings,
    consultation,
    choices,
    loading,
    showBackButton,
    handleChange,
    handleSelect,
    resetSelection,
    handleSubmit,
  } = useCinqEtoilesSlide4Section();

  return (
    <>
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
    </>
  );
}
