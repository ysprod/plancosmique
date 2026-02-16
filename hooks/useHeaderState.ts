import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTheme } from 'next-themes';
import { useScroll, useTransform } from 'framer-motion';
import { Role } from '@/lib/interfaces';
import {
  LayoutDashboard,
  User,
  FileText,
  Wallet
} from 'lucide-react';

export function useHeaderState() {
  const { logout, user, hasRole } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect pour la barre de progression
  const progressWidth = useTransform(scrollY, [0, 300], ['0%', '100%']);

  // Montage pour éviter l'hydratation mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Détection du scroll optimisée
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

  // Fermer les menus en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserMenu && !(e.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  // Bloquer le scroll quand le menu mobile est ouvert
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

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Badge utilisateur basé sur le grade réel si présent
  const userBadge = useMemo(() => {
    if (user?.grade) {
      return { text: user.grade, label: `Grade: ${user.grade}` };
    }
    if (hasRole(Role.ADMIN) || hasRole(Role.SUPER_ADMIN)) {
      return { text: 'Admin ⚡', label: 'Membre Admin' };
    }
    return { text: 'Premium ⭐', label: 'Membre Premium' };
  }, [user?.grade, hasRole]);

  // Menu items avec mémoïsation
  const navItems = useMemo(() => [
    ...(hasRole(Role.SUPER_ADMIN)||hasRole(Role.ADMIN) ? [
      { href: "/admin", label: "Admin", icon: LayoutDashboard }
    ] : []),
    { href: "/star/monprofil", label: "Mon Profil", icon: User },
    { href: "/star/consultations", label: "Mes Contenus", icon: FileText },
    { href: "/star/wallet", label: "Mon Portefeuille", icon: Wallet },
  ], [hasRole]);

  return {
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
  };
}
