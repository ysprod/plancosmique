/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import type { PaymentData } from './types';

/**
 * Hook custom pour gérer les actions de navigation
 */
export function usePaymentActions() {
  const router = useRouter();

  const handleViewConsultation = useCallback(
    (consultationId: string | null) => {
      if (consultationId) {
        router.push(`/protected/consultations/${consultationId}`);
      }
    },
    [router]
  );

  const handleDownloadBook = useCallback((downloadUrl: string | null) => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    router.push('/protected/profil');
  }, [router]);

  const handleAutoRedirect = useCallback(
    (paymentData: PaymentData | null, consultationId: string | null, downloadUrl: string | null) => {
      const personalInfo = paymentData?.personal_Info?.[0];
      const type = personalInfo?.type || 'consultation';

      if (type === 'book' && downloadUrl) {
        router.push('/protected/bibliotheque');
      } else if (consultationId) {
        router.push(`/protected/consultations/${consultationId}`);
      } else {
        router.push('/protected/consultations');
      }
    },
    [router]
  );

  return {
    handleViewConsultation,
    handleDownloadBook,
    handleRetry,
    handleGoHome,
    handleAutoRedirect,
  };
}
