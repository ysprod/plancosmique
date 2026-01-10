import { Position } from "../interfaces";  

export type SigneZodiacal =
  | 'Bélier' | 'Taureau' | 'Gémeaux' | 'Cancer'
  | 'Lion' | 'Vierge' | 'Balance' | 'Scorpion'
  | 'Sagittaire' | 'Capricorne' | 'Verseau' | 'Poissons';

export type Planete =
  | 'Soleil' | 'Lune' | 'Mercure' | 'Vénus' | 'Mars'
  | 'Jupiter' | 'Saturne' | 'Uranus' | 'Neptune' | 'Pluton';

export type PointAstrologique =
  | 'Ascendant' | 'Milieu du Ciel' | 'Nœud Nord' | 'Nœud Sud'
  | 'Lilith' | 'Chiron' | 'Vertex' | 'Part de Fortune';

export type Asteroide =
  | 'Pallas' | 'Vesta' | 'Cérès' | 'Junon';

export interface PositionPlanetaire {
  planete: Planete | PointAstrologique | Asteroide;
  signe: SigneZodiacal;
  maison: number; // 1-12
  degre?: number;
  retrograde?: boolean;
  description?: string;
}

export interface CarteDuCiel {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: PositionPlanetaire[];
  aspectsTexte?: string; // Texte brut des aspects (optionnel)
} 

export interface MissionDeVie {
  titre: string;
  analyseKarmique: {
    noeudNord: {
      position: string; // Ex: "Balance en Maison 3"
      signification: string;
    };
    noeudSud: {
      position: string;
      signification: string;
    };
    aspectsNotables: string[];
  };
  vocationPublique: {
    milieuDuCiel: string;
    partDeFortune: string;
    description: string;
  };
  expressionAme: {
    soleil: string;
    description: string;
  };
  cadreExpansion: {
    jupiter: string;
    saturne: string;
    description: string;
  };
  transformation: {
    chiron: string;
    vesta: string;
    pallas: string;
    ceres: string;
    description: string;
  };
  synthese: string[];
}

export interface TalentsNaturels {
  titre: string;
  intellectCommunication: {
    soleil: string;
    mercure: string;
    description: string;
    talents: string[];
  };
  actionVolonte: {
    mars: string;
    description: string;
    talents: string[];
  };
  creativiteRelation: {
    venus: string;
    description: string;
    talents: string[];
  };
  expansion: {
    jupiter: string;
    description: string;
    talents: string[];
  };
  maisonRessources: {
    maison2: string;
    maison6: string;
    maison10: string;
  };
  asteroides: {
    pallas: string;
    vesta: string;
    ceres: string;
    chiron: string;
  };
  synthese: string[];
}

export interface DefisViePersonnelle {
  titre: string;
  defisEmotionnels: {
    lune: string;
    venus: string;
    description: string;
    defis: string[];
  };
  defisStructurels: {
    saturne: string;
    description: string;
    lecons: string[];
  };
  defisTransformation: {
    pluton: string;
    description: string;
    transformations: string[];
  };
  synthese: string[];
}

export interface Relations {
  titre: string;
  styleRelationnel: {
    venus: string;
    mars: string;
    maison7: string;
    description: string;
  };
  besoinsRelationnels: {
    lune: string;
    description: string;
  };
  defisRelationnels: {
    chiron: string;
    saturne: string;
    description: string;
  };
  compatibilite: {
    signesCompatibles: string[];
    signesDefis: string[];
    conseil: string;
  };
  synthese: string[];
}

export interface CarriereVocation {
  titre: string;
  milieuDuCiel: {
    position: string;
    description: string;
  };
  maisonTravail: {
    maison6: string;
    maison10: string;
    description: string;
  };
  planetesInfluentes: {
    jupiter: string;
    saturne: string;
    description: string;
  };
  domainesRecommandes: string[];
  synthese: string[];
}

export interface SpiritualiteCroissance {
  titre: string;
  cheminSpirituel: {
    noeudNord: string;
    neptune?: string;
    description: string;
  };
  blessureGuerie: {
    chiron: string;
    description: string;
  };
  potentielEveil: {
    uranus?: string;
    pluton?: string;
    description: string;
  };
  pratiquesRecommandees: string[];
  synthese: string[];
}

export interface AnalyseAstrologique {
  consultationId: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  talentsNaturels: TalentsNaturels;
  defisViePersonnelle?: DefisViePersonnelle;
  relations?: Relations;
  carriereVocation?: CarriereVocation;
  spiritualiteCroissance?: SpiritualiteCroissance;
  dateGeneration: string;
  texteComplet?: string;  
}
 
export type StatutGeneration =
  | 'pending' // En attente
  | 'generating_chart' // Génération carte du ciel en cours
  | 'generating_analysis' // Génération analyses en cours
  | 'completed' // Terminé
  | 'error'; // Erreur

export interface StatutConsultation {
  consultationId: string;
  statut: StatutGeneration;
  progression: number; // 0-100
  etapeCourante?: string;
  erreur?: string;
  dateDebut?: string;
  dateFin?: string;
}    

export interface CarteDuCielData {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
}
 
export interface CinqPortes {
  signesolaire: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  ascendant: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  signeLunaire: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  milieuDuCiel: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  descendant: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
}