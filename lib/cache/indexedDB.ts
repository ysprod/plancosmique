import { openDB, DBSchema, IDBPDatabase } from 'idb';

/**
 * Schéma de la base de données IndexedDB
 * Pour stocker des données volumineuses (cartes du ciel, analyses, etc.)
 */
interface MonEtoileDB extends DBSchema {
  consultations: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
      expiresAt: number;
    };
    indexes: { 'by-timestamp': number };
  };
  cartesDuCiel: {
    key: string;
    value: {
      userId: string;
      data: any;
      timestamp: number;
      expiresAt: number;
    };
    indexes: { 'by-user': string; 'by-timestamp': number };
  };
  analyses: {
    key: string;
    value: {
      id: string;
      type: 'numerologie' | 'astrologie' | 'tarot' | 'voyance';
      data: any;
      timestamp: number;
      expiresAt: number;
    };
    indexes: { 'by-type': string; 'by-timestamp': number };
  };
  staticAssets: {
    key: string;
    value: {
      url: string;
      data: Blob;
      timestamp: number;
      expiresAt: number;
    };
    indexes: { 'by-timestamp': number };
  };
}

const DB_NAME = 'monetoile-cache';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<MonEtoileDB> | null = null;

/**
 * Initialise et retourne l'instance de la base de données
 */
export async function getDB(): Promise<IDBPDatabase<MonEtoileDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<MonEtoileDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Store pour les consultations
      if (!db.objectStoreNames.contains('consultations')) {
        const consultationsStore = db.createObjectStore('consultations', { keyPath: 'id' });
        consultationsStore.createIndex('by-timestamp', 'timestamp');
      }

      // Store pour les cartes du ciel
      if (!db.objectStoreNames.contains('cartesDuCiel')) {
        const cartesStore = db.createObjectStore('cartesDuCiel', { keyPath: 'userId' });
        cartesStore.createIndex('by-user', 'userId');
        cartesStore.createIndex('by-timestamp', 'timestamp');
      }

      // Store pour les analyses
      if (!db.objectStoreNames.contains('analyses')) {
        const analysesStore = db.createObjectStore('analyses', { keyPath: 'id' });
        analysesStore.createIndex('by-type', 'type');
        analysesStore.createIndex('by-timestamp', 'timestamp');
      }

      // Store pour les assets statiques (images, etc.)
      if (!db.objectStoreNames.contains('staticAssets')) {
        const assetsStore = db.createObjectStore('staticAssets', { keyPath: 'url' });
        assetsStore.createIndex('by-timestamp', 'timestamp');
      }
    },
  });

  return dbInstance;
}

/**
 * Sauvegarde des données dans IndexedDB
 */
export async function saveToCache<K extends keyof MonEtoileDB>(
  storeName: K,
  data: MonEtoileDB[K]['value']
): Promise<void> {
  try {
    const db = await getDB();
    await db.put(storeName as any, data as any);
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde dans ${storeName}:`, error);
  }
}

/**
 * Récupération de données depuis IndexedDB
 */
export async function getFromCache<K extends keyof MonEtoileDB>(
  storeName: K,
  key: string
): Promise<MonEtoileDB[K]['value'] | undefined> {
  try {
    const db = await getDB();
    const data = await db.get(storeName as any, key as any);
    
    // Vérifier si les données ont expiré
    if (data && data.expiresAt < Date.now()) {
      await db.delete(storeName as any, key as any);
      return undefined;
    }
    
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération depuis ${storeName}:`, error);
    return undefined;
  }
}

/**
 * Suppression de données expirées
 */
export async function cleanExpiredCache(): Promise<void> {
  try {
    const db = await getDB();
    const now = Date.now();
    
    const stores: (keyof MonEtoileDB)[] = ['consultations', 'cartesDuCiel', 'analyses', 'staticAssets'];
    
    for (const storeName of stores) {
      const tx = db.transaction(storeName as any, 'readwrite');
      const store: any = tx.objectStore(storeName as any);
      const index = store.index('by-timestamp');
      
      let cursor = await index.openCursor();
      
      while (cursor) {
        if (cursor.value.expiresAt < now) {
          await cursor.delete();
        }
        cursor = await cursor.continue();
      }
      
      await tx.done;
    }
    
    console.log('✅ Cache expiré nettoyé avec succès');
  } catch (error) {
    console.error('Erreur lors du nettoyage du cache:', error);
  }
}

/**
 * Vide complètement le cache
 */
export async function clearAllCache(): Promise<void> {
  try {
    const db = await getDB();
    const stores: (keyof MonEtoileDB)[] = ['consultations', 'cartesDuCiel', 'analyses', 'staticAssets'];
    
    for (const storeName of stores) {
      await db.clear(storeName as any);
    }
    
    console.log('✅ Tout le cache a été vidé');
  } catch (error) {
    console.error('Erreur lors du vidage du cache:', error);
  }
}

/**
 * Calcule la taille du cache (approximative)
 */
export async function getCacheSize(): Promise<number> {
  try {
    const db = await getDB();
    let totalSize = 0;
    
    const stores: (keyof MonEtoileDB)[] = ['consultations', 'cartesDuCiel', 'analyses', 'staticAssets'];
    
    for (const storeName of stores) {
      const allData = await db.getAll(storeName as any);
      const storeSize = new Blob([JSON.stringify(allData)]).size;
      totalSize += storeSize;
    }
    
    return totalSize;
  } catch (error) {
    console.error('Erreur lors du calcul de la taille du cache:', error);
    return 0;
  }
}

// Nettoyer le cache expiré au chargement et toutes les heures
if (typeof window !== 'undefined') {
  cleanExpiredCache();
  setInterval(cleanExpiredCache, 1000 * 60 * 60); // Toutes les heures
}