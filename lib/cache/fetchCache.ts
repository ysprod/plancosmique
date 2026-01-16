/**
 * Configuration du cache pour les fetch() dans Next.js 14
 * Optimise les requêtes API avec revalidation intelligente
 */

export const cacheConfig = {
  // Configuration par défaut pour les requêtes API
  default: {
    next: { 
      revalidate: 300 // 5 minutes
    }
  },

  // Pages statiques - cache long
  static: {
    next: { 
      revalidate: 3600 // 1 heure
    }
  },

  // Données utilisateur - cache court
  user: {
    next: { 
      revalidate: 60 // 1 minute
    }
  },

  // Données en temps réel - pas de cache
  realtime: {
    cache: 'no-store' as const
  },

  // Données rarement modifiées - cache très long
  immutable: {
    next: { 
      revalidate: 86400 // 24 heures
    }
  },

  // Consultations - cache moyen
  consultations: {
    next: { 
      revalidate: 600 // 10 minutes
    }
  },

  // Offrandes et produits - cache moyen
  products: {
    next: { 
      revalidate: 900 // 15 minutes
    }
  },

  // Statistiques admin - cache court
  adminStats: {
    next: { 
      revalidate: 120 // 2 minutes
    }
  },

  // Contenu éducatif - cache long
  knowledge: {
    next: { 
      revalidate: 7200 // 2 heures
    }
  },
};

/**
 * Helper pour créer une config de fetch avec cache optimisé
 */
export function createFetchConfig(type: keyof typeof cacheConfig, tags?: string[]) {
  const config = cacheConfig[type];
  
  // Si c'est un type realtime (no-store), on retourne juste ça
  if ('cache' in config) {
    return config;
  }
  
  // Sinon, on ajoute les tags si fournis
  return {
    ...config,
    ...(tags && { next: { ...config.next, tags } })
  };
}

/**
 * Revalide un tag de cache spécifique
 * Utiliser avec revalidateTag() de Next.js
 */
export const cacheTags = {
  consultations: 'consultations',
  users: 'users',
  payments: 'payments',
  offrandes: 'offrandes',
  categories: 'categories',
  rubriques: 'rubriques',
  knowledge: 'knowledge',
  spiritualite: 'spiritualite',
  adminStats: 'admin-stats',
  userProfile: (userId: string) => `user-${userId}`,
  consultation: (consultationId: string) => `consultation-${consultationId}`,
} as const;
