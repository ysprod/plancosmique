export const config = {
  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    apiVersion: 'v1',
    timeout: 30000, // 30 secondes
  },

  // Auth Configuration
  auth: {
    tokenKey: 'monetoile_access_token',
    refreshTokenKey: 'monetoile_refresh_token',
    userKey: 'monetoile_user',
    tokenExpirationBuffer: 60, // 60 secondes avant expiration
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
    dashboard: '/dashboard',
    adminDashboard: '/dashboard/admin',
    consultantDashboard: '/dashboard/consultant',
    profile: '/dashboard/profile',
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
};

export default config;
