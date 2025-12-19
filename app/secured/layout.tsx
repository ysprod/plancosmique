


export const dynamic = "force-dynamic";
import { ErrorBoundary, LoadingFallback } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth';
import { Suspense } from 'react';
import HeaderContent from '../../components/HeaderContent';
import { AuthProvider } from '@/lib/auth/AuthContext';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout pour toutes les routes /secured
 * Garantit que TOUTES les pages du dossier /secured nécessitent une authentification
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
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
