import { useCallback } from 'react';

export function useNavigation() {

  const navigateToProfil = useCallback(() => {
    window.location.href = '/star/profil';
  }, []);

  return { navigateToProfil };
}
