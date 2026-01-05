/**
 * Configuration centrale de toutes les rubriques et consultations de Mon Etoile
 * 
 * Ce fichier définit l'architecture complète des services proposés :
 * - ASTROLOGIE (Ma Vie Personnelle, Famille Amitié et Couple, Monde Professionnel)
 * - NUMÉROLOGIE (Vos Nombres Personnels, Vos Cycles Personnels)
 */

import { ConsultationChoice } from '@/lib/interfaces';

// =============================================================================
// TYPES DE CONSULTATION
// =============================================================================

export type FrequenceConsultation = 
  | 'UNE_FOIS_VIE'      // Consultation faite une seule fois dans la vie
  | 'ANNUELLE'          // Peut être faite chaque année
  | 'MENSUELLE'         // Peut être faite chaque mois
  | 'QUOTIDIENNE'       // Peut être faite chaque jour
  | 'LIBRE';            // Peut être faite à tout moment

export type TypeParticipants = 
  | 'SOLO'              // Uniquement l'utilisateur
  | 'AVEC_TIERS'        // Utilisateur + une personne tierce
  | 'GROUPE';           // Utilisateur + plusieurs personnes (équipe)

export interface ConsultationConfig {
  id: string;
  titre: string;
  description: string;
  frequence: FrequenceConsultation;
  typeParticipants: TypeParticipants;
  typeTechnique: string; // 'SPIRITUALITE' | 'VIE_PERSONNELLE' | 'RELATIONS' | etc.
  offering: {
    alternatives: Array<{
      category: 'animal' | 'vegetal' | 'beverage';
      offeringId: string;
      quantity: number;
    }>;
  };
  noteImplementation?: string;
}

export interface SousRubrique {
  id: string;
  titre: string;
  description: string;
  consultations: ConsultationConfig[];
}

export interface Rubrique {
  id: string;
  titre: string;
  description: string;
  sousRubriques: SousRubrique[];
}

export interface Domaine {
  id: string;
  titre: string;
  description: string;
  rubriques: Rubrique[];
}

// =============================================================================
// ASTROLOGIE - MA VIE PERSONNELLE
// =============================================================================

const ASTROLOGIE_VIE_PERSONNELLE: SousRubrique = {
  id: 'vie-personnelle',
  titre: 'Ma Vie Personnelle',
  description: 'Toutes les consultations de cette rubrique se font une seule fois dans la vie.',
  consultations: [
    {
      id: 'mission',
      titre: 'JE VEUX CONNAÎTRE MA MISSION DE VIE',
      description: "Comprendre ce pour quoi je suis venu(e) sur Terre. Je veux découvrir ma mission, le sens profond de mon incarnation, et ce que mon âme cherche réellement à accomplir dans cette vie.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'SPIRITUALITE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      }
    },
    {
      id: 'vocation',
      titre: 'JE VEUX TROUVER MA VOCATION PROFESSIONNELLE',
      description: "Savoir quel métier est fait pour moi. Je veux identifier le domaine où je peux m'épanouir, réussir, et exprimer pleinement mes talents naturels.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'PROFESSIONNEL',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec10', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec11', quantity: 1 },
        ]
      }
    },
    {
      id: 'talents',
      titre: 'JE VEUX DÉCOUVRIR MES TALENTS CACHÉS',
      description: "Mettre en lumière les dons que je porte en moi. Je veux comprendre ce qui me rend unique, valoriser mes capacités et apprendre à utiliser mes talents pour transformer ma vie.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'VIE_PERSONNELLE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      }
    },
    {
      id: 'blessures',
      titre: 'JE VEUX GUÉRIR MES BLESSURES KARMIQUES',
      description: "Comprendre l'origine de mes blocages émotionnels. Je veux éclairer mes mémoires passées, libérer mon âme de ses poids anciens et avancer vers une vraie guérison intérieure.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'VIE_PERSONNELLE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec0b', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec0c', quantity: 1 },
        ]
      }
    },
    {
      id: 'amour',
      titre: "JE VEUX COMPRENDRE MA MANIÈRE D'AIMER",
      description: "Connaître ma façon d'aimer et de recevoir l'amour. Je veux comprendre mes besoins affectifs, mes schémas relationnels et créer des relations plus harmonieuses et plus vraies.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'RELATIONS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec17', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec18', quantity: 1 },
        ]
      }
    },
    {
      id: 'argent',
      titre: "JE VEUX AMÉLIORER MON RAPPORT À L'ARGENT ET AU SUCCÈS",
      description: "Comprendre ma relation à l'argent, au travail et à la réussite. Je veux identifier ce qui bloque mon abondance, activer mes forces et attirer une stabilité matérielle durable.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'PROFESSIONNEL',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0c', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec12', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec19', quantity: 1 },
        ]
      }
    },
    {
      id: 'stabilite',
      titre: 'JE VEUX SÉCURISER MA STABILITÉ ÉMOTIONNELLE',
      description: "Comprendre comment fonctionnent mes émotions. Je veux savoir ce qui m'apporte la paix, ce qui me déstabilise, et apprendre à m'apaiser pour retrouver un vrai équilibre intérieur.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'VIE_PERSONNELLE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      }
    },
    {
      id: 'cycles',
      titre: 'JE VEUX ANTICIPER MES GRANDS CYCLES DE VIE',
      description: "Connaître les grandes périodes qui vont rythmer ma vie. Je veux savoir quand agir, quand changer, quand me protéger et quand saisir les opportunités qui s'ouvrent devant moi.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'HOROSCOPE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0d', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec1a', quantity: 1 },
        ]
      }
    },
    {
      id: 'invisible',
      titre: 'JE VEUX ME CONNECTER AU MONDE INVISIBLE',
      description: "Comprendre mon intuition, mes rêves et ma sensibilité spirituelle. Je veux développer ma connexion intérieure et écouter cette guidance qui m'accompagne depuis toujours.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'SPIRITUALITE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      }
    },
    {
      id: 'theme',
      titre: 'JE VEUX MON THÈME ASTRAL COMPLET',
      description: "Accéder à la lecture complète de qui je suis réellement. Je veux comprendre ma personnalité, mes forces, mes défis, mon potentiel et mon chemin de vie pour prendre des décisions alignées et éclairées.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'ASTROLOGIE_AFRICAINE',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0e', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec12', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        ]
      }
    },
  ]
};

// =============================================================================
// ASTROLOGIE - FAMILLE AMITIÉ ET COUPLE
// =============================================================================

const ASTROLOGIE_FAMILLE_COUPLE: SousRubrique = {
  id: 'famille-couple',
  titre: 'Famille, Amitié et Couple',
  description: 'Pour faire une consultation, il faut : Les informations personnelles de l\'utilisateur + les informations personnelles d\'une personne tierce.',
  consultations: [
    {
      id: 'compatibilite-amoureuse',
      titre: 'COMPATIBILITÉ AMOUREUSE',
      description: "Comprendre la dynamique entre deux personnes. Découvrez si vos énergies s'harmonisent naturellement, où se trouvent les points de tension et comment créer une relation équilibrée et durable.",
      frequence: 'LIBRE',
      typeParticipants: 'AVEC_TIERS',
      typeTechnique: 'RELATIONS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec17', quantity: 2 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec18', quantity: 2 },
        ]
      },
      noteImplementation: 'Nécessite un formulaire pour recueillir les infos de la personne tierce (nom, prénoms, date/lieu/heure naissance)'
    },
    {
      id: 'lien-familial',
      titre: 'COMPRENDRE UN LIEN FAMILIAL',
      description: "Analyser la relation avec un parent, un enfant, un frère ou une sœur. Comprenez les défis karmiques, les schémas répétitifs et comment améliorer cette relation pour plus d'harmonie.",
      frequence: 'LIBRE',
      typeParticipants: 'AVEC_TIERS',
      typeTechnique: 'RELATIONS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 2 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 2 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 2 },
        ]
      },
      noteImplementation: 'Formulaire avec relation familiale + infos de la personne tierce'
    },
    {
      id: 'amitie',
      titre: 'ANALYSE D\'UNE AMITIÉ',
      description: "Comprendre la nature d'une amitié importante. Découvrez si cette personne est un allié karmique, ce que vous êtes venus apprendre ensemble et comment nourrir ce lien précieux.",
      frequence: 'LIBRE',
      typeParticipants: 'AVEC_TIERS',
      typeTechnique: 'RELATIONS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 2 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec10', quantity: 2 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec11', quantity: 2 },
        ]
      },
      noteImplementation: 'Formulaire standard avec infos de la personne tierce'
    },
  ]
};

// =============================================================================
// ASTROLOGIE - MONDE PROFESSIONNEL
// =============================================================================

const ASTROLOGIE_MONDE_PROFESSIONNEL: SousRubrique = {
  id: 'monde-professionnel',
  titre: 'Monde Professionnel',
  description: 'Consultations pour comprendre le potentiel professionnel, le leadership et la dynamique d\'équipe.',
  consultations: [
    {
      id: 'leadership',
      titre: 'LEADERSHIP',
      description: "Idéal pour savoir si une personne possède un vrai potentiel de leader ou de commandement. Découvrez ce que révèle une carte céleste sur la capacité naturelle à diriger, influencer et ouvrir les voies. Cette analyse met en lumière le style de leadership inné, la gestion du stress, la relation au pouvoir, la prise de décision et la force intérieure qui inspire les autres.",
      frequence: 'LIBRE',
      typeParticipants: 'SOLO', // Peut être pour soi-même ou pour quelqu'un d'autre
      typeTechnique: 'PROFESSIONNEL',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0d', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec12', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec19', quantity: 1 },
        ]
      },
      noteImplementation: 'Option dans le formulaire : "Pour moi-même" ou "Pour quelqu\'un d\'autre" (si autre, demander les infos de la personne)'
    },
    {
      id: 'talents-potentiel',
      titre: 'TALENTS & POTENTIEL',
      description: "Chaque personne porte un don sacré, un travail qui l'élève et qu'elle élève. Cette consultation dévoile les talents, les forces, les faiblesses et le rôle idéal que chaque collaborateur peut jouer dans l'entreprise. Vous placez enfin la bonne personne au bon endroit.",
      frequence: 'LIBRE',
      typeParticipants: 'SOLO', // Peut être pour soi-même ou pour quelqu'un d'autre
      typeTechnique: 'PROFESSIONNEL',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec10', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec11', quantity: 1 },
        ]
      },
      noteImplementation: 'Option dans le formulaire : "Pour moi-même" ou "Pour quelqu\'un d\'autre"'
    },
    {
      id: 'synergie-equipe',
      titre: 'SYNERGIE D\'ÉQUIPE',
      description: "Une équipe harmonieuse est un village qui avance ensemble. Cette analyse révèle les compatibilités, les tensions possibles et la meilleure manière d'organiser vos équipes pour qu'elles soient fluides, soudées et performantes. Vous créez une cohésion qui transforme le travail en force collective.",
      frequence: 'LIBRE',
      typeParticipants: 'GROUPE',
      typeTechnique: 'PROFESSIONNEL',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0e', quantity: 3 }, // Quantité multipliée par nombre de membres
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec12', quantity: 3 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec16', quantity: 3 },
        ]
      },
      noteImplementation: 'Formulaire spécial permettant d\'ajouter plusieurs membres d\'équipe (minimum 3, maximum 10). Les offrandes sont multipliées par le nombre de membres.'
    },
  ]
};

// =============================================================================
// NUMÉROLOGIE - VOS NOMBRES PERSONNELS
// =============================================================================

const NUMEROLOGIE_NOMBRES_PERSONNELS: SousRubrique = {
  id: 'nombres-personnels',
  titre: 'Vos Nombres Personnels',
  description: 'Toutes les consultations de cette rubrique se font une seule fois dans la vie. Ces nombres définissent votre identité profonde.',
  consultations: [
    {
      id: 'chemin-de-vie',
      titre: 'CHEMIN DE VIE',
      description: "Votre nombre le plus important. Il révèle votre mission principale, votre direction et le chemin que vous êtes venu parcourir dans cette incarnation.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'NOMBRES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      }
    },
    {
      id: 'nombre-expression',
      titre: 'NOMBRE D\'EXPRESSION',
      description: "Révèle vos talents naturels, votre manière de vous exprimer et la façon dont les autres vous perçoivent. C'est votre identité sociale et professionnelle.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'NOMBRES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec10', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec11', quantity: 1 },
        ]
      }
    },
    {
      id: 'nombre-intime',
      titre: 'NOMBRE INTIME (DÉSIR DU CŒUR)',
      description: "Dévoile vos motivations profondes, ce qui vous anime intérieurement et vos aspirations les plus secrètes. C'est votre monde intérieur.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'NOMBRES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec17', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec18', quantity: 1 },
        ]
      }
    },
    {
      id: 'nombre-realisation',
      titre: 'NOMBRE DE RÉALISATION',
      description: "Indique ce que vous êtes destiné à accomplir, votre contribution au monde et votre héritage. C'est votre potentiel de manifestation.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'NOMBRES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec0b', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec0c', quantity: 1 },
        ]
      }
    },
    {
      id: 'profil-complet',
      titre: 'PROFIL NUMÉROLOGIQUE COMPLET',
      description: "L'analyse complète de tous vos nombres personnels. Une vision globale et approfondie de votre identité numérologique, incluant tous les nombres clés et leurs interactions.",
      frequence: 'UNE_FOIS_VIE',
      typeParticipants: 'SOLO',
      typeTechnique: 'NOMBRES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec0e', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec12', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
        ]
      }
    },
  ]
};

// =============================================================================
// NUMÉROLOGIE - VOS CYCLES PERSONNELS
// =============================================================================

const NUMEROLOGIE_CYCLES_PERSONNELS: SousRubrique = {
  id: 'cycles-personnels',
  titre: 'Vos Cycles Personnels',
  description: 'Ces consultations éclairent les énergies temporelles qui vous influencent. Chacune a sa propre fréquence.',
  consultations: [
    {
      id: 'annee-personnelle',
      titre: 'VOTRE ANNÉE PERSONNELLE',
      description: "Découvrez l'énergie qui gouverne votre année actuelle. Cette consultation révèle les thèmes, opportunités et défis des 12 prochains mois pour vous guider dans vos décisions.",
      frequence: 'ANNUELLE',
      typeParticipants: 'SOLO',
      typeTechnique: 'CYCLES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec10', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec11', quantity: 1 },
        ]
      },
      noteImplementation: 'Peut être refaite chaque année. Système de vérification pour limiter à une fois par an.'
    },
    {
      id: 'mois-personnel',
      titre: 'VOTRE MOIS PERSONNEL',
      description: "Comprenez l'énergie du mois en cours. Cette analyse vous aide à choisir le bon moment pour agir, vous reposer ou avancer sur vos projets importants.",
      frequence: 'MENSUELLE',
      typeParticipants: 'SOLO',
      typeTechnique: 'CYCLES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec13', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
        ]
      },
      noteImplementation: 'Peut être refaite chaque mois. Système de vérification pour limiter à une fois par mois.'
    },
    {
      id: 'jour-personnel',
      titre: 'VOTRE JOUR PERSONNEL',
      description: "Découvrez l'influence du jour actuel. Idéal pour les décisions importantes ou pour comprendre l'énergie d'une journée spécifique.",
      frequence: 'QUOTIDIENNE',
      typeParticipants: 'SOLO',
      typeTechnique: 'CYCLES_PERSONNELS',
      offering: {
        alternatives: [
          { category: 'animal', offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
          { category: 'vegetal', offeringId: '6945ae01b8af14d5f56cec17', quantity: 1 },
          { category: 'beverage', offeringId: '6945ae01b8af14d5f56cec18', quantity: 1 },
        ]
      },
      noteImplementation: 'Peut être refaite chaque jour. Système de vérification pour limiter à une fois par jour.'
    },
  ]
};

// =============================================================================
// ASSEMBLAGE DES RUBRIQUES
// =============================================================================

// Horoscope est inclus dans ASTROLOGIE_VIE_PERSONNELLE (consultation id: 'cycles', typeTechnique: 'HOROSCOPE')
const RUBRIQUE_ASTROLOGIE: Rubrique = {
  id: 'astrologie',
  titre: 'ASTROLOGIE',
  description: 'Découvrez les secrets de votre carte céleste et comprenez votre chemin de vie à travers l\'astrologie.',
  sousRubriques: [
    ASTROLOGIE_VIE_PERSONNELLE, // contient la consultation Horoscope
    ASTROLOGIE_FAMILLE_COUPLE,
    ASTROLOGIE_MONDE_PROFESSIONNEL,
  ]
};

const RUBRIQUE_NUMEROLOGIE: Rubrique = {
  id: 'numerologie',
  titre: 'NUMÉROLOGIE',
  description: 'Explorez la sagesse des nombres pour révéler votre identité profonde et vos cycles de vie.',
  sousRubriques: [
    NUMEROLOGIE_NOMBRES_PERSONNELS,
    NUMEROLOGIE_CYCLES_PERSONNELS,
  ]
};

// =============================================================================
// CONFIGURATION COMPLÈTE - DOMAINES
// =============================================================================

export const DOMAINES: Domaine[] = [
  {
    id: 'sciences-divinatoires',
    titre: 'Sciences Divinatoires',
    description: 'Explorez les mystères de votre destinée à travers l\'astrologie et la numérologie.',
    rubriques: [
      RUBRIQUE_ASTROLOGIE,
      RUBRIQUE_NUMEROLOGIE,
    ]
  }
];

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

/**
 * Récupère toutes les consultations d'un domaine spécifique
 */
export function getConsultationsByDomaine(domaineId: string): ConsultationConfig[] {
  const domaine = DOMAINES.find(d => d.id === domaineId);
  if (!domaine) return [];

  const consultations: ConsultationConfig[] = [];
  domaine.rubriques.forEach(rubrique => {
    rubrique.sousRubriques.forEach(sousRubrique => {
      consultations.push(...sousRubrique.consultations);
    });
  });

  return consultations;
}

/**
 * Récupère une consultation par son ID
 */
export function getConsultationById(consultationId: string): ConsultationConfig | undefined {
  for (const domaine of DOMAINES) {
    for (const rubrique of domaine.rubriques) {
      for (const sousRubrique of rubrique.sousRubriques) {
        const consultation = sousRubrique.consultations.find(c => c.id === consultationId);
        if (consultation) return consultation;
      }
    }
  }
  return undefined;
}

/**
 * Récupère toutes les consultations d'une sous-rubrique
 */
export function getConsultationsBySousRubrique(sousRubriqueId: string): ConsultationConfig[] {
  for (const domaine of DOMAINES) {
    for (const rubrique of domaine.rubriques) {
      const sousRubrique = rubrique.sousRubriques.find(sr => sr.id === sousRubriqueId);
      if (sousRubrique) return sousRubrique.consultations;
    }
  }
  return [];
}

/**
 * Compte le nombre total de consultations disponibles
 */
export function getTotalConsultationsCount(): number {
  let count = 0;
  DOMAINES.forEach(domaine => {
    domaine.rubriques.forEach(rubrique => {
      rubrique.sousRubriques.forEach(sousRubrique => {
        count += sousRubrique.consultations.length;
      });
    });
  });
  return count;
}

/**
 * Statistiques de la plateforme
 */
export function getPlatformStats() {
  let totalConsultations = 0;
  let consultationsUneFoisVie = 0;
  let consultationsCycliques = 0;

  DOMAINES.forEach(domaine => {
    domaine.rubriques.forEach(rubrique => {
      rubrique.sousRubriques.forEach(sousRubrique => {
        sousRubrique.consultations.forEach(consultation => {
          totalConsultations++;
          if (consultation.frequence === 'UNE_FOIS_VIE') {
            consultationsUneFoisVie++;
          } else {
            consultationsCycliques++;
          }
        });
      });
    });
  });

  return {
    totalDomaines: DOMAINES.length,
    totalRubriques: DOMAINES.reduce((sum, d) => sum + d.rubriques.length, 0),
    totalSousRubriques: DOMAINES.reduce((sum, d) => 
      sum + d.rubriques.reduce((s, r) => s + r.sousRubriques.length, 0), 0
    ),
    totalConsultations,
    consultationsUneFoisVie,
    consultationsCycliques,
  };
}
