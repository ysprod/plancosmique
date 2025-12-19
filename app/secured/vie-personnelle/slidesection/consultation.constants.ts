// consultation.constants.ts

export interface RequiredOffering {
  offeringId: string;  // ID de l'offrande (ex: 'cola-rouge')
  quantity: number;    // Quantité requise
}

export interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
  requiredOfferings: RequiredOffering[];  // ✅ Nouveau champ
}

export const CONSULTATION_CHOICES: ConsultationChoice[] = [
  {
    id: 'mission',
    title: 'JE VEUX CONNAÎTRE MA MISSION DE VIE',
    description:
      "Comprendre ce pour quoi je suis venu(e) sur Terre. Je veux découvrir ma mission, le sens profond de mon incarnation, et ce que mon âme cherche réellement à accomplir dans cette vie.",
    requiredOfferings: [
      { offeringId: 'cola-rouge', quantity: 2 },
      { offeringId: 'cola-blanche', quantity: 2 },
    ]
  },
  {
    id: 'vocation',
    title: 'JE VEUX TROUVER MA VOCATION PROFESSIONNELLE',
    description:
      "Savoir quel métier est fait pour moi. Je veux identifier le domaine où je peux m'épanouir, réussir, et exprimer pleinement mes talents naturels.",
    requiredOfferings: [
      { offeringId: 'poulet-blanc', quantity: 1 },
      { offeringId: 'bol-mil', quantity: 1 },
      { offeringId: 'vin-palme', quantity: 1 },
    ]
  },
  {
    id: 'talents',
    title: 'JE VEUX DÉCOUVRIR MES TALENTS CACHÉS',
    description:
      "Mettre en lumière les dons que je porte en moi. Je veux comprendre ce qui me rend unique, valoriser mes capacités et apprendre à utiliser mes talents pour transformer ma vie.",
    requiredOfferings: [
      { offeringId: 'cola-rouge', quantity: 3 },
      { offeringId: 'bol-mais', quantity: 1 },
    ]
  },
  {
    id: 'blessures',
    title: 'JE VEUX GUÉRIR MES BLESSURES KARMIQUES',
    description:
      "Comprendre l'origine de mes blocages émotionnels. Je veux éclairer mes mémoires passées, libérer mon âme de ses poids anciens et avancer vers une vraie guérison intérieure.",
    requiredOfferings: [
      { offeringId: 'poulet-noir', quantity: 1 },
      { offeringId: 'vin-palme', quantity: 2 },
    ]
  },
  {
    id: 'amour',
    title: "JE VEUX COMPRENDRE MA MANIÈRE D'AIMER",
    description:
      "Connaître ma façon d'aimer et de recevoir l'amour. Je veux comprendre mes besoins affectifs, mes schémas relationnels et créer des relations plus harmonieuses et plus vraies.",
    requiredOfferings: [
      { offeringId: 'coq-rouge', quantity: 1 },
      { offeringId: 'cola-rouge', quantity: 2 },
      { offeringId: 'liqueur', quantity: 1 },
    ]
  },
  {
    id: 'argent',
    title: "JE VEUX AMÉLIORER MON RAPPORT À L'ARGENT ET AU SUCCÈS",
    description:
      "Comprendre ma relation à l'argent, au travail et à la réussite. Je veux identifier ce qui bloque mon abondance, activer mes forces et attirer une stabilité matérielle durable.",
    requiredOfferings: [
      { offeringId: 'mouton-blanc', quantity: 1 },
      { offeringId: 'bol-riz', quantity: 2 },
    ]
  },
  {
    id: 'stabilite',
    title: 'JE VEUX SÉCURISER MA STABILITÉ ÉMOTIONNELLE',
    description:
      "Comprendre comment fonctionnent mes émotions. Je veux savoir ce qui m'apporte la paix, ce qui me déstabilise, et apprendre à m'apaiser pour retrouver un vrai équilibre intérieur.",
    requiredOfferings: [
      { offeringId: 'poulet-blanc', quantity: 2 },
      { offeringId: 'cola-blanche', quantity: 3 },
    ]
  },
  {
    id: 'cycles',
    title: 'JE VEUX ANTICIPER MES GRANDS CYCLES DE VIE',
    description:
      "Connaître les grandes périodes qui vont rythmer ma vie. Je veux savoir quand agir, quand changer, quand me protéger et quand saisir les opportunités qui s'ouvrent devant moi.",
    requiredOfferings: [
      { offeringId: 'mouton-noir', quantity: 1 },
      { offeringId: 'vin-palme', quantity: 2 },
    ]
  },
  {
    id: 'invisible',
    title: 'JE VEUX ME CONNECTER AU MONDE INVISIBLE',
    description:
      "Comprendre mon intuition, mes rêves et ma sensibilité spirituelle. Je veux développer ma connexion intérieure et écouter cette guidance qui m'accompagne depuis toujours.",
    requiredOfferings: [
      { offeringId: 'poulet-noir', quantity: 1 },
      { offeringId: 'cola-rouge', quantity: 4 },
      { offeringId: 'vin-palme', quantity: 1 },
    ]
  },
  {
    id: 'theme',
    title: 'JE VEUX MON THÈME ASTRAL COMPLET',
    description:
      "Accéder à la lecture complète de qui je suis réellement. Je veux comprendre ma personnalité, mes forces, mes défis, mon potentiel et mon chemin de vie pour prendre des décisions alignées et éclairées.",
    requiredOfferings: [
      { offeringId: 'boeuf', quantity: 1 },
      { offeringId: 'bol-riz', quantity: 3 },
      { offeringId: 'liqueur', quantity: 2 },
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

// lib/constants/offerings.constants.ts

export interface Offering {
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage';
  icon: string;
  description: string;
}

export const offerings: Offering[] = [
  // Animaux
  {
    id: 'poulet-blanc',
    name: 'Poulet blanc',
    price: 5000,
    priceUSD: 8.9,
    category: 'animal',
    icon: '🐓',
    description: 'Symbole de pureté et d\'harmonie'
  },
  {
    id: 'poulet-noir',
    name: 'Poulet noir',
    price: 7000,
    priceUSD: 12.4,
    category: 'animal',
    icon: '🐔',
    description: 'Pour éloigner les énergies négatives'
  },
  {
    id: 'coq-rouge',
    name: 'Coq rouge',
    price: 9000,
    priceUSD: 16.0,
    category: 'animal',
    icon: '🐓',
    description: 'Force et protection spirituelle'
  },
  {
    id: 'mouton-blanc',
    name: 'Mouton blanc',
    price: 35000,
    priceUSD: 62.1,
    category: 'animal',
    icon: '🐑',
    description: 'Paix et bénédictions familiales'
  },
  {
    id: 'mouton-noir',
    name: 'Mouton noir',
    price: 40000,
    priceUSD: 71.0,
    category: 'animal',
    icon: '🐑',
    description: 'Purification et renaissance'
  },
  {
    id: 'boeuf',
    name: 'Bœuf',
    price: 350000,
    priceUSD: 620.6,
    category: 'animal',
    icon: '🐂',
    description: 'Grande cérémonie et prospérité'
  },
  {
    id: 'chameau',
    name: 'Chameau',
    price: 600000,
    priceUSD: 1064.6,
    category: 'animal',
    icon: '🐪',
    description: 'Endurance et sagesse ancestrale'
  },

  // Végétaux
  {
    id: 'bol-mil',
    name: 'Bol de mil',
    price: 2500,
    priceUSD: 4.4,
    category: 'vegetal',
    icon: '🌾',
    description: 'Nourriture sacrée des ancêtres'
  },
  {
    id: 'bol-mais',
    name: 'Bol de maïs',
    price: 2000,
    priceUSD: 3.5,
    category: 'vegetal',
    icon: '🌽',
    description: 'Abondance et fertilité'
  },
  {
    id: 'bol-riz',
    name: 'Bol de riz',
    price: 3000,
    priceUSD: 5.3,
    category: 'vegetal',
    icon: '🍚',
    description: 'Richesse et satisfaction'
  },
  {
    id: 'cola-rouge',
    name: 'Cola rouge',
    price: 1000,
    priceUSD: 1.8,
    category: 'vegetal',
    icon: '🔴',
    description: 'Communication avec les esprits'
  },
  {
    id: 'cola-blanche',
    name: 'Cola blanche',
    price: 1200,
    priceUSD: 2.1,
    category: 'vegetal',
    icon: '⚪',
    description: 'Pureté et clarté spirituelle'
  },

  // Boissons
  {
    id: 'vin-palme',
    name: 'Vin de palme',
    price: 1500,
    priceUSD: 2.7,
    category: 'beverage',
    icon: '🍷',
    description: 'Libation traditionnelle'
  },
  {
    id: 'liqueur',
    name: 'Liqueur',
    price: 3500,
    priceUSD: 6.2,
    category: 'beverage',
    icon: '🥃',
    description: 'Offrande de prestige'
  },
];
