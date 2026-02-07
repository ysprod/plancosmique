/**
 * Types pour les prompts de consultation
 */

/**
 * Structure d'un prompt dans la base de données
 */
export interface Prompt {
  _id: string;
  title: string;
  description: string;
  prompt: string;
  choiceId: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTO pour créer un nouveau prompt
 */
export interface CreatePromptDto {
  title: string;
  description: string;
  prompt: string;
  choiceId: string;
}

/**
 * DTO pour mettre à jour un prompt existant
 * Tous les champs sont optionnels pour permettre des mises à jour partielles
 */
export interface UpdatePromptDto {
  title?: string;
  description?: string;
  prompt?: string;
  choiceId?: string;
  isActive?: boolean;
}

/**
 * Réponse API lors de la création/mise à jour d'un prompt
 */
export interface PromptResponse {
  success: boolean;
  data: Prompt;
  message?: string;
}
