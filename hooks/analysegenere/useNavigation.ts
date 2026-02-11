import { useCallback } from 'react';

export function useNavigation() {

  const navigateToProfil = useCallback(() => {
    window.location.href = `/star/profil?r=${Date.now()}`;
  }, []);

  return { navigateToProfil };
}
