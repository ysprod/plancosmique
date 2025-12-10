/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback } from 'react';
import { api } from '@/lib/api/client';
import type { PaymentData } from './types';

export interface VerifyPaymentResponse {
  success: boolean;
  status: string;
  message: string;
  data?: {
    _id: string;
    amount: number;
    status: string;
    method: string;
  };
}

export interface ProcessPaymentResponse {
  success: boolean;
  status: string;
  message: string;
  consultationId?: string;
  bookId?: string;
  downloadUrl?: string;
  data?: {
    paymentId: string;
    amount: number;
    reference: string;
  };
}

/**
 * Hook personnalisé pour la gestion des paiements
 * Les traitements sont maintenant gérés par le backend NestJS
 */
export function usePaymentVerification() {
  /**
   * Vérifier le statut d'un paiement via le backend
   * GET /api/v1/payments/verify?token=xxx
   */
  const verifyPayment = useCallback(async (paymentToken: string): Promise<VerifyPaymentResponse> => {
    try {
      if (!paymentToken || paymentToken.trim() === '') {
        return {
          success: false,
          status: 'error',
          message: 'Token de paiement manquant',
        };
      }

      console.log('🔍 Vérification paiement:', paymentToken);

      const response = await api.get<VerifyPaymentResponse>(`/payments/verify?token=${paymentToken}`);

      console.log('✅ Paiement vérifié:', response.data.status);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur vérification paiement:', error.message);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de vérification du paiement',
      };
    }
  }, []);

  /**
   * Traiter le paiement d'une consultation
   * POST /api/v1/payments/process-consultation
   */
  const processConsultationPayment = useCallback(
    async (paymentToken: string, paymentData: PaymentData): Promise<ProcessPaymentResponse> => {
      try {
        if (!paymentToken) {
          throw new Error('Token de paiement manquant');
        }

        console.log('📊 Traitement consultation:', {
          token: paymentToken,
          type: 'consultation',
        });

        const response = await api.post<ProcessPaymentResponse>('/payments/process-consultation', {
          token: paymentToken,
          paymentData,
        });

        console.log('✅ Consultation traitée:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('❌ Erreur traitement consultation:', error.message);
        return {
          success: false,
          status: 'error',
          message: error.message || 'Erreur de traitement du paiement',
        };
      }
    },
    []
  );

  /**
   * Traiter le paiement d'un livre
   * POST /api/v1/payments/process-book
   */
  const processBookPayment = useCallback(
    async (paymentToken: string, paymentData: PaymentData): Promise<ProcessPaymentResponse> => {
      try {
        if (!paymentToken) {
          throw new Error('Token de paiement manquant');
        }

        console.log('📚 Traitement livre:', {
          token: paymentToken,
          type: 'book',
        });

        const response = await api.post<ProcessPaymentResponse>('/payments/process-book', {
          token: paymentToken,
          paymentData,
        });

        console.log('✅ Livre traité:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('❌ Erreur traitement livre:', error.message);
        return {
          success: false,
          status: 'error',
          message: error.message || 'Erreur de traitement du paiement',
        };
      }
    },
    []
  );

  return {
    verifyPayment,
    processConsultationPayment,
    processBookPayment,
  };
}
