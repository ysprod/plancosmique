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
    id: 'carriere',
    title: 'ORIENTATION DE CARRIÈRE',
    description:
      "Découvrez votre voie professionnelle idéale. Je veux connaître mes talents naturels, les domaines où je peux exceller et la carrière qui correspond à ma mission d'âme.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'reconversion',
    title: 'RECONVERSION PROFESSIONNELLE',
    description:
      "Est-ce le bon moment pour changer de métier ? Je veux comprendre quand et comment opérer ma transition professionnelle en toute sérénité et réussite.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'entreprise',
    title: 'CRÉATION D\'ENTREPRISE',
    description:
      "Timing et stratégie pour lancer mon business. Je veux savoir quand créer mon entreprise, quel type d'activité privilégier et comment maximiser mes chances de succès.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 2 },
    ]
  },
  {
    id: 'partenariat',
    title: 'PARTENARIATS PROFESSIONNELS',
    description:
      "Analyser la compatibilité avec mes associés ou partenaires. Je veux comprendre les dynamiques énergétiques et comment créer des collaborations harmonieuses et prospères.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 2 },
    ]
  },
  {
    id: 'finances',
    title: 'FINANCES ET PROSPÉRITÉ',
    description:
      "Débloquer mon potentiel financier. Je veux identifier mes cycles de prospérité, comprendre mes blocages financiers et attirer l'abondance dans ma vie professionnelle.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'leadership',
    title: 'LEADERSHIP ET MANAGEMENT',
    description:
      "Développer mon potentiel de leader. Je veux comprendre mon style de management naturel, mes forces en leadership et comment inspirer et guider efficacement mes équipes.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'blocages',
    title: 'BLOCAGES PROFESSIONNELS',
    description:
      "Identifier et dissoudre mes blocages de carrière. Je veux comprendre les obstacles karmiques ou énergétiques qui freinent ma réussite professionnelle et comment les transcender.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'timing',
    title: 'TIMING PROFESSIONNEL',
    description:
      "Connaître les meilleurs moments pour agir. Je veux identifier les périodes favorables pour postuler, négocier, lancer un projet ou prendre des décisions professionnelles majeures.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
  {
    id: 'vocation',
    title: 'MISSION PROFESSIONNELLE',
    description:
      "Découvrir ma vocation profonde. Je veux aligner mon travail avec ma mission d'âme et comprendre comment contribuer au monde à travers mon activité professionnelle.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 3 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 2 },
    ]
  },
  {
    id: 'conflit',
    title: 'CONFLITS ET RELATIONS AU TRAVAIL',
    description:
      "Harmoniser mes relations professionnelles. Je veux comprendre les tensions avec mes collègues, hiérarchie ou clients, et trouver des solutions pour créer un environnement de travail serein.",
    requiredOfferings: [
      { offeringId: '6945ae01b8af14d5f56cec16', quantity: 2 },
      { offeringId: '6945ae01b8af14d5f56cec14', quantity: 1 },
    ]
  },
];

export const CONSULTATION_TYPE_MAP: Record<string, string> = {
  carriere: 'PROFESSIONNEL',
  reconversion: 'PROFESSIONNEL',
  entreprise: 'PROFESSIONNEL',
  partenariat: 'PROFESSIONNEL',
  finances: 'PROFESSIONNEL',
  leadership: 'PROFESSIONNEL',
  blocages: 'PROFESSIONNEL',
  timing: 'PROFESSIONNEL',
  vocation: 'PROFESSIONNEL',
  conflit: 'PROFESSIONNEL',
};
