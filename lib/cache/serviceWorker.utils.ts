/**
 * Utilitaires pour gérer le Service Worker et le cache
 */

/**
 * Enregistre le Service Worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('Service Worker non supporté par ce navigateur');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });


    // Vérifier les mises à jour toutes les heures
    setInterval(() => {
      registration.update();
    }, 1000 * 60 * 60);

    // Écouter les nouvelles versions
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          if (confirm('Une nouvelle version de l\'application est disponible. Recharger ?')) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
    return null;
  }
}

/**
 * Désenregistre le Service Worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      return success;
    }
    return false;
  } catch (error) {
    console.error('❌ Erreur lors du désenregistrement du Service Worker:', error);
    return false;
  }
}

/**
 * Vide tout le cache du Service Worker
 */
export async function clearServiceWorkerCache(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.active) {
      // Créer un canal de communication
      const messageChannel = new MessageChannel();
      
      return new Promise<void>((resolve, reject) => {
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            resolve();
          } else {
            reject(new Error('Échec du vidage du cache'));
          }
        };
        
        registration.active!.postMessage(
          { type: 'CLEAR_CACHE' },
          [messageChannel.port2]
        );
      });
    }
  } catch (error) {
    console.error('❌ Erreur lors du vidage du cache:', error);
  }
}

/**
 * Obtient la taille approximative du cache
 */
export async function getCacheSize(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return 0;
  }

  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('❌ Erreur lors du calcul de la taille du cache:', error);
    return 0;
  }
}

/**
 * Formate la taille en octets en format lisible
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 octets';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Vérifie si le navigateur est en ligne
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * Hook pour écouter les changements de connexion
 */
export function useOnlineStatus(callback?: (online: boolean) => void) {
  if (typeof window === 'undefined') return;

  const handleOnline = () => {
    callback?.(true);
  };

  const handleOffline = () => {
    callback?.(false);
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Précharge une URL dans le cache
 */
export async function precacheUrl(url: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open('monetoile-v2-dynamic');
    await cache.add(url);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors du précachage de ${url}:`, error);
    return false;
  }
}

/**
 * Précharge plusieurs URLs
 */
export async function precacheUrls(urls: string[]): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  try {
    const cache = await caches.open('monetoile-v2-dynamic');
    await cache.addAll(urls);
  } catch (error) {
    console.error('❌ Erreur lors du précachage des URLs:', error);
  }
}