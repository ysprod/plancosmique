'use client';
import { memo } from 'react';
import NotFoundBackground from '@/components/notfound/NotFoundBackground';
import NotFoundContent from '@/components/notfound/NotFoundContent';

function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden px-4">
      <NotFoundBackground />

      <NotFoundContent />
    </div>
  );
}

export default memo(NotFoundComponent, () => true);