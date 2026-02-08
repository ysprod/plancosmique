
// Service Worker optimisé pour Mon Étoile
// Mise en cache intelligente, gestion robuste, code simplifié
// Incrémentez CACHE_VERSION pour forcer l'update

const CACHE_VERSION = 'monetoile-v63';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;
const CACHE_API = `${CACHE_VERSION}-api`;

// Assets critiques à mettre en cache immédiatement
const CRITICAL_ASSETS = [
  '/',
  '/offline.html',
  '/site.webmanifest',
];

// Durée de cache par type de ressource (en ms)
const CACHE_DURATIONS = {
  static: 365 * 24 * 60 * 60 * 1000, // 1 an
  images: 30 * 24 * 60 * 60 * 1000,  // 30 jours
  api: 5 * 60 * 1000,                // 5 min
  dynamic: 24 * 60 * 60 * 1000,      // 24h
};

// Taille max du cache (entrées)
const MAX_CACHE_SIZE = {
  static: 300,
  images: 300,
  api: 50,
  dynamic: 100,
};

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) =>
      cache.addAll(CRITICAL_ASSETS).catch(() => Promise.resolve())
    )
  );
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((cacheName) => !cacheName.startsWith(CACHE_VERSION)).map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

// Détermine le type de ressource et le cache approprié
function getCacheName(url) {
  const urlObj = new URL(url);
  
  if (urlObj.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i)) {
    return CACHE_IMAGES;
  }
  if (urlObj.pathname.startsWith('/api/') || urlObj.pathname.includes('/api/')) {
    return CACHE_API;
  }
  if (urlObj.pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/i) || 
      urlObj.pathname.includes('/_next/static/')) {
    return CACHE_STATIC;
  }
  return CACHE_DYNAMIC;
}

// Limite la taille du cache
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  while (keys.length > maxSize) {
    await cache.delete(keys.shift());
  }
}

// Vérifie si le cache est expiré
async function isCacheExpired(response, cacheName) {
  const cachedDate = response.headers.get('sw-cached-date');
  if (!cachedDate) return false;
  const cacheTime = new Date(cachedDate).getTime();
  const now = Date.now();
  let maxAge = CACHE_DURATIONS.dynamic;
  if (cacheName === CACHE_STATIC) maxAge = CACHE_DURATIONS.static;
  else if (cacheName === CACHE_IMAGES) maxAge = CACHE_DURATIONS.images;
  else if (cacheName === CACHE_API) maxAge = CACHE_DURATIONS.api;
  return (now - cacheTime) > maxAge;
}

// Stratégie de cache intelligente
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les schémas non-HTTP(S)
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Ignorer les requêtes d'authentification (toujours fraiches)
  if (url.pathname.includes('/auth/') || url.pathname.includes('/logout')) {
    return event.respondWith(fetch(request));
  }

  const cacheName = getCacheName(request.url);

  // Désactive la mise en cache des pages dynamiques (CACHE_DYNAMIC)
  if (cacheName === CACHE_DYNAMIC) {
    // Toujours faire un fetch réseau, ne jamais servir depuis le cache
    return event.respondWith(fetch(request));
  }

  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        const isExpired = await isCacheExpired(cachedResponse, cacheName);
        if ((cacheName === CACHE_STATIC || cacheName === CACHE_IMAGES) && !isExpired) {
          return cachedResponse;
        }
        if (!isExpired) return cachedResponse;
      }
      try {
        const networkResponse = await fetch(request);
        const contentLength = networkResponse.headers.get('content-length');
        if (networkResponse && networkResponse.status === 200 && (!contentLength || parseInt(contentLength) < 5 * 1024 * 1024)) {
          const responseClone = networkResponse.clone();
          const headers = new Headers(responseClone.headers);
          headers.append('sw-cached-date', new Date().toISOString());
          try {
            const modifiedResponse = new Response(responseClone.body, {
              status: responseClone.status,
              statusText: responseClone.statusText,
              headers: headers,
            });
            cache.put(request, modifiedResponse);
            const cacheType = cacheName.split('-').pop();
            limitCacheSize(cacheName, MAX_CACHE_SIZE[cacheType] || 30);
          } catch (e) {
            // fail silently
          }
        }
        return networkResponse;
      } catch (error) {
        if (cachedResponse) return cachedResponse;
        if (request.mode === 'navigate') return caches.match('/offline.html');
        throw error;
      }
    })
  );
});

// Message handler pour vider le cache manuellement
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
      ).then(() => {
        if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: true });
      })
    );
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});