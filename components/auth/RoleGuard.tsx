'use client';
import { config } from '@/lib/config';
import { useAuth } from '@/lib/hooks';
import { Role } from '@/lib/interfaces';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role | Role[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectTo,
  fallback,
}) => {
  const { user, isAuthenticated, isLoading, hasRole } = useAuth();
  const router = useRouter();

  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const hasRequiredRole = hasRole(rolesArray);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasRequiredRole && redirectTo) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, hasRequiredRole, router, redirectTo]);

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
    return fallback || <AccessDenied message="Vous devez être connecté" />;
  }

  if (!hasRequiredRole) {
    if (redirectTo) {
      return null;
    }
    return (
      fallback || (
        <AccessDenied
          message={`Accès réservé aux rôles : ${rolesArray.join(', ')}`}
          userRole={user?.role}
        />
      )
    );
  }

  return <>{children}</>;
};


const AccessDenied: React.FC<{ message: string; userRole?: Role }> = ({
  message, userRole, }) => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-200">
        <ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Accès refusé
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

export default RoleGuard;