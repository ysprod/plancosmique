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

export interface CarteDuCiel {
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
  contenu: string; // Markdown format
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
  carteDuCiel: CarteDuCiel;
  missionDeVie: Section;
  dateGeneration: string;
  createdAt: string;
  updatedAt: string;
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

export interface UserData {
  premium?: boolean;
  _id?: string;
  id: string; 
  username: string;
  email: string;
  phone?: string;
  country?: string;
  gender?: 'M' | 'F' | 'Other';
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  emailVerified: boolean;
  credits?: number;
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
  };  
 
  totalConsultations: number;
  rating: number;


  createdAt: string;

 
  
 
  dateNaissance?: string;
  genre?: string;
  heureNaissance?: string;
  nom?: string;
  prenoms?: string;
  paysNaissance?: string;
  villeNaissance?: string;
  carteDuCiel?: CarteDuCiel;
  [key: string]: any;
}

type Category = 'animal' | 'vegetal' | 'beverage';

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


// Types partagés pour la consultation


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
  title: string;
  description: string;
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
  _id: string;
  id?: string;
  titre: string;
  description: string;
  categorie: string;
  consultationChoices: ConsultationChoice[];
  createdAt?: string;
  updatedAt?: string;
}

export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm';



 
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



export interface ConsultationData {
  _id: string;
  title: string;
  description: string;
  alternatives: { offeringId: string; quantity: number }[];
  status: string;
}

export type GenerationStep = 'loading' | 'fetching' | 'generating' | 'success' | 'error';




export type ConsultationType =
  | 'SPIRITUALITE'
  | 'VIE_PERSONNELLE'
  | 'RELATIONS'
  | 'PROFESSIONNEL'
  | 'OFFRANDES'
  | 'ASTROLOGIE_AFRICAINE'
  | 'HOROSCOPE';
export type ConsultationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

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
}

export interface Consultation {
  _id: string;
  clientId: {
    _id: string;
    email: string;
  };
  consultantId: string | null;
  type: ConsultationType;
  status: ConsultationStatus;
  title: string;
  description: string;
  formData: ConsultationFormData;
  result: any;
  resultData: ResultData | null;
  scheduledDate: string | null;
  completedDate: string | null;
  price: number;
  isPaid: boolean;
  paymentId: string | null;
  rating: number | null;
  review: string | null;
  attachments: string[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
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

export type TransactionFilter = "all" | "simulation" | "real";
export type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";
export type OfferingCategory = "animal" | "vegetal" | "beverage";

export interface TransactionItem {
  offeringId: OfferingDetails | string; // Peut être peuplé ou juste l'ID
}



export interface OfferingDetails {
  _id: string;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
  description?: string;
}