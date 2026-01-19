import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useNavigation() {
  const router = useRouter();

  const navigateToProfil = useCallback(() => {
    router.push('/secured/profil');
  }, [router]);

  return { navigateToProfil };
}
