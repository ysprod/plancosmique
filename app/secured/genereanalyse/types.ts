import { CarteDuCiel, MissionDeVie } from "@/lib/interfaces";
 
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
