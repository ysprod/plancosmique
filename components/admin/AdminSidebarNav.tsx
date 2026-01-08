import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { navItems, colorClasses } from './AdminNavConfig';

export const AdminSidebarNav = React.memo(function AdminSidebarNav({ pathname, onNav, isMobile }: { pathname: string, onNav?: () => void, isMobile?: boolean }) {
  return (
    <ul className="space-y-1">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        const colorClass = colorClasses[item.color as keyof typeof colorClasses];
        return isMobile ? (
          <li key={item.href}>
            <Link href={item.href} onClick={onNav}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors relative ${isActive ? colorClass : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-r" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          </li>
        ) : (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Link href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 relative overflow-hidden group ${isActive ? colorClass : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-r" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? '' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </motion.div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
});
