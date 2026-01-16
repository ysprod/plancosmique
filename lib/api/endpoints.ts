export const endpoints = {
  // Root
  root: '/',

  // Authentication
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
    logout: '/auth/logout', // Backend likely doesn't have this endpoint; handled client-side only
  },

  // Users
  users: {
    list: '/users',
    byId: (id: string) => `/users/${id}`,
    stats: (id: string) => `/users/${id}/stats`,
    role: (id: string) => `/users/${id}/role`,
    permissions: (id: string) => `/users/${id}/permissions`,
    password: (id: string) => `/users/${id}/password`,
  },

  // Consultations
  consultations: {
    list: '/consultations',
    create: '/consultations',
    byId: (id: string) => `/consultations/${id}`,
    status: (id: string) => `/consultations/${id}/status`,
    assign: (id: string) => `/consultations/${id}/assign`,
    review: (id: string) => `/consultations/${id}/review`,
    stats: '/consultations/stats',
  },

  // Services
  services: {
    list: '/services',
    create: '/services',
    byId: (id: string) => `/services/${id}`,
    featured: '/services/featured',
  },

  // Payments
  payments: {
    createIntent: '/payments/create-intent',
    confirm: '/payments/confirm',
    byId: (id: string) => `/payments/${id}`,
    refund: (id: string) => `/payments/${id}/refund`,
    myPayments: '/payments/my-payments',
    stats: '/payments/stats',
  },

  // Notifications
  notifications: {
    list: '/notifications',
    unread: '/notifications/unread',
    unreadCount: '/notifications/unread/count',
    byId: (id: string) => `/notifications/${id}`,
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
    preferences: '/notifications/preferences',
  },
};

export default endpoints;