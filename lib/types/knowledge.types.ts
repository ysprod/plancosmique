export type KnowledgeCategory =
  | 'ASTROLOGIE' | 'NUMEROLOGIE' | 'TAROT' | 'SPIRITUALITE'
  | 'MEDITATION' | 'DEVELOPPEMENT_PERSONNEL' | 'RITUELS' | 'AUTRES';

export interface KnowledgeAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Knowledge {
  _id: string;
  title: string;
  content: string;
  category: KnowledgeCategory;
  authorId: KnowledgeAuthor | string;
  tags: string[];
  imageUrl?: string;
  isPublished: boolean;
  viewsCount: number;
  likesCount: number;
  likedBy: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKnowledgeDto {
  title: string;
  content: string;
  category: KnowledgeCategory;
  tags?: string[];
  imageUrl?: string;
  isPublished?: boolean;
}

export interface UpdateKnowledgeDto {
  title?: string;
  content?: string;
  category?: KnowledgeCategory;
  tags?: string[];
  imageUrl?: string;
  isPublished?: boolean;
}

export interface KnowledgeListResponse {
  knowledges: Knowledge[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface KnowledgeQueryParams {
  page?: number;
  limit?: number;
  category?: KnowledgeCategory;
  tag?: string;
  search?: string;
}
