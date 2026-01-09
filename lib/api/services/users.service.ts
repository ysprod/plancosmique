import { api } from '../client';
import { endpoints } from '../endpoints';
import type { User, Role, Permission } from '@/lib/types/auth.types';
import type { PaginatedResponse, QueryParams } from '@/lib/types/api.types';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
  phoneNumber?: string;
  dateOfBirth?: string;
  specialties?: string[];
  bio?: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
  isActive?: boolean;
  emailVerified?: boolean;
  preferences?: {
    language?: string;
    notifications?: boolean;
    newsletter?: boolean;
  };
  rating?: number;
  totalConsultations?: number;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  profile?: {
    avatar?: string;
    bio?: string;
    preferences?: Record<string, any>;
  };
}

export interface UpdateRoleDto {
  role: Role;
}

export interface UpdatePermissionsDto {
  permissions: Permission[];
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UserStats {
  totalConsultations: number;
  completedConsultations: number;
  pendingConsultations: number;
  totalSpent: number;
  averageRating: number;
  lastConsultationDate?: Date;
}

export const usersService = {
  /**
   * Liste des utilisateurs (avec pagination et filtres)
   */
  list: async (params?: QueryParams): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>(endpoints.users.list, {
      params,
    });
    return response.data;
  },

  /**
   * Détails d'un utilisateur
   */
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(endpoints.users.byId(id));
    return response.data;
  },

  /**
   * Créer un utilisateur
   */
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>(endpoints.users.list, data);
    return response.data;
  },

  /**
   * Mettre à jour un utilisateur
   */
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await api.patch<User>(endpoints.users.byId(id), data);
    return response.data;
  },

  /**
   * Supprimer un utilisateur (soft delete)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(endpoints.users.byId(id));
  },

  /**
   * Changer le rôle d'un utilisateur
   */
  updateRole: async (id: string, role: Role): Promise<User> => {
    const response = await api.patch<User>(endpoints.users.role(id), { role });
    return response.data;
  },

  /**
   * Mettre à jour les permissions personnalisées
   */
  updatePermissions: async (id: string, permissions: Permission[]): Promise<User> => {
    const response = await api.patch<User>(endpoints.users.permissions(id), {
      permissions,
    });
    return response.data;
  },

  /**
   * Changer le mot de passe
   */
  changePassword: async (id: string, data: ChangePasswordDto): Promise<void> => {
    await api.patch(endpoints.users.password(id), data);
  },

  /**
   * Statistiques d'un utilisateur
   */
  getStats: async (id: string): Promise<UserStats> => {
    const response = await api.get<UserStats>(endpoints.users.stats(id));
    return response.data;
  },
};

export default usersService;
