'use client';

/**
 * Composant pour le skip link (accessibilité)
 */
export function RootSkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-violet-600 focus:to-purple-600
        focus:text-white focus:rounded-2xl focus:shadow-2xl focus:font-bold focus:text-sm
        focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800"
    >
      Aller au contenu principal.
    </a>
  );
}
