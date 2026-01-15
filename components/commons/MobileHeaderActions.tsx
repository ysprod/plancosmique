import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';
import NotificationBell from '@/components/commons/NotificationBell';

interface MobileHeaderActionsProps {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function MobileHeaderActions({ 
  theme, 
  toggleTheme, 
  mounted, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: MobileHeaderActionsProps) {
  return (
    <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
      {/* Theme Toggle Mobile */}
      {mounted && (
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 0.9, rotate: 180 }}
          className="p-2 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 
                   dark:from-violet-950/50 dark:to-fuchsia-950/50
                   text-violet-600 dark:text-violet-400
                   hover:shadow-lg hover:shadow-violet-500/20
                   transition-all"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div
                key="sun-mobile"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-yellow-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon-mobile"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-violet-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      <NotificationBell />

      <motion.button
        whileTap={{ scale: 0.9, rotate: 90 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 
                   dark:from-violet-950/50 dark:to-fuchsia-950/50
                   text-violet-600 dark:text-violet-400
                   hover:shadow-lg hover:shadow-violet-500/20
                   transition-all"
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
