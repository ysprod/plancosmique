/**
 * Types pour la gestion des statuts des choix de consultation
 */

/**
 * Les 3 états possibles du bouton de consultation
 */
export enum ConsultationButtonStatus {
  /** Consultation pas encore demandée ou pas finalisée (non payée) */
  CONSULTER = 'CONSULTER',
  /** Consultation payée mais analyse pas encore notifiée */
  REPONSE_EN_ATTENTE = 'RÉPONSE EN ATTENTE',
  /** Analyse notifiée, disponible pour consultation */
  VOIR_ANALYSE = "VOIR L'ANALYSE"
}

/**
 * Statut d'un choix de consultation pour un utilisateur
 */
export interface ConsultationChoiceStatus {
  /** ID du choix de consultation */
  choiceId: string;
  /** Titre du choix */
  choiceTitle: string;
  /** Statut du bouton à afficher */
  buttonStatus: ConsultationButtonStatus;
  /** Indique si une consultation active existe */
  hasActiveConsultation: boolean;
  /** ID de la consultation si elle existe */
  consultationId?: string;
}

/**
 * Réponse pour un choix spécifique
 */
export interface SingleChoiceStatusResponse extends ConsultationChoiceStatus {}

/**
 * Réponse pour plusieurs choix
 */
export interface MultipleChoicesStatusResponse {
  /** ID de l'utilisateur */
  userId: string;
  /** Liste des statuts pour chaque choix */
  choices: ConsultationChoiceStatus[];
}

/**
 * Paramètres pour la requête de statuts multiples
 */
export interface MultipleStatusParams {
  /** ID de l'utilisateur */
  userId: string;
  /** Liste optionnelle d'IDs de choix à filtrer */
  choiceIds?: string[];
}

/**
 * Paramètres pour la requête par catégorie
 */
export interface CategoryStatusParams {
  /** ID de l'utilisateur */
  userId: string;
  /** Catégorie de consultation */
  category: string;
}
