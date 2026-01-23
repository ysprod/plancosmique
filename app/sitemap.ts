import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monetoile.org';
  const staticRoutes = [
    '/',
    '/about',
    '/terms',
    '/auth/login',
    '/auth/register',
    '/secured/profil',
    '/secured/consultations',
    '/secured/wallet',
    '/secured/livres',
    '/secured/spiritualite',
    '/secured/notifications',
    '/secured/monprofil',
    '/secured/analysehoroscope',
    '/secured/carteduciel',
    '/secured/cinqportes',
    '/secured/voyance',
    '/secured/tarot',
    '/secured/knowledge',
    '/secured/rubriques',
    '/admin',
    '/admin/users',
    '/admin/consultations',
    '/admin/offrandes',
    '/admin/prompts',
    '/admin/settings',
    '/admin/spiritualite',
    '/admin/rubriques',
    '/admin/books',
    '/admin/categories',
  ];

  // Ajoute ici la logique pour générer dynamiquement les routes si besoin (ex: fetch depuis l'API)

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
