'use client';
import { config } from '@/lib/config';
import { useAuth } from '@/lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { memo, useEffect, useMemo } from 'react';
import CosmicLoader from './CosmicLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

function ProtectedRouteComponent({
  children,
  redirectTo = config.routes.login,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const loginUrl = useMemo(() => {
    if (typeof window === 'undefined') return redirectTo;
    const currentUrl = window.location.pathname + window.location.search;
    return `${redirectTo}?returnTo=${encodeURIComponent(currentUrl)}`;
  }, [redirectTo]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push(loginUrl);
    } else {
      console.warn('[ProtectedRoute] ✅ Authentifié');
    }
  }, [isAuthenticated, isLoading, router, loginUrl]);

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <CosmicLoader />
      </AnimatePresence>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export const ProtectedRoute = memo(ProtectedRouteComponent, (prev, next) => {
  return prev.redirectTo === next.redirectTo;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute; 