/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Types partagés pour les composants du callback
 */

export interface PaymentData {
  _id: string;
  tokenPay: string;
  numeroSend: string;
  nomclient: string;
  numeroTransaction?: string;
  Montant: number;
  frais: number;
  statut: 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used';
  moyen?: string;
  return_url?: string;
  createdAt: string;
  personal_Info?: Array<{
    userId?: string;
    consultationId?: string;
    bookId?: string;
    type?: 'consultation' | 'book';
  }>;
}

export interface ApiResponse {
  success: boolean;
  status: string;
  data?: PaymentData;
  message?: string;
  consultationId?: string;
  analysisId?: string;
  downloadUrl?: string;
  analysisGenerated?: boolean;
}

export type PaymentStatus = 'pending' | 'paid' | 'failure' | 'no paid' | 'already_used' | 'error';

export interface AnalysisStage {
  progress: number;
  label: string;
  icon: any;
  color: string;
  description: string;
  duration: number;
}

export interface StatusConfig {
  icon: any;
  title: string;
  description: string;
  color: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  showDetails: boolean;
}
