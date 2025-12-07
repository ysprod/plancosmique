'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  FileText,
  CreditCard,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
    },
    {
      label: 'Utilisateurs',
      icon: Users,
      href: '/admin/users',
    },
    {
      label: 'Consultations',
      icon: FileText,
      href: '/admin/consultations',
    },
    {
      label: 'Paiements',
      icon: CreditCard,
      href: '/admin/payments',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
    },
    {
      label: 'Sécurité',
      icon: Shield,
      href: '/admin/security',
    },
    {
      label: 'Paramètres',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('monetoile_access_token');
    localStorage.removeItem('monetoile_refresh_token');
    localStorage.removeItem('monetoile_user');
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-purple-300" />
            ) : (
              <Menu className="w-6 h-6 text-purple-300" />
            )}
          </button>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Mon Étoile Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs text-purple-300">Super Administrateur</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 w-64 bg-slate-900 border-r border-slate-800 transition-transform lg:translate-x-0 z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-purple-300 transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:text-purple-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
