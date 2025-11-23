/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Service de gestion des consultations
 */

import { api } from '../client';
import { endpoints } from '../endpoints';
import type {
  Consultation,
  ConsultationType,
  ConsultationStatus,
  PaginatedResponse,
  QueryParams,
} from '@/types/api.types';

export interface CreateConsultationDto {
  serviceType: ConsultationType;
  formData: Record<string, any>;
  scheduledDate?: Date;
}

export interface UpdateConsultationDto {
  formData?: Record<string, any>;
  results?: Record<string, any>;
  scheduledDate?: Date;
}

export interface UpdateStatusDto {
  status: ConsultationStatus;
}

export interface AssignConsultantDto {
  consultantId: string;
}

export interface CreateReviewDto {
  rating: number;
  review: string;
}

export interface ConsultationStats {
  totalConsultations: number;
  byStatus: Record<ConsultationStatus, number>;
  byType: Record<ConsultationType, number>;
  averageRating: number;
  totalRevenue: number;
}

export const consultationsService = {
  /**
   * Liste des consultations
   */
  list: async (params?: QueryParams): Promise<PaginatedResponse<Consultation>> => {
    const response = await api.get<PaginatedResponse<Consultation>>(
      endpoints.consultations.list,
      { params }
    );
    return response.data;
  },

  /**
   * Créer une consultation
   */
  create: async (data: CreateConsultationDto): Promise<Consultation> => {
    const response = await api.post<Consultation>(
      endpoints.consultations.create,
      data
    );
    return response.data;
  },

  /**
   * Détails d'une consultation
   */
  getById: async (id: string): Promise<Consultation> => {
    const response = await api.get<Consultation>(endpoints.consultations.byId(id));
    return response.data;
  },

  /**
   * Mettre à jour une consultation
   */
  update: async (id: string, data: UpdateConsultationDto): Promise<Consultation> => {
    const response = await api.patch<Consultation>(
      endpoints.consultations.byId(id),
      data
    );
    return response.data;
  },

  /**
   * Supprimer (annuler) une consultation
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(endpoints.consultations.byId(id));
  },

  /**
   * Changer le statut d'une consultation
   */
  updateStatus: async (
    id: string,
    status: ConsultationStatus
  ): Promise<Consultation> => {
    const response = await api.patch<Consultation>(
      endpoints.consultations.status(id),
      { status }
    );
    return response.data;
  },

  /**
   * Assigner un consultant
   */
  assignConsultant: async (
    id: string,
    consultantId: string
  ): Promise<Consultation> => {
    const response = await api.patch<Consultation>(
      endpoints.consultations.assign(id),
      { consultantId }
    );
    return response.data;
  },

  /**
   * Ajouter une évaluation
   */
  createReview: async (id: string, data: CreateReviewDto): Promise<Consultation> => {
    const response = await api.post<Consultation>(
      endpoints.consultations.review(id),
      data
    );
    return response.data;
  },

  /**
   * Statistiques des consultations
   */
  getStats: async (): Promise<ConsultationStats> => {
    const response = await api.get<ConsultationStats>(
      endpoints.consultations.stats
    );
    return response.data;
  },
};

export default consultationsService;
