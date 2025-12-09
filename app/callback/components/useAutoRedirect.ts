/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';

/**
 * Hook custom pour gérer la redirection automatique avec countdown
 */
export function useAutoRedirect() {
  const [shouldAutoRedirect, setShouldAutoRedirect] = useState(false);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number>(15);

  const resetCountdown = useCallback(() => {
    setAutoRedirectCountdown(15);
    setShouldAutoRedirect(false);
  }, []);

  const startCountdown = useCallback((callback: () => void) => {
    setShouldAutoRedirect(true);
    setAutoRedirectCountdown(15);

    const interval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          callback();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    shouldAutoRedirect,
    setShouldAutoRedirect,
    autoRedirectCountdown,
    setAutoRedirectCountdown,
    resetCountdown,
    startCountdown,
  };
}
