// Constantes et types pour la consultation

export interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
}

export const GENRE_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'Homme', label: 'Homme' },
  { value: 'Femme', label: 'Femme' },
  { value: 'Autre', label: 'Autre' },
] as const;

export const CONSULTATION_CHOICES: ConsultationChoice[] = [
  {
    id: 'mission',
    title: 'JE VEUX CONNAÎTRE MA MISSION DE VIE',
    description:
      "Comprendre ce pour quoi je suis venu(e) sur Terre. Je veux découvrir ma mission, le sens profond de mon incarnation, et ce que mon âme cherche réellement à accomplir dans cette vie.",
  },
  {
    id: 'vocation',
    title: 'JE VEUX TROUVER MA VOCATION PROFESSIONNELLE',
    description:
      "Savoir quel métier est fait pour moi. Je veux identifier le domaine où je peux m'épanouir, réussir, et exprimer pleinement mes talents naturels.",
  },
  {
    id: 'talents',
    title: 'JE VEUX DÉCOUVRIR MES TALENTS CACHÉS',
    description:
      "Mettre en lumière les dons que je porte en moi. Je veux comprendre ce qui me rend unique, valoriser mes capacités et apprendre à utiliser mes talents pour transformer ma vie.",
  },
  {
    id: 'blessures',
    title: 'JE VEUX GUÉRIR MES BLESSURES KARMIQUES',
    description:
      "Comprendre l'origine de mes blocages émotionnels. Je veux éclairer mes mémoires passées, libérer mon âme de ses poids anciens et avancer vers une vraie guérison intérieure.",
  },
  {
    id: 'amour',
    title: "JE VEUX COMPRENDRE MA MANIÈRE D'AIMER",
    description:
      "Connaître ma façon d'aimer et de recevoir l'amour. Je veux comprendre mes besoins affectifs, mes schémas relationnels et créer des relations plus harmonieuses et plus vraies.",
  },
  {
    id: 'argent',
    title: "JE VEUX AMÉLIORER MON RAPPORT À L'ARGENT ET AU SUCCÈS",
    description:
      "Comprendre ma relation à l'argent, au travail et à la réussite. Je veux identifier ce qui bloque mon abondance, activer mes forces et attirer une stabilité matérielle durable.",
  },
  {
    id: 'stabilite',
    title: 'JE VEUX SÉCURISER MA STABILITÉ ÉMOTIONNELLE',
    description:
      "Comprendre comment fonctionnent mes émotions. Je veux savoir ce qui m'apporte la paix, ce qui me déstabilise, et apprendre à m'apaiser pour retrouver un vrai équilibre intérieur.",
  },
  {
    id: 'cycles',
    title: 'JE VEUX ANTICIPER MES GRANDS CYCLES DE VIE',
    description:
      "Connaître les grandes périodes qui vont rythmer ma vie. Je veux savoir quand agir, quand changer, quand me protéger et quand saisir les opportunités qui s'ouvrent devant moi.",
  },
  {
    id: 'invisible',
    title: 'JE VEUX ME CONNECTER AU MONDE INVISIBLE',
    description:
      "Comprendre mon intuition, mes rêves et ma sensibilité spirituelle. Je veux développer ma connexion intérieure et écouter cette guidance qui m'accompagne depuis toujours.",
  },
  {
    id: 'theme',
    title: 'JE VEUX MON THÈME ASTRAL COMPLET',
    description:
      "Accéder à la lecture complète de qui je suis réellement. Je veux comprendre ma personnalité, mes forces, mes défis, mon potentiel et mon chemin de vie pour prendre des décisions alignées et éclairées.",
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
