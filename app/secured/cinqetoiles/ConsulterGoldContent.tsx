/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';
import PaymentProcessing from '../vie-personnelle/slidesection/PaymentProcessing';
import ErrorToast from './ErrorToast';
import GenereAnalyseContent from './GenereAnalyseContent';
import OfferingStep from './OfferingStep';
import { ConsultationData } from './Slide4Section';

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
    const { user } = useAuth();

    const [step, setStep] = useState<StepType>('offering');
    const [apiError, setApiError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const requiredOfferings = useMemo(() =>
        consultation.alternatives as OfferingAlternative[],
        [consultation.alternatives]
    );

    const showErrorToast = useMemo(() =>
        !!apiError && step === 'offering',
        [apiError, step]
    );

    const handleOfferingValidation3 = useCallback(async (
        selectedAlternative: OfferingAlternative
    ) => {
        if (!consultationId || !user?._id) {
            setApiError(consultationId ? 'Utilisateur introuvable' : 'Consultation introuvable');
            return;
        }

        setIsProcessing(true);
        setApiError(null);
        setStep('processing');

        try {

            // 1. Consommer les offerings
            const consumeRes = await api.post('/wallet/consume-offerings', {
                userId: user._id,
                consultationId,
                offerings: [{
                    offeringId: selectedAlternative.offeringId,
                    quantity: selectedAlternative.quantity,
                }],
            });
            if (consumeRes.status !== 200 && consumeRes.status !== 201) {
                throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation');
            }

            // 2. Mise à jour du statut de consultation
            await api.patch(`/consultations/${consultationId}`, {
                status: 'paid',
                paymentMethod: 'wallet_offerings',
            });

            // 3. Récupération des infos utilisateur pour la carte du ciel
            const userRes = await api.get('/users/me');
            if (userRes.status !== 200) {
                throw new Error('Impossible de récupérer les infos utilisateur');
            }
            const userData = userRes.data;
            const birthPayload = {
                name: userData.nom || userData.name || userData.username || 'Utilisateur',
                prenoms: userData.prenoms,
                birthDate: userData.birthDate || userData.dateNaissance,
                birthTime: userData.birthTime || userData.heureNaissance,
                birthPlace: userData.birthPlace || userData.villeNaissance,
                birthCountry: userData.birthCountry || userData.paysNaissance || userData.country,
                birthCoordinates: userData.birthCoordinates
            };
            // Vérification minimale améliorée
            if (!birthPayload.birthDate || !birthPayload.birthTime || !birthPayload.birthPlace) {
                throw new Error('Profil incomplet : date, heure ou lieu de naissance manquant.');
            }

            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const skyChartRes = await api.post(`${baseUrl}/api/users/me/sky-chart`, birthPayload);
            if (skyChartRes.status !== 200) {
                throw new Error('Erreur lors du calcul de la carte du ciel');
            }
            await api.patch('/users/me', {
                carteDuCiel: skyChartRes.data,
                premium: true,
                skyChartCalculatedAt: new Date().toISOString()
            });

            setStep('analyse');

        } catch (err: any) {
            console.error('[ConsulterGold] ❌', err);
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Erreur lors de la validation';
            setApiError(errorMessage);
            setStep('offering');

        } finally {
            setIsProcessing(false);
        }
    }, [consultationId, user?._id]);


    const handleOfferingValidation = useCallback(async (
        selectedAlternative: OfferingAlternative
    ) => {
        if (!consultationId || !user?._id) {
            setApiError(consultationId ? 'Utilisateur introuvable' : 'Consultation introuvable');
            return;
        }

        setIsProcessing(true);
        setApiError(null);
        setStep('processing');

        try {
            const consumeRes = await api.post('/wallet/consume-offerings', {
                userId: user._id,
                consultationId,
                offerings: [{
                    offeringId: selectedAlternative.offeringId,
                    quantity: selectedAlternative.quantity,
                }],
            });

            if (consumeRes.status !== 200 && consumeRes.status !== 201) {
                throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation');
            }

            await api.patch(`/consultations/${consultationId}`, {
                status: 'paid',
                paymentMethod: 'wallet_offerings',
            });

            const skyChartRes = await api.get('/users/me/sky-chart');
            await api.patch('/users/me', {
                carteDuCiel: skyChartRes.data,
                premium: true
            });
            setStep('analyse');

        } catch (err: any) {
            console.error('[Offerings] ❌', err);
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Erreur lors de la validation';
            setApiError(errorMessage);
            setStep('offering');

        } finally {
            setIsProcessing(false);

        }
    }, [consultationId, user?._id]); // Dépendances minimales

    const handleBack = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    }, []);

    const handleErrorClose = useCallback(() => {
        setApiError(null);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-purple-50/20 \
                      dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/5">
            {/* Background décoratif minimal */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/5 \
                              dark:bg-purple-500/3 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200/5 \
                              dark:bg-blue-500/3 rounded-full blur-3xl" />
            </div>

            {/* Contenu principal avec container fluide */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {/* OFFERING STEP */}
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

                    {/* ANALYSE STEP */}
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

            {/* ERROR TOAST (rendu conditionnel optimisé) */}
            <AnimatePresence>
                {showErrorToast && (
                    <ErrorToast
                        message={apiError!}
                        onClose={handleErrorClose}
                    />
                )}
            </AnimatePresence>

            {isProcessing && step === 'offering' && (
                <div className="fixed inset-0 bg-white/50 dark:bg-gray-900/50 \
                              backdrop-blur-[1px] z-40" />
            )}
        </div>
    );
} 