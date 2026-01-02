/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AnimatePresence, motion } from 'framer-motion';
import PaymentProcessing from '../vie-personnelle/PaymentProcessing';
import GenereAnalyseContent from './GenereAnalyseContent';
import OfferingStep from './OfferingStep';
import { ConsultationData } from '@/lib/interfaces';
import { useConsulterGoldContent } from '@/hooks/cinqetoiles/useConsulterGoldContent';
import ConsulterGoldErrorToast from '@/components/cinqetoiles/ConsulterGoldErrorToast';
import { WalletOffering } from '@/lib/interfaces';

type StepType = 'offering' | 'processing' | 'analyse';

interface ConsulterGoldContentProps {
    consultationId: string;
    walletOfferings: WalletOffering[];
    consultation: ConsultationData;
}

const ANIMATION_DURATION = 0.2;
const fadeSlideVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.985 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 280,
            damping: 25,
            duration: ANIMATION_DURATION,
            mass: 0.8
        }
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.985,
        transition: {
            duration: ANIMATION_DURATION * 0.7,
            ease: "easeOut"
        }
    }
};
const processingVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 240,
            damping: 22,
            mass: 0.9
        }
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        transition: { duration: ANIMATION_DURATION * 0.5 }
    }
};

export default function ConsulterGoldContentComponent({
    consultationId,
    walletOfferings,
    consultation
}: ConsulterGoldContentProps) {
    const {
        step,
        isProcessing,
        apiError,
        showErrorToast,
        requiredOfferings,
        handleOfferingValidation,
        handleBack,
        handleErrorClose,
    } = useConsulterGoldContent(consultationId, walletOfferings, consultation);

    return (
        <div className="bg-gradient-to-b from-gray-50/50 via-white to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/5">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/5 dark:bg-purple-500/3 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200/5 dark:bg-blue-500/3 rounded-full blur-3xl" />
            </div>
            <div className="relative">
                <AnimatePresence mode="wait">
                    {step === 'offering' && (
                        <motion.div
                            key="offering"
                            variants={fadeSlideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="px-4 sm:px-6 py-6 sm:py-8 max-w-2xl mx-auto"
                        >
                            <OfferingStep
                                requiredOfferings={requiredOfferings}
                                walletOfferings={walletOfferings}
                                onNext={handleOfferingValidation}
                                onBack={handleBack}
                            />
                        </motion.div>
                    )}
                    {step === 'processing' && (
                        <motion.div
                            key="processing"
                            variants={processingVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center justify-center min-h-[60vh] px-4"
                        >
                            <div className="w-full max-w-md">
                                <PaymentProcessing />
                            </div>
                        </motion.div>
                    )}
                    {step === 'analyse' && (
                        <motion.div
                            key="analyse"
                            variants={fadeSlideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="px-4 sm:px-6"
                        >
                            <GenereAnalyseContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {showErrorToast && (
                    <ConsulterGoldErrorToast
                        message={apiError!}
                        onClose={handleErrorClose}
                    />
                )}
            </AnimatePresence>
            {isProcessing && step === 'offering' && (
                <div className="fixed inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[1px] z-40" />
            )}
        </div>
    );
}