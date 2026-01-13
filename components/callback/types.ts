import type { LucideIcon } from 'lucide-react';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failure'
  | 'no paid'
  | 'already_used'
  | 'error';
 
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
