'use client';

import { ErrorBoundary, LoadingFallback } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth';
import { Suspense } from 'react';
import HeaderContent from '../HeaderContent';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout pour toutes les routes /protected
 * Garantit que TOUTES les pages du dossier /protected nécessitent une authentification
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <HeaderContent />
          <main className="min-h-screen">
            {children}
          </main>
        </ProtectedRoute>
      </Suspense>
    </ErrorBoundary>
  );
}
