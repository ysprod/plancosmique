'use client';
import { usePermissionCheck } from '@/hooks/auth/usePermissionCheck';
import { config } from '@/lib/config';
import { Permission } from '@/lib/interfaces';
import React, { useEffect } from 'react';
import { PermissionDenied } from './PermissionDenied';
import { PermissionLoadingState } from './PermissionLoadingState';

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
 
  const {
    user,
    isAuthenticated,
    isLoading,
    hasRequiredPermissions,
    permissionsArray,
  } = usePermissionCheck({ requiredPermissions, requireAll });

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasRequiredPermissions && redirectTo) {
      const urlWithCacheBust = redirectTo.includes('?') ? `${redirectTo}&r=${Date.now()}` : `${redirectTo}?r=${Date.now()}`;
      window.location.href = urlWithCacheBust;
    }
  }, [isAuthenticated, isLoading, hasRequiredPermissions,  redirectTo]);

  if (isLoading) {
    return <PermissionLoadingState />;
  }

  if (!isAuthenticated) {
    if (redirectTo) {
      window.location.href = `${config.routes.login}?r=${Date.now()}`;
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