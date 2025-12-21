// =====================================================
// TYPES & INTERFACES
// =====================================================

export interface Position {
  planete: string;
  signe: string;
  maison: number;
  retrograde: boolean;
}

export interface CarteDuCiel {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
  aspectsTexte?: string;
}

export interface MissionDeVie {
  titre: string;
  contenu: string;
}

export interface Metadata {
  processingTime: number;
  tokensUsed: number;
  model: string;
  cached: boolean;
}

export interface AnalyseData {
  consultationId: string;
  sessionId: string;
  timestamp: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  metadata: Metadata;
  dateGeneration: string;
}

export type GenerationStep = 'loading' | 'fetching' | 'generating' | 'success' | 'error';
