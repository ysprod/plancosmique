import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { config } from '../config';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuth,
  isTokenExpired,
  isTokenExpiringSoon,
} from '../utils/token.utils';

// Types pour la gestion du refresh
interface QueueItem {
  resolve: (value?: string) => void;
  reject: (reason?: Error) => void;
}

// State global pour le refresh de token
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout', '/services'] as const;

/**
 * Traite la file d'attente des requêtes en attente du refresh
 * @param error - Erreur éventuelle lors du refresh
 * @param token - Nouveau token d'accès
 */
const processQueue = (error: Error | null, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token || undefined);
  });
  failedQueue = [];
};

/**
 * Vérifie si une URL est une route publique
 * @param url - URL à vérifier
 */
const isPublicRoute = (url?: string): boolean => {
  if (!url) return false;
  return PUBLIC_ROUTES.some(route => url.includes(route));
};

/**
 * Redirige vers la page de login si nécessaire
 */
const redirectToLogin = (): void => {
  if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
    window.location.href = config.routes.login;
  }
};

/**
 * Instance Axios optimisée avec gestion avancée du cache et des tokens
 */
const cleanBaseURL = config.api.baseURL.replace(/\/+$/, '');
const apiClient: AxiosInstance = axios.create({
  baseURL: `${cleanBaseURL}/api/${config.api.apiVersion}`,
  timeout: 45000, // 45 secondes (augmenté pour les requêtes volumineuses)
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
    Expires: '0',
  },
  // Optimisations supplémentaires
  validateStatus: (status) => status >= 200 && status < 300,
  maxRedirects: 5,
});

/**
 * Intercepteur de requête optimisé - Ajoute le token JWT et gère le refresh proactif
 */
apiClient.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    // Routes publiques : pas d'authentification nécessaire
    if (isPublicRoute(requestConfig.url)) {
      return requestConfig;
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      return requestConfig;
    }

    // Refresh proactif si le token expire bientôt
    if (isTokenExpiringSoon(accessToken) && !isRefreshing && getRefreshToken()) {
      try {
        const newToken = await refreshAccessToken();
        requestConfig.headers.Authorization = `Bearer ${newToken}`;
        return requestConfig;
      } catch (error) {
        console.error('Proactive token refresh failed:', error);
        // Continuer avec l'ancien token
      }
    }

    requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    return requestConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Intercepteur de réponse optimisé - Gestion intelligente des erreurs et refresh automatique
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = error.config!;

    // Erreur 401 : Token expiré ou invalide
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();

      // Pas de refresh token disponible
      if (!refreshToken) {
        clearAuth();
        redirectToLogin();
        return Promise.reject(error);
      }

      // Si un refresh est déjà en cours, mettre en file d'attente
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token?: string) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(apiClient(originalRequest));
              }
            },
            reject,
          });
        });
      }

      // Marquer comme déjà tenté et lancer le refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        clearAuth();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Erreur 403 : Permission refusée
    if (error.response?.status === 403) {
      console.error('Permission denied:', error.response.data);
    }

    // Erreur réseau ou timeout (sauf annulations intentionnelles)
    if (!error.response && error.name !== 'CanceledError' && error.name !== 'AbortError') {
      console.error('Network error or timeout:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Rafraîchit le token d'accès de manière optimisée
 * @returns Le nouveau token d'accès
 * @throws Error si le refresh échoue
 */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  if (isTokenExpired(refreshToken)) {
    clearAuth();
    throw new Error('Refresh token expired');
  }

  try {
    const response = await axios.post<{ accessToken: string; refreshToken?: string }>(
      `${cleanBaseURL}/api/${config.api.apiVersion}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        timeout: 10000, // 10s timeout pour le refresh
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    setAccessToken(accessToken);
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    clearAuth();
    throw error;
  }
};

/**
 * API client avec méthodes HTTP typées et optimisées
 */
export const api = {
  /**
   * Requête GET
   */
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(url, config),

  /**
   * Requête POST
   */
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post<T>(url, data, config),

  /**
   * Requête PUT
   */
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put<T>(url, data, config),

  /**
   * Requête PATCH
   */
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch<T>(url, data, config),

  /**
   * Requête DELETE
   */
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(url, config),
};

export default apiClient;
