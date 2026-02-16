/**
 * Cache Busting Configuration
 * Gère les stratégies de cache pour différents types d'assets
 */

export const CACHE_STRATEGIES = {
  // Assets statiques - cache très long terme (1 an)
  STATIC: {
    maxAge: 31536000, // 1 year en secondes
    sMaxAge: 31536000,
    immutable: true,
  },
  
  // Images optimisées - cache long terme (30 jours)
  IMAGES: {
    maxAge: 2592000, // 30 days
    sMaxAge: 2592000,
    immutable: true,
    staleWhileRevalidate: 86400, // 1 day
  },
  
  // CSS/JS chunkés - cache long terme (7 jours)
  CHUNKS: {
    maxAge: 604800, // 7 days
    sMaxAge: 604800,
    immutable: true,
  },
  
  // Pages HTML - cache court terme
  PAGES: {
    maxAge: 0,
    sMaxAge: 60, // 1 minute en CDN
    mustRevalidate: true,
    staleWhileRevalidate: 3600, // 1 hour
  },
  
  // API routes - pas de cache
  API: {
    maxAge: 0,
    noStore: true,
    mustRevalidate: true,
  },
  
  // Service Worker - pas de cache
  SERVICE_WORKER: {
    maxAge: 0,
    noStore: true,
    mustRevalidate: true,
  },
};

/**
 * Génère un header Cache-Control basé sur la stratégie
 */
export function generateCacheControlHeader(strategy: any): string {
  const parts = [];
  
  if (strategy.noStore) parts.push('no-store');
  if (strategy.noCache) parts.push('no-cache');
  if (strategy.mustRevalidate) parts.push('must-revalidate');
  if (strategy.proxyRevalidate) parts.push('proxy-revalidate');
  if (!strategy.noStore) parts.push('public');
  if (strategy.maxAge !== undefined) parts.push(`max-age=${strategy.maxAge}`);
  if (strategy.sMaxAge !== undefined) parts.push(`s-maxage=${strategy.sMaxAge}`);
  if (strategy.immutable) parts.push('immutable');
  if (strategy.staleWhileRevalidate) parts.push(`stale-while-revalidate=${strategy.staleWhileRevalidate}`);
  
  return parts.join(', ');
}

/**
 * Build timestamp pour le cache busting
 */
export function getBuildTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

/**
 * Build version (peut être défini via env var)
 */
export function getBuildVersion() {
  return process.env.BUILD_VERSION || getBuildTimestamp();
}

/**
 * Génère une URL avec cache busting query parameter
 */
export function getBustingUrl(url: string, includeVersion = true): string {
  if (!includeVersion) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  const version = getBuildVersion();
  return `${url}${separator}v=${version}`;
}
