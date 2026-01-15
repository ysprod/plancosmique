import { Suspense } from 'react';
import { LoadingFallback } from '@/components/commons/ErrorBoundary';
import HeaderContent from '@/components/commons/HeaderContent';

interface SecuredHeaderSuspenseProps {
  fallbackContent?: React.ReactNode;
}

/**
 * Composant pour gérer le suspense du header
 * Isolé pour réutilisabilité
 */
export function SecuredHeaderSuspense({ 
  fallbackContent = (
    <div className="px-3 py-3 sm:px-4">
      <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-900" />
    </div>
  )
}: SecuredHeaderSuspenseProps) {
  return (
    <Suspense fallback={fallbackContent}>
      <HeaderContent />
    </Suspense>
  );
}
