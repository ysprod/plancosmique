/**
 * Configuration des métadonnées pour le layout root
 */
export function getRootMetadata() {
  return {
    title: {
      default: "OFFOLOMOU",
      template: "%s | OFFOLOMOU",
    },
    description:
      "✨ Découvrez votre destinée avec OFFOLOMOU : consultations de voyance authentiques, analyses astrologiques personnalisées, numérologie avancée et guidance spirituelle par des experts certifiés. Révélez votre potentiel cosmique dès maintenant",
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.offolomou.org"),
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "/",
      siteName: "OFFOLOMOU",
      title: "OFFOLOMOU ✨ Votre Destinée Révélée",
      description:
        "🔮 Consultations spirituelles professionnelles • Analyses astrologiques détaillées • Guidance authentique • Révélez votre potentiel cosmique avec nos experts certifiés.",
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "OFFOLOMOU - Plateforme Spirituelle", type: "image/jpeg" },
        { url: "/og-image-square.jpg", width: 800, height: 800, alt: "OFFOLOMOU Logo", type: "image/jpeg" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@OFFOLOMOUApp",
      creator: "@OFFOLOMOUApp",
      title: "OFFOLOMOU - ✨ ",
      description: "🔮Art",
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
    appleWebApp: { capable: true, title: "OFFOLOMOU", statusBarStyle: "black-translucent" as const },
    other: { "mobile-web-app-capable": "yes", "apple-mobile-web-app-capable": "yes" },
  };
}