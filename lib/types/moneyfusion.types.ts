/**
 * Types TypeScript pour l'intégration MoneyFusion
 * API: https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/
 */

// ==================== TYPES DE BASE ====================

export type PaymentStatus =
  | 'pending'        // En attente d'initialisation
  | 'initiated'      // Paiement initié, en attente de l'utilisateur
  | 'processing'     // Traitement en cours
  | 'success'        // Paiement réussi
  | 'failed'         // Paiement échoué
  | 'cancelled'      // Annulé par l'utilisateur
  | 'expired'        // Token expiré
  | 'already_used';  // Token déjà utilisé

export type PaymentMethod = 'MTN' | 'MOOV' | 'WAVE' | 'ORANGE';

// ==================== REQUÊTE INITIATION PAIEMENT ====================

/**
 * Article dans le panier de paiement
 */
export interface PaymentArticle {
  [key: string]: number; // Ex: { "consultation": 200, "frais": 50 }
}

/**
 * Informations personnelles (optionnel)
 */
export interface PersonalInfo {
  userId?: string;
  orderId?: string;
  email?: string;
  [key: string]: unknown;
}

/**
 * Requête pour initier un paiement MoneyFusion
 */
export interface MoneyFusionPaymentRequest {
  /** Montant total en FCFA */
  totalPrice: number;

  /** Liste des articles avec leurs montants */
  article: PaymentArticle[];

  /** Numéro de téléphone pour le paiement (format: 0XXXXXXXXX) */
  numeroSend: string;

  /** Nom complet du client */
  nomclient: string;

  /** URL de retour après paiement (obligatoire) */
  return_url: string;

  /** URL webhook pour notification asynchrone (obligatoire) */
  webhook_url: string;

  /** Informations additionnelles (optionnel) */
  personal_Info?: PersonalInfo[];

  /** Référence de commande (générée automatiquement si non fournie) */
  reference?: string;
}

// ==================== RÉPONSE INITIATION PAIEMENT ====================

/**
 * Données retournées lors de l'initiation du paiement
 */
export interface MoneyFusionPaymentData {
  /** Token unique pour vérifier le paiement */
  token: string;

  /** URL de redirection vers la page de paiement */
  url: string;

  /** Montant du paiement */
  montant: number;

  /** Numéro de téléphone */
  numeroSend: string;

  /** Nom du client */
  nomclient: string;

  /** Référence de la transaction */
  reference?: string;
}

/**
 * Réponse de l'API MoneyFusion lors de l'initiation
 */
export interface MoneyFusionPaymentResponse {
  /** Statut de la requête (true = succès) */
  statut: boolean;

  /** Message descriptif */
  message: string;

  /** Code de statut HTTP */
  code_statut: number;

  /** Données du paiement (si statut = true) */
  data?: MoneyFusionPaymentData;

  /** URL de paiement (si statut = true) */
  url?: string;
}

// ==================== REQUÊTE VÉRIFICATION PAIEMENT ====================

/**
 * Requête pour vérifier le statut d'un paiement
 */
export interface MoneyFusionVerifyRequest {
  /** Token de paiement reçu lors de l'initiation */
  token: string;
}

// ==================== RÉPONSE VÉRIFICATION PAIEMENT ====================

/**
 * Détails du paiement vérifié
 */
export interface MoneyFusionVerifiedPayment {
  /** Token du paiement */
  token: string;

  /** Montant payé */
  montant: number;

  /** Numéro de téléphone */
  numeroSend: string;

  /** Nom du client */
  nomclient: string;

  /** Date du paiement */
  date_paiement?: string;

  /** Référence de la transaction */
  reference?: string;

  /** Statut du paiement */
  statut: PaymentStatus;

  /** Méthode de paiement utilisée */
  paymentMethod?: PaymentMethod;

  /** Informations additionnelles */
  personal_Info?: PersonalInfo[];
}

/**
 * Réponse de l'API MoneyFusion lors de la vérification
 */
export interface MoneyFusionVerifyResponse {
  /** Statut de la requête (true = succès) */
  statut: boolean;

  /** Message descriptif */
  message: string;

  /** Code de statut HTTP */
  code_statut: number;

  /** Détails du paiement (si statut = true) */
  data?: MoneyFusionVerifiedPayment;

  /** Statut du paiement (success, failed, pending) */
  status?: 'success' | 'failed' | 'pending' | 'already_used';

  /** Détails du paiement (alias de data) */
  payment?: MoneyFusionVerifiedPayment;
}

// ==================== WEBHOOK ====================

/**
 * Payload reçu par le webhook lors d'un paiement
 */
export interface MoneyFusionWebhookPayload {
  /** Token du paiement */
  token: string;

  /** Statut du paiement */
  status: PaymentStatus;

  /** Montant payé */
  amount: number;

  /** Référence de la transaction */
  reference?: string;

  /** Numéro de téléphone */
  phone?: string;

  /** Nom du client */
  customer_name?: string;

  /** Date du paiement */
  payment_date?: string;

  /** Méthode de paiement */
  payment_method?: PaymentMethod;

  /** Informations additionnelles */
  metadata?: PersonalInfo[];
}

// ==================== TYPES POUR LE FRONTEND ====================

/**
 * État du paiement dans l'interface utilisateur
 */
export interface PaymentState {
  /** Statut actuel */
  status: PaymentStatus;

  /** Token de paiement (si disponible) */
  token: string | null;

  /** URL de redirection (si disponible) */
  paymentUrl: string | null;

  /** Détails du paiement vérifié */
  paymentDetails: MoneyFusionVerifiedPayment | null;

  /** Chargement en cours */
  loading: boolean;

  /** Message d'erreur */
  error: string | null;
}

/**
 * Configuration pour initialiser un paiement
 */
export interface InitiatePaymentConfig {
  /** Montant total */
  amount: number;

  /** Articles du panier */
  items: PaymentArticle[];

  /** Numéro de téléphone du client */
  phoneNumber: string;

  /** Nom complet du client */
  customerName: string;

  /** Métadonnées additionnelles */
  metadata?: PersonalInfo;

  /** Référence personnalisée */
  reference?: string;

  /** URL de retour personnalisée (optionnel, utilise celle par défaut sinon) */
  returnUrl?: string;

  /** URL webhook personnalisée (optionnel, utilise celle par défaut sinon) */
  webhookUrl?: string;
}

/**
 * Résultat de l'initiation d'un paiement
 */
export interface InitiatePaymentResult {
  /** Succès de l'opération */
  success: boolean;

  /** Token de paiement */
  token?: string;

  /** URL de redirection */
  paymentUrl?: string;

  /** Message d'erreur */
  error?: string;

  /** Données complètes de la réponse */
  data?: MoneyFusionPaymentResponse;
}

/**
 * Résultat de la vérification d'un paiement
 */
export interface VerifyPaymentResult {
  /** Succès de l'opération */
  success: boolean;

  /** Statut du paiement */
  status?: PaymentStatus;

  /** Détails du paiement */
  payment?: MoneyFusionVerifiedPayment;

  /** Message d'erreur */
  error?: string;

  /** Données complètes de la réponse */
  data?: MoneyFusionVerifyResponse;
}

// ==================== CONFIGURATION ====================

/**
 * Configuration de l'intégration MoneyFusion
 */
export interface MoneyFusionConfig {
  /** URL de l'API MoneyFusion */
  apiUrl: string;

  /** URL de retour par défaut après paiement */
  defaultReturnUrl: string;

  /** URL webhook par défaut pour les notifications */
  defaultWebhookUrl: string;

  /** Clé API ou identifiant marchand (si nécessaire) */
  merchantId?: string;

  /** Mode sandbox (true) ou production (false) */
  sandbox?: boolean;
}

// ==================== ERREURS ====================

/**
 * Erreur MoneyFusion personnalisée
 */
export class MoneyFusionError extends Error {
  constructor(
    message: string,
    public code?: number,
    public status?: PaymentStatus,
    public details?: unknown
  ) {
    super(message);
    this.name = 'MoneyFusionError';
  }
}

// ==================== CONSTANTES ====================

/**
 * Messages d'erreur prédéfinis
 */
export const MONEYFUSION_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au service de paiement',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  INVALID_AMOUNT: 'Montant invalide',
  TOKEN_EXPIRED: 'Le token de paiement a expiré',
  ALREADY_USED: 'Ce paiement a déjà été traité',
  PAYMENT_FAILED: 'Le paiement a échoué',
  PAYMENT_CANCELLED: 'Le paiement a été annulé',
  VERIFICATION_FAILED: 'Impossible de vérifier le paiement',
  UNKNOWN_ERROR: 'Une erreur inconnue est survenue',
} as const;

/**
 * Codes de statut HTTP MoneyFusion
 */
export const MONEYFUSION_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const;
