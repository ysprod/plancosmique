"use client";
import { ErrorBoundary, LoadingFallback } from '@/components/commons/ErrorBoundary';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/cache/queryClient';
import ServiceWorkerInitializer from '@/components/commons/ServiceWorkerInitializer';
import { Suspense } from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
          <ServiceWorkerInitializer />
        </AuthProvider>
      </ErrorBoundary>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}