import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  const navigateToProfil = useCallback(() => {
    window.location.href = '/star/profil';
  }, [router]);

  return { navigateToProfil };
}
