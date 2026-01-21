import { api } from '../client';
import { Grade } from '@/lib/types/grade.types';
import { UserType } from '@/lib/types/user-profile.types';

/**
 * Service pour gérer les grades utilisateurs
 */
export const gradeService = {
    /**
     * Obtenir les statistiques de progression de l'utilisateur connecté
     */
    async getMyProgress(): Promise<{
        currentGrade: Grade | null;
        nextGrade: Grade | null;
        consultationsCompleted: number;
        rituelsCompleted: number;
        booksRead: number;
        nextGradeRequirements?: {
            consultations: number;
            rituels: number;
            livres: number;
        };
        progress?: {
            consultations: number;
            rituels: number;
            livres: number;
        };
    }> {
        const response = await api.get('/grades/progress');
        return response.data;
    },

    /**
     * Obtenir les informations sur tous les grades
     */
    async getAllGradesInfo(): Promise<Array<{
        grade: Grade;
        level: number;
        requirements: {
            consultations: number;
            rituels: number;
            livres: number;
        };
    }>> {
        const response = await api.get('/grades/info');
        return response.data;
    },

    /**
     * Incrémenter le compteur de consultations
     */
    async incrementMyConsultations(): Promise<void> {
        await api.patch('/grades/increment-consultations');
    },

    /**
     * Incrémenter le compteur de rituels
     */
    async incrementMyRituels(): Promise<void> {
        await api.patch('/grades/increment-rituels');
    },

    /**
     * Incrémenter le compteur de livres lus
     */
    async incrementMyBooks(): Promise<void> {
        await api.patch('/grades/increment-books');
    },

    /**
     * Récupérer le message de bienvenue personnalisé
     */
    async getWelcomeMessage(): Promise<{ message: string }> {
        const response = await api.get('/grades/welcome-message');
        return response.data;
    }
};

/**
 * Service pour gérer les profils utilisateurs
 */
export const profileService = {
    /**
     * Obtenir les informations d'abonnement de l'utilisateur connecté
     */
    async getMySubscription(): Promise<{
        userType: UserType;
        premiumRubriqueId?: string;
        subscriptionStartDate?: Date;
        subscriptionEndDate?: Date;
        isActive: boolean;
        daysRemaining?: number;
    }> {
        const response = await api.get('/user-access/subscription-info');
        return response.data;
    },

    /**
     * Vérifier l'accès à une rubrique pour l'utilisateur connecté
     */
    async checkMyRubriqueAccess(rubriqueId: string): Promise<{ hasAccess: boolean }> {
        const response = await api.post(`/user-access/check-access/${rubriqueId}`);
        return response.data;
    },

    /**
     * Activer un abonnement Premium
     */
    async activateMyPremium(rubriqueId: string, durationInDays?: number): Promise<{ success: boolean }> {
        const response = await api.post('/user-access/activate-premium', {
            rubriqueId,
            durationInDays
        });
        return response.data;
    },

    /**
     * Activer un abonnement Intégral
     */
    async activateMyIntegral(durationInDays?: number): Promise<{ success: boolean }> {
        const response = await api.post('/user-access/activate-integral', {
            durationInDays
        });
        return response.data;
    },

    /**
     * Annuler l'abonnement
     */
    async cancelMySubscription(): Promise<{ success: boolean }> {
        const response = await api.delete('/user-access/cancel-subscription');
        return response.data;
    }
};