export const dynamic = "force-dynamic";

import { ErrorBoundary } from "@/components/commons/ErrorBoundary";
import { AuthProvider } from "@/lib/auth/AuthContext";
import SecuredHeader from "@/components/secured/SecuredHeader";
import SecuredMain from "@/components/secured/SecuredMain";
import { SecuredHeaderSuspense } from "@/components/secured/SecuredHeaderSuspense";
import { SecuredMainSuspense } from "@/components/secured/SecuredMainSuspense";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <SecuredHeader>
          <SecuredHeaderSuspense />
        </SecuredHeader>
        <SecuredMainSuspense>
          <SecuredMain>
            {children}
          </SecuredMain>
        </SecuredMainSuspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}
