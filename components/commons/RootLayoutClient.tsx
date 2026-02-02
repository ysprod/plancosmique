'use client';
import NotificationBell from '@/components/commons/NotificationBell';
import ThemeToggle from '@/components/commons/ThemeToggle';
import MobileMenuOverlay from '@/components/commons/MobileMenuOverlay';
import MobileUserCard from '@/components/commons/MobileUserCard';
import MobileNavLinks from '@/components/commons/MobileNavLinks';
import MobileMenuSettingsButton from '@/components/commons/MobileMenuSettingsButton';
import MobileMenuLogoutButton from '@/components/commons/MobileMenuLogoutButton';
import { useAuth } from '@/lib/auth/AuthContext';
import { Role } from '@/lib/interfaces';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronDown, Crown, FileText, LayoutDashboard, LogOut, Menu,
  Settings, Sparkles, User, X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function HeaderContent() {
  const { logout, user, hasRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { scrollY } = useScroll();

  const progressWidth = useTransform(scrollY, [0, 300], ['0%', '100%']);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserMenu && !(e.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = useCallback(() => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      setMobileMenuOpen(false);
      setShowUserMenu(false);
      logout();
    }
  }, [logout]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);



  const userBadge = useMemo(() => {
    if (user?.grade) {
      // Affiche le grade réel de l'utilisateur
      return { text: user.grade, label: `Grade: ${user.grade}` };
    }
    if (hasRole(Role.ADMIN) || hasRole(Role.SUPER_ADMIN)) {
      return { text: 'Admin ⚡', label: 'Membre Admin' };
    }
    return { text: 'Premium ⭐', label: 'Membre Premium' };
  }, [user?.grade, hasRole]);

  const navItems = useMemo(() => [
    ...(hasRole(Role.SUPER_ADMIN) ? [
      { href: "/admin", label: "Administration", icon: LayoutDashboard }
    ] : []),
    { href: "/star/consultations", label: "Mes Consultations", icon: FileText },
  ], [hasRole]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 origin-left"
        style={{ scaleX: scrollY.get() > 0 ? progressWidth : 0 }}
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </motion.div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className={`fixed ${user ? 'top-1' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl shadow-lg shadow-violet-500/5 dark:shadow-violet-500/10 border-b border-violet-100/50 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/star/profil" className="flex items-center gap-2 sm:gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.08 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 p-[2px] shadow-xl shadow-violet-500/40">
                  <div className="w-full h-full rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Mon Étoile"
                      width={40}
                      height={40}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      priority
                    />
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-violet-400 blur-lg opacity-40 -z-10"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-lg" />
                </motion.div>
              </motion.div>

              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-transparent bg-clip-text flex items-center gap-1.5">
                  Mon Étoile
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Sparkles className="w-4 h-4 text-violet-500" />
                  </motion.div>
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold -mt-0.5 tracking-wide">
                  Votre guide spirituel ✨
                </p>
              </div>

              <div className="sm:hidden">
                <h1 className="text-base font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text">
                  Mon Étoile
                </h1>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold
                                 text-slate-700 dark:text-slate-200 
                                 hover:text-violet-600 dark:hover:text-violet-400
                                 hover:bg-violet-50/80 dark:hover:bg-violet-950/50
                                 transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </motion.button>
                  </Link>
                );
              })}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <NotificationBell />

              {/* Menu Utilisateur */}
              <div className="relative user-menu-container">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl 
                             bg-gradient-to-br from-violet-50 to-fuchsia-50 
                             dark:from-violet-950/50 dark:to-fuchsia-950/50
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

                {/* Dropdown Menu - Reste inchangé */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 
                                 bg-white dark:bg-slate-800 rounded-2xl 
                                 shadow-2xl border-2 border-violet-100 dark:border-slate-700 
                                 overflow-hidden z-50"
                    >
                      {/* Header du menu */}
                      <div className="px-4 py-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 
                                    dark:from-violet-950/50 dark:to-fuchsia-950/50
                                    border-b border-violet-100 dark:border-slate-700">
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

                      <div className="p-2">
                        <Link href="/star/settings" onClick={() => setShowUserMenu(false)}>
                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                       text-slate-700 dark:text-slate-200 
                                       hover:bg-violet-50 dark:hover:bg-violet-950/50
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
                                     text-red-600 dark:text-red-400 
                                     hover:bg-red-50 dark:hover:bg-red-950/50
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
            </div>

            {/* Actions Mobile */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
              <NotificationBell />

              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 
                           dark:from-violet-950/50 dark:to-fuchsia-950/50
                           text-violet-600 dark:text-violet-400
                           hover:shadow-lg hover:shadow-violet-500/20
                           transition-all"
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
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile - Reste du code inchangé mais avec dark: classes ajoutées */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <MobileMenuOverlay onClick={closeMobileMenu} />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-40 overflow-y-auto rounded-l-3xl"
              style={{ top: undefined }}
            >
              <div className="p-4 space-y-4">
                <MobileUserCard user={user} userBadge={userBadge} />
                <MobileNavLinks navItems={navItems} closeMobileMenu={closeMobileMenu} />
                <MobileMenuSettingsButton closeMobileMenu={closeMobileMenu} />
                <MobileMenuLogoutButton handleLogout={handleLogout} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className={user ? "h-[60px] sm:h-[68px]" : "h-[56px] sm:h-[64px]"} />
    </>
  );
}
