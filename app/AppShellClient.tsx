"use client";

import Header from "./components/Header";

export default function AppShellClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen relative" role="main" aria-label="Contenu principal">
        {children}
      </main>
    </>
  );
}
