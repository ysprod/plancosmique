/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import type { PaymentStatus } from './types';

/**
 * Hook custom pour gérer le statut et les erreurs du paiement
 */
export function usePaymentStatus() {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [error, setError] = useState<string>('');

  const normalizePaymentStatus = useCallback((apiStatus: string): PaymentStatus => {
    const statusMap: Record<string, PaymentStatus> = {
      pending: 'pending',
      paid: 'paid',
      failure: 'failure',
      'no paid': 'no paid',
      already_used: 'already_used',
    };
    return statusMap[apiStatus] || 'error';
  }, []);

  return {
    status,
    setStatus,
    error,
    setError,
    normalizePaymentStatus,
  };
}
