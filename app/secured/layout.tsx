export const dynamic = "force-dynamic";
import { ProtectedRoute } from '@/components/auth';
import { ErrorBoundary, LoadingFallback } from '@/components/commons/ErrorBoundary';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Suspense } from 'react';
import HeaderContent from '../../components/commons/HeaderContent';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <ProtectedRoute>
            <div className="flex flex-col">
              <HeaderContent />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ProtectedRoute>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}