import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import ClientProviders from "../components/commons/ClientProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "500", "700"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Mon Étoile - Votre Guide Spirituel  | Voyance & Astrologie",
    template: "%s | Mon Étoile",
  },
  description:
    "✨ Découvrez votre destinée avec Mon Étoile : consultations de voyance authentiques, analyses astrologiques personnalisées, numérologie avancée et guidance spirituelle par des experts certifiés. Révélez votre potentiel cosmique dès maintenant",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.monetoile.org"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Mon Étoile",
    title: "Mon Étoile ✨ Votre Destinée Révélée | Voyance & Astrologie Authentique",
    description:
      "🔮 Consultations spirituelles professionnelles • Analyses astrologiques détaillées • Guidance authentique • Révélez votre potentiel cosmique avec nos experts certifiés.",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Mon Étoile - Plateforme Spirituelle", type: "image/jpeg" },
      { url: "/og-image-square.jpg", width: 800, height: 800, alt: "Mon Étoile Logo", type: "image/jpeg" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MonEtoileApp",
    creator: "@MonEtoileApp",
    title: "Mon Étoile ✨ Voyance & Astrologie Africaines",
    description: "🔮 Votre guide spirituel personnalisé. Consultations professionnelles, analyses astrologiques et guidance cosmique.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#8b5cf6" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, title: "Mon Étoile", statusBarStyle: "black-translucent" },
  other: { "mobile-web-app-capable": "yes", "apple-mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 3,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Mon Étoile" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.monetoile.org/#website",
                  name: "Mon Étoile",
                  url: "https://www.monetoile.org",
                  description: "Plateforme spirituelle pour voyance, astrologie et guidance personnalisée",
                  inLanguage: "fr-FR",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: "https://www.monetoile.org/search?q={search_term_string}" },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.monetoile.org/#organization",
                  name: "Mon Étoile",
                  url: "https://www.monetoile.org",
                  logo: { "@type": "ImageObject", url: "https://www.monetoile.org/logo.png", width: 512, height: 512 },
                  sameAs: [
                    "https://twitter.com/MonEtoileApp",
                    "https://www.facebook.com/monetoile",
                    "https://www.instagram.com/monetoile",
                  ],
                  contactPoint: { "@type": "ContactPoint", contactType: "customer support", availableLanguage: ["French", "English"] },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.monetoile.org/#webpage",
                  url: "https://www.monetoile.org",
                  name: "Mon Étoile - Votre Guide Spirituel Personnel",
                  description: "Consultations de voyance, analyses astrologiques et guidance spirituelle",
                  isPartOf: { "@id": "https://www.monetoile.org/#website" },
                  about: { "@id": "https://www.monetoile.org/#organization" },
                  inLanguage: "fr-FR",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50
          selection:bg-violet-500/20 dark:selection:bg-violet-400/30 selection:text-violet-900 dark:selection:text-violet-100`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
            focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-violet-600 focus:to-purple-600
            focus:text-white focus:rounded-2xl focus:shadow-2xl focus:font-bold focus:text-sm
            focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800"
        >
          Aller au contenu principal.
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="monetoile-theme"
        >
          <ClientProviders>
            <div
              className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white via-violet-50/30 to-purple-50/40
                dark:from-gray-950 dark:via-violet-950/20 dark:to-purple-950/30"
              aria-hidden="true"
            />
            <div
              className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015] dark:opacity-[0.025]
                bg-[url('/noise.png')] bg-repeat"
              aria-hidden="true"
            />
            <main id="main-content" className="relative" role="main" aria-label="Contenu principal">
              {children}
            </main>
          </ClientProviders>
        </ThemeProvider>
        <div id="modal-root" aria-live="polite" />
        <div id="toast-root" aria-live="assertive" aria-atomic="true" />
      </body>
    </html>
  );
}