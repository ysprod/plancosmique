/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,

  // ✅ Cache busting avec buildId dynamique
  generateBuildId: async () => {
    const buildVersion = process.env.BUILD_VERSION;
    if (buildVersion) {
      return buildVersion;
    }
    // Fallback: utiliser timestamp ISO
    return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  },

  images: {

    remotePatterns: [

      {

        protocol: 'https',

        hostname: 'www.genspark.ai',

        port: '',

        pathname: '/api/files/**',

      },

    ],

    // Optimisation des images

    formats: ['image/avif', 'image/webp'],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // ✅ Cache des images: 0 en dev, 1 an en prod
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 31536000 : 0,

  },

  

  // Compression automatique

  compress: true,

  

  // ✅ Source maps uniquement en développement

  productionBrowserSourceMaps: false,

  

  // 🔧 CORRECTION DES URLS API

  async rewrites() {

    return [

      // Correction pour /api/api/v1/...

      {

        source: '/api/api/:path*',

        destination: '/api/:path*',

      },

      // Correction pour /api/v1/api/v1/...

      {

        source: '/api/v1/api/v1/:path*',

        destination: '/api/:path*',

      },

      // Correction pour /api/api/v1/...

      {

        source: '/api/api/v1/:path*',

        destination: '/api/:path*',

      },

      // Correction pour /api/v1/...

      {

        source: '/api/v1/:path*',

        destination: '/api/:path*',

      },

      // ✅ Redirection vers le backend NestJS

      {

        source: '/api/:path*',

        destination: 'http://localhost:3001/api/v1/:path*',

      },

    ];

  },

  

  // 🚀 Headers de cache optimisés pour les assets et sécurité

  async headers() {

    return [

      // ✅ Assets Next.js statiques - cache 1 an
      {

        source: '/_next/static/:path*',

        headers: [

          {

            key: 'Cache-Control',

            value: 'public, max-age=31536000, immutable, s-maxage=31536000',

          },

        ],

      },

      // ✅ Public assets - cache 1 an
      {

        source: '/static/:path*',

        headers: [

          {

            key: 'Cache-Control',

            value: 'public, max-age=31536000, immutable, s-maxage=31536000',

          },

        ],

      },

      // ✅ Images/Medias - cache 1 an + stale-while-revalidate
      {

        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|webm|ogg)',

        headers: [

          {

            key: 'Cache-Control',

            value: 'public, max-age=31536000, immutable, s-maxage=31536000, stale-while-revalidate=86400',

          },

        ],

      },

      // ✅ Fonts - cache très long terme
      {

        source: '/:all*(woff|woff2|ttf|otf|eot)',

        headers: [

          {

            key: 'Cache-Control',

            value: 'public, max-age=31536000, immutable, s-maxage=31536000',

          },

        ],

      },

      // ✅ Pages HTML - cache court terme + revalidation
      {

        source: '/:path((?!api|_next|static).*)',

        headers: [

          {

            key: 'Cache-Control',

            value: 'public, max-age=0, s-maxage=60, must-revalidate, stale-while-revalidate=3600',

          },

        ],

      },

      // ✅ API routes - pas de cache
      {

        source: '/api/:path*',

        headers: [

          {

            key: 'Cache-Control',

            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',

          },

        ],

      },

      // ✅ Service Worker - pas de cache
      {

        source: '/service-worker.js',

        headers: [

          {

            key: 'Cache-Control',

            value: 'no-cache, no-store, must-revalidate, max-age=0',

          },

          {

            key: 'Service-Worker-Allowed',

            value: '/',

          },

        ],

      },

      // 🔒 Headers de sécurité globaux
      {

        source: '/:path*',

        headers: [

          {

            key: 'X-Content-Type-Options',

            value: 'nosniff',

          },

          {

            key: 'X-Frame-Options',

            value: 'DENY',

          },

          {

            key: 'Referrer-Policy',

            value: 'strict-origin-when-cross-origin',

          },

          {

            key: 'Permissions-Policy',

            value: 'camera=(), microphone=(), geolocation=()',

          },

        ],

      },

    ];

  },

  

  // Experimental features pour performances

  experimental: {

    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],

  },

}


module.exports = nextConfig
