import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface HoroscopeRequest {
  zodiacSign: string;
  horoscopeType: string;
  birthDate: string;
  partnerSign?: string;
  element: string;
  symbol: string;
}

const SYSTEM_PROMPT = `Tu es un astrologue professionnel expert spécialisé dans l'astrologie africaine et moderne. Tu génères des horoscopes précis, profonds et inspirants qui intègrent la sagesse ancestrale africaine. Tes prédictions sont empathiques, pratiques et riches en insights spirituels.`;

const generateHoroscopePrompt = (req: HoroscopeRequest): string => {
  const date = new Date(req.birthDate);
  let periodContext = '';
  
  switch(req.horoscopeType) {
    case 'Quotidien':
      periodContext = `pour aujourd'hui ${date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
      break;
    case 'Mensuel':
      periodContext = `pour le mois de ${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
      break;
    case 'Annuel':
      periodContext = `pour l'année ${date.getFullYear()}`;
      break;
    case 'Amoureux':
      periodContext = req.partnerSign 
        ? `concernant la compatibilité amoureuse avec le signe ${req.partnerSign}`
        : `concernant les prévisions sentimentales`;
      break;
  }

  return `Génère un horoscope ${req.horoscopeType.toLowerCase()} ${periodContext} pour le signe ${req.zodiacSign} (élément ${req.element}).

${req.partnerSign ? `Analyse la compatibilité avec ${req.partnerSign}.` : ''}

STRUCTURE ATTENDUE (réponds UNIQUEMENT en JSON valide) :

{
  "generalForecast": "Prévision générale détaillée intégrant l'énergie cosmique actuelle et la sagesse africaine (3-4 phrases)",
  "love": "Prévisions amoureuses ${req.partnerSign ? `en analysant la synergie avec ${req.partnerSign}` : ''} (2-3 phrases)",
  "work": "Prévisions professionnelles et conseils carrière (2-3 phrases)",
  "health": "Conseils santé et bien-être énergétique (2-3 phrases)",
  "spiritualAdvice": "Un proverbe ou sagesse africaine authentique pertinent avec sa source (ex: Proverbe Bambara, Yoruba, Swahili, Akan, etc.)",
  "luckyColor": "Couleur porte-bonheur spécifique (ex: Rouge rubis et or)",
  "dominantPlanet": "Planète dominante avec son influence (ex: Mars (énergie et action))"
}

EXIGENCES :
- Intègre des références authentiques à la sagesse africaine (proverbes Bambara, Yoruba, Swahili, Akan, Peul, Wolof, Zoulou, etc.)
- Sois précis sur les énergies planétaires actuelles
- Adopte un ton empathique et inspirant
- Fournis des conseils pratiques et actionnables
- ${req.partnerSign ? 'Analyse en profondeur la dynamique relationnelle entre les deux signes' : ''}`;
};

async function callDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY non configurée');
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur DeepSeek API: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  try {
    const body: HoroscopeRequest = await request.json();

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: generateHoroscopePrompt(body) }
    ];

    const aiResponse = await callDeepSeek(messages);
    
    // Parse la réponse JSON
    let horoscopeData;
    try {
      // Extraire le JSON si DeepSeek ajoute du texte autour
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        horoscopeData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Pas de JSON valide dans la réponse');
      }
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError);
      console.log('Réponse DeepSeek:', aiResponse);
      throw new Error('Format de réponse invalide');
    }

    const date = new Date(body.birthDate);
    let periodText = '';
    
    switch(body.horoscopeType) {
      case 'Quotidien':
        periodText = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        break;
      case 'Mensuel':
        periodText = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        break;
      case 'Annuel':
        periodText = `Année ${date.getFullYear()}`;
        break;
      case 'Amoureux':
        periodText = 'Prévisions sentimentales';
        break;
    }

    const horoscope = {
      zodiacSign: body.zodiacSign,
      symbol: body.symbol,
      element: body.element,
      period: periodText,
      horoscopeType: body.horoscopeType,
      generalForecast: horoscopeData.generalForecast,
      love: horoscopeData.love,
      work: horoscopeData.work,
      health: horoscopeData.health,
      spiritualAdvice: horoscopeData.spiritualAdvice,
      luckyColor: horoscopeData.luckyColor,
      dominantPlanet: horoscopeData.dominantPlanet,
    };

    return NextResponse.json({ 
      success: true, 
      horoscope 
    });

  } catch (error) {
    console.error('Erreur génération horoscope:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    );
  }
}
