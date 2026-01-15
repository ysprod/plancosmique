/**
 * Hook personnalisé pour les constantes de layout sécurisé
 */
export function useSecuredLayoutConfig() {
  const headerConfig = {
    stickyClass: 'sticky top-0 z-50',
    borderClass: 'border-b border-slate-200/60 dark:border-zinc-800/60',
    bgClass: 'bg-white/75 backdrop-blur dark:bg-zinc-950/55',
  };

  const mainConfig = {
    id: 'main-content',
    role: 'main',
    ariaLabel: 'Espace sécurisé',
    containerClass: 'mx-auto w-full max-w-6xl',
    paddingClass: 'px-3 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pt-5',
  };

  return { headerConfig, mainConfig };
}
