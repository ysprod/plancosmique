
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

  // Mémoïser la construction de l'URL de redirection
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

  // Afficher le loader cosmique pendant le chargement
  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <CosmicLoader />
      </AnimatePresence>
    );
  }

  // Si non authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  // Utilisateur authentifié, afficher le contenu protégé
  return <>{children}</>;
}

export const ProtectedRoute = memo(ProtectedRouteComponent, (prev, next) => {
  // Re-render seulement si redirectTo change
  return prev.redirectTo === next.redirectTo;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;

export default ProtectedRoute;
