import { useState, useEffect, useCallback } from 'react';
import { gradeService, profileService } from '@/lib/api/services/grade.service';
import { Grade, calculateProgress, UserProgress } from '@/lib/types/grade.types';
import { UserType, UserSubscription, calculateUserAccess, UserProfileAccess } from '@/lib/types/user-profile.types';

interface UseUserProfileReturn {
  gradeProgress: UserProgress | null;
  subscription: UserSubscription | null;
  access: UserProfileAccess | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook pour gérer le grade et le profil utilisateur
 * Compatible avec le backend NestJS
 */
export function useUserProfile(): UseUserProfileReturn {
  const [gradeProgress, setGradeProgress] = useState<UserProgress | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [access, setAccess] = useState<UserProfileAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer la progression du grade
      const progressData = await gradeService.getMyProgress();
      
      // Convertir en format UserProgress
      const progress: UserProgress = {
        consultationsCompleted: progressData.consultationsCompleted,
        rituelsCompleted: progressData.rituelsCompleted,
        booksRead: progressData.booksRead,
        currentGrade: progressData.currentGrade,
        nextGrade: progressData.nextGrade,
        progressToNextGrade: progressData.nextGradeRequirements ? {
          consultations: {
            current: progressData.consultationsCompleted,
            required: progressData.nextGradeRequirements.consultations
          },
          rituels: {
            current: progressData.rituelsCompleted,
            required: progressData.nextGradeRequirements.rituels
          },
          livres: {
            current: progressData.booksRead,
            required: progressData.nextGradeRequirements.livres
          }
        } : undefined
      };
      setGradeProgress(progress);

      // Récupérer l'abonnement
      const subscriptionData = await profileService.getMySubscription();
      
      // Transformer les dates en strings pour le frontend
      const subscription: UserSubscription = {
        ...subscriptionData,
        subscriptionStartDate: subscriptionData.subscriptionStartDate 
          ? new Date(subscriptionData.subscriptionStartDate).toISOString() 
          : undefined,
        subscriptionEndDate: subscriptionData.subscriptionEndDate 
          ? new Date(subscriptionData.subscriptionEndDate).toISOString() 
          : undefined
      };
      
      setSubscription(subscription);

      // Calculer les droits d'accès
      const userAccess = calculateUserAccess(subscription);
      setAccess(userAccess);

    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(err.response?.data?.message || err.message || 'Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    gradeProgress,
    subscription,
    access,
    loading,
    error,
    refetch: fetchUserProfile
  };
}
