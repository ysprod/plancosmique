'use client';

/**
 * Schema.org JSON-LD pour le SEO
 */
export function RootSchemaScript() {
  const schema = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
