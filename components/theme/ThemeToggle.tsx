'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
 

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        group relative inline-flex items-center gap-2
        rounded-full px-4 py-2
        border border-white/10 dark:border-white/10
        bg-white/60 dark:bg-white/5
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)]
        transition
      "
      aria-label="Basculer le thème"
    >
      <motion.span
        layout
        className="
          relative grid place-items-center
          w-8 h-8 rounded-full
          bg-gradient-to-br from-purple-500/20 to-pink-500/20
          dark:from-purple-500/25 dark:to-pink-500/25
          border border-white/10
        "
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-purple-700 dark:text-purple-200" />
        ) : (
          <Sun className="w-4 h-4 text-amber-600 dark:text-amber-200" />
        )}
      </motion.span>

      <span className="text-sm font-medium text-slate-800 dark:text-white/80">
        {isDark ? 'Dark' : 'Light'}
      </span>

      {/* petit “pulse” */}
      <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition
        bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-amber-500/15 blur-lg"
      />
    </button>
  );
}
