import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAnalyseHoroscopePageUI() {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);
  return { handleBack };
}
