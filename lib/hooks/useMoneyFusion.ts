/**
 * Hook React personnalisé pour gérer les paiements MoneyFusion
 * 
 * Ce hook simplifie l'intégration des paiements MoneyFusion dans les composants React:
 * - Gestion de l'état du paiement
 * - Initiation de paiement
 * - Vérification automatique au retour
 * - Gestion des erreurs
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { initiatePayment, status, error, loading } = useMoneyFusion();
 * 
 *   const handlePay = async () => {
 *     const result = await initiatePayment({
 *       amount: 5000,
 *       items: [{ consultation: 5000 }],
 *       phoneNumber: '0758385387',
 *       customerName: 'Jean Dupont',
 *     });
 * 
 *     if (result.success) {
 *       window.location.href = result.paymentUrl;
 *     }
 *   };
 * 
 *   return <button onClick={handlePay}>Payer</button>;
 * }
 * ```
 */

import { useCallback, useEffect, useState } from 'react';
import { moneyFusionService } from '@/lib/api/services/moneyfusion.service';
import type {
  InitiatePaymentConfig,
  InitiatePaymentResult,
  PaymentState,
  PaymentStatus,
  VerifyPaymentResult,
} from '@/types/moneyfusion.types';

// ==================== OPTIONS DU HOOK ====================

export interface UseMoneyFusionOptions {
  /**
   * Vérifier automatiquement le paiement au montage du composant
   * (utile pour les pages de callback)
   */
  autoVerify?: boolean;

  /**
   * Callback appelé lorsque le paiement est initié
   */
  onPaymentInitiated?: (token: string, url: string) => void;

  /**
   * Callback appelé lorsque le paiement est vérifié (succès)
   */
  onPaymentSuccess?: (payment: VerifyPaymentResult) => void;

  /**
   * Callback appelé lorsque le paiement échoue
   */
  onPaymentFailed?: (error: string) => void;

  /**
   * Callback appelé pour toute erreur
   */
  onError?: (error: string) => void;

  /**
   * Nettoyer automatiquement l'URL après vérification
   */
  cleanUrlAfterVerify?: boolean;
}

// ==================== RETOUR DU HOOK ====================

export interface UseMoneyFusionReturn {
  /**
   * État actuel du paiement
   */
  paymentState: PaymentState;

  /**
   * Statut du paiement (raccourci pour paymentState.status)
   */
  status: PaymentStatus;

  /**
   * Token du paiement actuel
   */
  token: string | null;

  /**
   * URL de paiement
   */
  paymentUrl: string | null;

  /**
   * Détails du paiement vérifié
   */
  paymentDetails: VerifyPaymentResult['payment'] | null;

  /**
   * Chargement en cours
   */
  loading: boolean;

  /**
   * Erreur actuelle
   */
  error: string | null;

  /**
   * Initie un nouveau paiement
   */
  initiatePayment: (config: InitiatePaymentConfig) => Promise<InitiatePaymentResult>;

  /**
   * Vérifie un paiement manuellement
   */
  verifyPayment: (token?: string) => Promise<VerifyPaymentResult>;

  /**
   * Réinitialise l'état du paiement
   */
  reset: () => void;

  /**
   * Formate un montant en FCFA
   */
  formatAmount: (amount: number) => string;
}

// ==================== HOOK PRINCIPAL ====================

/**
 * Hook pour gérer les paiements MoneyFusion
 */
export function useMoneyFusion(options: UseMoneyFusionOptions = {}): UseMoneyFusionReturn {
  const {
    autoVerify = false,
    onPaymentInitiated,
    onPaymentSuccess,
    onPaymentFailed,
    onError,
    cleanUrlAfterVerify = true,
  } = options;

  // État du paiement
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: 'pending',
    token: null,
    paymentUrl: null,
    paymentDetails: null,
    loading: false,
    error: null,
  });

  // ==================== INITIATION DE PAIEMENT ====================

  /**
   * Initie un paiement
   */
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

          // Callback de succès
          onPaymentInitiated?.(result.token, result.paymentUrl);
        } else {
          const errorMsg = result.error || 'Erreur lors de l\'initiation du paiement';
          
          setPaymentState((prev) => ({
            ...prev,
            status: 'failed',
            loading: false,
            error: errorMsg,
          }));

          // Callbacks d'erreur
          onPaymentFailed?.(errorMsg);
          onError?.(errorMsg);
        }

        return result;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
        
        setPaymentState((prev) => ({
          ...prev,
          status: 'failed',
          loading: false,
          error: errorMsg,
        }));

        onError?.(errorMsg);

        return {
          success: false,
          error: errorMsg,
        };
      }
    },
    [onPaymentInitiated, onPaymentFailed, onError]
  );

  // ==================== VÉRIFICATION DE PAIEMENT ====================

  /**
   * Vérifie un paiement
   */
  const verifyPayment = useCallback(
    async (tokenToVerify?: string): Promise<VerifyPaymentResult> => {
      const token = tokenToVerify || moneyFusionService.getTokenFromUrl();

      if (!token) {
        const errorMsg = 'Aucun token de paiement à vérifier';
        setPaymentState((prev) => ({
          ...prev,
          error: errorMsg,
          loading: false,
        }));
        
        onError?.(errorMsg);

        return {
          success: false,
          error: errorMsg,
        };
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

          // Nettoyer l'URL
          if (cleanUrlAfterVerify) {
            moneyFusionService.cleanUrl();
          }

          // Callback de succès
          onPaymentSuccess?.(result);
        } else if (result.status === 'already_used') {
          setPaymentState((prev) => ({
            ...prev,
            status: 'already_used',
            loading: false,
            error: 'Ce paiement a déjà été traité',
          }));
        } else {
          const errorMsg = result.error || 'Erreur lors de la vérification du paiement';
          
          setPaymentState((prev) => ({
            ...prev,
            status: 'failed',
            loading: false,
            error: errorMsg,
          }));

          onPaymentFailed?.(errorMsg);
          onError?.(errorMsg);
        }

        return result;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
        
        setPaymentState((prev) => ({
          ...prev,
          status: 'failed',
          loading: false,
          error: errorMsg,
        }));

        onError?.(errorMsg);

        return {
          success: false,
          error: errorMsg,
        };
      }
    },
    [cleanUrlAfterVerify, onPaymentSuccess, onPaymentFailed, onError]
  );

  // ==================== AUTO-VÉRIFICATION ====================

  /**
   * Vérifie automatiquement le paiement au montage si activé
   */
  useEffect(() => {
    if (autoVerify) {
      const token = moneyFusionService.getTokenFromUrl();
      if (token) {
        verifyPayment(token);
      }
    }
  }, [autoVerify, verifyPayment]);

  // ==================== RÉINITIALISATION ====================

  /**
   * Réinitialise l'état du paiement
   */
  const reset = useCallback(() => {
    setPaymentState({
      status: 'pending',
      token: null,
      paymentUrl: null,
      paymentDetails: null,
      loading: false,
      error: null,
    });
  }, []);

  // ==================== UTILITAIRES ====================

  /**
   * Formate un montant
   */
  const formatAmount = useCallback((amount: number) => {
    return moneyFusionService.formatAmount(amount);
  }, []);

  // ==================== RETOUR ====================

  return {
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
  };
}

// ==================== HOOK POUR PAGE DE CALLBACK ====================

/**
 * Hook simplifié pour les pages de callback
 * Vérifie automatiquement le paiement au montage
 * 
 * @example
 * ```tsx
 * function CallbackPage() {
 *   const { status, paymentDetails, error, loading } = useMoneyFusionCallback({
 *     onSuccess: (payment) => {
 *       console.log('Paiement réussi!', payment);
 *       router.push('/success');
 *     },
 *     onError: (error) => {
 *       console.error('Erreur:', error);
 *     },
 *   });
 * 
 *   if (loading) return <div>Vérification...</div>;
 *   if (status === 'success') return <div>Succès!</div>;
 *   return <div>Erreur: {error}</div>;
 * }
 * ```
 */
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
