'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface HeaderNavigationProps {
  navItems: NavItem[];
}

export function HeaderNavigation({ navItems }: HeaderNavigationProps) {
  return (
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
                         text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 
                         hover:bg-violet-50 dark:hover:bg-violet-950/30
                         transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </motion.button>
          </Link>
        );
      })}
    </nav>
  );
}
