import { OfferingAlternative } from "@/lib/interfaces";
import { ConsultationChoice } from "../../vie-personnelle/slidesection/consultation.types";
 
export interface ConsultationOffering {
  alternatives: OfferingAlternative[];
}

export const CONSULTATION_CHOICES: ConsultationChoice[] = [
  {
    id: 'amoureuse',
    title: 'MA RELATION AMOUREUSE FUTURE',
    description:
      "Qui vais-je rencontrer ? Quand la rencontre aura-t-elle lieu ? Je veux connaître le profil de mon futur partenaire et les circonstances de notre rencontre pour m'y préparer consciemment.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'couple',
    title: 'MON COUPLE ET NOTRE DESTINÉE COMMUNE',
    description:
      "Comprendre ma relation actuelle. Je veux savoir si c'est la bonne personne pour moi, où va notre relation et comment créer une union plus forte et plus harmonieuse.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'harmonie',
    title: 'HARMONIE ET COMPATIBILITÉ ASTROLOGIQUE',
    description:
      "Analyser la synastrie avec mon partenaire. Je veux connaître nos points de force, nos défis relationnels et comment utiliser l'astrologie pour renforcer notre connexion.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
      ]
    }
  },
  {
    id: 'communication',
    title: 'AMÉLIORER LA COMMUNICATION AVEC MON PARTENAIRE',
    description:
      "Pourquoi nous ne nous comprenons pas ? Je veux identifier les blocages de communication et apprendre à exprimer mes besoins pour créer plus d'intimité et de confiance.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'sexualite',
    title: 'INTIMITÉ ET SEXUALITÉ ASTROLOGIQUE',
    description:
      "Comprendre ma sexualité et celle de mon partenaire. Je veux harmoniser nos énergies sexuelles et créer une relation intime plus profonde et satisfaisante.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'famille',
    title: 'MA VIE FAMILIALE ET MES RELATIONS FAMILLES',
    description:
      "Comprendre les dynamiques de ma famille. Je veux savoir comment améliorer mes relations parents-enfants, résoudre les conflits et créer une ambiance plus harmonieuse à la maison.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
      ]
    }
  },
  {
    id: 'amitie',
    title: 'MES AMITIÉS ET RELATIONS SOCIALES',
    description:
      "Approfondir mes amitié. Je veux savoir qui sont mes vrais amis, comment renforcer ces liens et comment naviguer les dynamiques sociales qui m'entourent.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'rupture',
    title: 'GUÉRIR UNE RUPTURE ET AVANCER',
    description:
      "Je viens de rompre ou je dois quitter quelqu'un. Je veux comprendre ce qui s'est passé, apprendre de cette relation et me reconstruire émotionnellement pour l'avenir.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
  {
    id: 'karma',
    title: 'KARMA RELATIONNEL ET PATTERNS AMOUREUX',
    description:
      "Pourquoi je répète le même schéma amoureux ? Je veux identifier mes patterns karmiques, comprendre d'où ils viennent et les transformer pour attirer l'amour sain que je mérite.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
      ]
    }
  },
  {
    id: 'rencontre',
    title: 'TROUVER MON ÂME SŒUR',
    description:
      "Je suis seul(e) et je veux rencontrer quelqu'un. Je veux savoir comment m'aligner avec ma destinée amoureuse et créer les conditions pour attirer mon partenaire idéal.",
    offering: {
      alternatives: [
        { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
        { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
      ]
    }
  },
];

export const CONSULTATION_TYPE_MAP: Record<string, string> = {
  amoureuse: 'RELATIONS',
  couple: 'RELATIONS',
  harmonie: 'RELATIONS',
  communication: 'RELATIONS',
  sexualite: 'RELATIONS',
  famille: 'RELATIONS',
  amitie: 'RELATIONS',
  rupture: 'RELATIONS',
  karma: 'RELATIONS',
  rencontre: 'RELATIONS',
};

export interface Offering {
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage';
  icon: string;
  description: string;
}
