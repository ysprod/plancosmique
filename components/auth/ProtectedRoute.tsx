'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks';
import { config } from '@/lib/config';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = config.routes.login,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      const currentUrl = window.location.pathname + window.location.search;
      const loginUrl = `${redirectTo}?returnTo=${encodeURIComponent(currentUrl)}`;
      router.push(loginUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Chargement en cours...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    // On ne montre rien, la redirection est gérée par useEffect
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
