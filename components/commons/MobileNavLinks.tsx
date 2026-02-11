import { motion } from 'framer-motion';
import CacheLink from '@/components/commons/CacheLink';

export default function MobileNavLinks({ navItems, closeMobileMenu }: { navItems: any[], closeMobileMenu: () => void }) {
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
          >
            <CacheLink href={item.href} onClick={closeMobileMenu}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-all text-left relative overflow-hidden border-2 border-transparent hover:border-violet-200 dark:hover:border-violet-800"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex-1">{item.label}</span>
              </motion.button>
            </CacheLink>
          </motion.div>
        );
      })}
    </nav>
  );
}
