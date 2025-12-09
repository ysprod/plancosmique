'use client';

import { ProtectedRoute } from '@/components/auth';
import React from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout pour toutes les routes /protected
 * Garantit que TOUTES les pages du dossier /protected nécessitent une authentification
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
