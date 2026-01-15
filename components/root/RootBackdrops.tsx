'use client';

/**
 * Composant pour les backdrops (gradients de fond)
 */
export function RootBackdrops() {
  return (
    <>
      {/* Gradient de fond principal */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white via-violet-50/30 to-purple-50/40
          dark:from-gray-950 dark:via-violet-950/20 dark:to-purple-950/30"
        aria-hidden="true"
      />
      {/* Texture de bruit */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015] dark:opacity-[0.025]
          bg-[url('/noise.png')] bg-repeat"
        aria-hidden="true"
      />
    </>
  );
}
