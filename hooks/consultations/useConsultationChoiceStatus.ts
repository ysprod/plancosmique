'use client';

/**
 * Hook personnalisé pour gérer les statuts des choix de consultation
 * Gère les 3 états du bouton : CONSULTER | RÉPONSE EN ATTENTE | VOIR L'ANALYSE
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getConsultationChoiceStatus,
  getAllConsultationChoicesStatus
} from '@/lib/api/services/consultation-status.service';
import type {
  ConsultationChoiceStatus,
  ConsultationButtonStatus
} from '@/lib/types/consultation-status.types';

/**
 * Hook pour récupérer le statut d'un choix de consultation spécifique
 * @param userId - ID de l'utilisateur
 * @param choiceId - ID du choix de consultation
 * @returns Statut, état de chargement, erreur et fonction de rafraîchissement
 */
export function useConsultationChoiceStatus(userId: string | undefined, choiceId: string | undefined) {
  const [status, setStatus] = useState<ConsultationChoiceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!userId || !choiceId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getConsultationChoiceStatus(userId, choiceId);
      setStatus(data);
    } catch (err: any) {
      console.error('Error fetching consultation choice status:', err);
      setError(err.response?.data?.message || err.message || 'Erreur lors de la récupération du statut');
    } finally {
      setLoading(false);
    }
  }, [userId, choiceId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    loading,
    error,
    refetch: fetchStatus
  };
}

/**
 * Hook pour récupérer les statuts de plusieurs choix de consultation
 * @param userId - ID de l'utilisateur
 * @param choiceIds - Liste optionnelle d'IDs de choix (si vide, récupère tous les choix)
 * @returns Statuts, état de chargement, erreur et fonction de rafraîchissement
 */
export function useMultipleConsultationChoicesStatus(
  userId: string | undefined,
  choiceIds?: string[]
) {
  const [statuses, setStatuses] = useState<ConsultationChoiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatuses = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getAllConsultationChoicesStatus(userId, choiceIds);
      setStatuses(data.choices);
    } catch (err: any) {
      console.error('Error fetching multiple consultation choices status:', err);
      setError(err.response?.data?.message || err.message || 'Erreur lors de la récupération des statuts');
    } finally {
      setLoading(false);
    }
  }, [userId, choiceIds]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  /**
   * Récupère le statut d'un choix spécifique par son ID
   * @param choiceId - ID du choix
   * @returns Le statut du choix ou undefined
   */
  const getStatusByChoiceId = useCallback((choiceId: string): ConsultationChoiceStatus | undefined => {
    return statuses.find(s => s.choiceId === choiceId);
  }, [statuses]);

  /**
   * Récupère le statut du bouton pour un choix spécifique
   * @param choiceId - ID du choix
   * @returns Le statut du bouton ou undefined
   */
  const getButtonStatus = useCallback((choiceId: string): ConsultationButtonStatus | undefined => {
    const status = getStatusByChoiceId(choiceId);
    return status?.buttonStatus;
  }, [getStatusByChoiceId]);

  return {
    statuses,
    loading,
    error,
    refetch: fetchStatuses,
    getStatusByChoiceId,
    getButtonStatus
  };
}
