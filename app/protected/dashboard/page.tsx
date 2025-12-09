'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks';
import { Role } from '@/types/auth.types';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Rediriger vers le dashboard approprié selon le rôle
      switch (user.role) {
        case Role.SUPER_ADMIN:
        case Role.ADMIN:
          router.push('/admin');
          break;
        case Role.CONSULTANT:
          router.push('/consultant');
          break;
        case Role.USER:
        default:
          router.push('/user');
          break;
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600 text-lg">Redirection vers votre dashboard...</p>
      </div>
    </div>
  );
}
