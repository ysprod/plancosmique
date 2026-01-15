import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/cache/queryClient';
import { api } from '@/lib/api/client';
import { CarteDuCielData } from '@/lib/interfaces';
import { saveToCache, getFromCache } from '@/lib/cache/indexedDB';

/**
 * Hook pour la carte du ciel avec cache agressif
 * Les cartes du ciel sont rarement modifiées, donc cache long
 */
export function useCarteDuCielWithCache(userId: string) {
  const queryClient = useQueryClient();

  const {
    data: carteDuCiel,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.CARTE_DU_CIEL(userId),
    queryFn: async () => {
      try {
        // Vérifier IndexedDB d'abord
        const cached = await getFromCache('cartesDuCiel', userId);
        
        if (cached && cached.expiresAt > Date.now()) {
          // Cache valide, fetch en arrière-plan pour mise à jour
          api.get<CarteDuCielData>(`/carte-du-ciel/${userId}`)
            .then(async (response) => {
              await saveToCache('cartesDuCiel', {
                userId,
                data: response.data,
                timestamp: Date.now(),
                expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 jours
              });
              queryClient.setQueryData(QUERY_KEYS.CARTE_DU_CIEL(userId), response.data);
            })
            .catch(() => {});
          
          return cached.data;
        }

        // Fetch depuis l'API
        const response = await api.get<CarteDuCielData>(`/carte-du-ciel/${userId}`);
        const data = response.data;

        // Sauvegarder dans IndexedDB avec TTL long (30 jours)
        await saveToCache('cartesDuCiel', {
          userId,
          data,
          timestamp: Date.now(),
          expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
        });

        return data;
      } catch (err: any) {
        // Fallback sur cache expiré
        const fallback = await getFromCache('cartesDuCiel', userId);
        if (fallback) {
          console.warn('Utilisation du cache expiré de la carte du ciel');
          return fallback.data;
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 heures
    gcTime: 1000 * 60 * 60 * 24 * 30, // 30 jours
    enabled: !!userId,
    retry: 2,
  });

  // Mutation pour regénérer la carte du ciel
  const regenerateMutation = useMutation({
    mutationFn: async () => {
      return api.post<CarteDuCielData>(`/carte-du-ciel/${userId}/regenerate`);
    },
    onSuccess: async (response) => {
      const newData = response.data;
      
      // Mettre à jour tous les caches
      queryClient.setQueryData(QUERY_KEYS.CARTE_DU_CIEL(userId), newData);
      
      await saveToCache('cartesDuCiel', {
        userId,
        data: newData,
        timestamp: Date.now(),
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
      });
    },
  });

  return {
    carteDuCiel,
    isLoading,
    error: error as Error | null,
    refetch,
    regenerate: regenerateMutation.mutate,
    isRegenerating: regenerateMutation.isPending,
  };
}
