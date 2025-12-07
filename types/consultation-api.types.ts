/**
 * Types d'API pour les consultations astrologiques
 * Ces endpoints doivent être implémentés dans votre backend
 */

import type { AnalyseAstrologique } from './astrology.types';

// ==================== POST /api/consultations/{id}/save-analysis ====================

export interface SaveAnalysisRequest {
  analyse: AnalyseAstrologique;
  statut: 'completed' | 'error';
}

export interface SaveAnalysisResponse {
  success: boolean;
  message?: string;
  consultationId?: string;
}

// ==================== GET /api/consultations ====================

export interface ConsultationListItem {
  id: string;
  consultationId: string;
  titre: string;
  prenoms: string;
  nom: string;
  dateNaissance: string;
  dateGeneration: string;
  statut: 'pending' | 'generating_chart' | 'generating_analysis' | 'completed' | 'error';
}

export interface GetConsultationsResponse {
  success: boolean;
  consultations: ConsultationListItem[];
  total?: number;
}

// ==================== GET /api/consultations/{id} ====================

export interface ConsultationDetail {
  id: string;
  consultationId: string;
  titre: string;
  prenoms: string;
  nom: string;
  dateNaissance: string;
  dateGeneration: string;
  statut: 'pending' | 'generating_chart' | 'generating_analysis' | 'completed' | 'error';
  analyse: AnalyseAstrologique;
}

export interface GetConsultationResponse {
  success: boolean;
  consultation: ConsultationDetail;
}

// ==================== Endpoints à implémenter dans votre backend ====================

/**
 * Endpoints requis:
 * 
 * 1. POST /api/consultations/{id}/save-analysis
 *    - Body: SaveAnalysisRequest
 *    - Response: SaveAnalysisResponse
 *    - Description: Sauvegarde l'analyse générée en base de données
 * 
 * 2. GET /api/consultations
 *    - Query params: page?, limit?, userId?
 *    - Response: GetConsultationsResponse
 *    - Description: Liste toutes les consultations de l'utilisateur
 * 
 * 3. GET /api/consultations/{id}
 *    - Response: GetConsultationResponse
 *    - Description: Récupère une consultation spécifique avec son analyse complète
 * 
 * 4. GET /api/consultations/{id}/download-pdf (déjà existant côté Next.js)
 *    - Response: PDF file
 *    - Description: Télécharge l'analyse en PDF
 */
