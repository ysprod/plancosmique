import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ErrorBoundary, LoadingFallback } from '@/components/ErrorBoundary';
import HeaderPage from '@/components/commons/Header';

// Optimisation de la police avec display swap pour améliorer les performances
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mon Étoile - Plateforme Spirituelle',
  description: 'Votre guide spirituel personnalisé',
  keywords: 'voyance, prédictions, astrologie, tarot, numérologie, cosmos',
  // Ajout de métadonnées SEO supplémentaires
  openGraph: {
    title: 'Mon Étoile - Plateforme Spirituelle',
    description: 'Votre guide spirituel personnalisé',
    type: 'website',
    locale: 'fr_FR',
  },
  // Optimisation pour les moteurs de recherche
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <HeaderPage />
            <Suspense fallback={<LoadingFallback />}>
              {children}
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
