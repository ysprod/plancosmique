/**
 * Système de profils utilisateurs
 * 3 types de profils basés sur l'abonnement
 * Compatible avec le backend NestJS
 */

export enum UserType {
  BASIQUE = 'BASIQUE',
  PREMIUM = 'PREMIUM',
  INTEGRAL = 'INTEGRAL',
}

export interface UserSubscription {
  userType: UserType;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  premiumRubriqueId?: string; // ID de la rubrique pour Premium
  isActive: boolean;
  daysRemaining?: number;
}

export interface UserProfileAccess {
  userType: UserType;
  hasAccessToFreeContent: boolean;
  canBuyIndividualConsultations: boolean;
  hasAccessToRubrique?: string; // ID rubrique pour Premium
  hasAccessToAllRubriques: boolean;
  subscriptionEndDate?: string;
}

/**
 * Vérifie si un abonnement est actif
 */
export function isSubscriptionActive(subscription: UserSubscription): boolean {
  if (subscription.userType === UserType.BASIQUE) {
    return true; // Toujours actif
  }

  if (!subscription.subscriptionEndDate) {
    return false;
  }

  const now = new Date();
  const endDate = new Date(subscription.subscriptionEndDate);
  return now <= endDate;
}

/**
 * Vérifie si l'utilisateur a accès à une rubrique
 */
export function hasAccessToRubrique(
  subscription: UserSubscription,
  rubriqueId: string
): boolean {
  if (!isSubscriptionActive(subscription)) {
    return false;
  }

  switch (subscription.userType) {
    case UserType.BASIQUE:
      return false; // Doit acheter à l'unité
    case UserType.PREMIUM:
      return subscription.premiumRubriqueId === rubriqueId;
    case UserType.INTEGRAL:
      return true; // Accès à tout
    default:
      return false;
  }
}

/**
 * Calcule les droits d'accès de l'utilisateur
 */
export function calculateUserAccess(subscription: UserSubscription): UserProfileAccess {
  const isActive = isSubscriptionActive(subscription);

  const access: UserProfileAccess = {
    userType: subscription.userType,
    hasAccessToFreeContent: true, // Tous ont accès au contenu gratuit
    canBuyIndividualConsultations: subscription.userType === UserType.BASIQUE || subscription.userType === UserType.PREMIUM,
    hasAccessToAllRubriques: false,
    subscriptionEndDate: subscription.subscriptionEndDate
  };

  if (isActive) {
    switch (subscription.userType) {
      case UserType.PREMIUM:
        access.hasAccessToRubrique = subscription.premiumRubriqueId;
        break;
      case UserType.INTEGRAL:
        access.hasAccessToAllRubriques = true;
        access.canBuyIndividualConsultations = false; // Inutile
        break;
    }
  }

  return access;
}

/**
 * Obtient le label du type de profil
 */
export function getUserTypeLabel(type: UserType): string {
  const labels: Record<UserType, string> = {
    [UserType.BASIQUE]: 'Utilisateur Basique',
    [UserType.PREMIUM]: 'Utilisateur Premium',
    [UserType.INTEGRAL]: 'Utilisateur Intégral'
  };
  return labels[type];
}

/**
 * Obtient la description du type de profil
 */
export function getUserTypeDescription(type: UserType): string {
  const descriptions: Record<UserType, string> = {
    [UserType.BASIQUE]: 'Accès aux contenus gratuits et consultations payantes à l\'unité',
    [UserType.PREMIUM]: 'Accès illimité à une rubrique pendant 12 mois',
    [UserType.INTEGRAL]: 'Accès complet à toutes les consultations pendant 12 mois'
  };
  return descriptions[type];
}

/**
 * Crée un abonnement par défaut (BASIQUE)
 */
export function createDefaultSubscription(): UserSubscription {
  return {
    userType: UserType.BASIQUE,
    isActive: true
  };
}

/**
 * Crée un abonnement Premium
 */
export function createPremiumSubscription(rubriqueId: string, durationInDays: number = 365): UserSubscription {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + durationInDays);

  return {
    userType: UserType.PREMIUM,
    subscriptionStartDate: now.toISOString(),
    subscriptionEndDate: endDate.toISOString(),
    premiumRubriqueId: rubriqueId,
    isActive: true
  };
}

/**
 * Crée un abonnement Intégral
 */
export function createIntegralSubscription(durationInDays: number = 365): UserSubscription {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + durationInDays);

  return {
    userType: UserType.INTEGRAL,
    subscriptionStartDate: now.toISOString(),
    subscriptionEndDate: endDate.toISOString(),
    isActive: true
  };
}