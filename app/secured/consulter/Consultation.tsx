/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
 import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import PaymentProcessing from '../vie-personnelle/slidesection/PaymentProcessing';
 import BackButton from './BackButton';
import ErrorAlert from './ErrorAlert';
import OfferingStep from './OfferingStep';
import { ConsultationData, OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { useAuth } from '@/hooks/lib/useAuth';
import { api } from '@/lib/api/client';

interface ConsultationProps {
    consultationId: string;
    walletOfferings: WalletOffering[];
    consultation: ConsultationData;
}

function Consultation({ consultationId, walletOfferings, consultation }: ConsultationProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState<'offering' | 'processing'>('offering');
    const [apiError, setApiError] = useState<string | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handleOfferingValidation = useCallback(
        async (selectedAlternative: OfferingAlternative) => {
            try {
                setPaymentLoading(true);
                setStep('processing');
                if (!user?._id) { throw new Error('Utilisateur introuvable'); }

                const consumeRes = await api.post('/wallet/consume-offerings', {
                    userId: user._id,
                    consultationId,
                    offerings: [{
                        offeringId: selectedAlternative.offeringId,
                        quantity: selectedAlternative.quantity,
                    }],
                });

                if (consumeRes.status !== 200 && consumeRes.status !== 201) {
                    throw new Error(consumeRes.data?.message || 'Erreur consommation');
                }

                await api.patch(`/consultations/${consultationId}`, {
                    status: 'paid',
                    paymentMethod: 'wallet_offerings',
                });

                setTimeout(() => {
                    router.push(`/secured/genereanalyse?id=${consultationId}`);
                }, 500);

            } catch (err: any) {
                console.error('[Offerings] ❌', err);
                setApiError(err.response?.data?.message || err.message || 'Erreur validation');
                setPaymentLoading(false);
            }
        },
        [consultationId, user, router]
    );

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
            {step === 'offering' && !paymentLoading && (
                <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                    <div className="max-w-6xl mx-auto">
                        <BackButton onClick={handleBack} />
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                    {step === 'offering' && !paymentLoading && (
                        <motion.div
                            key="offering"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <OfferingStep
                                requiredOfferings={consultation.alternatives as any}
                                walletOfferings={walletOfferings}
                                onNext={handleOfferingValidation}
                                onBack={handleBack}
                            />
                        </motion.div>
                    )}

                    {step === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PaymentProcessing />
                        </motion.div>
                    )}
                </AnimatePresence>
                {apiError && step === 'offering' && <ErrorAlert message={apiError} />}
            </div>
        </div>
    );
}

export default Consultation;