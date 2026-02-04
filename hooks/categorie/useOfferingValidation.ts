import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import type { OfferingAlternative } from '@/lib/interfaces';
import { useAuth } from '../lib/useAuth';

interface UseOfferingValidationParams {
    consultationId: string;
    categoryId: string;
}

interface UseOfferingValidationReturn {
    loading: boolean;
    error: string | null;
    showError: boolean;
    handleValidation: (selectedAlternative: OfferingAlternative) => Promise<void>;
    clearError: () => void;
}

export function useOfferingValidation({
    consultationId,
    categoryId}: UseOfferingValidationParams): UseOfferingValidationReturn {
    const router = useRouter();
     const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    const handleValidation = useCallback(async (selectedAlternative: OfferingAlternative) => {
        setLoading(true);
        setError(null);
        setShowError(false);

        try {
            if (!user?._id) {
                throw new Error('Utilisateur introuvable');
            }

            // Consume offerings from wallet
            const consumeRes = await api.post('/wallet/consume-offerings', {
                userId: user._id,
                consultationId,
                offerings: [{
                    offeringId: selectedAlternative.offeringId,
                    quantity: selectedAlternative.quantity
                }]
            });

            if (consumeRes.status !== 200 && consumeRes.status !== 201) {
                throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation');
            }

            await api.patch(`/consultations/${consultationId}`, {
                status: 'PENDING',
                paymentMethod: 'wallet_offerings'
            });

            
            // Navigate to analysis generation
            window.location.href = `/star/category/${categoryId}/genereanalyse?consultationId=${consultationId}`;
        } catch (err: any) {
            console.error('❌ Error validating offerings:', err);
            const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la validation';
            setError(errorMsg);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    }, [consultationId, categoryId, user?._id, router]);

    const clearError = useCallback(() => {
        setShowError(false);
        setError(null);
    }, []);

    return {
        loading,
        error,
        showError,
        handleValidation,
        clearError
    };
}
