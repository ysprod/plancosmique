'use client';

import { memo } from 'react';
import { ProtectedRoute } from '@/components/auth';

interface SecuredMainProps {
  children: React.ReactNode;
}

const SecuredMain = memo<SecuredMainProps>(({ children }) => {
  return (
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
  );
});

SecuredMain.displayName = 'SecuredMain';

export default SecuredMain;
