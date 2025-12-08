'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
import { MobileNav } from '@/components/admin/MobileNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, FileText, CreditCard, 
  Settings, LogOut 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/admin/consultations', label: 'Consultations', icon: FileText },
  { href: '/admin/payments', label: 'Paiements', icon: CreditCard },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {   logout } = useAuth();

  // useEffect(() => {
  //   if (!loading && (!user || user.role !== 'admin')) {
  //     router.replace('/auth/login');
  //   }
  // }, [user, loading, router]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <motion.div
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  //         className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
  //       />
  //     </div>
  //   );
  // }

  // if (!user || user.role !== 'admin') {
  //   return null;
  // }

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 
                        bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 
                          rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Mon Étoile</h1>
            <p className="text-xs text-gray-600">Administration</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                           transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 
                       hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Navigation Mobile */}
      <MobileNav />

      {/* Contenu Principal */}
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
