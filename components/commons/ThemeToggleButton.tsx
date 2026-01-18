'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleButtonProps {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
}

export function ThemeToggleButton({ theme, toggleTheme, mounted }: ThemeToggleButtonProps) {
  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05, rotate: 180 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 
               dark:from-violet-950/50 dark:to-fuchsia-950/50
               border-2 border-violet-200 dark:border-violet-800
               hover:shadow-lg hover:shadow-violet-500/20 dark:hover:shadow-violet-500/40
               transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5 text-violet-600" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 rounded-xl blur-md -z-10 ${theme === 'dark' ? 'bg-yellow-400' : 'bg-violet-400'}`}
      />
    </motion.button>
  );
}