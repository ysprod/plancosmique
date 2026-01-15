'use client';

/**
 * Script pour initialiser le thème avant le rendu
 * Évite le flash blanc au chargement en mode sombre
 */
export function RootThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            try {
              var t = localStorage.getItem('theme') || 'light';
              var dark = (t === 'dark') || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              var d = document.documentElement;
              if (dark) { d.classList.add('dark'); d.style.colorScheme = 'dark'; }
              else { d.classList.remove('dark'); d.style.colorScheme = 'light'; }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
