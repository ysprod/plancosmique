import { useCallback, useMemo, useState } from 'react';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { ConsultationData } from '@/lib/interfaces';

type StepType = 'offering' | 'processing' | 'analyse';

export function useConsulterGoldContent(consultationId: string, walletOfferings: WalletOffering[], consultation: ConsultationData) {
  const { user } = useAuth();
  const [step, setStep] = useState<StepType>('offering');
  const [apiError, setApiError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const requiredOfferings = useMemo(() => consultation.alternatives as OfferingAlternative[], [consultation.alternatives]);
  const showErrorToast = useMemo(() => !!apiError && step === 'offering', [apiError, step]);

  const handleOfferingValidation = useCallback(async (selectedAlternative: OfferingAlternative) => {
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
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la validation';
      setApiError(errorMessage);
      setStep('offering');
    } finally {
      setIsProcessing(false);
    }
  }, [consultationId, user?._id]);

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const handleErrorClose = useCallback(() => {
    setApiError(null);
  }, []);

  return {
    step,
    setStep,
    apiError,
    setApiError,
    isProcessing,
    requiredOfferings,
    showErrorToast,
    handleOfferingValidation,
    handleBack,
    handleErrorClose,
  };
}
