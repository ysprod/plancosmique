export const dynamic = "force-dynamic";

import { ProtectedRoute } from "@/components/auth";
import { ErrorBoundary, LoadingFallback } from "@/components/commons/ErrorBoundary";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Suspense } from "react";
import HeaderContent from "@/components/commons/HeaderContent";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="min-h-[100dvh] bg-white dark:bg-gray-950">
          <div className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/55">
            <div className="pt-[env(safe-area-inset-top)]" />
            <Suspense
              fallback={
                <div className="px-3 py-3 sm:px-4">
                  <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-900" />
                </div>
              }
            >
              <HeaderContent />
            </Suspense>
          </div>
          <Suspense fallback={<LoadingFallback />}>
            <ProtectedRoute>
              <main
                id="main-content"
                role="main"
                aria-label="Espace sécurisé"
                className="mx-auto w-full max-w-6xl px-3 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pt-5"
              >
                {children}
              </main>
            </ProtectedRoute>
          </Suspense>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}