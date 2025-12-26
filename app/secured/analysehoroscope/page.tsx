"use client";

import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { useAuth } from '@/lib/auth/AuthContext';
import { mapFormDataToBackend } from '@/lib/functions';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { containerVariants, processingVariants } from '../../../lib/animation.constants';
import AnalyseGenere from '../vie-personnelle/AnalyseGenere';
import ErrorToast from '../vie-personnelle/ErrorToast';
import LoadingOverlay from '../vie-personnelle/LoadingOverlay';
import OfferingStep from '../vie-personnelle/OfferingStep';
import PaymentProcessing from '../vie-personnelle/PaymentProcessing';
import { RUBRIQUE_ID, TYPE_CONSULTATION } from './constants';
import CosmicLoader from './CosmicLoader';
import PageHeader from './PageHeader';

/* ---------------- TYPES ---------------- */

type HoroscopeTabId = 'annuel' | 'mensuel';

type StepType =
    | 'selection'
    | 'consulter'
    | 'processing'
    | 'genereanalyse';

interface Consultation {
    _id: string;
    title: string;
    description: string;
    alternatives: OfferingAlternative[];
    status: string;
}

/* ---------------- COMPONENT ---------------- */

const AnalyseHoroscopePageComponent = () => {
    const params = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const consultationCreationLock = useRef(false);

    const [step, setStep] = useState<StepType>('selection');
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [consultationId, setConsultationId] = useState<string | null>(null);
    const [consultation, setConsultation] = useState<Consultation | null>(null);
    const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);

    const tabId = useMemo(
        () => params.get('tab') as HoroscopeTabId | null,
        [params]
    );

    /* ---------------- INIT CONSULTATION ---------------- */

    useEffect(() => {
        if (!user?._id || !tabId) return;
        if (consultationCreationLock.current) return;

        consultationCreationLock.current = true;

        const initConsultation = async () => {
            try {
                setLoading(true);

                const [
                    userRes,
                    offeringsRes,
                    rubrique
                ] = await Promise.all([
                    api.get('/users/me'),
                    api.get(`/offering-stock/available?userId=${user._id}`),
                    getRubriqueById(RUBRIQUE_ID)
                ]);

                /* ---- Wallet offerings ---- */
                const offeringsData = Array.isArray(offeringsRes.data)
                    ? offeringsRes.data
                    : offeringsRes.data?.offerings || [];

                setWalletOfferings(
                    offeringsData.map((o: any) => ({
                        offeringId: o.offeringId || o._id,
                        quantity: o.quantity || o.availableQuantity || 0,
                        name: o.name || 'Offrande inconnue',
                        icon: o.icon || '📦',
                        category: o.category || 'animal',
                        price: o.price || 0,
                    }))
                );

                /* ---- Rubrique choice ---- */
                const choice = rubrique.consultationChoices.find((c: any) =>
                    c.title?.toLowerCase().includes(tabId)
                );

                if (!choice) {
                    throw new Error(`Aucune option trouvée pour "${tabId}"`);
                }

                /* ---- Create consultation ---- */
                const payload = {
                    serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
                    type: TYPE_CONSULTATION,
                    title: choice.title,
                    description: choice.description,
                    status: 'pending_payment',
                    alternatives: choice.offering.alternatives,
                    formData: mapFormDataToBackend(userRes.data),
                };

                const { data } = await api.post('/consultations', payload);
                const id = data?.id || data?.consultationId;

                if (!id) throw new Error('ID consultation manquant');

                setConsultationId(id);

                /* ---- Fetch consultation ---- */
                const consultationRes = await api.get(`/consultations/${id}`);
                const raw = consultationRes.data?.consultation || consultationRes.data;

                setConsultation({
                    _id: raw._id,
                    title: raw.title,
                    description: raw.description,
                    alternatives: raw.alternatives,
                    status: raw.status,
                });

                setStep('consulter');
            } catch (err) {
                console.error('[AnalyseHoroscope] ❌', err);
                setError('Erreur lors de la création de la consultation');
            } finally {
                setLoading(false);
            }
        };

        initConsultation();
    }, [user?._id, tabId]);

    /* ---------------- PAYMENT ---------------- */

    const handleOfferingValidation = useCallback(
        async (selected: OfferingAlternative) => {
            if (!user?._id || !consultationId) return;

            try {
                setPaymentLoading(true);
                setStep('processing');

                await api.post('/wallet/consume-offerings', {
                    userId: user._id,
                    consultationId,
                    offerings: [{
                        offeringId: selected.offeringId,
                        quantity: selected.quantity,
                    }],
                });

                await api.patch(`/consultations/${consultationId}`, {
                    status: 'paid',
                    paymentMethod: 'wallet_offerings',
                });

                setStep('genereanalyse');
            } catch (err) {
                console.error('[Payment] ❌', err);
                setError('Erreur lors du paiement');
            } finally {
                setPaymentLoading(false);
            }
        },
        [consultationId, user?._id]
    );

    /* ---------------- UI HELPERS ---------------- */

    const handleBack = useCallback(() => router.back(), [router]);
    const handleCloseError = useCallback(() => setError(null), []);

    /* ---------------- RENDER ---------------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
                <CosmicLoader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 px-3">
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

export default AnalyseHoroscopePageComponent;
