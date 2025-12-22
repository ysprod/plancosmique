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
}


export interface SubjectInfo {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
}

export interface Position {
  planete: string;
  signe: string;
  maison: number;
  retrograde: boolean;
}

export interface CarteDuCiel {
  sujet: SubjectInfo;
  positions: Position[];
  aspectsTexte: string;
}

export interface Section {
  titre: string;
  contenu: string;
}

export interface AnalyseAstrologique {
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
  _id: string;
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
}
