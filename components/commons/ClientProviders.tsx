"use client";
import { ErrorBoundary, LoadingFallback } from '@/components/commons/ErrorBoundary';
import ServiceWorkerInitializer from '@/components/commons/ServiceWorkerInitializer';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Suspense } from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
   return (
       <div>
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              {children}
            </Suspense>
            <ServiceWorkerInitializer />
          </AuthProvider>
        </ErrorBoundary>       
      </div>   
  );
}