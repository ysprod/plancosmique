// Ce fichier client Next.js enregistre le service worker à l'initialisation du site.
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('Service worker registration failed:', err);
        });
      });
    }
  }, []);
  return null;
}
