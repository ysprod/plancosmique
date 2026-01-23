import { ConsultationChoiceStatusDto } from './api/services/consultation-status.service';
import { Grade } from './types/grade.types';
import { UserType } from './types/user-profile.types';

export type RubriqueOrNone = Rubrique | null;
export type Category = 'animal' | 'vegetal' | 'beverage';
export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm';
export type GenerationStep = 'loading' | 'success' | 'error';
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
  | 'POUR_TIERS'
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
  syntheseEtTiming: undefined;
  cyclesDeVieGrands: undefined;
  sagesseAfricaine: undefined;
  themeDeNaissance: any;
  cyclesEnMouvement: any;
  analyseNumerologique: any;
  sujet: {};
  _id: string;
  analysisNotified: boolean;
  userId: string;
  consultationId: string;
  carteDuCiel: CarteDuCielBase;
  missionDeVie: Section;
  dateGeneration: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Offering {
  offeringId: string;
  visible: boolean;
  _id?: string;
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage';
  icon: string;
  description: string;
  quantity: number;
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
  _id?: string;
  title: string;
  description: string;
  frequence?: FrequenceConsultation;
  participants?: TypeParticipants;
  offering: ConsultationOffering;
  order?: number;
  promptId?: string;
  choiceId: string;
  choiceTitle: string;
  buttonStatus: 'CONSULTER' | 'RÉPONSE EN ATTENTE' | "VOIR L'ANALYSE";
  hasActiveConsultation: boolean;
  consultationId: string | null;
  consultationCount?: number;
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
  promptId?: any;
  typeconsultation?: any;
    id?: string;
  _id?: string;
  titre?: string;
  type?: ConsultationType;
  description?: string;
  categorie?: string;
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
  phone?: string;
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
  _id?: string;
  email: string;
  nom: string;
  prenoms: string;
  username: string;
  gender: 'male' | 'female';
  country: string;
  phone: string;
  carteDuCiel?: any;
  dateNaissance?: Date;
  paysNaissance?: string;
  villeNaissance?: string;
  heureNaissance?: string;
  password?: string;
  role?: Role;
  createdAt: string | number | Date;
  customPermissions?: Permission[];
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  profilePicture?: string;
  isActive?: boolean;
  premium?: boolean;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  preferences?: {
    language?: string;
    notifications?: boolean;
    newsletter?: boolean;
  };
  specialties?: string[];
  bio?: string;
  rating?: number;
  totalConsultations?: number;
  credits?: number;
  status?: string;
  consultationsCount?: number;
  avatar?: string;
  updatedAt?: string | Date;
  // Système de grades initiatiques (compatible backend)
  grade?: Grade | null;
  consultationsCompleted?: number;
  rituelsCompleted?: number;
  booksRead?: number;
  lastGradeUpdate?: Date | string;
  // Système de profils utilisateurs (compatible backend)
  userType?: UserType;
  subscriptionStartDate?: Date | string;
  subscriptionEndDate?: Date | string;
  premiumRubriqueId?: string; // Pour Premium
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
  COMPLETED = 'COMPLETED',
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
  /** Indique si l'analyse a été notifiée à l'utilisateur */
  analysisNotified?: boolean;
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
  clientName?: string;
  clientEmail?: string;
  completedAt?: string;
  [key: string]: any;
}

export interface CategorieAdmin {
  _id: string;
  id?: string;
  nom?: string;
  titre?: string;
  description: string;
  rubriques?: Rubrique[];
  consultationChoices?: EnrichedChoice[];
  categorie?: string;
  typeconsultation?: string;
  categorieId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface DoneChoice {
  _id: string;
  userId: string;
  consultationId: string;
  choiceTitle: string;
  choiceId: string | null;
  frequence: string;
  participants: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CONSULTANT = 'CONSULTANT',
  USER = 'USER',
  GUEST = 'GUEST'
}

export enum Permission {
  CREATE_USER = 'CREATE_USER',
  READ_USER = 'READ_USER',
  READ_ANY_USER = 'READ_ANY_USER',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_ANY_USER = 'UPDATE_ANY_USER',
  DELETE_USER = 'DELETE_USER',
  DELETE_ANY_USER = 'DELETE_ANY_USER',
  CREATE_CONSULTATION = 'CREATE_CONSULTATION',
  READ_CONSULTATION = 'READ_CONSULTATION',
  READ_ANY_CONSULTATION = 'READ_ANY_CONSULTATION',
  UPDATE_CONSULTATION = 'UPDATE_CONSULTATION',
  UPDATE_ANY_CONSULTATION = 'UPDATE_ANY_CONSULTATION',
  DELETE_CONSULTATION = 'DELETE_CONSULTATION',
  ASSIGN_CONSULTANT = 'ASSIGN_CONSULTANT',
  COMPLETE_CONSULTATION = 'COMPLETE_CONSULTATION',
  CREATE_SERVICE = 'CREATE_SERVICE',
  READ_SERVICE = 'READ_SERVICE',
  UPDATE_SERVICE = 'UPDATE_SERVICE',
  DELETE_SERVICE = 'DELETE_SERVICE',
  CREATE_PAYMENT = 'CREATE_PAYMENT',
  READ_PAYMENT = 'READ_PAYMENT',
  READ_ANY_PAYMENT = 'READ_ANY_PAYMENT',
  REFUND_PAYMENT = 'REFUND_PAYMENT',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  VIEW_LOGS = 'VIEW_LOGS',
  MANAGE_ROLES = 'MANAGE_ROLES',
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
  SYSTEM_CONFIG = 'SYSTEM_CONFIG'
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
  _id?: string;
  name: string;
  birthDate: string;
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

export interface EnrichedChoice {
  consultationCount: undefined;
  choice: ConsultationChoice;
  status: ConsultationChoiceStatusDto;
}