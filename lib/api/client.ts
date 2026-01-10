import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig,
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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Instance Axios configurée
 */
const cleanBaseURL = config.api.baseURL.replace(/\/+$/, '');
const apiClient: AxiosInstance = axios.create({
  baseURL: `${cleanBaseURL}/api/${config.api.apiVersion}`,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requête - Ajoute le token JWT
 */
apiClient.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    // Ne pas ajouter de token pour les routes publiques
    const publicRoutes = ['/auth/login', '/auth/register', '/services'];
    const isPublicRoute = publicRoutes.some((route) =>
      requestConfig.url?.includes(route)
    );

    if (isPublicRoute) {
      return requestConfig;
    }

    const accessToken = getAccessToken();

    if (accessToken) {
      // Vérifier si le token est proche de l'expiration
      if (isTokenExpiringSoon(accessToken) && !isRefreshing) {
        try {
          await refreshAccessToken();
          const newToken = getAccessToken();
          if (newToken) {
            requestConfig.headers.Authorization = `Bearer ${newToken}`;
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Continuer avec l'ancien token
          requestConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
      } else {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return requestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Intercepteur de réponse - Gère les erreurs et le refresh automatique
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Erreur 401 - Token expiré ou invalide
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Attendre que le refresh soit terminé
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

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

        // Rediriger vers la page de connexion
        if (typeof window !== 'undefined') {
          window.location.href = config.routes.login;
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Erreur 403 - Permission refusée
    if (error.response?.status === 403) {
      console.error('Permission denied:', error.response.data);
    }

    return Promise.reject(error);
  }
);

/**
 * Rafraîchit le token d'accès
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
    const response = await axios.post(
      `${cleanBaseURL}/api/${config.api.apiVersion}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
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
 * Méthodes HTTP simplifiées
 */
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(url, config),

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.post<T>(url, data, config),

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.put<T>(url, data, config),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(url, config),
};

export default apiClient;
