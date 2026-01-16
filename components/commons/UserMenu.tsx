'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Crown, ChevronDown, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface UserMenuProps {
  user: any;
  userBadge: { text: string; label: string };
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  handleLogout: () => void;
}

export function UserMenu({ user, userBadge, showUserMenu, setShowUserMenu, handleLogout }: UserMenuProps) {
  return (
    <div className="relative user-menu-container">
      <motion.button
        onClick={() => setShowUserMenu(!showUserMenu)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-br 
                   from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30
                   border-2 border-violet-100 dark:border-violet-800
                   hover:border-violet-300 dark:hover:border-violet-600
                   hover:shadow-lg hover:shadow-violet-500/20
                   transition-all duration-300"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 
                          flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          {/* Badge Premium */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1"
          >
            <Crown className="w-4 h-4 text-yellow-400 drop-shadow-lg" />
          </motion.div>
        </div>

        <div className="text-left">
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight max-w-[120px] truncate">
            {user?.username || "Utilisateur"}
          </p>
          <p className="text-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text font-black">
            {userBadge.text}
          </p>
        </div>

        <motion.div
          animate={{ rotate: showUserMenu ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl 
                       shadow-2xl border-2 border-violet-100 dark:border-violet-800 overflow-hidden z-50"
          >
            {/* Header du menu */}
            <div className="px-4 py-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 
                          dark:from-violet-950/30 dark:to-fuchsia-950/30 
                          border-b border-violet-100 dark:border-violet-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 
                                flex items-center justify-center shadow-md relative">
                  <User className="w-6 h-6 text-white" />
                  <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
                    {user?.username}
                  </p>
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-semibold">{userBadge.label}</p>
                </div>
              </div>
              {user?.email && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">{user.email}</p>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link href="/secured/settings" onClick={() => setShowUserMenu(false)}>
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                             text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/30
                             hover:text-violet-600 dark:hover:text-violet-400
                             transition-all font-semibold text-sm"
                >
                  <Settings className="w-5 h-5" />
                  Paramètres
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30
                           transition-all font-semibold text-sm"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
