import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monetoile.org';
  const staticRoutes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/terms', priority: 0.5, changefreq: 'yearly' },
    { path: '/auth/login', priority: 0.4, changefreq: 'yearly' },
    { path: '/auth/register', priority: 0.4, changefreq: 'yearly' },
    { path: '/secured/profil', priority: 0.8, changefreq: 'weekly' },
    { path: '/secured/consultations', priority: 0.8, changefreq: 'weekly' },
    { path: '/secured/wallet', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/livres', priority: 0.6, changefreq: 'monthly' },
    { path: '/secured/spiritualite', priority: 0.6, changefreq: 'monthly' },
    { path: '/secured/notifications', priority: 0.5, changefreq: 'weekly' },
    { path: '/secured/monprofil', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/carteduciel', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/cinqportes', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/voyance', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/tarot', priority: 0.7, changefreq: 'monthly' },
    { path: '/secured/knowledge', priority: 0.6, changefreq: 'monthly' },
    { path: '/secured/rubriques', priority: 0.6, changefreq: 'monthly' },
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

  // Prévu : ajout dynamique de routes (ex: consultations, articles, etc.)

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    priority: route.priority,
    changefreq: route.changefreq,
  }));
}