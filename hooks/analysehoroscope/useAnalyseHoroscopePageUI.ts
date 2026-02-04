
import { useCallback } from 'react';

export function useAnalyseHoroscopePageUI() {

  const handleBack = useCallback(() => window.history.back(), []);
  return { handleBack };
}
