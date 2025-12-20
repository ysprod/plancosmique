export interface RequiredOffering {
  offeringId: string;
  quantity: number;
}

export interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
  requiredOfferings: RequiredOffering[];
}

export const CONSULTATION_CHOICES: ConsultationChoice[] = [
  {
    id: 'mission',
    title: 'JE VEUX CONNAÎTRE MA MISSION DE VIE',
    description:
      "Comprendre ce pour quoi je suis venu(e) sur Terre. Je veux découvrir ma mission, le sens profond de mon incarnation, et ce que mon âme cherche réellement à accomplir dans cette vie.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec13', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 2 },
    ]
  },
  {
    id: 'vocation',
    title: 'JE VEUX TROUVER MA VOCATION PROFESSIONNELLE',
    description:
      "Savoir quel métier est fait pour moi. Je veux identifier le domaine où je peux m'épanouir, réussir, et exprimer pleinement mes talents naturels.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec09', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec10', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
    ]
  },
  {
    id: 'talents',
    title: 'JE VEUX DÉCOUVRIR MES TALENTS CACHÉS',
    description:
      "Mettre en lumière les dons que je porte en moi. Je veux comprendre ce qui me rend unique, valoriser mes capacités et apprendre à utiliser mes talents pour transformer ma vie.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec13', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec11', quantity: 1 },
    ]
  },
  {
    id: 'blessures',
    title: 'JE VEUX GUÉRIR MES BLESSURES KARMIQUES',
    description:
      "Comprendre l'origine de mes blocages émotionnels. Je veux éclairer mes mémoires passées, libérer mon âme de ses poids anciens et avancer vers une vraie guérison intérieure.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec15', quantity: 2 },
    ]
  },
  {
    id: 'amour',
    title: "JE VEUX COMPRENDRE MA MANIÈRE D'AIMER",
    description:
      "Connaître ma façon d'aimer et de recevoir l'amour. Je veux comprendre mes besoins affectifs, mes schémas relationnels et créer des relations plus harmonieuses et plus vraies.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 1 },
    ]
  },
  {
    id: 'argent',
    title: "JE VEUX AMÉLIORER MON RAPPORT À L'ARGENT ET AU SUCCÈS",
    description:
      "Comprendre ma relation à l'argent, au travail et à la réussite. Je veux identifier ce qui bloque mon abondance, activer mes forces et attirer une stabilité matérielle durable.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec0c', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec12', quantity: 2 },
    ]
  },
  {
    id: 'stabilite',
    title: 'JE VEUX SÉCURISER MA STABILITÉ ÉMOTIONNELLE',
    description:
      "Comprendre comment fonctionnent mes émotions. Je veux savoir ce qui m'apporte la paix, ce qui me déstabilise, et apprendre à m'apaiser pour retrouver un vrai équilibre intérieur.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec09', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 3 },
    ]
  },
  {
    id: 'cycles',
    title: 'JE VEUX ANTICIPER MES GRANDS CYCLES DE VIE',
    description:
      "Connaître les grandes périodes qui vont rythmer ma vie. Je veux savoir quand agir, quand changer, quand me protéger et quand saisir les opportunités qui s'ouvrent devant moi.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec0d', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec15', quantity: 2 },
    ]
  },
  {
    id: 'invisible',
    title: 'JE VEUX ME CONNECTER AU MONDE INVISIBLE',
    description:
      "Comprendre mon intuition, mes rêves et ma sensibilité spirituelle. Je veux développer ma connexion intérieure et écouter cette guidance qui m'accompagne depuis toujours.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec0a', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec13', quantity: 4 },
      { offeringId: '6945ae01b8af14d5f56cec15', quantity: 1 },
    ]
  },
  {
    id: 'theme',
    title: 'JE VEUX MON THÈME ASTRAL COMPLET',
    description:
      "Accéder à la lecture complète de qui je suis réellement. Je veux comprendre ma personnalité, mes forces, mes défis, mon potentiel et mon chemin de vie pour prendre des décisions alignées et éclairées.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec0e', quantity: 1 },
      { offeringId: '6945ae01b8af14d5f56cec12', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
    ]
  },
];

export const CONSULTATION_TYPE_MAP: Record<string, string> = {
  mission: 'SPIRITUALITE',
  vocation: 'PROFESSIONNEL',
  talents: 'VIE_PERSONNELLE',
  blessures: 'VIE_PERSONNELLE',
  amour: 'RELATIONS',
  argent: 'PROFESSIONNEL',
  stabilite: 'VIE_PERSONNELLE',
  cycles: 'HOROSCOPE',
  invisible: 'SPIRITUALITE',
  theme: 'ASTROLOGIE_AFRICAINE',
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