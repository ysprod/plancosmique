// services/astrology.service.ts
import axios from 'axios';

// ============================================================
// TYPES
// ============================================================

export interface BirthData {
  name: string;
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  city: string;
  lat: number;
  lng: number;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  pos: number;
  abs_pos: number;
  house: number;
  retrograde: boolean;
}

export interface HouseCusp {
  house: number;
  sign: string;
  degree: number;
}

export interface Aspect {
  p1: string;
  p2: string;
  type: string;
  orb: number;
  deg: number;
  is_major: boolean;
}

export interface NatalChartResponse {
  subject: {
    name: string;
    city: string;
    tz_str: string;
    zodiac_type: string;
  };
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  aspects_summary: {
    total: number;
    major: number;
    minor: number;
    by_type: Record<string, number>;
  };
}

// ============================================================
// MAPPING SIGNES ASTROLOGIQUES
// ============================================================

const SIGN_MAPPING: Record<string, string> = {
  'Ari': 'Bélier',
  'Tau': 'Taureau',
  'Gem': 'Gémeaux',
  'Can': 'Cancer',
  'Leo': 'Lion',
  'Vir': 'Vierge',
  'Lib': 'Balance',
  'Sco': 'Scorpion',
  'Sag': 'Sagittaire',
  'Cap': 'Capricorne',
  'Aqu': 'Verseau',
  'Pis': 'Poissons'
};

const PLANET_MAPPING: Record<string, string> = {
  'Sun': 'Soleil',
  'Moon': 'Lune',
  'Mercury': 'Mercure',
  'Venus': 'Vénus',
  'Mars': 'Mars',
  'Jupiter': 'Jupiter',
  'Saturn': 'Saturne',
  'Uranus': 'Uranus',
  'Neptune': 'Neptune',
  'Pluto': 'Pluton',
  'True Node': 'Noeud Nord',
  'Mean Node': 'Noeud Nord Moyen',
  'Chiron': 'Chiron'
};

const SIGNES_OPPOSES: Record<string, string> = {
  'Bélier': 'Balance',
  'Taureau': 'Scorpion',
  'Gémeaux': 'Sagittaire',
  'Cancer': 'Capricorne',
  'Lion': 'Verseau',
  'Vierge': 'Poissons',
  'Balance': 'Bélier',
  'Scorpion': 'Taureau',
  'Sagittaire': 'Gémeaux',
  'Capricorne': 'Cancer',
  'Verseau': 'Lion',
  'Poissons': 'Vierge'
};

// ============================================================
// CONFIGURATION API
// ============================================================

const FREEASTRO_API_URL = 'https://api.freeastroapi.com/natal';
const API_KEY = process.env.FREEASTRO_API_KEY || ''; // Optionnel selon l'API

// ============================================================
// FONCTION PRINCIPALE : Récupération Carte du Ciel
// ============================================================

export async function getCarteDuCiel(birthData: BirthData): Promise<any> {
  try {
    console.log('[AstrologyService] 📡 Récupération carte du ciel...', birthData);

    // Appel à FreeAstroAPI
    const response = await axios.post<NatalChartResponse>(
      FREEASTRO_API_URL,
      {
        name: birthData.name,
        year: birthData.year,
        month: birthData.month,
        day: birthData.day,
        hour: birthData.hour,
        minute: birthData.minute,
        city: birthData.city,
        lat: birthData.lat,
        lng: birthData.lng
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'x-api-key': API_KEY })
        },
        timeout: 15000
      }
    );

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    const natalChart = response.data;

    // Transformation des données au format attendu
    const carteDuCiel = transformNatalChartToCarteDuCiel(natalChart, birthData);

    console.log('[AstrologyService] ✅ Carte du ciel récupérée avec succès');
    return carteDuCiel;

  } catch (error: any) {
    console.error('[AstrologyService] ❌ Erreur:', error.message);
    
    if (error.response) {
      throw new Error(`Erreur API Astrologie (${error.response.status}): ${error.response.data?.message || 'Erreur inconnue'}`);
    } else if (error.request) {
      throw new Error('Erreur réseau: Impossible de contacter le service d\'astrologie');
    } else {
      throw new Error(`Erreur lors du calcul de la carte du ciel: ${error.message}`);
    }
  }
}

// ============================================================
// TRANSFORMATION DES DONNÉES
// ============================================================

function transformNatalChartToCarteDuCiel(
  natalChart: NatalChartResponse,
  birthData: BirthData
): any {
  
  // 1. Transformation des positions planétaires
  const positions = natalChart.planets.map(planet => ({
    planete: PLANET_MAPPING[planet.name] || planet.name,
    signe: SIGN_MAPPING[planet.sign] || planet.sign,
    maison: planet.house,
    degre: planet.pos,
    retrograde: planet.retrograde
  }));

  // 2. Ajout des maisons (cusps)
  const maisons = natalChart.houses.map(house => ({
    maison: house.house,
    signe: SIGN_MAPPING[house.sign] || house.sign,
    degre: house.degree
  }));

  // 3. Extraction des points spéciaux
  const ascendant = maisons.find(m => m.maison === 1);
  const milieuDuCiel = maisons.find(m => m.maison === 10);
  const descendant = maisons.find(m => m.maison === 7);
  const fondDuCiel = maisons.find(m => m.maison === 4);

  // 4. Calcul des 5 Portes
  const soleil = positions.find(p => p.planete === 'Soleil');
  const lune = positions.find(p => p.planete === 'Lune');

  const cinqPortes = {
    signeSolaire: {
      label: 'Signe Solaire',
      valeur: soleil?.signe || 'Non défini',
      maison: soleil?.maison || 0,
      degre: soleil?.degre || 0
    },
    ascendant: {
      label: 'Ascendant',
      valeur: ascendant?.signe || 'Non défini',
      degre: ascendant?.degre || 0
    },
    signeLunaire: {
      label: 'Signe Lunaire',
      valeur: lune?.signe || 'Non défini',
      maison: lune?.maison || 0,
      degre: lune?.degre || 0
    },
    milieuDuCiel: {
      label: 'Milieu du Ciel',
      valeur: milieuDuCiel?.signe || 'Non défini',
      degre: milieuDuCiel?.degre || 0
    },
    descendant: {
      label: 'Descendant',
      valeur: descendant?.signe || SIGNES_OPPOSES[ascendant?.signe || ''] || 'Non défini',
      degre: descendant?.degre || 0
    }
  };

  // 5. Transformation des aspects
  const aspects = natalChart.aspects.map(aspect => ({
    planete1: PLANET_MAPPING[aspect.p1] || aspect.p1,
    planete2: PLANET_MAPPING[aspect.p2] || aspect.p2,
    type: aspect.type,
    orbe: aspect.orb,
    angle: aspect.deg,
    isMajor: aspect.is_major
  }));

  // 6. Structure finale
  return {
    sujet: {
      nom: birthData.name,
      dateNaissance: `${birthData.day}/${birthData.month}/${birthData.year}`,
      heureNaissance: `${String(birthData.hour).padStart(2, '0')}:${String(birthData.minute).padStart(2, '0')}`,
      lieuNaissance: birthData.city,
      latitude: birthData.lat,
      longitude: birthData.lng,
      timezone: natalChart.subject.tz_str
    },
    positions,
    maisons,
    cinqPortes,
    pointsSpeciaux: {
      ascendant: {
        signe: ascendant?.signe || 'Non défini',
        degre: ascendant?.degre || 0
      },
      milieuDuCiel: {
        signe: milieuDuCiel?.signe || 'Non défini',
        degre: milieuDuCiel?.degre || 0
      },
      descendant: {
        signe: descendant?.signe || SIGNES_OPPOSES[ascendant?.signe || ''] || 'Non défini',
        degre: descendant?.degre || 0
      },
      fondDuCiel: {
        signe: fondDuCiel?.signe || 'Non défini',
        degre: fondDuCiel?.degre || 0
      }
    },
    aspects,
    resumeAspects: natalChart.aspects_summary,
    metadata: {
      source: 'FreeAstroAPI',
      calculatedAt: new Date().toISOString(),
      zodiacType: natalChart.subject.zodiac_type
    }
  };
}

// ============================================================
// FONCTION : Géocodage (Ville -> Lat/Lng)
// ============================================================

export async function geocodeCity(city: string, country?: string): Promise<{ lat: number; lng: number }> {
  try {
    // Utiliser une API de géocodage (ex: OpenStreetMap Nominatim - gratuit)
    const query = country ? `${city}, ${country}` : city;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'AstrologyApp/1.0' // Requis par Nominatim
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error(`Ville introuvable: ${city}`);
    }

    const location = response.data[0];
    return {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon)
    };

  } catch (error: any) {
    console.error('[Geocoding] ❌', error.message);
    throw new Error(`Impossible de localiser la ville: ${city}`);
  }
}
