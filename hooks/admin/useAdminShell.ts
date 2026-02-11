import { useState, useCallback } from 'react';

import { useAuth } from '@/lib/auth/AuthContext';

export function useAdminShell() {

  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      window.location.href = `/auth/login?r=${Date.now()}`;
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout]);

  return {
    user,
    isLoggingOut,
    showMobileSidebar,
    setShowMobileSidebar,
    handleLogout
  };
}
