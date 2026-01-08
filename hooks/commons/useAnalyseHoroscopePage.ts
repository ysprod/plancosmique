import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/lib/api/client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { mapFormDataToBackend } from '@/lib/functions';
import { RUBRIQUE_ID, TYPE_CONSULTATION } from '@/components/analysehoroscope/constants';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';

export type HoroscopeTabId = 'annuel' | 'mensuel';
export type StepType = 'selection' | 'consulter' | 'processing' | 'genereanalyse';

interface Consultation {
    _id: string;
    title: string;
    description: string;
    alternatives: OfferingAlternative[];
    status: string;
}

export function useAnalyseHoroscopePage(user: any, params: URLSearchParams) {
    const consultationCreationLock = useRef(false);
    const [step, setStep] = useState<StepType>('selection');
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [consultationId, setConsultationId] = useState<string | null>(null);
    const [consultation, setConsultation] = useState<Consultation | null>(null);
    const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
    const tabId = useMemo(() => params.get('tab') as HoroscopeTabId | null, [params]);

    useEffect(() => {
        if (!user?._id || !tabId) return;
        if (consultationCreationLock.current) return;
        consultationCreationLock.current = true;
        const initConsultation = async () => {
            try {
                setLoading(true);
                const [userRes, offeringsRes, rubrique] = await Promise.all([
                    api.get('/users/me'),
                    api.get(`/offering-stock/available?userId=${user._id}`),
                    getRubriqueById(RUBRIQUE_ID)
                ]);
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
                const choice = rubrique.consultationChoices.find((c: any) =>
                    c.title?.toLowerCase().includes(tabId)
                );
                if (!choice) {
                    throw new Error(`Aucune option trouvée pour "${tabId}"`);
                }
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

    const handleCloseError = useCallback(() => setError(null), []);
    return {
        step,
        setStep,
        loading,
        paymentLoading,
        error,
        setError,
        consultation,
        walletOfferings,
        handleOfferingValidation,
        handleCloseError,
    };
}
