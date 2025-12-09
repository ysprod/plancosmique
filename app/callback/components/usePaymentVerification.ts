/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback } from 'react';
import type { ApiResponse, PaymentData } from './types';

/**
 * Hook custom pour gérer la vérification des paiements
 */
export function usePaymentVerification() {
  // Vérifier le statut du paiement via MoneyFusion
  const verifyPayment = useCallback(async (paymentToken: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        `https://www.pay.moneyfusion.net/paiementNotif/${paymentToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (!result.statut || !result.data) {
        throw new Error('Format de réponse invalide de MoneyFusion');
      }

      return {
        success: true,
        status: result.data.statut,
        data: result.data,
        message: result.message || 'Paiement vérifié',
      };
    } catch (error: any) {
      console.error('❌ Erreur vérification paiement:', error);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de vérification du paiement',
      };
    }
  }, []);

  // Traiter le paiement après vérification (créer consultation/livre + analyser)
  const processPaymentCallback = useCallback(async (
    paymentToken: string,
    paymentDetails: PaymentData
  ): Promise<ApiResponse> => {
    try {
      const personalInfo = paymentDetails.personal_Info?.[0];
      const type = personalInfo?.type || 'consultation';
      
      const callbackEndpoint = type === 'book' 
        ? '/api/payment/callback/books'
        : '/api/payment/callback';
      
      const response = await fetch(callbackEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: paymentToken,
          status: paymentDetails.statut,
          paymentData: paymentDetails,
          type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        status: 'paid',
        consultationId: result.consultationId,
        analysisId: result.analysisId,
        downloadUrl: result.downloadUrl,
        analysisGenerated: result.analysisGenerated,
        message: result.message || 'Paiement traité avec succès',
      };
    } catch (error: any) {
      console.error('❌ Erreur traitement callback:', error);
      return {
        success: false,
        status: 'error',
        message: error.message || 'Erreur de traitement du paiement',
      };
    }
  }, []);

  return {
    verifyPayment,
    processPaymentCallback,
  };
}
