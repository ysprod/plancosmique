/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Role } from "@/types/auth.types";
import { 
  User, LogOut, Menu, X, Home, FileText, 
  Settings, Sparkles, ChevronDown 
} from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
import { useState, useCallback, useEffect } from "react";

export default function HeaderPage() {
  const { logout, user, hasRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      setMobileMenuOpen(false);
      window.location.href = "/";
    }
  }, [logout]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Menu items
  const navItems = [
    ...(hasRole(Role.SUPER_ADMIN) ? [{ href: "/admin", label: "Tableau de bord", icon: Home }] : []),
    { href: "/protected/consultations", label: "Mes Consultations", icon: FileText },
  ];

  return (
    <div className="relative">
      {/* Progress bar animée - UNIQUEMENT SI CONNECTÉ */}
      {user && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 z-50 origin-left"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed ${user ? 'top-1' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-violet-100' 
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - TOUJOURS VISIBLE */}
            <Link href={user ? "/protected/profil" : "/"} className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 p-[2px] shadow-lg shadow-violet-500/30">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Mon Étoile"
                      width={32}
                      height={32}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                      priority
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-violet-400 blur-md opacity-50 -z-10"
                />
              </motion.div>
              
              {/* Texte "Mon Étoile" + Slogan - TOUJOURS VISIBLE */}
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center gap-1.5">
                  Mon Étoile
                  <Sparkles className="w-4 h-4 text-violet-500" />
                </h1>
                <p className="text-xs text-slate-500 font-medium -mt-0.5">
                  Votre guide spirituel
                </p>
              </div>
            </Link>

            {/* Navigation Desktop - UNIQUEMENT SI CONNECTÉ */}
            {user && (
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                                   text-slate-700 hover:text-violet-600 hover:bg-violet-50 
                                   transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </motion.button>
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* Actions Desktop - UNIQUEMENT SI CONNECTÉ */}
            {user && (
              <div className="hidden lg:flex items-center gap-2">
                {/* Notifications */}
                <NotificationBell />

                {/* User Menu Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-br 
                               from-violet-50 to-fuchsia-50 border border-violet-100 
                               hover:border-violet-200 transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                    flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        {user?.username || "Utilisateur"}
                      </p>
                      <p className="text-xs text-violet-600 font-medium">Premium</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-violet-600 transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowUserMenu(false)}
                          className="fixed inset-0 z-40"
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl 
                                     shadow-xl border border-violet-100 py-2 z-50 overflow-hidden"
                        >
                          <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-sm font-bold text-gray-900">
                              {user?.username}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          
                          <Link href="/protected/settings" onClick={() => setShowUserMenu(false)}>
                            <button
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm
                                         text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors font-medium"
                            >
                              <Settings className="w-4 h-4" />
                              Paramètres
                            </button>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm
                                       text-red-600 hover:bg-red-50 transition-colors font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Mobile: Notifications + Menu Button - UNIQUEMENT SI CONNECTÉ */}
            {user && (
              <div className="flex lg:hidden items-center gap-2">
                <NotificationBell />
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-violet-100 text-violet-600 hover:bg-violet-200 
                             transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - UNIQUEMENT SI CONNECTÉ */}
      {user && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMobileMenu}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 top-16"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] 
                           bg-white shadow-2xl z-40 overflow-y-auto"
              >
                <div className="p-4 space-y-4">
                  {/* User Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-50 
                               border border-violet-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                      flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          {user?.username || "Utilisateur"}
                        </p>
                        <p className="text-sm text-violet-600 font-medium">Membre Premium</p>
                      </div>
                    </div>
                    {user?.email && (
                      <p className="text-xs text-slate-600 truncate">{user.email}</p>
                    )}
                  </motion.div>

                  {/* Navigation Links */}
                  <nav className="space-y-1">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                        >
                          <Link href={item.href} onClick={closeMobileMenu}>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                                         text-slate-700 hover:bg-violet-50 hover:text-violet-600 
                                         font-semibold transition-all text-left"
                            >
                              <Icon className="w-5 h-5" />
                              {item.label}
                            </motion.button>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Settings Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link href="/protected/settings" onClick={closeMobileMenu}>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 
                                   rounded-xl bg-violet-50 text-violet-600 font-bold
                                   hover:bg-violet-100 transition-all"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Paramètres</span>
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Logout Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleLogout}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 
                               rounded-xl bg-gradient-to-r from-red-500 to-rose-600 
                               text-white font-bold shadow-lg hover:shadow-xl 
                               hover:shadow-red-500/30 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Spacer pour éviter que le contenu passe sous le header */}
      <div className={user ? "h-16 sm:h-18" : "h-16 sm:h-17"} />
    </div>
  );
}
