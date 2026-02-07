import { User } from '@/lib/interfaces';
import { api } from '../client';
import { endpoints } from '../endpoints';
import type { LoginDto, RegisterDto, AuthResponse, } from '@/lib/types/auth.types';
import { setAccessToken, setRefreshToken, setUser, clearAuth, } from '@/lib/utils/token.utils';

export const authService = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(endpoints.auth.register, data);
    const { accessToken, refreshToken, user } = response.data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);

    if (typeof window !== 'undefined') {
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `monetoile_access_token=${accessToken}; path=/; samesite=lax${isSecure ? '; secure' : ''}`;
    }

    return response.data;
  },

  /**
   * Connexion utilisateur
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(endpoints.auth.login, data);
    const { accessToken, refreshToken, user } = response.data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    // Ajout : synchronisation du cookie pour le middleware
    if (typeof window !== 'undefined') {
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `monetoile_access_token=${accessToken}; path=/; samesite=lax${isSecure ? '; secure' : ''}`;
    }

    return response.data;
  },

  /**
   * Récupération du profil utilisateur courant
   */
  me: async (): Promise<User> => {
    const response = await api.get<User>(endpoints.auth.me, { withCredentials: true });
    setUser(response.data);
    return response.data;
  },

  /**
   * Déconnexion utilisateur (client-side only - no backend endpoint)
   */
  logout: async (): Promise<void> => {
    clearAuth();
    if (typeof window !== 'undefined') {
      document.cookie = 'monetoile_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
};

export default authService;