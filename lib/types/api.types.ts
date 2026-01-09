export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export enum ConsultationType {
  HOROSCOPE = 'horoscope',
  NUMEROLOGIE = 'numerologie',
  VIE_PERSONNELLE = 'vie-personnelle',
  RELATIONS = 'relations',
  PROFESSIONNEL = 'professionnel',
  ASTROLOGIE_AFRICAINE = 'astrologie-africaine',
  SPIRITUALITE = 'spiritualite'
}

export enum ConsultationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  AWAITING_PAYMENT = 'awaiting_payment',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface Consultation {
  _id: string;
  userId: string;
  consultantId?: string;
  serviceType: ConsultationType;
  formData: Record<string, any>;
  results?: Record<string, any>;
  status: ConsultationStatus;
  scheduledDate?: Date;
  completedDate?: Date;
  paymentId?: string;
  isPaid: boolean;
  rating?: number;
  review?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  MOBILE_MONEY = 'mobile_money',
  CRYPTO = 'crypto',
  CASH = 'cash',
  OTHER = 'other'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

// export interface Payment {
//   _id: string;
//   userId: string;
//   consultationId: string;
//   amount: number;
//   currency: string;
//   status: PaymentStatus;
//   paymentMethod: PaymentMethod;
//   transactionId?: string;
//   metadata?: Record<string, any>;
//   refundedAt?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Service {
//   _id: string;
//   slug: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   duration?: number;
//   features: string[];
//   isActive: boolean;
//   isFeatured: boolean;
//   icon?: string;
//   color?: string;
//   metadata?: Record<string, any>;
//   createdAt: Date;
//   updatedAt: Date;
// }