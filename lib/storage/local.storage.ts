/**
 * Système de stockage local pour les analyses astrologiques
 * Utilise le localStorage pour sauvegarder les analyses
 * À remplacer par une vraie DB en production
 */

import type { AnalyseAstrologique, StatutConsultation } from '@/types/astrology.types';

const STORAGE_KEY_PREFIX = 'astro_analysis_';
const STORAGE_STATUS_PREFIX = 'astro_status_';

// ==================== SAUVEGARDE ====================

/**
 * Sauvegarde une analyse astrologique
 */
export function saveAnalyse(analyse: AnalyseAstrologique): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}${analyse.consultationId}`;
    const data = JSON.stringify(analyse);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, data);
      console.log('[Storage] Analyse sauvegardée:', analyse.consultationId);
    }
  } catch (error) {
    console.error('[Storage] Erreur sauvegarde:', error);
  }
}

/**
 * Sauvegarde le statut d'une consultation
 */
export function saveStatut(statut: StatutConsultation): void {
  try {
    const key = `${STORAGE_STATUS_PREFIX}${statut.consultationId}`;
    const data = JSON.stringify(statut);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, data);
      console.log('[Storage] Statut sauvegardé:', statut.consultationId, statut.statut);
    }
  } catch (error) {
    console.error('[Storage] Erreur sauvegarde statut:', error);
  }
}

// ==================== RÉCUPÉRATION ====================

/**
 * Récupère une analyse astrologique
 */
export function getAnalyse(consultationId: string): AnalyseAstrologique | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const key = `${STORAGE_KEY_PREFIX}${consultationId}`;
    const data = localStorage.getItem(key);
    
    if (!data) return null;
    
    return JSON.parse(data) as AnalyseAstrologique;
  } catch (error) {
    console.error('[Storage] Erreur récupération:', error);
    return null;
  }
}

/**
 * Récupère le statut d'une consultation
 */
export function getStatut(consultationId: string): StatutConsultation | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const key = `${STORAGE_STATUS_PREFIX}${consultationId}`;
    const data = localStorage.getItem(key);
    
    if (!data) return null;
    
    return JSON.parse(data) as StatutConsultation;
  } catch (error) {
    console.error('[Storage] Erreur récupération statut:', error);
    return null;
  }
}

/**
 * Liste toutes les analyses d'un utilisateur
 */
export function listUserAnalyses(userId: string): AnalyseAstrologique[] {
  // userId parameter reserved for future database implementation with user filtering
  void userId;
  
  try {
    if (typeof window === 'undefined') return [];
    
    const analyses: AnalyseAstrologique[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          const analyse = JSON.parse(data) as AnalyseAstrologique;
          // Filtrer par userId si nécessaire (à ajouter dans le type)
          analyses.push(analyse);
        }
      }
    }
    
    return analyses.sort((a, b) => 
      new Date(b.dateGeneration).getTime() - new Date(a.dateGeneration).getTime()
    );
  } catch (error) {
    console.error('[Storage] Erreur listage:', error);
    return [];
  }
}

// ==================== SUPPRESSION ====================

/**
 * Supprime une analyse
 */
export function deleteAnalyse(consultationId: string): void {
  try {
    if (typeof window === 'undefined') return;
    
    const key = `${STORAGE_KEY_PREFIX}${consultationId}`;
    const statusKey = `${STORAGE_STATUS_PREFIX}${consultationId}`;
    
    localStorage.removeItem(key);
    localStorage.removeItem(statusKey);
    
    console.log('[Storage] Analyse supprimée:', consultationId);
  } catch (error) {
    console.error('[Storage] Erreur suppression:', error);
  }
}

/**
 * Nettoie les anciennes analyses (plus de 30 jours)
 */
export function cleanOldAnalyses(): void {
  try {
    if (typeof window === 'undefined') return;
    
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          const analyse = JSON.parse(data) as AnalyseAstrologique;
          const ageMs = now - new Date(analyse.dateGeneration).getTime();
          
          if (ageMs > thirtyDays) {
            localStorage.removeItem(key);
            console.log('[Storage] Analyse expirée supprimée:', analyse.consultationId);
          }
        }
      }
    }
  } catch (error) {
    console.error('[Storage] Erreur nettoyage:', error);
  }
}

// ==================== EXPORT ====================

export const storageService = {
  saveAnalyse,
  saveStatut,
  getAnalyse,
  getStatut,
  listUserAnalyses,
  deleteAnalyse,
  cleanOldAnalyses,
};
