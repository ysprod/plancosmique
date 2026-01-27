// Service Worker optimisé pour Mon Étoile
// Gère la mise en cache agressive pour maximiser les performances
// Version cache - Incrémenter pour forcer le rafraîchissement

const CACHE_VERSION = 'monetoile-v20';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;
const CACHE_API = `${CACHE_VERSION}-api`;

// Assets critiques à mettre en cache immédiatement
const CRITICAL_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
];

// Durée de cache par type de ressource (en millisecondes)
const CACHE_DURATIONS = {
  static: 365 * 24 * 60 * 60 * 1000, // 1 an pour les assets statiques
  images: 30 * 24 * 60 * 60 * 1000,  // 30 jours pour les images
  api: 5 * 60 * 1000,                // 5 minutes pour les API
  dynamic:  1000,      // 24h pour les pages dynamiques  24 * 60 * 60 * 1000
};

// Taille maximale du cache (en nombre d'entrées)
const MAX_CACHE_SIZE = {
  static: 500,
  images: 1000,
  api: 50,
  dynamic: 300,
};

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...');
  
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS).catch(err => {
        console.warn('[SW] Certains assets critiques n\'ont pas pu être cachés:', err);
        return Promise.resolve();
      });
    })
  );
  
  // Activer immédiatement le nouveau SW
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprimer les anciens caches
          if (!cacheName.startsWith(CACHE_VERSION)) {
            console.log('[SW] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activé');
      return self.clients.claim();
    })
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
  
  if (keys.length > maxSize) {
    // Supprimer les plus anciennes entrées
    const toDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(toDelete.map(key => cache.delete(key)));
  }
}

// Vérifie si le cache est expiré
async function isCacheExpired(response, cacheName) {
  const cachedDate = response.headers.get('sw-cached-date');
  if (!cachedDate) return false;
  
  const cacheTime = new Date(cachedDate).getTime();
  const now = Date.now();
  
  let maxAge;
  switch (cacheName) {
    case CACHE_STATIC:
      maxAge = CACHE_DURATIONS.static;
      break;
    case CACHE_IMAGES:
      maxAge = CACHE_DURATIONS.images;
      break;
    case CACHE_API:
      maxAge = CACHE_DURATIONS.api;
      break;
    default:
      maxAge = CACHE_DURATIONS.dynamic;
  }
  
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
  
  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      
      // Si on a une réponse en cache
      if (cachedResponse) {
        const isExpired = await isCacheExpired(cachedResponse, cacheName);
        
        // Pour les assets statiques, retourner le cache même si expiré
        if (cacheName === CACHE_STATIC || cacheName === CACHE_IMAGES) {
          // Mettre à jour en arrière-plan si expiré
          if (isExpired) {
            fetch(request).then(response => {
              if (response && response.status === 200) {
                const responseClone = response.clone();
                const headers = new Headers(responseClone.headers);
                headers.append('sw-cached-date', new Date().toISOString());
                
                const modifiedResponse = new Response(responseClone.body, {
                  status: responseClone.status,
                  statusText: responseClone.statusText,
                  headers: headers,
                });
                
                cache.put(request, modifiedResponse);
                limitCacheSize(cacheName, MAX_CACHE_SIZE[cacheName.split('-').pop()]);
              }
            }).catch(() => {});
          }
          
          return cachedResponse;
        }
        
        // Pour l'API et contenu dynamique: stale-while-revalidate
        if (!isExpired) {
          return cachedResponse;
        }
      }
      
      // Pas de cache ou cache expiré: fetch network
      try {
        const networkResponse = await fetch(request);
        
        // Mettre en cache si succès
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          const headers = new Headers(responseClone.headers);
          headers.append('sw-cached-date', new Date().toISOString());
          
          const modifiedResponse = new Response(responseClone.body, {
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: headers,
          });
          
          cache.put(request, modifiedResponse);
          
          // Limiter la taille du cache
          const cacheType = cacheName.split('-').pop();
          limitCacheSize(cacheName, MAX_CACHE_SIZE[cacheType] || 30);
        }
        
        return networkResponse;
      } catch (error) {
        console.log('[SW] Erreur réseau, retour au cache si disponible:', error);
        
        // En cas d'erreur réseau, retourner le cache même expiré
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Page offline de secours
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        
        throw error;
      }
    })
  );
});

// Message handler pour vider le cache manuellement
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('[SW] Cache vidé avec succès');
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
