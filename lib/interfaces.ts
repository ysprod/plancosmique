import { Permission, Role, UserProfile } from "./types/auth.types";
import type { CarteDuCiel } from "./types/carteduciel";

export type Category = 'animal' | 'vegetal' | 'beverage';
export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm';
export type GenerationStep = 'loading' | 'fetching' | 'generating' | 'success' | 'error';
export type TransactionFilter = "all" | "simulation" | "real";
export type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";
export type OfferingCategory = "animal" | "vegetal" | "beverage";
export type HoroscopeTypeId = 'mensuel' | 'annuel';

export type FrequenceConsultation =
  | 'UNE_FOIS_VIE'      // Consultation faite une seule fois dans la vie
  | 'ANNUELLE'          // Peut être faite chaque année
  | 'MENSUELLE'         // Peut être faite chaque mois
  | 'QUOTIDIENNE'       // Peut être faite chaque jour
  | 'LIBRE';            // Peut être faite à tout moment

export type TypeParticipants =
  | 'SOLO'              // Uniquement l'utilisateur
  | 'AVEC_TIERS'        // Utilisateur + une personne tierce
  | 'GROUPE';

export interface ConsultationData {
  _id: string;
  title: string;
  description: string;
  alternatives: { offeringId: string; quantity: number }[];
  formData?: any;
  status: string;
}

export interface Book {
  _id: string;
  bookId: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pageCount: number;
  category: string;
  author: string;
  isActive: boolean;
  createdAt: string;
  coverImage?: string;
  updatedAt?: string;
}

export interface SubjectInfo {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
}

export interface Position {
  planete?: string;
  astre?: string;
  signe?: string;
  maison?: string | number;
  degre?: number;
  retrograde?: boolean;
}

export interface CarteDuCielBase {
  sujet: SubjectInfo;
  positions: Position[];
  aspectsTexte: string;
}

export interface Sujet {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
}

export interface MissionDeVie {
  titre: string;
  contenu: string;
}

export interface Section {
  titre: string;
  contenu: string;
}

export interface AnalyseAstrologique {
  analysisNotified: boolean;
  _id: string;
  userId: string;
  consultationId: string;
  carteDuCiel: CarteDuCielBase;
  missionDeVie: Section;
  dateGeneration: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Offering {
  _id?: string;
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage';
  icon: string;
  description: string;
}

export interface OfferingAlternative {
  category: Category;
  offeringId: string;
  quantity: number;
  name?: string;
  price?: number;
  icon?: string;
}

export interface WalletOffering {
  offeringId: string;
  quantity: number;
  name: string;
  icon: string;
  category: string;
  price: number;
}

export interface ConsultationOffering {
  alternatives: OfferingAlternative[];
}

export interface OfferingAlternative {
  category: 'animal' | 'vegetal' | 'beverage';
  offeringId: string;
  quantity: number;
}

export interface ConsultationOffering {
  alternatives: OfferingAlternative[];
}

export interface ConsultationChoice {
  id: string;
  _id?: string;
  title: string;
  description: string;
  frequence?: 'UNE_FOIS_VIE' | 'ANNUELLE' | 'MENSUELLE' | 'QUOTIDIENNE' | 'LIBRE';
  participants?: 'SOLO' | 'AVEC_TIERS' | 'GROUPE';
  offering: ConsultationOffering;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormData {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  paysNaissance: string;
  villeNaissance: string;
  heureNaissance: string;
  numeroSend?: string;
  email?: string;
}

export interface Rubrique {
  typeconsultation: any;
  _id?: string;
  titre: string;
  type: ConsultationType;
  description: string;
  categorie: string;
  consultationChoices: ConsultationChoice[];
  createdAt?: string;
  updatedAt?: string;
  categorieId?: any;
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
  carteDuCiel: CarteDuCielBase;
  missionDeVie: MissionDeVie;
  metadata: Metadata;
  dateGeneration: string;
  _id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ConsultationData {
  _id: string;
  title: string;
  description: string;
  alternatives: { offeringId: string; quantity: number }[];
  status: string;
}

export interface ConsultationFormData {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  paysNaissance: string;
  villeNaissance: string;
  heureNaissance: string;
  numeroSend?: string;
  email?: string;
}

export interface ResultData {
  consultationId: string;
  sessionId: string;
  timestamp: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  metadata: {
    processingTime: number;
    tokensUsed: number;
    model: string;
  };
  dateGeneration: string;
  numbers?: Array<{ label: string; value: string | number }>;
  cycles?: Array<{ label: string; value: string | number }>;
}

export interface Transaction {
  _id: string;
  transactionId: string;
  paymentToken: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  completedAt: string;
  items: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalTransactions: number;
  simulatedTransactions: number;
  totalSpent: number;
  totalSimulated: number;
}

export interface TransactionItem {
  offeringId: OfferingDetails | string;
}

export interface OfferingDetails {
  _id: string;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
  description?: string;
}

export interface BackendResponse {
  success?: boolean;
  analyse?: AnalyseData;
}

export interface Tab {
  id: HoroscopeTypeId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

export interface HoroscopeResult {
  zodiacSign: string;
  symbol: string;
  element: string;
  period: string;
  horoscopeType: string;
  generalForecast: string;
  love: string;
  work: string;
  health: string;
  spiritualAdvice: string;
  luckyColor: string;
  dominantPlanet: string;
}

export interface BackendHoroscope {
  _id: string;
  title: string;
  description: string;
  status: string;
  resultData?: {
    horoscope?: {
      generalForecast: string;
      love: string;
      work: string;
      health: string;
      spiritualAdvice: string;
      luckyColor: string;
      dominantPlanet: string;
    };
  };
  formData?: {
    carteDuCiel?: {
      carteDuCiel?: {
        positions?: Array<{
          planete: string;
          signe: string;
        }>;
      };
    };
  };
  completedDate?: string;
  createdAt: string;
}

export interface SpiritualitePractice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  featured?: boolean;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface Domaine {
  id: string;
  titre: string;
  description: string;
  rubriques: Rubrique[];
}

export interface ConsultationConfig {
  id: string;
  titre: string;
  description: string;
  frequence: FrequenceConsultation;
  typeParticipants: TypeParticipants;
  typeTechnique: string;
  offering: {
    alternatives: Array<{
      category: 'animal' | 'vegetal' | 'beverage';
      offeringId: string;
      quantity: number;
    }>;
  };
  noteImplementation?: string;
}

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  completedAt?: string;
}

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  username: string;
  telephone: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLogin: string;
  consultationsCount: number;
  totalConsultations: number;
  rating: number;
  credits: number;
  country?: string;
  gender?: string;
  premium: boolean;
  firstName: string;
  lastName: string;
  client: boolean;
  role: Role;
  avatar?: string;
  customPermissions?: Permission[];
  dateOfBirth?: Date;
  profile?: UserProfile;
  consultationHistory?: string[];
  updatedAt: Date;
  _id?: string;
  dateNaissance?: string;
  genre?: string;
  heureNaissance?: string;
  prenoms?: string;
  paysNaissance?: string;
  villeNaissance?: string;
  carteDuCiel?: CarteDuCielBase;
  [key: string]: any;
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
  };
}

export interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  description: string;
  detailedGuide?: string;
  benefits?: string[];
  practicalSteps?: string[];
  category?: string;
  readTime?: number;
  publishedAt?: string;
  author?: string;
  views?: number;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
}

export interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  description: string;
  detailedGuide?: string;
  benefits?: string[];
  practicalSteps?: string[];
  category?: string;
  readTime?: number;
  publishedAt?: string;
  author?: string;
  views?: number;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
}

export enum ConsultationType {
  HOROSCOPE = 'horoscope',
  NUMEROLOGIE = 'numerologie',
  VIE_PERSONNELLE = 'vie-personnelle',
  RELATIONS = 'relations',
  PROFESSIONNEL = 'professionnel',
  ASTROLOGIE_AFRICAINE = 'astrologie-africaine',
  SPIRITUALITE = 'spiritualite',
  OFFRANDES = 'offrandes',
  NOMBRES_PERSONNELS = 'nombres-personnels',
  CYCLES_PERSONNELS = 'cycles-personnels',
  CINQ_ETOILES = 'cinq-etoiles',
  AUTRE = 'autre',
}

export enum ConsultationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  AWAITING_PAYMENT = 'awaiting_payment',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  ERROR = 'error',
  GENERATING = 'generating',
}

export interface Consultation {
  _id: string;
  userId: string;
  clientId?: {
    _id: string;
    email: string;
  };
  consultantId?: string;
  serviceType: ConsultationType;
  results?: Record<string, any>;
  status: ConsultationStatus;
  scheduledDate?: Date;
  completedDate?: Date;
  paymentId?: string;
  isPaid: boolean;
  rating?: number;
  review?: string;
  metadata?: Record<string, any>;
  type: ConsultationType;
  title: string;
  description: string;
  formData?: ConsultationFormData;
  result: any;
  resultData?: ResultData | null;
  price: number;
  attachments: string[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  clientName?: string;
  clientEmail?: string;
  completedAt?: string;
  [key: string]: any;
}

export interface CategorieAdmin {
  _id: string;
  id: string;
  nom: string;
  description: string;
  rubriques: Rubrique[];
} 