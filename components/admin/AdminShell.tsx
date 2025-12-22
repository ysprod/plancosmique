"use client";
import { MobileNav } from '@/components/admin/MobileNav';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useAuth } from '@/lib/auth/AuthContext';
import { Role } from '@/lib/types/auth.types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  FileText,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, color: 'amber' },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users, color: 'blue' },
  { href: '/admin/consultations', label: 'Consultations', icon: FileText, color: 'green' },
  { href: '/admin/payments', label: 'Paiements', icon: CreditCard, color: 'purple' },
  { href: '/admin/books', label: 'Livres', icon: BookOpen, color: 'indigo' },
  { href: '/admin/offrandes', label: 'Gestion des Offrandes', icon: Shield, color: 'violet' },
  { href: '/admin/spiritualite', label: 'Spiritualité', icon: Flame, color: 'orange' },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings, color: 'gray' },
];

const colorClasses = {
  amber: 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400',
  blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400',
  green: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400',
  purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-400',
  indigo: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400',
  violet: 'bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/30 dark:text-violet-400',
  orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-400',
  gray: 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-950/30 dark:text-gray-400',
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
        <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950">
          
          {/* Sidebar Desktop */}
          <motion.nav
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 
                     hidden lg:flex flex-col shadow-sm"
          >
            {/* Header Sidebar */}
            <div className="p-5 border-b border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 
                              rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-gray-900 dark:text-white">
                    Admin Panel
                  </h2>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    {user?.username || 'Administrateur'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-3 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm
                            transition-all duration-200 relative overflow-hidden group
                            ${isActive 
                              ? colorClasses[item.color as keyof typeof colorClasses]
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                            }
                          `}
                        >
                          {/* Indicateur actif */}
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-r"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}

                          <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                          <span className="flex-1">{item.label}</span>
                          
                          {isActive && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </motion.div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Footer Sidebar - Déconnexion */}
            <div className="p-3 border-t border-gray-200 dark:border-slate-800">
              <motion.button
                onClick={handleLogout}
                disabled={isLoggingOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                         bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 
                         font-bold text-sm hover:bg-red-100 dark:hover:bg-red-950/50
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"
                  />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
              </motion.button>
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
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 
                           shadow-2xl z-50 lg:hidden flex flex-col"
                >
                  {/* Header Mobile */}
                  <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 
                                    rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-sm font-black text-gray-900 dark:text-white">
                          Admin Panel
                        </h2>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                          {user?.username || 'Administrateur'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowMobileSidebar(false)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 
                               flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>

                  {/* Navigation Mobile */}
                  <div className="flex-1 p-3 overflow-y-auto">
                    <ul className="space-y-1">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                          <li key={item.href}>
                            <Link href={item.href} onClick={() => setShowMobileSidebar(false)}>
                              <div className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm
                                transition-colors relative
                                ${isActive 
                                  ? colorClasses[item.color as keyof typeof colorClasses]
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }
                              `}>
                                {isActive && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 
                                                bg-gradient-to-b from-violet-500 to-purple-600 rounded-r" />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                                <span>{item.label}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Footer Mobile */}
                  <div className="p-3 border-t border-gray-200 dark:border-slate-800">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                               bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 
                               font-bold text-sm hover:bg-red-100 dark:hover:bg-red-950/50
                               transition-colors disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <LogOut className="w-5 h-5" />
                      )}
                      {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Bar Mobile */}
            <div className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 
                          backdrop-blur-md border-b border-gray-200 dark:border-slate-800 
                          px-4 py-3 flex items-center justify-between shadow-sm">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 
                         flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700
                         transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 
                              rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white">
                  Admin
                </span>
              </div>

              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Contenu principal */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950">
              <div className="p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {children}
                </motion.div>
              </div>
            </main>
          </div>

          {/* Mobile Nav Bottom (si nécessaire) */}
          <MobileNav />
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
