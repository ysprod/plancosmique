'use client';

import { memo } from 'react';

interface RootMainProps {
  children: React.ReactNode;
}

/**
 * Conteneur principal avec rôle et aria-label sémantiques
 */
const RootMain = memo<RootMainProps>(({ children }) => {
  return (
    <main 
      id="main-content" 
      className="relative" 
      role="main" 
      aria-label="Contenu principal"
    >
      {children}
    </main>
  );
});

RootMain.displayName = 'RootMain';

export default RootMain;
