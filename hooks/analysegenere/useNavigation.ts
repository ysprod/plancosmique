import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  const navigateToProfil = useCallback(() => {
    router.push('/star/profil');
  }, [router]);

  return { navigateToProfil };
}
