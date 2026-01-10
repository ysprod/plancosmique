import { MissionDeVie, Position, CarteDuCielBase } from '@/lib/interfaces';

export interface CarteDuCielData {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
  aspectsTexte: string;
}

export interface CarteDuCiel {
  sessionId: string;
  timestamp: string;
  carteDuCiel: CarteDuCielData;
  missionDeVie: MissionDeVie;
  metadata: {
    processingTime: number;
    tokensUsed: number;
    model: string;
  };
}

export interface ProcessedUserData {
  prenoms: string;
  nom: string;
  email: string;
  phone: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
  country: string;
  role: string;
  premium: boolean;
  credits: number;
  totalConsultations: number;
  rating: number;
  emailVerified: boolean;
  carteDuCiel?: CarteDuCiel | CarteDuCielBase;
}