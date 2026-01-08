import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

export function useAdminShell() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, router]);

  return {
    user,
    isLoggingOut,
    showMobileSidebar,
    setShowMobileSidebar,
    handleLogout
  };
}
