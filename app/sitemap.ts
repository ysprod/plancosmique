import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monetoile.org';
  const staticRoutes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/terms', priority: 0.5, changefreq: 'yearly' },
    { path: '/auth/login', priority: 0.4, changefreq: 'yearly' },
    { path: '/auth/register', priority: 0.4, changefreq: 'yearly' },
    { path: '/star/profil', priority: 0.8, changefreq: 'weekly' },
    { path: '/star/consultations', priority: 0.8, changefreq: 'weekly' },
    { path: '/star/wallet', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/livres', priority: 0.6, changefreq: 'monthly' },
    { path: '/star/spiritualite', priority: 0.6, changefreq: 'monthly' },
    { path: '/star/notifications', priority: 0.5, changefreq: 'weekly' },
    { path: '/star/monprofil', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/carteduciel', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/cinqportes', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/voyance', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/tarot', priority: 0.7, changefreq: 'monthly' },
    { path: '/star/knowledge', priority: 0.6, changefreq: 'monthly' },
    { path: '/star/rubriques', priority: 0.6, changefreq: 'monthly' },
    { path: '/admin', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/users', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/consultations', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/offrandes', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/prompts', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/settings', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/spiritualite', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/rubriques', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/books', priority: 0.3, changefreq: 'monthly' },
    { path: '/admin/categories', priority: 0.3, changefreq: 'monthly' },
  ];

  // Prévu : ajout dynamique de routes (ex: consultations, articles, etc)
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    priority: route.priority,
    changefreq: route.changefreq,
  }));
}