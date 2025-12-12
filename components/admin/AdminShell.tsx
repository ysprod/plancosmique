"use client";

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

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Navigation latérale */}
      <nav className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${pathname === item.href ? 'bg-violet-100 text-violet-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-50 text-red-700 font-bold hover:bg-red-100 transition-colors"
          disabled={isLoggingOut}
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </nav>
      {/* Contenu principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
      {/* Mobile nav */}
      <MobileNav />
    </div>
  );
}
