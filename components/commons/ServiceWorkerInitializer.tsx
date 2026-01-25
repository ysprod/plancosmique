'use client';
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/lib/cache/serviceWorker.utils';

/**
 * Composant pour initialiser le Service Worker au démarrage de l'app
 */
export default function ServiceWorkerInitializer() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Enregistrer le Service Worker
    registerServiceWorker();

    // Écouter les changements de connexion
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
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
        </div>
      </div>
    );
  }

  return null;
}