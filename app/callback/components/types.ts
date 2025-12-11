// /* eslint-disable @typescript-eslint/no-explicit-any */

// /**
//  * Types partagés pour les composants du callback
//  */

// export interface PaymentData {
//   _id: string;
//   tokenPay: string;
//   numeroSend: string;
//   nomclient: string;
//   numeroTransaction?: string;
//   Montant: number;
//   frais: number;
//   statut: 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used';
//   moyen?: string;
//   return_url?: string;
//   createdAt: string;
//   personal_Info?: Array<{
//     userId?: string;
//     consultationId?: string;
//     bookId?: string;
//     type?: 'consultation' | 'book';
//   }>;
// }

// export interface ApiResponse {
//   success: boolean;
//   status: string;
//   data?: PaymentData;
//   message?: string;
//   consultationId?: string;
//   analysisId?: string;
//   downloadUrl?: string;
//   analysisGenerated?: boolean;
// }

// export type PaymentStatus = 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used' | 'error';

// export interface AnalysisStage {
//   progress: number;
//   label: string;
//   icon: any;
//   color: string;
//   description: string;
//   duration: number;
// }

// export interface StatusConfig {
//   icon: any;
//   title: string;
//   description: string;
//   color: string;
//   gradient: string;
//   iconBg: string;
//   iconColor: string;
//   showDetails: boolean;
// }


import type { LucideIcon } from 'lucide-react';

/**
 * Statuts possibles d'un paiement
 */
export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failure'
  | 'no paid'
  | 'already_used'
  | 'error';

/**
 * Configuration d'affichage par statut
 */
export interface StatusConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  showDetails: boolean;
}

/**
 * Informations personnelles du paiement
 */
export interface PersonalInfo {
  userId?: string;
  consultationId?: string;
  bookId?: string;
  type?: 'consultation' | 'book';
  productType?: string;
  [key: string]: unknown;
}

/**
 * Données de paiement
 */
export interface PaymentData {
  _id?: string;
  tokenPay: string;
  numeroSend: string;
  nomclient: string;
  Montant: number;
  frais: number;
  statut: string;
  createdAt: string;
  personal_Info?: PersonalInfo[];
  [key: string]: unknown;
}

/**
 * Étape d'analyse astrologique
 */
export interface AnalysisStage {
  progress: number;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
  duration: number;
}

/**
 * Mise à jour de progression d'analyse (SSE)
 */
export interface AnalysisProgressData {
  consultationId: string;
  stage: string;
  stageIndex: number;
  progress: number;
  message: string;
  timestamp: string;
  completed: boolean;
}

/**
 * Résultat de vérification de paiement
 */
export interface PaymentVerificationResult {
  success: boolean;
  status: string;
  message: string;
  data?: unknown;
}

/**
 * Résultat de traitement de consultation
 */
export interface ConsultationProcessResult {
  success: boolean;
  status: string;
  consultationId?: string;
  downloadUrl?: string;
  message: string;
  data?: unknown;
}
