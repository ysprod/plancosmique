import { ErrorBoundary, LoadingFallback } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/lib/auth/AuthContext';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';
 

// Optimisation de la police avec preload et display swap
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Mon Étoile - Plateforme Spirituelle | Voyance, Astrologie & Guidance',
    template: '%s | Mon Étoile'
  },
  description: 'Votre guide spirituel personnalisé. Consultations de voyance, analyses astrologiques complètes, numérologie avancée et guidance spirituelle avec des experts certifiés. Découvrez votre destinée.',
  keywords: [
    'voyance',
    'prédictions',
    'astrologie',
    'tarot',
    'numérologie',
    'cosmos',
    'spiritualité',
    'guidance',
    'médiumnité',
    'horoscope',
    'thème astral',
    'consultation spirituelle',
    'développement personnel',
    'éveil spirituel',
    'carte du ciel',
    'astrologie karmique'
  ],
  authors: [{ name: 'Mon Étoile', url: 'https://www.monetoile.fr' }],
  creator: 'Mon Étoile',
  publisher: 'Mon Étoile',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monetoile.fr'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Mon Étoile',
    title: 'Mon Étoile - Votre Guide Spirituel Personnalisé',
    description: 'Consultations de voyance professionnelles, analyses astrologiques détaillées et guidance spirituelle authentique. Révélez votre potentiel cosmique.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mon Étoile - Plateforme Spirituelle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Étoile - Plateforme Spirituelle',
    description: 'Votre guide spirituel personnalisé. Voyance, Astrologie & Guidance.',
    images: ['/twitter-image.jpg'],
    creator: '@MonEtoileApp',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#8b5cf6' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  category: 'Spiritualité',
  classification: 'Bien-être et Développement Personnel',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#6d28d9' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="fr" 
      className={inter.variable} 
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
    >
      <head>
        {/* Preconnect pour optimiser les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags supplémentaires pour PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mon Étoile" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Mon Étoile" />
        
        {/* Optimisation pour iOS */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mon Étoile',
              url: 'https://www.monetoile.fr',
              description: 'Plateforme spirituelle pour voyance, astrologie et guidance',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.monetoile.fr/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      
      <body 
        className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50`}
        suppressHydrationWarning
      >
        {/* Skip to main content pour accessibilité */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-violet-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-4 focus:ring-violet-300"
        >
          Aller au contenu principal
        </a>

        <ErrorBoundary>
          <AuthProvider>
            <RootLayoutClient>
              <Suspense fallback={<LoadingFallback />}>
                <main 
                  id="main-content"
                  className="min-h-screen relative"
                  role="main"
                  aria-label="Contenu principal"
                >
                  {children}
                </main>
              </Suspense>
            </RootLayoutClient>
          </AuthProvider>
        </ErrorBoundary>

        {/* Portail pour les modals et toasts */}
        <div id="modal-root" />
        <div id="toast-root" />

        {/* Service Worker désactivé pour debug mobile */}
      </body>
    </html>
  );
}