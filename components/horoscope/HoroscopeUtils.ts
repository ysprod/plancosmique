import { BackendHoroscope, HoroscopeResult } from '@/lib/interfaces';
export function getZodiacSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    'bélier': '♈', 'taureau': '♉', 'gémeaux': '♊',
    'cancer': '♋', 'lion': '♌', 'vierge': '♍',
    'balance': '♎', 'scorpion': '♏', 'sagittaire': '♐',
    'capricorne': '♑', 'verseau': '♒', 'poissons': '♓'
  };
  return symbols[sign.toLowerCase()] || '⭐';
}

export function getZodiacElement(sign: string): string {
  const elements: Record<string, string> = {
    'bélier': 'Feu', 'lion': 'Feu', 'sagittaire': 'Feu',
    'taureau': 'Terre', 'vierge': 'Terre', 'capricorne': 'Terre',
    'gémeaux': 'Air', 'balance': 'Air', 'verseau': 'Air',
    'cancer': 'Eau', 'scorpion': 'Eau', 'poissons': 'Eau'
  };
  return elements[sign.toLowerCase()] || 'Éther';
}


export function transformBackendToResult(backend: BackendHoroscope): HoroscopeResult | null {
  if (!backend.resultData?.horoscope) return null;
  const horoscope = backend.resultData.horoscope;
  const positions = backend.formData?.carteDuCiel?.carteDuCiel?.positions || [];
  const sunPosition = positions.find(p => p.planete.toLowerCase().includes('soleil'));
  const zodiacSign = sunPosition?.signe || 'Inconnu';
  return {
    zodiacSign,
    symbol: getZodiacSymbol(zodiacSign),
    element: getZodiacElement(zodiacSign),
    period: backend.title.toLowerCase().includes('annuel') ? 'Cette année' : 'Ce mois',
    horoscopeType: backend.title,
    generalForecast: horoscope.generalForecast,
    love: horoscope.love,
    work: horoscope.work,
    health: horoscope.health,
    spiritualAdvice: horoscope.spiritualAdvice,
    luckyColor: horoscope.luckyColor,
    dominantPlanet: horoscope.dominantPlanet
  };
}
