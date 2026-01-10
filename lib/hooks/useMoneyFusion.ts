import { useCallback, useEffect, useState, useMemo } from 'react';
import { moneyFusionService } from '@/lib/api/services/moneyfusion.service';
import type {
    InitiatePaymentConfig,
    InitiatePaymentResult,
    PaymentState,
    PaymentStatus,
    VerifyPaymentResult,
} from '@/lib/types/moneyfusion.types';

// ==================== TYPES ====================

export interface UseMoneyFusionOptions {
    autoVerify?: boolean;
    onPaymentInitiated?: (token: string, url: string) => void;
    onPaymentSuccess?: (payment: VerifyPaymentResult) => void;
    onPaymentFailed?: (error: string) => void;
    onError?: (error: string) => void;
    cleanUrlAfterVerify?: boolean;
}

export interface UseMoneyFusionReturn {
    paymentState: PaymentState;
    status: PaymentStatus;
    token: string | null;
    paymentUrl: string | null;
    paymentDetails: VerifyPaymentResult['payment'] | null;
    loading: boolean;
    error: string | null;
    initiatePayment: (config: InitiatePaymentConfig) => Promise<InitiatePaymentResult>;
    verifyPayment: (token?: string) => Promise<VerifyPaymentResult>;
    reset: () => void;
    formatAmount: (amount: number) => string;
}

// ==================== ÉTAT INITIAL ====================

const INITIAL_PAYMENT_STATE: PaymentState = {
    status: 'pending',
    token: null,
    paymentUrl: null,
    paymentDetails: null,
    loading: false,
    error: null,
};

// ==================== HOOK PRINCIPAL ====================

export function useMoneyFusion(options: UseMoneyFusionOptions = {}): UseMoneyFusionReturn {
    const {
        autoVerify = false,
        onPaymentInitiated,
        onPaymentSuccess,
        onPaymentFailed,
        onError,
        cleanUrlAfterVerify = true,
    } = options;

    const [paymentState, setPaymentState] = useState<PaymentState>(INITIAL_PAYMENT_STATE);

    // ==================== HELPERS ====================

    const handleError = useCallback((errorMsg: string, status: PaymentStatus = 'failed') => {
        setPaymentState((prev) => ({
            ...prev,
            status,
            loading: false,
            error: errorMsg,
        }));

        if (status === 'failed') {
            onPaymentFailed?.(errorMsg);
        }
        onError?.(errorMsg);
    }, [onPaymentFailed, onError]);

    // ==================== INITIATION PAIEMENT ====================

    const initiatePayment = useCallback(
        async (config: InitiatePaymentConfig): Promise<InitiatePaymentResult> => {
            setPaymentState((prev) => ({
                ...prev,
                status: 'pending',
                loading: true,
                error: null,
            }));

            try {
                const result = await moneyFusionService.initiatePayment(config);

                if (result.success && result.token && result.paymentUrl) {
                    setPaymentState({
                        status: 'initiated',
                        token: result.token,
                        paymentUrl: result.paymentUrl,
                        paymentDetails: null,
                        loading: false,
                        error: null,
                    });

                    onPaymentInitiated?.(result.token, result.paymentUrl);
                } else {
                    handleError(result.error || 'Erreur lors de l\'initiation du paiement');
                }

                return result;
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
                handleError(errorMsg);

                return { success: false, error: errorMsg };
            }
        },
        [onPaymentInitiated, handleError]
    );

    // ==================== VÉRIFICATION PAIEMENT ====================

    const verifyPayment = useCallback(
        async (tokenToVerify?: string): Promise<VerifyPaymentResult> => {
            const token = tokenToVerify || moneyFusionService.getTokenFromUrl();

            if (!token) {
                const errorMsg = 'Aucun token de paiement à vérifier';
                handleError(errorMsg, 'failed');
                return { success: false, error: errorMsg };
            }

            setPaymentState((prev) => ({
                ...prev,
                status: 'processing',
                token,
                loading: true,
                error: null,
            }));

            try {
                const result = await moneyFusionService.verifyPayment(token);

                if (result.success && result.status === 'success') {
                    setPaymentState({
                        status: 'success',
                        token,
                        paymentUrl: null,
                        paymentDetails: result.payment || null,
                        loading: false,
                        error: null,
                    });

                    if (cleanUrlAfterVerify) {
                        moneyFusionService.cleanUrl();
                    }

                    onPaymentSuccess?.(result);
                } else if (result.status === 'already_used') {
                    handleError('Ce paiement a déjà été traité', 'already_used');
                } else {
                    handleError(result.error || 'Erreur lors de la vérification du paiement');
                }

                return result;
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
                handleError(errorMsg);

                return { success: false, error: errorMsg };
            }
        },
        [cleanUrlAfterVerify, onPaymentSuccess, handleError]
    );

    // ==================== AUTO-VÉRIFICATION ====================

    useEffect(() => {
        if (autoVerify) {
            const token = moneyFusionService.getTokenFromUrl();
            if (token) {
                verifyPayment(token);
            }
        }
    }, [autoVerify, verifyPayment]);

    // ==================== RESET ====================

    const reset = useCallback(() => {
        setPaymentState(INITIAL_PAYMENT_STATE);
    }, []);

    // ==================== FORMATAGE ====================

    const formatAmount = useCallback((amount: number) => {
        return moneyFusionService.formatAmount(amount);
    }, []);

    // ==================== RETOUR ====================

    return useMemo(() => ({
        paymentState,
        status: paymentState.status,
        token: paymentState.token,
        paymentUrl: paymentState.paymentUrl,
        paymentDetails: paymentState.paymentDetails,
        loading: paymentState.loading,
        error: paymentState.error,
        initiatePayment,
        verifyPayment,
        reset,
        formatAmount,
    }), [
        paymentState,
        initiatePayment,
        verifyPayment,
        reset,
        formatAmount
    ]);
}

// ==================== HOOK CALLBACK ====================

export function useMoneyFusionCallback(options: {
    onSuccess?: (payment: VerifyPaymentResult) => void;
    onError?: (error: string) => void;
} = {}) {
    return useMoneyFusion({
        autoVerify: true,
        cleanUrlAfterVerify: true,
        onPaymentSuccess: options.onSuccess,
        onPaymentFailed: options.onError,
        onError: options.onError,
    });
}