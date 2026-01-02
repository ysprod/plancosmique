/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PaymentProcessing from '@/components/vie-personnelle/PaymentProcessing';
import { useSlide4Section } from '@/hooks/cinqetoiles/useSlide4Section';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import BackButton from '@/components/cinqetoiles/BackButton';
import ConsultationCard from '@/components/cinqetoiles/ConsultationCard';
import ConsultationForm from '@/components/cinqetoiles/ConsultationForm';
import ConsulterGoldContent from '@/components/cinqetoiles/ConsulterGoldContent';
import LoadingState from '@/components/cinqetoiles/LoadingState';
import SelectionHeader from '@/components/cinqetoiles/SelectionHeader';

function Slide4Section() {
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
  } = useSlide4Section();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 250, damping: 22 }
    },
  };
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {showBackButton && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                   border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3 shadow-sm"
        >
          <div className="max-w-6xl mx-auto">
            <BackButton onClick={resetSelection} />
          </div>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <AnimatePresence mode="wait">
          {/* SELECTION STEP */}
          {step === 'selection' && (
            <motion.div
              key="selection"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SelectionHeader />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  {loading ? (
                    <LoadingState />
                  ) : (
                    choices.map((choice) => (
                      <motion.div
                        key={choice.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          y: -4,
                          boxShadow: '0 8px 24px rgba(168, 85, 247, 0.15)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ConsultationCard choice={choice} />
                      </motion.div>
                    ))
                  )}
                </div>

                {!loading && choices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSelect}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                               text-white font-bold rounded-xl shadow-lg 
                               hover:shadow-xl hover:from-purple-700 hover:to-pink-700
                               transition-all flex items-center gap-2"
                    >
                      {/* Sparkles icon can be imported here if needed */}
                      <span>Consulter Maintenant</span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 'form' && selected && !paymentLoading && (
            <motion.div
              key="form"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConsultationForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={resetSelection}
              />
            </motion.div>
          )}

          {/* PAYMENT PROCESSING */}
          {paymentLoading && (
            <motion.div
              key="processing"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PaymentProcessing />
            </motion.div>
          )}

          {step === 'gold' && consultationId && !paymentLoading && consultation && (
            <motion.div
              key="gold"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConsulterGoldContent
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