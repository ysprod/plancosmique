'use client';

import { MobileNav } from '@/components/admin/MobileNav';
import { useAuth } from '@/lib/auth/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  CreditCard,
  FileText,
  Flame,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, color: 'amber' },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users, color: 'blue' },
  { href: '/admin/consultations', label: 'Consultations', icon: FileText, color: 'green' },
  { href: '/admin/payments', label: 'Paiements', icon: CreditCard, color: 'purple' },
  { href: '/admin/books', label: 'Livres', icon: BookOpen, color: 'indigo' },
  { href: '/admin/spiritualite', label: 'Spiritualité', icon: Flame, color: 'orange' },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings, color: 'gray' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      setIsLoggingOut(true);
      try {
        await logout();
        router.replace('/auth/login');
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
        setIsLoggingOut(false);
      }
    }
  };

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.05
      }
    }
  };

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar Desktop - Ultra-Moderne */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 
                   bg-white border-r border-gray-200 shadow-xl z-40"
      >
        {/* Logo avec animation */}
        <motion.div
          variants={navItemVariants}
          className="flex items-center gap-3 px-6 py-2 border-b border-gray-200 
                     bg-gradient-to-r from-amber-50 to-orange-50"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 
                       rounded-xl flex items-center justify-center shadow-lg"
          >
            <span className="text-white font-bold text-xl">M</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-amber-400 rounded-xl blur-md opacity-50 -z-10"
            />
          </motion.div>
          <div>
            <h1 className="font-bold text-gray-900 flex items-center gap-1.5">
              Mon Étoile
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </h1>
            <p className="text-xs text-gray-600 font-medium">Administration</p>
          </div>
        </motion.div>


        {/* Navigation avec animations */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                variants={navItemVariants}
                custom={index}
              >
                <Link
                  href={item.href}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                               transition-all duration-200 ${isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <div className={`p-1.5 rounded-md ${isActive
                        ? 'bg-white/20'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                      } transition-colors`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>

                    {/* Badge "Active" */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="ml-auto"
                        >
                          <Activity className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout Button avec animation */}
        <motion.div
          variants={navItemVariants}
          className="px-4 py-2 border-t border-gray-200 bg-gray-50"
        >
          <motion.button
            onClick={handleLogout}
            disabled={isLoggingOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-3 text-red-600 
                       hover:bg-red-50 rounded-lg w-full transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed
                       border border-red-200 hover:border-red-300"
          >
            <div className="p-1.5 bg-red-50 rounded-md">
              <LogOut className={`w-4 h-4 ${isLoggingOut ? 'animate-pulse' : ''}`} />
            </div>
            <span className="font-medium text-sm">
              {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
            </span>
            {isLoggingOut && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="ml-auto w-4 h-4 border-2 border-red-600 border-t-transparent 
                           rounded-full"
              />
            )}
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Navigation Mobile Optimisée */}
      <MobileNav />

      {/* Contenu Principal avec animation */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex-1 lg:ml-64 min-h-screen"
      >
        <div className="w-full">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
