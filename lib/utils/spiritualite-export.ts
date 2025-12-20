/**
 * Utilitaire pour exporter le contenu de spiritualité vers la base de données
 * Utilisez cette fonction pour générer le JSON à insérer dans votre backend
 */

export interface SpiritualPracticeDB {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  bestTiming?: string;
  category: 'spiritualite-africaine';
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
 