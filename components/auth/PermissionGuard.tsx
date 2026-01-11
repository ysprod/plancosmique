'use client'; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks';
import { Permission } from '@/lib/interfaces';
import { config } from '@/lib/config';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermissions: Permission | Permission[];
  requireAll?: boolean; // true = besoin de toutes les permissions, false = au moins une
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermissions,
  requireAll = false,
  redirectTo,
  fallback,
}) => {
  const { user, isAuthenticated, isLoading, hasPermission } = useAuth();
  const router = useRouter();

  const permissionsArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const hasRequiredPermissions = requireAll
    ? permissionsArray.every((perm) => hasPermission(perm))
    : permissionsArray.some((perm) => hasPermission(perm));

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasRequiredPermissions && redirectTo) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, hasRequiredPermissions, router, redirectTo]);

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (redirectTo) {
      router.push(config.routes.login);
      return null;
    }
    return fallback || <PermissionDenied message="Vous devez être connecté" />;
  }

  if (!hasRequiredPermissions) {
    if (redirectTo) {
      return null;
    }
    return (
      fallback || (
        <PermissionDenied
          message={`Permissions requises : ${permissionsArray.join(', ')}`}
          userRole={user?.role}
        />
      )
    );
  }

  return <>{children}</>;
};
 
const PermissionDenied: React.FC<{ message: string; userRole?: string }> = ({
  message,
  userRole,
}) => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-200">
        <ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Permission refusée
        </h2>
        <p className="text-slate-600 mb-4">{message}</p>
        {userRole && (
          <p className="text-sm text-slate-500">
            Votre rôle actuel : <span className="font-semibold">{userRole}</span>
          </p>
        )}
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default PermissionGuard;
