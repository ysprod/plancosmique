'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, getCacheSize, formatBytes } from '@/lib/cache/serviceWorker.utils';

/**
 * Composant pour initialiser le Service Worker au démarrage de l'app
 */
export default function ServiceWorkerInitializer() {
  const [cacheSize, setCacheSize] = useState<string>('0 octets');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Enregistrer le Service Worker
    registerServiceWorker();

    // Calculer la taille du cache
    const updateCacheSize = async () => {
      const size = await getCacheSize();
      setCacheSize(formatBytes(size));
    };

    updateCacheSize();
    
    // Mettre à jour toutes les 5 minutes
    const interval = setInterval(updateCacheSize, 5 * 60 * 1000);

    // Écouter les changements de connexion
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Afficher un indicateur en mode développement
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          <span className="text-gray-400">•</span>
          <span>Cache: {cacheSize}</span>
        </div>
      </div>
    );
  }

  return null;
}
