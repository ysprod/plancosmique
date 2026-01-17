/**
 * Service API pour la gestion des statuts des choix de consultation
 * Gère les 3 états du bouton : CONSULTER | RÉPONSE EN ATTENTE | VOIR L'ANALYSE
 */

import { api } from '@/lib/api/client';
import type {
  SingleChoiceStatusResponse,
  MultipleChoicesStatusResponse,
  CategoryStatusParams
} from '@/lib/types/consultation-status.types';

/**
 * Récupère le statut d'un choix spécifique pour un utilisateur
 * @param userId - ID de l'utilisateur
 * @param choiceId - ID du choix de consultation
 * @returns Le statut du choix avec le bouton approprié
 */
export async function getConsultationChoiceStatus(
  userId: string,
  choiceId: string
): Promise<SingleChoiceStatusResponse> {
  const response = await api.get<SingleChoiceStatusResponse>(
    `/consultation-choice-status/${userId}/${choiceId}`
  );
  return response.data;
}

/**
 * Récupère les statuts de tous les choix (ou un sous-ensemble) d'un utilisateur
 * @param userId - ID de l'utilisateur
 * @param choiceIds - Liste optionnelle d'IDs de choix à filtrer
 * @returns Les statuts de tous les choix demandés
 */
export async function getAllConsultationChoicesStatus(
  userId: string,
  choiceIds?: string[]
): Promise<MultipleChoicesStatusResponse> {
  const queryParams = choiceIds && choiceIds.length > 0
    ? `?choiceIds=${choiceIds.join(',')}`
    : '';
  
  const response = await api.get<MultipleChoicesStatusResponse>(
    `/consultation-choice-status/${userId}${queryParams}`
  );
  return response.data;
}

/**
 * Récupère les statuts des choix par catégorie
 * @param params - Paramètres avec userId et category
 * @returns Les statuts des choix de la catégorie
 */
export async function getConsultationChoicesStatusByCategory(
  params: CategoryStatusParams
): Promise<MultipleChoicesStatusResponse> {
  const { userId, category } = params;
  const response = await api.get<MultipleChoicesStatusResponse>(
    `/consultation-choice-status/${userId}/category/${category}`
  );
  return response.data;
}
