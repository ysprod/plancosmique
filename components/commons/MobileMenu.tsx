'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Crown, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface MobileMenuProps {
  user: any;
  userBadge: { text: string; label: string };
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
  navItems: NavItem[];
  handleLogout: () => void;
}

export function MobileMenu({ 
  user, 
  userBadge, 
  mobileMenuOpen, 
  closeMobileMenu, 
  navItems, 
  handleLogout 
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            style={{ top: user ? '64px' : '60px' }}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed right-0 bottom-0 w-[85vw] max-w-sm
                       bg-white dark:bg-slate-900 shadow-2xl z-40 overflow-y-auto rounded-l-3xl"
            style={{ top: user ? '64px' : '60px' }}
          >
            <div className="p-4 space-y-4">
              {/* User Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 via-fuchsia-50 to-violet-50
                           dark:from-violet-950/30 dark:via-fuchsia-950/30 dark:to-violet-950/30
                           border-2 border-violet-100 dark:border-violet-800 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 
                                    flex items-center justify-center shadow-xl">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2"
                    >
                      <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-black text-slate-900 dark:text-white truncate">
                      {user?.username || "Utilisateur"}
                    </p>
                    <p className="text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text font-bold">
                      {userBadge.label} {userBadge.text.includes('⭐') ? '⭐' : '⚡'}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      <Link href={item.href} onClick={closeMobileMenu}>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl 
                                     text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/30
                                     hover:text-violet-600 dark:hover:text-violet-400
                                     font-bold transition-all text-left relative overflow-hidden
                                     border-2 border-transparent hover:border-violet-200 dark:hover:border-violet-800"
                        >
                          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="flex-1">{item.label}</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Settings Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link href="/secured/settings" onClick={closeMobileMenu}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4
                               rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50
                               dark:from-violet-950/30 dark:to-fuchsia-950/30
                               text-violet-600 dark:text-violet-400 font-bold 
                               border-2 border-violet-200 dark:border-violet-800
                               hover:border-violet-300 dark:hover:border-violet-600
                               hover:shadow-lg transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Paramètres du compte</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleLogout}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-3 px-6 py-4
                           rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 
                           text-white font-black shadow-xl hover:shadow-2xl 
                           hover:shadow-red-500/40 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Se déconnecter</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
