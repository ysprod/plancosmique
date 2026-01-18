'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) || 'system';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-2 py-1 rounded ${theme === 'light' ? 'bg-violet-200 font-bold' : ''}`}
        onClick={() => handleChange('light')}
        aria-pressed={theme === 'light'}
      >
        Clair
      </button>
      <button
        className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-violet-700 text-white font-bold' : ''}`}
        onClick={() => handleChange('dark')}
        aria-pressed={theme === 'dark'}
      >
        Sombre
      </button>
      <button
        className={`px-2 py-1 rounded ${theme === 'system' ? 'bg-gray-200 font-bold' : ''}`}
        onClick={() => handleChange('system')}
        aria-pressed={theme === 'system'}
      >
        Système
      </button>
    </div>
  );
}
