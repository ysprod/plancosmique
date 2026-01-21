import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

/**
 * Configuration du QueryClient pour le cache des requêtes API
 * Optimisé pour un site à fort trafic
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ⚠️ CACHE DÉSACTIVÉ POUR LE DÉVELOPPEMENT
      gcTime: 0,
      
      // ⚠️ CACHE DÉSACTIVÉ POUR LE DÉVELOPPEMENT
      staleTime: 0,
      
      // Refetch en arrière-plan quand la fenêtre reprend le focus
      refetchOnWindowFocus: true,
      
      // Retry 2 fois en cas d'erreur
      retry: 2,
      
      // Délai entre les retries (progression exponentielle)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Utiliser le cache même si les données sont "stale" pendant le fetch
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry une fois pour les mutations
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

/**
 * ⚠️ PERSISTANCE DÉSACTIVÉE POUR LE DÉVELOPPEMENT
 * Décommenter ce bloc pour réactiver le cache localStorage
 */
/*
if (typeof window !== 'undefined') {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: 'monetoile-react-query-cache',
    throttleTime: 1000,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 heures
    buster: 'v1', // Incrémenter pour invalider tout le cache
  });
}
*/

/**
 * Préfixes de clés pour les différentes catégories de données
 */
export const QUERY_KEYS = {
  // Auth
  USER: ['user'] as const,
  AUTH_STATUS: ['auth', 'status'] as const,
  
  // Consultations
  CONSULTATIONS: ['consultations'] as const,
  CONSULTATION_DETAIL: (id: string) => ['consultations', id] as const,
  CONSULTATION_HISTORY: ['consultations', 'history'] as const,
  
  // Notifications
  NOTIFICATIONS: ['notifications'] as const,
  NOTIFICATIONS_UNREAD: ['notifications', 'unread'] as const,
  
  // Profil
  PROFILE: ['profile'] as const,
  WALLET: ['wallet'] as const,
  
  // Astrologie
  CARTE_DU_CIEL: (userId: string) => ['carteduciel', userId] as const,
  CINQ_PORTES: (userId: string) => ['cinqportes', userId] as const,
  HOROSCOPE: (signe: string, date?: string) => ['horoscope', signe, date] as const,
  
  // Numerologie
  NUMEROLOGIE: (birthDate: string, fullName: string) => ['numerologie', birthDate, fullName] as const,
  
  // Knowledge & Spiritualité
  KNOWLEDGE_ARTICLES: ['knowledge', 'articles'] as const,
  KNOWLEDGE_DETAIL: (id: string) => ['knowledge', id] as const,
  SPIRITUALITE_CATEGORIES: ['spiritualite', 'categories'] as const,
  SPIRITUALITE_ARTICLES: (categoryId?: string) => ['spiritualite', 'articles', categoryId] as const,
  
  // Livres & Offrandes
  BOOKS: ['books'] as const,
  BOOK_DETAIL: (id: string) => ['books', id] as const,
  OFFERINGS: ['offerings'] as const,
  OFFERING_DETAIL: (id: string) => ['offerings', id] as const,
  
  // Admin
  ADMIN_STATS: ['admin', 'stats'] as const,
  ADMIN_USERS: ['admin', 'users'] as const,
  ADMIN_CONSULTATIONS: ['admin', 'consultations'] as const,
  ADMIN_PAYMENTS: ['admin', 'payments'] as const,
} as const;

/**
 * Helper pour invalider le cache d'une catégorie entière
 */
export const invalidateQueries = (queryKey: readonly unknown[]) => {
  return queryClient.invalidateQueries({ queryKey });
};

/**
 * Helper pour précharger des données
 */
export const prefetchQuery = async (
  queryKey: readonly unknown[],
  queryFn: () => Promise<any>
) => {
  return queryClient.prefetchQuery({ queryKey, queryFn });
};

/**
 * Helper pour définir manuellement des données dans le cache
 */
export const setQueryData = (queryKey: readonly unknown[], data: any) => {
  return queryClient.setQueryData(queryKey, data);
};