'use client';
import { motion } from 'framer-motion';
import NotificationBell from '@/components/commons/NotificationBell';
import { ScrollProgressBar } from './ScrollProgressBar';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNavigation } from './HeaderNavigation';
import { ThemeToggleButton } from './ThemeToggleButton';
import { UserMenu } from './UserMenu';
import { MobileHeaderActions } from './MobileHeaderActions';
import { MobileMenu } from './MobileMenu';
import { useHeaderState } from './useHeaderState';

export default function HeaderContent() {
  const {
    user,
    theme,
    mounted,
    mobileMenuOpen,
    setMobileMenuOpen,
    isScrolled,
    showUserMenu,
    setShowUserMenu,
    scrollY,
    progressWidth,
    handleLogout,
    closeMobileMenu,
    toggleTheme,
    userBadge,
    navItems,
  } = useHeaderState();

  return (
    <>
      <ScrollProgressBar scrollY={scrollY} progressWidth={progressWidth} />

      {/* Header Principal */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className={`fixed ${user ? 'top-1' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-violet-100/50 dark:border-violet-900/50'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <HeaderLogo />

            <HeaderNavigation navItems={navItems} />

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} mounted={mounted} />
              <NotificationBell />
              <UserMenu 
                user={user}
                userBadge={userBadge}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                handleLogout={handleLogout}
              />
            </div>

            <MobileHeaderActions
              theme={theme}
              toggleTheme={toggleTheme}
              mounted={mounted}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      </motion.header>

      <MobileMenu
        user={user}
        userBadge={userBadge}
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        navItems={navItems}
        handleLogout={handleLogout}
      />

      {/* Spacer pour éviter que le contenu soit caché sous le header */}
      <div className={user ? "h-[60px] sm:h-[68px]" : "h-[56px] sm:h-[64px]"} />
    </>
  );
}
