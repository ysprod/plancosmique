import { ErrorBoundary, LoadingFallback } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/lib/auth/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import HeaderContent from './HeaderContent';
 

// Optimisation de la police avec preload et display swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Mon Étoile - Plateforme Spirituelle | Voyance, Astrologie & Guidance',
  description: 'Votre guide spirituel personnalisé. Consultations de voyance, analyses astrologiques, numérologie et guidance spirituelle avec des experts certifiés.',
  keywords: 'voyance, prédictions, astrologie, tarot, numérologie, cosmos, spiritualité, guidance, médiumnité, horoscope',
  authors: [{ name: 'Mon Étoile' }],
  creator: 'Mon Étoile',
  publisher: 'Mon Étoile',
  openGraph: {
    title: 'Mon Étoile - Votre Guide Spirituel Personnalisé',
    description: 'Consultations de voyance, analyses astrologiques et guidance spirituelle',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Mon Étoile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Étoile - Plateforme Spirituelle',
    description: 'Votre guide spirituel personnalisé',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#6d28d9' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              <HeaderContent />
              <main className="min-h-screen">
                {children}
              </main>
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}