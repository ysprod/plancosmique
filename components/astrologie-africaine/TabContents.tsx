import { CalendrierLunaireContent } from './CalendrierLunaireContent';
import { IncantationsContent } from './IncantationsContent';
import { RituelsContent } from './RituelsContent';

export const RITUELS_DATA = [
  { name: "Rituel de Nouvelle Lune", phase: "Nouvelle Lune", goal: "Nouveaux départs, intentions" },
  { name: "Rituel de Lune Croissante", phase: "Croissante", goal: "Croissance, expansion" },
  { name: "Rituel de Pleine Lune", phase: "Pleine Lune", goal: "Manifestation, gratitude" },
  { name: "Rituel de Lune Décroissante", phase: "Décroissante", goal: "Libération, purification" },
  { name: "Rituel de Purification", phase: "Toutes phases", goal: "Nettoyage énergétique" },
  { name: "Rituel d'Abondance", phase: "Pleine Lune", goal: "Prospérité matérielle" }
];

export const INCANTATIONS_DATA = [
  { name: "Invocation de Protection", purpose: "Bouclier spirituel et sécurité", element: "Terre" },
  { name: "Invocation d'Amour", purpose: "Attirer l'amour et l'harmonie", element: "Eau" },
  { name: "Invocation de Prospérité", purpose: "Abondance et richesse", element: "Or" },
  { name: "Invocation de Sagesse", purpose: "Clarté mentale et intuition", element: "Air" },
  { name: "Invocation de Guérison", purpose: "Santé et vitalité", element: "Lumière" },
  { name: "Invocation des Ancêtres", purpose: "Guidance et bénédiction", element: "Esprit" }
];

export { CalendrierLunaireContent, IncantationsContent, RituelsContent };


