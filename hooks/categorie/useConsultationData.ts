import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import type { CategorieAdmin, WalletOffering, EnrichedChoice } from '@/lib/interfaces';
import { useAuth } from '@/lib/auth/AuthContext';

interface ConsultationData {
    consultation: any | null;
    walletOfferings: WalletOffering[];
    contextInfo: { rubrique?: any; choix?: any };
    loading: boolean;
    error: string | null;
}

export function useConsultationData(
    consultationId: string,
    category: CategorieAdmin
): ConsultationData {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [consultation, setConsultation] = useState<any>(null);
    const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
    const [contextInfo, setContextInfo] = useState<{ rubrique?: any; choix?: any }>({});

    useEffect(() => {
        const loadData = async () => {
            if (!user?._id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Load context from sessionStorage
                const rubriqueId = sessionStorage.getItem('rubriqueId');
                const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
                const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);

                // consultationChoices est un tableau de { choice, status } (EnrichedChoice)
                const enrichedChoice = rubrique?.consultationChoices?.find(
                    (ec: any) => ec.choice._id === selectedChoiceId
                ) as EnrichedChoice | undefined;

                // Extraire le choix (choice) de la structure enrichie
                const choix = enrichedChoice?.choice;
                setContextInfo({ rubrique, choix });

                // Parallel API calls
                const [consultationRes, walletRes] = await Promise.all([
                    api.get(`/consultations/${consultationId}`),
                    api.get(`/offering-stock/available?userId=${user?._id}`)
                ]);

                const consultationData = consultationRes.data?.consultation || consultationRes.data;
                setConsultation(consultationData);

                const offeringsData = Array.isArray(walletRes.data)
                    ? walletRes.data
                    : walletRes.data?.offerings || [];

                const offerings: WalletOffering[] = offeringsData.map((o: any) => ({
                    offeringId: o.offeringId || o._id,
                    quantity: o.quantity || o.availableQuantity || 0,
                    name: o.name || 'Offrande inconnue',
                    icon: o.icon || '📦',
                    category: o.category || 'animal',
                    price: o.price || 0
                }));

                setWalletOfferings(offerings);
            } catch (err: any) {
                console.error('❌ Error loading consultation data:', err);
                setError(err.response?.data?.message || 'Erreur lors du chargement');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [consultationId, user?._id, category]);

    return {
        consultation,
        walletOfferings,
        contextInfo,
        loading,
        error
    };
}
