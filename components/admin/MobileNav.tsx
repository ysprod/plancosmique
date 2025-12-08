'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, LayoutDashboard, Users, FileText, 
  CreditCard, Settings, LogOut 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/dashboard/admin/consultations', label: 'Consultations', icon: FileText },
  { href: '/dashboard/admin/payments', label: 'Paiements', icon: CreditCard },
  { href: '/dashboard/admin/settings', label: 'Paramètres', icon: Settings },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Bouton Menu Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg 
                   shadow-lg border border-gray-200"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-900" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900" />
        )}
      </button>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-40 
                         shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                                   transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button className="flex items-center gap-3 px-4 py-3 text-red-600 
                                     hover:bg-red-50 rounded-lg w-full transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
