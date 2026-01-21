/**
 * Script d'export des clés de cache pour les utiliser dans d'autres projets
 */

export const CACHE_CONFIG = {
  // Versions
  SERVICE_WORKER_VERSION: 'monetoile-v3',
  INDEXEDDB_VERSION: 3,
  REACT_QUERY_BUSTER: 'v2',

  // Durées de cache (en millisecondes)
  DURATIONS: {
    STATIC_ASSETS: 365 * 24 * 60 * 60 * 1000, // 1 an
    IMAGES: 30 * 24 * 60 * 60 * 1000,         // 30 jours
    API_SHORT: 5 * 60 * 1000,                  // 5 minutes
    API_MEDIUM: 30 * 60 * 1000,                // 30 minutes
    API_LONG: 24 * 60 * 60 * 1000,            // 24 heures
    USER_DATA: 30 * 24 * 60 * 60 * 1000,      // 30 jours
  },

  // Tailles maximales de cache
  MAX_SIZES: {
    SERVICE_WORKER: {
      static: 50,
      images: 100,
      api: 50,
      dynamic: 30,
    },
    INDEXEDDB: 100 * 1024 * 1024, // 100 Mo
    LOCALSTORAGE: 10 * 1024 * 1024, // 10 Mo (limite navigateur ~5-10 Mo)
  },

  // Priorités de préchargement
  PRELOAD_PRIORITY: {
    CRITICAL: ['/', '/secured/profil', '/secured/consultations'],
    HIGH: ['/secured/notifications', '/secured/wallet'],
    MEDIUM: ['/secured/carteduciel', '/secured/numerologie'],
    LOW: ['/secured/spiritualite', '/secured/knowledge'],
  },
} as const;

/**
 * Type des stores IndexedDB
 */
export type CacheStoreNames = 'consultations' | 'cartesDuCiel' | 'analyses' | 'staticAssets';

/**
 * Type des catégories de cache React Query
 */
export type QueryCacheCategory =
  | 'auth'
  | 'consultations'
  | 'notifications'
  | 'profile'
  | 'astrologie'
  | 'numerologie'
  | 'knowledge'
  | 'spiritualite'
  | 'books'
  | 'offerings'
  | 'admin';

/**
 * Configuration des stratégies de cache par catégorie
 */
export const CACHE_STRATEGIES: Record<
  QueryCacheCategory,
  {
    staleTime: number;
    gcTime: number;
    refetchOnWindowFocus: boolean;
    refetchOnReconnect: boolean;
  }
> = {
  auth: {
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  },
  consultations: {
    staleTime: 1000 * 60 * 1, // 10 min
    gcTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  notifications: {
    staleTime: 1000 * 60 * 2, // 2 min
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  },
  profile: {
    staleTime: 1000 * 60 * 60, // 1h
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  astrologie: {
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  numerologie: {
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  knowledge: {
    staleTime: 1000 * 60 * 60, // 1h
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  spiritualite: {
    staleTime: 1000 * 60 * 60, // 1h
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  books: {
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  offerings: {
    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  admin: {
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  },
};

/**
 * Routes qui ne doivent JAMAIS être mises en cache
 */
export const NO_CACHE_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/logout',
  '/auth/refresh',
  '/api/payments',
  '/api/webhooks',
] as const;

/**
 * Extensions de fichiers statiques à mettre en cache agressivement
 */
export const STATIC_FILE_EXTENSIONS = [
  'js',
  'css',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'otf',
  'svg',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'avif',
  'ico',
  'json',
  'xml',
] as const;

/**
 * Patterns d'URL à exclure du cache
 */
export const CACHE_EXCLUSION_PATTERNS = [
  /\/auth\//,
  /\/api\/payments\//,
  /\/api\/webhooks\//,
  /\/logout$/,
  /\.hot-update\./,
] as const;
