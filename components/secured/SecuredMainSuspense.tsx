import { Suspense } from 'react';
import { LoadingFallback } from '@/components/commons/ErrorBoundary';

interface SecuredMainSuspenseProps {
  children: React.ReactNode;
}

/**
 * Composant pour gérer le suspense du main content
 * Isolé pour réutilisabilité
 */
export function SecuredMainSuspense({ children }: SecuredMainSuspenseProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}
