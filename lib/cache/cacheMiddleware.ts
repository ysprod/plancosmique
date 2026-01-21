/**
 * Middleware Next.js pour optimiser le cache des réponses API
 * À utiliser dans les route handlers (app/api/...)
 */

import { NextResponse } from 'next/server';

/**
 * Ajoute les headers de cache optimisés pour les API routes
 */
export function withCacheHeaders(
  response: NextResponse,
  options: {
    maxAge?: number; // En secondes
    sMaxAge?: number; // CDN cache
    staleWhileRevalidate?: number;
    revalidate?: boolean;
  } = {}
): NextResponse {
  const {
    maxAge = 0,
    sMaxAge = 0,
    staleWhileRevalidate = 0,
    revalidate = false,
  } = options;

  const cacheControl: string[] = [];

  if (maxAge === 0 && !revalidate) {
    cacheControl.push('no-store');
  } else {
    cacheControl.push('public');
    if (maxAge > 0) cacheControl.push(`max-age=${maxAge}`);
    if (sMaxAge > 0) cacheControl.push(`s-maxage=${sMaxAge}`);
    if (staleWhileRevalidate > 0) {
      cacheControl.push(`stale-while-revalidate=${staleWhileRevalidate}`);
    }
  }

  response.headers.set('Cache-Control', cacheControl.join(', '));
  
  return response;
}

/**
 * Presets de cache pour différents types de données
 */
export const cachePresets = {
  // Pas de cache - données temps réel
  noCache: {
    maxAge: 0,
    revalidate: false,
  },

  // Cache court - 1 minute (données utilisateur)
  short: {
    maxAge: 60,
    sMaxAge: 60,
    staleWhileRevalidate: 30,
    revalidate: true,
  },

  // Cache moyen - 5 minutes (listes, consultations)
  medium: {
    maxAge: 300,
    sMaxAge: 300,
    staleWhileRevalidate: 60,
    revalidate: true,
  },

  // Cache long - 1 heure (contenu statique)
  long: {
    maxAge: 3600,
    sMaxAge: 3600,
    staleWhileRevalidate: 300,
    revalidate: true,
  },

  // Cache très long - 24 heures (contenu rarement modifié)
  veryLong: {
    maxAge: 86400,
    sMaxAge: 86400,
    staleWhileRevalidate: 3600,
    revalidate: true,
  },
};

/**
 * Helper pour créer une réponse avec cache optimisé
 */
export function cachedResponse(
  data: any,
  preset: keyof typeof cachePresets = 'medium',
  status: number = 200
): NextResponse {
  const response = NextResponse.json(data, { status });
  return withCacheHeaders(response, cachePresets[preset]);
}