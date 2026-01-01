import { AnimatePresence, motion } from 'framer-motion';
import { containerVariants, processingVariants } from '@/lib/animation.constants';
import AnalyseGenere from '@/components/vie-personnelle/AnalyseGenere';
import ErrorToast from '@/components/vie-personnelle/ErrorToast';
import LoadingOverlay from '@/components/vie-personnelle/LoadingOverlay';
import OfferingStep from '@/components/vie-personnelle/OfferingStep';
import PaymentProcessing from '@/components/vie-personnelle/PaymentProcessing';
import CosmicLoader from '@/components/analysehoroscope/CosmicLoader';
import PageHeader from '@/components/analysehoroscope/PageHeader';
import { StepType, useAnalyseHoroscopePage } from './useAnalyseHoroscopePage';
import { WalletOffering, OfferingAlternative } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface AnalyseHoroscopePageUIProps {
    step: StepType;
    loading: boolean;
    paymentLoading: boolean;
    error: string | null;
    consultation: any;
    walletOfferings: WalletOffering[];
    handleOfferingValidation: (selected: OfferingAlternative) => void;
    handleCloseError: () => void;
}

const AnalyseHoroscopePageUI = ({
    step,
    loading,
    paymentLoading,
    error,
    consultation,
    walletOfferings,
    handleOfferingValidation,
    handleCloseError,
}: AnalyseHoroscopePageUIProps) => {
    const router = useRouter();
    const handleBack = useCallback(() => router.back(), [router]);

    if (loading) {
        return (
            <div className=" flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
                <CosmicLoader />
            </div>
        );
    }

    return (
        <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 px-3">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto"
            >
                <PageHeader />
                <div className="relative overflow-hidden">
                    <div className="max-w-4xl mx-auto py-6">
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
                                    onBack={handleBack}
                                />
                            )}
                            {step === 'genereanalyse' && (
                                <AnalyseGenere />
                            )}
                        </AnimatePresence>
                    </div>
                    <AnimatePresence>
                        {paymentLoading && step === 'selection' && <LoadingOverlay />}
                    </AnimatePresence>
                </div>
            </motion.div>
            <AnimatePresence>
                {error && (
                    <ErrorToast
                        message={error}
                        onClose={handleCloseError}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnalyseHoroscopePageUI;
