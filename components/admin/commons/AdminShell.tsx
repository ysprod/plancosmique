"use client";
import { MobileNav } from '@/components/admin/commons/MobileNav';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useAdminShellSidebar } from '@/hooks/admin/useAdminShellSidebar';
import { Role } from '@/lib/interfaces';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AdminShellDesktopSidebar } from './AdminShellDesktopSidebar';
import { AdminShellMainContent } from './AdminShellMainContent';
import { AdminShellMobileSidebar } from './AdminShellMobileSidebar';
import { AdminShellTopBar } from './AdminShellTopBar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const {
    user, isLoggingOut, showMobileSidebar, pathname,
    setShowMobileSidebar, handleLogout,
  } = useAdminShellSidebar();

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
        <div className="flex bg-gray-50 dark:bg-slate-950 min-h-screen">
          <AdminShellDesktopSidebar
            user={user}
            pathname={pathname}
            handleLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
          
          <AnimatePresence>
            <AdminShellMobileSidebar
              user={user}
              isLoggingOut={isLoggingOut}
              showMobileSidebar={showMobileSidebar}
              setShowMobileSidebar={setShowMobileSidebar}
              handleLogout={handleLogout}
              pathname={pathname}
            />
          </AnimatePresence>

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <AdminShellTopBar setShowMobileSidebar={setShowMobileSidebar} />
            <AdminShellMainContent>{children}</AdminShellMainContent>
          </div>
          <MobileNav />
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}