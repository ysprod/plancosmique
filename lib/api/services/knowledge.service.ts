import apiClient from '../client';
import type {
  Knowledge,
  KnowledgeListResponse,
  CreateKnowledgeDto,
  UpdateKnowledgeDto,
  KnowledgeQueryParams,
} from '@/lib/types/knowledge.types';

export const knowledgeService = {
  /**
   * Créer une nouvelle connaissance
   */
  async create(data: CreateKnowledgeDto): Promise<Knowledge> {
    const response = await apiClient.post<Knowledge>('/knowledge', data);
    return response.data;
  },

  /**
   * Récupérer toutes les connaissances (PUBLIC)
   */
  async getAll(params?: KnowledgeQueryParams): Promise<KnowledgeListResponse> {
    const response = await apiClient.get<KnowledgeListResponse>('/knowledge', { params });
    return response.data;
  },

  /**
   * Récupérer mes connaissances
   */
  async getMy(): Promise<Knowledge[]> {
    const response = await apiClient.get<Knowledge[]>('/knowledge/my');
    return response.data;
  },

  /**
   * Récupérer les connaissances populaires
   */
  async getPopular(limit: number = 5): Promise<Knowledge[]> {
    const response = await apiClient.get<Knowledge[]>('/knowledge/popular', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Récupérer les dernières connaissances
   */
  async getRecent(limit: number = 10): Promise<Knowledge[]> {
    const response = await apiClient.get<Knowledge[]>('/knowledge/recent', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Récupérer une connaissance par ID
   */
  async getById(id: string): Promise<Knowledge> {
    const response = await apiClient.get<Knowledge>(`/knowledge/${id}`);
    return response.data;
  },

  /**
   * Mettre à jour une connaissance
   */
  async update(id: string, data: UpdateKnowledgeDto): Promise<Knowledge> {
    const response = await apiClient.patch<Knowledge>(`/knowledge/${id}`, data);
    return response.data;
  },

  /**
   * Supprimer une connaissance
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/knowledge/${id}`);
  },

  /**
   * Aimer/Retirer le like d'une connaissance
   */
  async toggleLike(id: string): Promise<{ liked: boolean; likesCount: number }> {
    const response = await apiClient.post<{ liked: boolean; likesCount: number }>(
      `/knowledge/${id}/like`
    );
    return response.data;
  },
};