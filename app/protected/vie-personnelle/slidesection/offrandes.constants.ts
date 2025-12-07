// Mappage des consultations à des offrandes
export const CONSULTATION_OFFERINGS: Record<string, {
  amount: number;
  description: string;
  spiritualBenefit: string;
  waitingTime: number; // en heures
}> = {
  PROFIL_ASTROLOGIQUE: {
    amount: 2500,
    description: 'Offrande pour votre Profil Astrologique',
    spiritualBenefit: 'Illumination de votre chemin de vie',
    waitingTime: 24,
  },
  COMPATIBILITE: {
    amount: 3500,
    description: 'Offrande pour votre Analyse de Compatibilité',
    spiritualBenefit: 'Harmonie et compréhension relationnelle',
    waitingTime: 36,
  },
  NUMEROLOGIE: {
    amount: 2000,
    description: 'Offrande pour votre Analyse Numérologique',
    spiritualBenefit: 'Révélation de vos nombres destinés',
    waitingTime: 24,
  },
  HOROSCOPE: {
    amount: 1500,
    description: 'Offrande pour votre Horoscope personnalisé',
    spiritualBenefit: 'Guidance cosmique pour votre futur',
    waitingTime: 12,
  },
  ASTROLOGIE_AFRICAINE: {
    amount: 4000,
    description: 'Offrande pour votre Astrologie Africaine',
    spiritualBenefit: 'Connexion avec vos ancêtres et votre essence',
    waitingTime: 48,
  },
  VOYANCE: {
    amount: 3000,
    description: 'Offrande pour votre Voyance spirituelle',
    spiritualBenefit: 'Vision claire de votre destinée',
    waitingTime: 36,
  },
  RELATION: {
    amount: 2500,
    description: 'Offrande pour votre Guidance Relationnelle',
    spiritualBenefit: 'Clarté dans vos relations',
    waitingTime: 24,
  },
  CARRIERE: {
    amount: 3000,
    description: 'Offrande pour votre Guidance Professionnelle',
    spiritualBenefit: 'Alignement avec votre mission professionnelle',
    waitingTime: 36,
  },
  SPIRITUALITE: {
    amount: 3500,
    description: 'Offrande pour votre Chemin Spirituel',
    spiritualBenefit: 'Éveil et transformation spirituelle',
    waitingTime: 48,
  },
  AUTRE: {
    amount: 2500,
    description: 'Offrande pour votre Consultation',
    spiritualBenefit: 'Bénédiction spirituelle',
    waitingTime: 24,
  },
};

export const getCurrencySymbol = () => 'FCFA';
