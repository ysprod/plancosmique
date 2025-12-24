/**
 * Service pour générer des analyses astrologiques via DeepSeek AI
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { 
  BirthData, 
  CarteDuCiel, 
  MissionDeVie, 
  TalentsNaturels,
  DefisViePersonnelle,
  Relations,
  CarriereVocation,
  SpiritualiteCroissance,
  PositionPlanetaire,
  Planete,
  PointAstrologique,
  Asteroide,
  SigneZodiacal
} from '@/lib/types/astrology.types';
/* eslint-enable @typescript-eslint/no-unused-vars */

// ==================== CONFIGURATION ====================

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

// ==================== PROMPTS ====================

const SYSTEM_PROMPT = `Tu es un astrologue professionnel expert. Tu analyses les cartes du ciel avec précision et profondeur. Tes réponses sont structurées, empathiques et riches en insights pratiques.`;

const generateCarteDuCielPrompt = (birthData: BirthData): string => {
  return `Génère la CARTE DU CIEL complète pour :

NOM: ${birthData.nom}
PRÉNOMS: ${birthData.prenoms}
DATE DE NAISSANCE: ${birthData.dateNaissance}
HEURE DE NAISSANCE: ${birthData.heureNaissance}
LIEU DE NAISSANCE: ${birthData.villeNaissance}, ${birthData.paysNaissance}

Fournis UNIQUEMENT les positions suivantes au format précis :
- Soleil en [Signe]
- Ascendant en [Signe]
- Lune en [Signe]
- Milieu du Ciel en [Signe]
- MERCURE EN [SIGNE] EN MAISON [X]
- VÉNUS EN [SIGNE] EN MAISON [X]
- MARS EN [SIGNE] EN MAISON [X]
- JUPITER [RÉTROGRADE] EN [SIGNE] EN MAISON [X]
- SATURNE [RÉTROGRADE] EN [SIGNE] EN MAISON [X]
- URANUS [RÉTROGRADE] EN [SIGNE] EN MAISON [X]
- NEPTUNE [RÉTROGRADE] EN [SIGNE] EN MAISON [X]
- PLUTON [RÉTROGRADE] EN [SIGNE] EN MAISON [X]
- Nœud Nord en [Signe] en Maison [X]
- Nœud Sud en [Signe] en Maison [X]
- CHIRON EN [SIGNE] : MAISON [X]
- VERTEX EN [SIGNE] : MAISON [X]
- LILITH VRAIE [RÉTROGRADE] EN [SIGNE] – MAISON [X]
- PALLAS EN [SIGNE] EN MAISON [X]
- VESTA EN [SIGNE] EN MAISON [X]
- CÉRÈS EN [SIGNE] EN MAISON [X]
- PART DE FORTUNE & JUNON EN [SIGNE] EN MAISON [X]

Réponds UNIQUEMENT avec les positions, sans explication.`;
};

const generateMissionDeViePrompt = (birthData: BirthData, carteDuCiel: string): string => {
  return `Dans la carte du ciel de ${birthData.prenoms} ${birthData.nom}, prends en compte les positions des astres ci-dessous pour faire une analyse astrologique lui permettant de comprendre et connaître sa MISSION DE VIE :

CARTE DU CIEL :
${carteDuCiel}

ÉLÉMENTS À ANALYSER :
• Nœud Nord & Nœud Sud (position, maison, aspects) — indicateur principal du but karmique et des thèmes à développer/éviter.
• Milieu du Ciel (MC) & Maison 10 — vocation publique / impact social lié à la mission.
• Soleil (position, maison, aspects) — vitalité, expression essentielle de l'âme.
• Jupiter (expansion, sens, vocation spirituelle) et Saturne (structure, leçon) — grand cadre de mission.
• Chiron (si relié aux nœuds ou au Soleil) — appel à transformer la blessure en service.
• Part of Fortune (localise chance alignée à la vocation).
• Astéroïdes : Vesta (consécration / vocation spirituelle), Pallas (stratégie/mission intellectuelle), Cérès (service/soin).

ASPECTS À ANALYSER :
• Conjonctions Nœud-Soleil/MC/Jupiter (forte empreinte de mission).
• Trigones/Sextiles Nœud-planètes rapides (facilitant) vs Carrés/Oppositions (épreuves formatrices).
• Aspects majeurs impliquant Saturne (obligation/discipline) ou Neptune (vocation spirituelle, possible confusion).

Fournis une analyse détaillée et structurée.`;
};

const generateTalentsNaturelsPrompt = (birthData: BirthData, carteDuCiel: string): string => {
  return `Dans la carte du ciel de ${birthData.prenoms} ${birthData.nom}, prends en compte les positions des astres ci-dessous pour faire une analyse astrologique lui permettant de comprendre et connaître ses TALENTS NATURELS :

CARTE DU CIEL :
${carteDuCiel}

ÉLÉMENTS À ANALYSER :
• Soleil (essence), Mercure (aptitudes intellectuelles/communication), Vénus (talents artistiques relationnels), Mars (compétences d'action), Jupiter (don d'expansion/enseignement).
• 2ème maison (ressources & aptitudes), 6ème maison (compétences pratiques), 10ème maison (talents manifestés publiquement).
• Pallas (ingéniosité, stratégie), Vesta (maîtrise, spécialisation), Cérès (aptitude à nourrir/service), Chiron (talent né d'une blessure transformée).

ASPECTS À ANALYSER :
• Conjonctions Soleil/Mercure/Vénus/Pallas en maisons pertinentes.
• Trigones/Sextiles entre planètes personnelles (flux naturel de talent).
• Carrés/Sesqui/T-carrés indiquent talent compliqué mais mobilisable.

Fournis une analyse détaillée et structurée.`;
};

const generateRelationsPrompt = (birthData: BirthData, carteDuCiel: string): string => {
  return `Dans la carte du ciel de ${birthData.prenoms} ${birthData.nom}, prends en compte les positions des astres ci-dessous pour faire une analyse astrologique approfondie de son STYLE RELATIONNEL et de ses dynamiques affectives :

CARTE DU CIEL :
${carteDuCiel}

ÉLÉMENTS CLÉS À ANALYSER :
• Vénus (amour, valeurs affectives, style d'attachement, ce qui attire)
• Mars (désir, passion, assertivité relationnelle, pulsion d'action dans la relation)
• Lune (besoins émotionnels profonds, sécurité affective, héritage maternel)
• Maison 7 (partenariat, mariage, projection sur l'autre, qualités recherchées)
• Descendant (type de partenaire attiré, qualités complémentaires)
• Chiron (blessure affective, pattern répétitif à guérir)
• Saturne (peurs relationnelles, leçons karmiques, engagement)
• Junon (fidélité, engagement, contrat relationnel)
• Neptune (amour inconditionnel, fusion, idéalisation ou confusion)

ASPECTS À ANALYSER :
• Vénus-Mars (harmonie désir/sentiment, magnétisme)
• Lune-Vénus (confort émotionnel dans l'amour)
• Aspects durs Vénus/Mars/Saturne (obstacles, tensions)
• Vénus/Mars-Pluton (intensité, transformation par l'amour)
• Chiron-personnelles (blessures à transcender)

Fournis une analyse détaillée et structurée incluant :
1. STYLE RELATIONNEL (comment la personne aime et exprime son affection)
2. BESOINS ÉMOTIONNELS (ce dont elle a besoin pour se sentir aimée)
3. DÉFIS RELATIONNELS (patterns répétitifs, peurs, blessures)
4. COMPATIBILITÉS (signes et profils astrologiques harmonieux)
5. CONSEILS PRATIQUES (comment cultiver des relations épanouissantes)`;
};

const generateCarrierePrompt = (birthData: BirthData, carteDuCiel: string): string => {
  return `Dans la carte du ciel de ${birthData.prenoms} ${birthData.nom}, prends en compte les positions des astres ci-dessous pour faire une analyse astrologique approfondie de sa CARRIÈRE et VOCATION PROFESSIONNELLE :

CARTE DU CIEL :
${carteDuCiel}

ÉLÉMENTS CLÉS À ANALYSER :
• Milieu du Ciel / MC (vocation publique, ambition, image professionnelle, réalisation sociale)
• Maison 10 (carrière, statut, contribution au monde, héritage professionnel)
• Maison 6 (travail quotidien, service, compétences pratiques, santé au travail)
• Maison 2 (valeurs, ressources financières, talents monétisables, sécurité matérielle)
• Soleil (identité professionnelle, autorité naturelle, rayonnement)
• Jupiter (expansion, opportunités, chance professionnelle, enseignement)
• Saturne (discipline, structure, responsabilités, maîtrise à long terme)
• Part de Fortune (secteur de prospérité et d'épanouissement matériel)
• Pallas (stratégie, intelligence professionnelle, capacité de résolution)
• Vesta (dévouement, spécialisation, zone de maîtrise absolue)

ASPECTS À ANALYSER :
• MC-Soleil/Jupiter (alignement vocation-identité, succès naturel)
• Saturne-MC (défis, construction patiente, autorité gagnée)
• Jupiter-MC/Soleil (opportunités d'expansion, reconnaissance)
• Nœud Nord-MC (mission professionnelle karmique)

Fournis une analyse détaillée et structurée incluant :
1. VOCATION PROFONDE (ce pour quoi la personne est faite)
2. DOMAINES RECOMMANDÉS (secteurs et métiers alignés avec le thème)
3. STYLE DE TRAVAIL (autonome/équipe, créatif/structuré, leader/exécutant)
4. POTENTIEL FINANCIER (capacité de prospérité, zones lucratives)
5. DÉFIS PROFESSIONNELS (obstacles à surmonter, leçons)
6. CONSEILS STRATÉGIQUES (comment réussir et s'épanouir professionnellement)`;
};

const generateSpiritualitePrompt = (birthData: BirthData, carteDuCiel: string): string => {
  return `Dans la carte du ciel de ${birthData.prenoms} ${birthData.nom}, prends en compte les positions des astres ci-dessous pour faire une analyse astrologique approfondie de son CHEMIN SPIRITUEL et de sa CROISSANCE DE L'ÂME :

CARTE DU CIEL :
${carteDuCiel}

ÉLÉMENTS CLÉS À ANALYSER :
• Nœud Nord (mission d'âme, direction évolutive, qualités à développer dans cette vie)
• Nœud Sud (acquis karmiques, talents passés, patterns à transcender)
• Maison 12 (inconscient, dissolution de l'ego, connexion au Tout, vie intérieure)
• Maison 9 (quête de sens, philosophie, sagesse, expansion de conscience)
• Maison 8 (transformation, mort-renaissance, occultisme, pouvoir de régénération)
• Neptune (spiritualité, mysticisme, connexion divine, intuition, dissolution des frontières)
• Pluton (transformation profonde, pouvoir de l'âme, alchimie intérieure, mort initiatique)
• Chiron (blessure sacrée, guérisseur blessé, don né par la souffrance transcendée)
• Uranus (éveil soudain, libération, génie spirituel, rébellion contre le conditionnement)
• Vertex (point de destinée, rencontres fatidiques, révélations)
• Lune Noire / Lilith (ombre intégrée, pouvoir féminin sauvage, vérité non censurée)

ASPECTS À ANALYSER :
• Neptune-Soleil/Lune (sensibilité spirituelle, canal médiumnique)
• Pluton-Nœud Nord (transformation obligatoire pour accomplir la mission)
• Chiron-personnelles (blessure à transmuter en don de guérison)
• Uranus-personnelles (éveil spirituel soudain, libération karmique)
• Aspects M12/M9 (voie de transcendance et de sagesse)

Fournis une analyse détaillée et structurée incluant :
1. CHEMIN SPIRITUEL (direction évolutive de l'âme, leçon de vie principale)
2. BLESSURE SACRÉE (Chiron - la blessure qui devient force et don)
3. POTENTIEL D'ÉVEIL (capacités médiumniques, intuition, connexion subtile)
4. PRATIQUES RECOMMANDÉES (méditation, yoga, chamanisme, art sacré, service, etc.)
5. LEÇONS KARMIQUES (patterns à transcender, libérations nécessaires)
6. CONSEILS POUR L'ÉVOLUTION (comment avancer sur le chemin de l'âme)`;
};

// ==================== FONCTIONS D'APPEL API ====================

/**
 * Appelle l'API DeepSeek
 */
async function callDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY non configurée');
  }

  const request: DeepSeekRequest = {
    model: 'deepseek-chat',
    messages,
    temperature: 0.7,
    max_tokens: 4000,
  };

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur DeepSeek API: ${response.status} - ${errorText}`);
  }

  const data: DeepSeekResponse = await response.json();
  
  if (!data.choices || data.choices.length === 0) {
    throw new Error('Aucune réponse de DeepSeek');
  }

  return data.choices[0].message.content;
}

// ==================== PARSING DES RÉPONSES ====================

/**
 * Parse la carte du ciel depuis le texte brut
 */
function parseCarteDuCiel(texte: string, birthData: BirthData): CarteDuCiel {
  const positions: PositionPlanetaire[] = [];
  const lignes = texte.split('\n').filter(l => l.trim());

  for (const ligne of lignes) {
    const match = ligne.match(/^([\w\s]+?)\s+(?:RÉTROGRADE\s+)?EN\s+([\wéèêàâùç]+)(?:\s+[E:–-]\s*MAISON\s+(\d+))?/i);
    
    if (match) {
      const planete = match[1].trim();
      const signe = match[2].trim();
      const maison = match[3] ? parseInt(match[3]) : undefined;
      const retrograde = /RÉTROGRADE/i.test(ligne);

      positions.push({
        planete: planete as Planete | PointAstrologique | Asteroide,
        signe: signe as SigneZodiacal,
        maison: maison || 1,
        retrograde,
      });
    }
  }

  return {
    sujet: {
      nom: birthData.nom,
      prenoms: birthData.prenoms,
      dateNaissance: birthData.dateNaissance,
      lieuNaissance: `${birthData.villeNaissance}, ${birthData.paysNaissance}`,
      heureNaissance: birthData.heureNaissance,
    },
    positions,
    aspectsTexte: texte,
  };
}

/**
 * Parse l'analyse Mission de Vie
 */
function parseMissionDeVie(texte: string): MissionDeVie {
  // Extraction simplifiée - à améliorer avec regex plus sophistiqués
  // const sections = texte.split(/\n#{1,3}\s+/);
  
  return {
    titre: 'Mission de Vie',
    analyseKarmique: {
      noeudNord: {
        position: extractSection(texte, 'Nœud Nord'),
        signification: extractSection(texte, 'Nœud Nord signification'),
      },
      noeudSud: {
        position: extractSection(texte, 'Nœud Sud'),
        signification: extractSection(texte, 'Nœud Sud signification'),
      },
      aspectsNotables: extractList(texte, 'Aspects Notables'),
    },
    vocationPublique: {
      milieuDuCiel: extractSection(texte, 'Milieu du Ciel'),
      partDeFortune: extractSection(texte, 'Part de Fortune'),
      description: extractSection(texte, 'Vocation Publique'),
    },
    expressionAme: {
      soleil: extractSection(texte, 'Soleil'),
      description: extractSection(texte, 'Expression'),
    },
    cadreExpansion: {
      jupiter: extractSection(texte, 'Jupiter'),
      saturne: extractSection(texte, 'Saturne'),
      description: extractSection(texte, 'Cadre'),
    },
    transformation: {
      chiron: extractSection(texte, 'Chiron'),
      vesta: extractSection(texte, 'Vesta'),
      pallas: extractSection(texte, 'Pallas'),
      ceres: extractSection(texte, 'Cérès'),
      description: extractSection(texte, 'Transformation'),
    },
    synthese: extractList(texte, 'Synthèse'),
  };
}

/**
 * Parse l'analyse Talents Naturels
 */
function parseTalentsNaturels(texte: string): TalentsNaturels {
  return {
    titre: 'Talents Naturels',
    intellectCommunication: {
      soleil: extractSection(texte, 'Soleil'),
      mercure: extractSection(texte, 'Mercure'),
      description: extractSection(texte, 'Intellect'),
      talents: extractList(texte, 'talents'),
    },
    actionVolonte: {
      mars: extractSection(texte, 'Mars'),
      description: extractSection(texte, 'Action'),
      talents: extractList(texte, 'compétences'),
    },
    creativiteRelation: {
      venus: extractSection(texte, 'Vénus'),
      description: extractSection(texte, 'Créativité'),
      talents: extractList(texte, 'artistiques'),
    },
    expansion: {
      jupiter: extractSection(texte, 'Jupiter'),
      description: extractSection(texte, 'Expansion'),
      talents: extractList(texte, 'enseignement'),
    },
    maisonRessources: {
      maison2: extractSection(texte, '2ème maison'),
      maison6: extractSection(texte, '6ème maison'),
      maison10: extractSection(texte, '10ème maison'),
    },
    asteroides: {
      pallas: extractSection(texte, 'Pallas'),
      vesta: extractSection(texte, 'Vesta'),
      ceres: extractSection(texte, 'Cérès'),
      chiron: extractSection(texte, 'Chiron'),
    },
    synthese: extractList(texte, 'Synthèse'),
  };
}

// ==================== HELPERS ====================

function extractSection(texte: string, keyword: string): string {
  const regex = new RegExp(`${keyword}[:\\s]*([^\\n]+)`, 'i');
  const match = texte.match(regex);
  return match ? match[1].trim() : '';
}

function extractList(texte: string, keyword: string): string[] {
  const regex = new RegExp(`${keyword}[:\\s]*\\n([\\s\\S]+?)(?=\\n\\n|$)`, 'i');
  const match = texte.match(regex);
  if (!match) return [];
  
  return match[1]
    .split('\n')
    .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim()))
    .map(line => line.replace(/^[•\-\d.]\s*/, '').trim());
}

// ==================== FONCTIONS PRINCIPALES ====================

/**
 * Génère la carte du ciel complète
 */
export async function genererCarteDuCiel(birthData: BirthData): Promise<CarteDuCiel> {
 
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateCarteDuCielPrompt(birthData) },
  ];

  const response = await callDeepSeek(messages);
  const carteDuCiel = parseCarteDuCiel(response, birthData);

   return carteDuCiel;
}

/**
 * Génère l'analyse Mission de Vie
 */
export async function genererMissionDeVie(
  birthData: BirthData, 
  carteDuCiel: CarteDuCiel
): Promise<MissionDeVie> {
 
  const carteDuCielTexte = carteDuCiel.aspectsTexte || '';
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateMissionDeViePrompt(birthData, carteDuCielTexte) },
  ];

  const response = await callDeepSeek(messages);
  const missionDeVie = parseMissionDeVie(response);

   return missionDeVie;
}

/**
 * Génère l'analyse Talents Naturels
 */
export async function genererTalentsNaturels(
  birthData: BirthData, 
  carteDuCiel: CarteDuCiel
): Promise<TalentsNaturels> {
 
  const carteDuCielTexte = carteDuCiel.aspectsTexte || '';
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateTalentsNaturelsPrompt(birthData, carteDuCielTexte) },
  ];

  const response = await callDeepSeek(messages);
  const talents = parseTalentsNaturels(response);

   return talents;
}

/**
 * Génère l'analyse Relations
 */
export async function genererRelations(
  birthData: BirthData,
  carteDuCiel: CarteDuCiel
): Promise<Relations> {
 
  const carteDuCielTexte = carteDuCiel.aspectsTexte || '';
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateRelationsPrompt(birthData, carteDuCielTexte) },
  ];

  const response = await callDeepSeek(messages);
  
  // Parse simple pour Relations
  const relations: Relations = {
    titre: 'Relations',
    styleRelationnel: {
      venus: extractSection(response, 'Vénus'),
      mars: extractSection(response, 'Mars'),
      maison7: extractSection(response, 'Maison 7'),
      description: extractSection(response, 'Style relationnel'),
    },
    besoinsRelationnels: {
      lune: extractSection(response, 'Lune'),
      description: extractSection(response, 'Besoins émotionnels'),
    },
    defisRelationnels: {
      chiron: extractSection(response, 'Chiron'),
      saturne: extractSection(response, 'Saturne'),
      description: extractSection(response, 'Défis'),
    },
    compatibilite: {
      signesCompatibles: extractList(response, 'Compatibilités'),
      signesDefis: extractList(response, 'Défis'),
      conseil: extractSection(response, 'Conseil'),
    },
    synthese: extractList(response, 'Synthèse'),
  };

   return relations;
}

/**
 * Génère l'analyse Carrière & Vocation
 */
export async function genererCarriere(
  birthData: BirthData,
  carteDuCiel: CarteDuCiel
): Promise<CarriereVocation> {
 
  const carteDuCielTexte = carteDuCiel.aspectsTexte || '';
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateCarrierePrompt(birthData, carteDuCielTexte) },
  ];

  const response = await callDeepSeek(messages);
  
  const carriere: CarriereVocation = {
    titre: 'Carrière & Vocation',
    milieuDuCiel: {
      position: extractSection(response, 'Milieu du Ciel'),
      description: extractSection(response, 'MC'),
    },
    maisonTravail: {
      maison6: extractSection(response, 'Maison 6'),
      maison10: extractSection(response, 'Maison 10'),
      description: extractSection(response, 'Travail'),
    },
    planetesInfluentes: {
      jupiter: extractSection(response, 'Jupiter'),
      saturne: extractSection(response, 'Saturne'),
      description: extractSection(response, 'Influences'),
    },
    domainesRecommandes: extractList(response, 'Domaines'),
    synthese: extractList(response, 'Synthèse'),
  };

   return carriere;
}

/**
 * Génère l'analyse Spiritualité & Croissance
 */
export async function genererSpiritualite(
  birthData: BirthData,
  carteDuCiel: CarteDuCiel
): Promise<SpiritualiteCroissance> {
 
  const carteDuCielTexte = carteDuCiel.aspectsTexte || '';
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: generateSpiritualitePrompt(birthData, carteDuCielTexte) },
  ];

  const response = await callDeepSeek(messages);
  
  const spiritualite: SpiritualiteCroissance = {
    titre: 'Spiritualité & Croissance',
    cheminSpirituel: {
      noeudNord: extractSection(response, 'Nœud Nord'),
      neptune: extractSection(response, 'Neptune'),
      description: extractSection(response, 'Chemin spirituel'),
    },
    blessureGuerie: {
      chiron: extractSection(response, 'Chiron'),
      description: extractSection(response, 'Blessure sacrée'),
    },
    potentielEveil: {
      uranus: extractSection(response, 'Uranus'),
      pluton: extractSection(response, 'Pluton'),
      description: extractSection(response, 'Éveil'),
    },
    pratiquesRecommandees: extractList(response, 'Pratiques'),
    synthese: extractList(response, 'Synthèse'),
  };

   return spiritualite;
}

/**
 * Génère l'analyse complète (toutes les sections)
 */
export async function genererAnalyseComplete(birthData: BirthData) {
 
  // 1. Générer la carte du ciel
  const carteDuCiel = await genererCarteDuCiel(birthData);

  // 2. Générer toutes les analyses en parallèle
  const [missionDeVie, talentsNaturels, relations, carriere, spiritualite] = await Promise.all([
    genererMissionDeVie(birthData, carteDuCiel),
    genererTalentsNaturels(birthData, carteDuCiel),
    genererRelations(birthData, carteDuCiel),
    genererCarriere(birthData, carteDuCiel),
    genererSpiritualite(birthData, carteDuCiel),
  ]);

 
  return {
    carteDuCiel,
    missionDeVie,
    talentsNaturels,
    relations,
    carriere,
    spiritualite,
  };
}

export const deepSeekService = {
  genererCarteDuCiel,
  genererMissionDeVie,
  genererTalentsNaturels,
  genererRelations,
  genererCarriere,
  genererSpiritualite,
  genererAnalyseComplete,
};
