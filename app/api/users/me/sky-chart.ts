// pages/api/users/me/sky-chart.ts
 import { BirthData, geocodeCity, getCarteDuCiel } from '@/lib/services/astrology.service';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Récupérer les données de naissance de l'utilisateur
    // (à adapter selon votre système d'authentification)
    // Correction : récupération de l'utilisateur authentifié
    // À adapter selon votre système d'authentification (exemple avec session NextAuth ou JWT)
    let user = null;
    // Exemple NextAuth :
    // import { getServerSession } from 'next-auth';
    // const session = await getServerSession(req, res, authOptions);
    // user = session?.user;
    // Exemple JWT custom :
    // user = extractUserFromRequest(req);

    // À remplacer par la bonne méthode d'extraction utilisateur :
    user = (req as any).user || (req as any).session?.user;

    if (!user?.birthDate || !user?.birthTime || !user?.birthPlace) {
      return res.status(400).json({
        message: 'Données de naissance incomplètes. Veuillez compléter votre profil.'
      });
    }

    // Parse des données
    const birthDate = new Date(user.birthDate);
    const [hour, minute] = user.birthTime.split(':').map(Number);

    // Géocodage si nécessaire
    let coordinates = user.birthCoordinates;
    if (!coordinates) {
      coordinates = await geocodeCity(user.birthPlace, user.birthCountry);
    }

    // Préparer les données pour l'API
    const birthData: BirthData = {
      name: user.name || 'Utilisateur',
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour,
      minute,
      city: user.birthPlace,
      lat: coordinates.lat,
      lng: coordinates.lng
    };

    // Récupération de la carte du ciel
    const carteDuCiel = await getCarteDuCiel(birthData);

    return res.status(200).json(carteDuCiel);

  } catch (error: any) {
    console.error('[API /sky-chart] ❌', error);
    return res.status(500).json({
      message: error.message || 'Erreur lors du calcul de la carte du ciel'
    });
  }
}
