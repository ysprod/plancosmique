/**
 * Service MoneyFusion - Gestion des paiements
 * 
 * Ce service gère l'intégration complète avec l'API MoneyFusion:
 * - Initiation de paiements
 * - Vérification de statut
 * - Gestion des webhooks
 * 
 * @example
 * ```typescript
 * import { moneyFusionService } from '@/lib/api/services/moneyfusion.service';
 * 
 * // Initier un paiement
 * const result = await moneyFusionService.initiatePayment({
 *   amount: 5000,
 *   items: [{ consultation: 5000 }],
 *   phoneNumber: '0758385387',
 *   customerName: 'Jean Dupont',
 * });
 * 
 * // Vérifier un paiement
 * const verification = await moneyFusionService.verifyPayment(token);
 * ```
 */

import axios, { AxiosError } from 'axios';
import type {
  InitiatePaymentConfig,
  InitiatePaymentResult,
  MoneyFusionConfig,
  MoneyFusionError,
  MoneyFusionPaymentRequest,
  MoneyFusionPaymentResponse,
  MoneyFusionVerifyRequest,
  MoneyFusionVerifyResponse,
  VerifyPaymentResult,
} from '@/types/moneyfusion.types';
import { MONEYFUSION_ERROR_MESSAGES } from '@/types/moneyfusion.types';

// ==================== CONFIGURATION ====================

/**
 * Configuration par défaut de MoneyFusion
 */
const DEFAULT_CONFIG: MoneyFusionConfig = {
  apiUrl: 'https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/',
  defaultReturnUrl: process.env.NEXT_PUBLIC_APP_URL 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/callback`
    : 'https://www.monetoile.org/callback',
  defaultWebhookUrl: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/moneyfusion`
    : 'https://www.monetoile.org/api/webhooks/moneyfusion',
  sandbox: process.env.NODE_ENV === 'development',
};

// ==================== VALIDATIONS ====================

/**
 * Valide un numéro de téléphone (format: 0XXXXXXXXX)
 */
function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Valide un montant (doit être positif)
 */
function validateAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

/**
 * Génère une référence unique pour une transaction
 */
function generateReference(prefix = 'TRX'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}_${timestamp}_${random}`;
}

// ==================== SERVICE PRINCIPAL ====================

class MoneyFusionService {
  private config: MoneyFusionConfig;

  constructor(config?: Partial<MoneyFusionConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Configure ou met à jour la configuration du service
   */
  public configure(config: Partial<MoneyFusionConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Récupère la configuration actuelle
   */
  public getConfig(): MoneyFusionConfig {
    return { ...this.config };
  }

  // ==================== INITIATION DE PAIEMENT ====================

  /**
   * Initie un paiement avec MoneyFusion
   * 
   * @param config - Configuration du paiement
   * @returns Résultat contenant le token et l'URL de paiement
   * 
   * @example
   * ```typescript
   * const result = await moneyFusionService.initiatePayment({
   *   amount: 5000,
   *   items: [{ consultation: 5000 }],
   *   phoneNumber: '0758385387',
   *   customerName: 'Jean Dupont',
   *   metadata: { consultationId: '123', userId: '456' },
   * });
   * 
   * if (result.success) {
   *   // Rediriger vers l'URL de paiement
   *   window.location.href = result.paymentUrl;
   * }
   * ```
   */
  public async initiatePayment(
    config: InitiatePaymentConfig
  ): Promise<InitiatePaymentResult> {
    try {
      // Validation des entrées
      if (!validatePhoneNumber(config.phoneNumber)) {
        return {
          success: false,
          error: MONEYFUSION_ERROR_MESSAGES.INVALID_PHONE,
        };
      }

      if (!validateAmount(config.amount)) {
        return {
          success: false,
          error: MONEYFUSION_ERROR_MESSAGES.INVALID_AMOUNT,
        };
      }

      // Préparation de la requête
      const paymentRequest: MoneyFusionPaymentRequest = {
        totalPrice: config.amount,
        article: config.items,
        numeroSend: config.phoneNumber,
        nomclient: config.customerName,
        return_url: config.returnUrl || this.config.defaultReturnUrl,
        webhook_url: config.webhookUrl || this.config.defaultWebhookUrl,
        reference: config.reference || generateReference('MONETOILE'),
      };

      // Ajouter les métadonnées si présentes
      if (config.metadata) {
        paymentRequest.personal_Info = [config.metadata];
      }

      // Appel à l'API MoneyFusion
      const response = await axios.post<MoneyFusionPaymentResponse>(
        this.config.apiUrl,
        paymentRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 secondes
        }
      );

      // Traitement de la réponse
      if (response.data.statut && response.data.data) {
        return {
          success: true,
          token: response.data.data.token,
          paymentUrl: response.data.data.url || response.data.url,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: response.data.message || MONEYFUSION_ERROR_MESSAGES.UNKNOWN_ERROR,
          data: response.data,
        };
      }
    } catch (error) {
      return this.handleInitiateError(error, 'initiatePayment');
    }
  }

  // ==================== VÉRIFICATION DE PAIEMENT ====================

  /**
   * Vérifie le statut d'un paiement via le backend
   * 
   * @param token - Token du paiement à vérifier
   * @returns Résultat de la vérification
   * 
   * @example
   * ```typescript
   * const result = await moneyFusionService.verifyPayment(token);
   * 
   * if (result.success && result.status === 'success') {
   *   console.log('Paiement réussi:', result.payment);
   * }
   * ```
   */
  public async verifyPayment(token: string): Promise<VerifyPaymentResult> {
    try {
      if (!token) {
        return {
          success: false,
          error: 'Token de paiement manquant',
        };
      }

      const verifyRequest: MoneyFusionVerifyRequest = { token };

      // Appel au backend qui fera la vérification côté serveur
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await axios.post<MoneyFusionVerifyResponse>(
        `${backendUrl}/payments/moneyfusion/verify`,
        verifyRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      // Traitement de la réponse
      if (response.data.statut && response.data.data) {
        return {
          success: true,
          status: response.data.data.statut,
          payment: response.data.data,
          data: response.data,
        };
      } else if (response.data.status) {
        // Format alternatif de la réponse
        return {
          success: response.data.status === 'success',
          status: response.data.status === 'success' ? 'success' : 'failed',
          payment: response.data.payment,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: response.data.message || MONEYFUSION_ERROR_MESSAGES.VERIFICATION_FAILED,
          data: response.data,
        };
      }
    } catch (error) {
      return this.handleVerifyError(error, 'verifyPayment');
    }
  }

  // ==================== MÉTHODES UTILITAIRES ====================

  /**
   * Vérifie si un token est dans l'URL (callback)
   */
  public getTokenFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token') || urlParams.get('t');
  }

  /**
   * Vérifie si un statut est dans l'URL (callback)
   */
  public getStatusFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('status');
  }

  /**
   * Nettoie l'URL des paramètres de paiement
   */
  public cleanUrl(): void {
    if (typeof window === 'undefined') return;
    
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  /**
   * Génère une URL de callback avec des paramètres personnalisés
   */
  public generateCallbackUrl(params?: Record<string, string>): string {
    const baseUrl = this.config.defaultReturnUrl;
    
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }

    const searchParams = new URLSearchParams(params);
    return `${baseUrl}?${searchParams.toString()}`;
  }

  /**
   * Formate un montant pour l'affichage (FCFA)
   */
  public formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // ==================== GESTION DES ERREURS ====================

  /**
   * Gère les erreurs pour initiatePayment
   */
  private handleInitiateError(
    error: unknown,
    context: string
  ): InitiatePaymentResult {
    console.error(`[MoneyFusion] Erreur dans ${context}:`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<MoneyFusionPaymentResponse>;
      
      if (axiosError.response?.data) {
        return {
          success: false,
          error: axiosError.response.data.message || MONEYFUSION_ERROR_MESSAGES.UNKNOWN_ERROR,
          data: axiosError.response.data,
        };
      }

      if (axiosError.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Délai de connexion dépassé. Veuillez réessayer.',
        };
      }

      if (!axiosError.response) {
        return {
          success: false,
          error: MONEYFUSION_ERROR_MESSAGES.NETWORK_ERROR,
        };
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: MONEYFUSION_ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }

  /**
   * Gère les erreurs pour verifyPayment
   */
  private handleVerifyError(
    error: unknown,
    context: string
  ): VerifyPaymentResult {
    console.error(`[MoneyFusion] Erreur dans ${context}:`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<MoneyFusionVerifyResponse>;
      
      if (axiosError.response?.data) {
        return {
          success: false,
          error: axiosError.response.data.message || MONEYFUSION_ERROR_MESSAGES.UNKNOWN_ERROR,
          data: axiosError.response.data,
        };
      }

      if (axiosError.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Délai de connexion dépassé. Veuillez réessayer.',
        };
      }

      if (!axiosError.response) {
        return {
          success: false,
          error: MONEYFUSION_ERROR_MESSAGES.NETWORK_ERROR,
        };
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: MONEYFUSION_ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
}

// ==================== EXPORT ====================

/**
 * Instance par défaut du service MoneyFusion
 */
export const moneyFusionService = new MoneyFusionService();

/**
 * Export de la classe pour instanciation personnalisée
 */
export { MoneyFusionService };

/**
 * Export des types
 */
export type {
  InitiatePaymentConfig,
  InitiatePaymentResult,
  VerifyPaymentResult,
  MoneyFusionConfig,
  MoneyFusionError,
};
