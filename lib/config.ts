export const config = {
  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    apiVersion: 'v1',
    timeout: 300000, // 5 minutes
  },

  // Auth Configuration
  auth: {
    tokenKey: 'monetoile_access_token',
    refreshTokenKey: 'monetoile_refresh_token',
    userKey: 'monetoile_user',
    tokenExpirationBuffer: 360, // 360 secondes avant expiration
  },

  // Frontend Configuration
  frontend: {
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Routes
  routes: {
    home: '/',
    login: '/auth/login',
    register: '/auth/register',
    dashboard: '/secured/profil',
    adminDashboard: '/admin',
    consultantDashboard: '/consultant',
    profile: '/profile',
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
};

export default config;
