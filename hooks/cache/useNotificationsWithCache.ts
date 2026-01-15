import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/cache/queryClient';
import { api } from '@/lib/api/client';
import { Notification } from '@/lib/types/notification.types';
import { saveToCache, getFromCache } from '@/lib/cache/indexedDB';

/**
 * Hook optimisé pour les notifications avec cache multi-niveaux
 * - Niveau 1: React Query (mémoire + localStorage)
 * - Niveau 2: IndexedDB pour persistance long terme
 */
export function useNotificationsWithCache() {
  const queryClient = useQueryClient();

  // Récupération des notifications avec cache
  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS,
    queryFn: async () => {
      try {
        // Essayer d'abord IndexedDB
        const cached = await getFromCache('consultations', 'notifications');
        
        // Si cache valide, l'utiliser pendant qu'on fetch en arrière-plan
        if (cached && cached.expiresAt > Date.now()) {
          // Fetch en arrière-plan pour mettre à jour
          api.get<Notification[]>('/notifications')
            .then(async (response) => {
              const data = response.data;
              
              // Mettre à jour IndexedDB
              await saveToCache('consultations', {
                id: 'notifications',
                data,
                timestamp: Date.now(),
                expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
              });
              
              // Mettre à jour React Query
              queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS, data);
            })
            .catch(() => {});
          
          return cached.data;
        }

        // Pas de cache ou expiré: fetch normal
        const response = await api.get<Notification[]>('/notifications');
        const data = response.data;

        // Sauvegarder dans IndexedDB
        await saveToCache('consultations', {
          id: 'notifications',
          data,
          timestamp: Date.now(),
          expiresAt: Date.now() + (5 * 60 * 1000),
        });

        return data;
      } catch (err: any) {
        // En cas d'erreur, essayer de retourner les données du cache même expirées
        const fallback = await getFromCache('consultations', 'notifications');
        if (fallback) {
          console.warn('Utilisation du cache expiré suite à une erreur réseau');
          return fallback.data;
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Nombre de notifications non lues
  const unreadCount = notifications?.filter((n: Notification) => !n.isRead).length || 0;

  // Marquer comme lu
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return api.patch(`/notifications/${notificationId}/read`);
    },
    onMutate: async (notificationId) => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });

      // Snapshot de l'état actuel
      const previousNotifications = queryClient.getQueryData<Notification[]>(QUERY_KEYS.NOTIFICATIONS);

      // Mise à jour optimiste
      if (previousNotifications) {
        const updated = previousNotifications.map((n: Notification) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        );
        queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS, updated);
        
        // Mettre à jour IndexedDB
        await saveToCache('consultations', {
          id: 'notifications',
          data: updated,
          timestamp: Date.now(),
          expiresAt: Date.now() + (5 * 60 * 1000),
        });
      }

      return { previousNotifications };
    },
    onError: (err, notificationId, context) => {
      // Rollback en cas d'erreur
      if (context?.previousNotifications) {
        queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS, context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
    },
  });

  // Marquer toutes comme lues
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      return api.patch('/notifications/read-all');
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
      
      const previousNotifications = queryClient.getQueryData<Notification[]>(QUERY_KEYS.NOTIFICATIONS);
      
      if (previousNotifications) {
        const updated = previousNotifications.map((n: Notification) => ({ ...n, isRead: true }));
        queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS, updated);
        
        await saveToCache('consultations', {
          id: 'notifications',
          data: updated,
          timestamp: Date.now(),
          expiresAt: Date.now() + (5 * 60 * 1000),
        });
      }
      
      return { previousNotifications };
    },
    onError: (err, vars, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS, context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
    },
  });

  return {
    notifications: notifications || [],
    unreadCount,
    isLoading,
    error: error as Error | null,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAsRead: markAsReadMutation.isPending || markAllAsReadMutation.isPending,
  };
}
