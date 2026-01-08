"use client";

import { MobileNav } from '@/components/admin/MobileNav';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Role } from '@/lib/types/auth.types';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AdminSidebarNav } from './AdminSidebarNav';
import { AdminSidebarHeader } from './AdminSidebarHeader';
import { AdminLogoutButton } from './AdminLogoutButton';
import { useAdminShell } from '@/hooks/admin/useAdminShell';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    user,
    isLoggingOut,
    showMobileSidebar,
    setShowMobileSidebar,
    handleLogout
  } = useAdminShell();

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
        <div className="flex bg-gray-50 dark:bg-slate-950 min-h-screen">
          {/* Sidebar Desktop */}
          <motion.nav
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-16 lg:w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 hidden lg:flex flex-col shadow-sm transition-all duration-300"
          >
            <div className="p-2 lg:p-5 border-b border-gray-200 dark:border-slate-800 flex flex-col items-center lg:items-start">
              <AdminSidebarHeader user={user} />
            </div>
            <div className="flex-1 p-1 lg:p-3 overflow-y-auto">
              <AdminSidebarNav pathname={pathname} />
            </div>
            <div className="p-2 lg:p-3 border-t border-gray-200 dark:border-slate-800">
              <AdminLogoutButton onLogout={handleLogout} isLoggingOut={isLoggingOut} />
            </div>
          </motion.nav>

          {/* Sidebar Mobile (Overlay) */}
          <AnimatePresence>
            {showMobileSidebar && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileSidebar(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
                {/* Sidebar */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden flex flex-col"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <AdminSidebarHeader user={user} />
                    <button
                      onClick={() => setShowMobileSidebar(false)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto">
                    <AdminSidebarNav pathname={pathname} onNav={() => setShowMobileSidebar(false)} isMobile />
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-slate-800">
                    <AdminLogoutButton onLogout={handleLogout} isLoggingOut={isLoggingOut} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Bar Mobile */}
            <div className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  {/* Icon */}
                  <span className="inline-block w-5 h-5"><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7z"></path></svg></span>
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white">Admin</span>
              </div>
              <div className="w-10" />
            </div>
            {/* Contenu principal */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950">
              <div className="p-2 sm:p-4 lg:p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {children}
                </motion.div>
              </div>
            </main>
          </div>
          <MobileNav />
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
