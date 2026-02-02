import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

interface UseAnalysisPollingParams {
    consultationId: string;
    enabled?: boolean;
}

interface UseAnalysisPollingReturn {
    analysisComplete: boolean;
    error: string | null;
    showError: boolean;
    clearError: () => void;
}

export function useAnalysisPolling({
    consultationId,
    enabled = true
}: UseAnalysisPollingParams): UseAnalysisPollingReturn {
    const router = useRouter();
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!enabled || analysisComplete) return;

        const checkStatus = async () => {
            try {
                const response = await api.get(`/consultations/${consultationId}`);
                const consultationData = response.data?.consultation || response.data;

             

                // Vérifier si l'analyse est disponible
                const isAnalysisReady = 
                    consultationData?.analysisNotified === true ||
                    consultationData?.statut === 'REPONDU' ||
                    consultationData?.status === 'COMPLETED' ||
                    (consultationData?.analyse && Object.keys(consultationData.analyse).length > 0) ||
                    (consultationData?.result && Object.keys(consultationData.result).length > 0);

                if (isAnalysisReady) {
                    setAnalysisComplete(true);

                    // Redirect after a short delay to show success message
                    setTimeout(() => {
                        router.push(`/star/consultations/${consultationId}`);
                    }, 2000);
                }
            } catch (err: any) {
                console.error('❌ Error checking consultation status:', err);
                setError(err.response?.data?.message || 'Erreur lors de la vérification du statut');
                setShowError(true);
            }
        };

        // Initial check
        checkStatus();

        // Poll every 5 seconds
        const interval = setInterval(checkStatus, 5000);

        return () => clearInterval(interval);
    }, [consultationId, analysisComplete, enabled, router]);

    const clearError = () => {
        setShowError(false);
        setError(null);
    };

    return {
        analysisComplete,
        error,
        showError,
        clearError
    };
}
