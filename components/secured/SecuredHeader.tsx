'use client';

import { memo } from 'react';

interface SecuredHeaderProps {
  children: React.ReactNode;
}

const SecuredHeader = memo<SecuredHeaderProps>(({ children }) => {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/55">
      <div className="pt-[env(safe-area-inset-top)]" />
      {children}
    </div>
  );
});

SecuredHeader.displayName = 'SecuredHeader';

export default SecuredHeader;
