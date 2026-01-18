'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Permission } from '@/lib/interfaces';
import { config } from '@/lib/config';
import { usePermissionCheck } from '@/hooks/auth/usePermissionCheck';
import { PermissionLoadingState } from './PermissionLoadingState';
import { PermissionDenied } from './PermissionDenied';

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
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    hasRequiredPermissions,
    permissionsArray,
  } = usePermissionCheck({ requiredPermissions, requireAll });

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasRequiredPermissions && redirectTo) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, hasRequiredPermissions, router, redirectTo]);

  if (isLoading) {
    return <PermissionLoadingState />;
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

export default PermissionGuard;