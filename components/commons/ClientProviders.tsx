"use client";
import { ErrorBoundary, LoadingFallback } from '@/components/commons/ErrorBoundary';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Suspense } from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}
