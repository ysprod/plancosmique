import { motion } from 'framer-motion';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export default function MobileMenuSettingsButton({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <Link href="/star/settings" onClick={closeMobileMenu}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/50 dark:to-fuchsia-950/50 text-violet-600 dark:text-violet-400 font-bold border-2 border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-lg transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres du compte</span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
