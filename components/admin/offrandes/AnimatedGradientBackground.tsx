import React from "react";

export function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 via-cosmic-pink/10 to-cosmic-indigo/20 dark:from-cosmic-purple/40 dark:via-cosmic-pink/20 dark:to-cosmic-indigo/40 animate-gradient-float" />
      {children}
    </div>
  );
}
