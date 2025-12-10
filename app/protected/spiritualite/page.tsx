'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  CircleDollarSign,
  Feather,
  Flame,
  Shield,
  Sparkle
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

// Interface TypeScript pour les pratiques spirituelles
interface SpiritualPractice {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  bestTiming?: string;
}

const SpiritualiteAfricainePage = () => {
  const [activeTab, setActiveTab] = useState<string>('bases');

  // Données des 5 pratiques spirituelles africaines
  const spiritualPractices: SpiritualPractice[] = [    {
      id: 'bases',
      title: 'Notions de Base',
      icon: <BookOpen className="w-5 h-5" />,
      description: "Fondements essentiels de la spiritualité africaine ancestrale",
      introduction: "La spiritualité africaine est un système de croyances millénaires basé sur l'interconnexion entre les vivants, les ancêtres, la nature et le divin. Elle repose sur le principe que tout dans l'univers est énergie et conscience.",
      keyElements: [
        "Connexion avec les ancêtres : Ils sont nos guides et protecteurs spirituels",
        "Force vitale (Ashé/Nyama) : L'énergie universelle qui anime toute chose",
        "Équilibre cosmique : Harmonie entre le monde visible et invisible",
        "Respect de la nature : Arbres, rivières, montagnes sont habités par des esprits",
        "Transmission orale : Les enseignements se transmettent de génération en génération",
        "Ritualisation : Chaque acte sacré suit un protocole précis",
        "Communauté : La spiritualité est collective, pas seulement individuelle"
      ],
      detailedGuide: "Dans la cosmogonie africaine, le monde est divisé en trois sphères interconnectées : le monde des vivants (Aiyé), le monde des ancêtres (Orun) et le monde des divinités (Orisha/Lwa/Vodun selon les traditions). Les ancêtres jouent un rôle crucial car ils servent de pont entre les humains et les forces supérieures. La spiritualité africaine n'est pas dogmatique : elle s'adapte, évolue et intègre les contextes locaux tout en préservant ses principes fondamentaux. Le concept de Maat (équilibre, justice, vérité) est central : vivre en harmonie avec les lois cosmiques garantit la prospérité et la paix. La divination (Ifa, géomancie, cauris) permet de consulter les forces invisibles pour obtenir des guidances. Le pouvoir des mots (Nommo) est considéré comme créateur : ce que nous disons se manifeste dans la réalité.",
      benefits: [
        "Reconnexion avec vos racines spirituelles profondes",
        "Compréhension de votre place dans l'univers",
        "Accès à la sagesse ancestrale millénaire",
        "Développement d'une relation personnelle avec vos ancêtres",
        "Éveil de votre force vitale intérieure (Ashé)",
        "Protection spirituelle naturelle renforcée"
      ],
      practicalSteps: [
        "Créez un autel ancestral simple : photos, bougies blanches, eau fraîche, fleurs",
        "Apprenez l'histoire de vos ancêtres : interrogez les aînés de votre famille",
        "Pratiquez la salutation matinale aux quatre directions (Est, Sud, Ouest, Nord)",
        "Offrez régulièrement de l'eau et de la lumière à vos ancêtres",
        "Méditez quotidiennement en vous connectant à la Terre (pieds nus)",
        "Étudiez les symboles Adinkra et leur signification profonde",
        "Rejoignez une communauté ou trouvez un mentor spirituel authentique"
      ],
      warnings: [
        "Ne pratiquez jamais de rituels dont vous ne comprenez pas le sens",
        "Respectez les protocoles : certains rituels nécessitent une initiation",
        "Méfiez-vous des charlatans qui promettent des résultats instantanés",
        "La spiritualité africaine demande engagement et respect, pas superstition"
      ],
      affirmation: "Je suis relié(e) à la sagesse infinie de mes ancêtres. Leur force coule dans mes veines. Je marche sur le chemin de la vérité et de l'équilibre.",
      materials: [
        "Bougies blanches (pureté)",
        "Eau fraîche (élément vital)",
        "Encens naturel (oliban, copal, sauge)",
        "Tissu blanc pour l'autel",
        "Calebasse ou bol en terre cuite"
      ],
      bestTiming: "Tous les jours, particulièrement le matin au lever du soleil pour les salutations, et le soir pour communiquer avec les ancêtres"
    },
    {
      id: 'protection',
      title: 'Rituels de Protection',
      icon: <Shield className="w-5 h-5" />,
      description: "Protégez votre énergie, votre maison et vos proches des influences négatives",
      introduction: "Dans la tradition africaine, la protection spirituelle est essentielle pour maintenir l'équilibre de votre force vitale. Ces rituels créent un bouclier énergétique contre les attaques psychiques, le mauvais œil, les envies négatives et les entités malveillantes.",
      keyElements: [
        "Bain de purification (avec plantes sacrées et sel marin)",
        "Cercle de protection avec sel, cendre ou poudre blanche (pemba)",
        "Invocation des gardiens des quatre directions",
        "Utilisation de gris-gris et talismans consacrés",
        "Fumigation avec encens protecteur (benjoin, myrrhe, rue)",
        "Scellement des ouvertures (portes, fenêtres) avec signes sacrés",
        "Protection par les ancêtres et esprits tutélaires"
      ],
      detailedGuide: "La protection spirituelle africaine fonctionne sur plusieurs niveaux : physique (corps), énergétique (aura), spatial (maison/lieu) et temporel (moment). Le rituel de base commence par une purification : bain aux herbes (basilic, citronnelle, laurier) additionné de sel marin et de prières. Ensuite, on crée une barrière protectrice autour de soi ou de son espace. Le sel gemme est particulièrement puissant car il absorbe les énergies négatives. Les quatre coins cardinaux doivent être honorés et scellés car ce sont des portes énergétiques. Le gris-gris (sachet de protection) contient des éléments naturels chargés de pouvoir : racines, pierres, plumes, herbes, symboles écrits. Il doit être consacré lors d'un rituel et porté sur soi ou placé dans un lieu stratégique. La protection n'est pas statique : elle doit être renouvelée régulièrement, surtout après des événements perturbateurs ou lors des changements de saison.",
      benefits: [
        "Bouclier énergétique contre les attaques psychiques et le mauvais œil",
        "Paix et sérénité dans votre espace de vie",
        "Sommeil réparateur sans cauchemars ou paralysies du sommeil",
        "Protection de votre famille et de vos proches",
        "Blocage des influences négatives extérieures",
        "Renforcement de votre aura et de votre champ magnétique"
      ],
      practicalSteps: [
        "Prenez un bain de purification : eau + sel marin + basilic frais + 7 gouttes de citron",
        "Tracez un cercle de sel aux quatre coins de votre maison en priant",
        "Fumigez chaque pièce avec de l'encens de benjoin (sens anti-horaire)",
        "Placez du sel dans des coupelles aux entrées et fenêtres",
        "Créez un gris-gris personnel : sachet rouge avec ail, rue, sel, œil de tigre",
        "Invoquez vos ancêtres protecteurs : 'Ancêtres, formez un mur de lumière autour de moi'",
        "Répétez le rituel chaque nouvelle lune pour maintenir la protection active"
      ],
      warnings: [
        "Ne jetez jamais l'eau de purification n'importe où : versez-la dans la terre ou à un carrefour",
        "Ne prêtez jamais votre gris-gris personnel : il est chargé de VOTRE énergie",
        "Si vous sentez une résistance forte pendant le rituel, faites appel à un initié",
        "La protection doit être accompagnée d'une vie éthique : elle n'est pas une excuse pour mal agir"
      ],
      affirmation: "Je suis protégé(e) par la force de mes ancêtres. Un bouclier de lumière m'entoure. Aucune énergie négative ne peut me toucher.",
      materials: [
        "Sel marin ou sel gemme",
        "Herbes : basilic, rue, laurier, citronnelle",
        "Encens : benjoin, myrrhe, oliban",
        "Bougie blanche (purification) et rouge (force)",
        "Tissu rouge pour gris-gris",
        "Pierre : œil de tigre, obsidienne ou tourmaline noire"
      ],
      bestTiming: "Nouvelle lune (nouveau cycle de protection), mardi (jour de Mars - force), ou en cas d'urgence immédiate"
    },
    {
      id: 'abondance',
      title: 'Rituels d\'Abondance',
      icon: <CircleDollarSign className="w-5 h-5" />,
      description: "Attirez la prospérité, la richesse et l'abondance dans tous les domaines de votre vie",
      introduction: "L'abondance dans la spiritualité africaine ne concerne pas seulement l'argent, mais la richesse globale : santé, amour, succès, opportunités. Ces rituels ouvrent les chemins bloqués et activent la circulation de l'énergie d'abondance (Ashé/Baraka).",
      keyElements: [
        "Offrandes à Ochùn/Erzulie (divinités de l'abondance et de l'amour)",
        "Utilisation du miel (attraction), cannelle (prospérité), pièces dorées",
        "Rituel du bol d'abondance avec éléments symboliques",
        "Bain d'attraction avec herbes magnétiques (basilic, menthe, cannelle)",
        "Activation des quatre coins de richesse dans votre maison",
        "Prières et chants d'invocation de la prospérité",
        "Danse et tambours pour élever la vibration d'abondance"
      ],
      detailedGuide: "Les rituels d'abondance africains reposent sur le principe que l'énergie suit l'intention et les symboles. Le miel est l'ingrédient roi : il 'adoucit' les situations et attire le positif. Le rituel du bol d'abondance consiste à préparer un récipient doré (ou jaune) contenant : pièces de monnaie, grains (riz, maïs), miel, cannelle, une bougie dorée. Ce bol est placé dans la zone richesse de votre maison (coin sud-est selon le Feng Shui africain adapté). Les bains d'attraction se prennent pendant 7 jours consécutifs, toujours dans le sens horaire (pour attirer) avec des herbes bouillies puis refroidies. L'important est l'état d'esprit : vous devez SENTIR l'abondance déjà présente, pas la supplier de venir. Les divinités comme Ochùn aiment les offrandes luxueuses : miel, champagne doux, oranges, miroirs, bijoux dorés. En échange de votre dévotion et de vos offrandes, elles ouvrent les portes de la prospérité. La générosité est clé : plus vous donnez (avec joie), plus vous recevez (loi du retour).",
      benefits: [
        "Attraction de nouvelles opportunités financières inattendues",
        "Déblocage des situations de stagnation économique",
        "Augmentation de votre magnétisme personnel",
        "Circulation fluide de l'argent dans votre vie",
        "Succès dans les projets et entreprises",
        "Prospérité globale : santé, amour, relations enrichissantes"
      ],
      practicalSteps: [
        "Préparez un bol d'abondance : récipient doré + 5 pièces + miel + cannelle + riz + bougie dorée",
        "Placez-le dans votre coin richesse (sud-est) ou près de l'entrée principale",
        "Allumez la bougie dorée chaque jeudi (jour de Jupiter - expansion) pendant 15 min",
        "Prenez 7 bains d'attraction : eau + basilic + menthe + miel + 5 pièces au fond de la baignoire",
        "Frottez vos mains avec de la cannelle en visualisant l'argent venir à vous",
        "Offrez du miel à Ochùn : versez du miel en rivière ou près d'eau avec une prière",
        "Donnez régulièrement (argent, nourriture) pour activer la loi du retour"
      ],
      warnings: [
        "L'abondance ne vient pas sans action : les rituels OUVRENT les portes, vous devez les traverser",
        "Ne soyez pas avide : demandez ce dont vous avez besoin, pas plus",
        "Si vous promettez une offrande aux esprits en échange d'aide, tenez TOUJOURS votre promesse",
        "L'argent obtenu par rituels doit être utilisé avec sagesse et générosité"
      ],
      affirmation: "Je suis un aimant à abondance. L'argent coule vers moi facilement et joyeusement. Je suis riche dans tous les domaines de ma vie.",
      materials: [
        "Miel naturel pur",
        "Cannelle en poudre et bâtons",
        "Pièces de monnaie (cuivre et dorées)",
        "Bougie dorée ou jaune",
        "Herbes : basilic, menthe, verveine",
        "Bol ou récipient doré/jaune",
        "Riz et grains (symboles de multiplication)"
      ],
      bestTiming: "Jeudi (jour de Jupiter - expansion et chance), pendant la lune croissante (croissance), de préférence le matin"
    },
    {
      id: 'ancetres',
      title: 'Invocation des Ancêtres',
      icon: <Feather className="w-5 h-5" />,
      description: "Connectez-vous profondément avec vos guides ancestraux pour recevoir guidance et protection",
      introduction: "Les ancêtres sont le pilier de la spiritualité africaine. Ils ne sont pas 'morts' mais transitionnés vers un autre plan d'existence d'où ils continuent à guider, protéger et bénir leur descendance. L'invocation crée un pont conscient entre vous et eux.",
      keyElements: [
        "Création d'un autel ancestral sacré",
        "Offrandes régulières : eau, café, alcool (rhum/gin), nourriture préférée",
        "Libations rituelles versées au sol en prononçant les noms",
        "Prières d'invocation en langues sacrées ou dans votre langue",
        "Utilisation de la bougie blanche (lumière pour éclairer leur chemin)",
        "Communication par rêves, signes et intuitions",
        "Honneur des défunts lors des dates importantes (anniversaires, décès)"
      ],
      detailedGuide: "L'autel ancestral est le téléphone spirituel qui vous relie à vos aïeuls. Il doit être placé dans un endroit calme et respectueux, de préférence dans votre chambre ou un espace privé. Sur l'autel, disposez : photos des ancêtres (si disponibles), sinon une image symbolique ; un verre d'eau fraîche changée quotidiennement (les ancêtres 'boivent' l'essence) ; une bougie blanche allumée régulièrement ; des fleurs blanches ; des objets leur ayant appartenu. Les libations sont cruciales : versez de l'eau, du café ou de l'alcool au sol (ou dans une plante) en appelant chaque ancêtre par son nom si vous le connaissez, sinon 'Ancêtres de mon sang, recevez cette offrande'. Parlez-leur quotidiennement comme s'ils étaient présents physiquement : racontez votre journée, demandez conseil, remerciez-les. Les signes de leur présence : rêves vivides, sensations de présence bienveillante, synchronicités, odeurs familières sans source, réussite soudaine après avoir demandé leur aide. Pour des demandes importantes, faites un 'festin ancestral' : préparez leurs plats préférés, mettez une assiette pour eux, invitez-les à manger avec vous.",
      benefits: [
        "Guidance claire dans les moments de confusion et de choix difficiles",
        "Protection puissante contre les dangers physiques et spirituels",
        "Bénédictions sur vos projets et entreprises",
        "Guérison des traumatismes transgénérationnels familiaux",
        "Sentiment profond d'appartenance et de soutien",
        "Accès à la sagesse et l'expérience de ceux qui ont vécu avant vous"
      ],
      practicalSteps: [
        "Créez votre autel ancestral : table couverte de tissu blanc + photos + verre d'eau + bougie",
        "Allumez la bougie chaque matin et saluez vos ancêtres : 'Bonjour, chers ancêtres'",
        "Changez l'eau quotidiennement (versez l'ancienne dans une plante)",
        "Faites une libation hebdomadaire : versez de l'eau au sol en prononçant les noms connus",
        "Parlez-leur régulièrement : demandez conseil, racontez vos joies et peines",
        "Offrez du café noir (sans sucre/lait) le lundi matin (ouverture de semaine)",
        "Notez vos rêves : les ancêtres parlent souvent dans le sommeil"
      ],
      warnings: [
        "Ne négligez jamais l'autel une fois créé : c'est un manque de respect grave",
        "Si vous promettez quelque chose à vos ancêtres, tenez votre parole",
        "Certains ancêtres peuvent être 'non élevés' (énergies lourdes) : priez pour leur élévation",
        "Ne demandez JAMAIS aux ancêtres de nuire à quelqu'un : ça se retourne contre vous"
      ],
      affirmation: "Mes ancêtres marchent avec moi. Leur sagesse me guide, leur force me protège, leur amour m'entoure. Je ne suis jamais seul(e).",
      materials: [
        "Photos ou images représentatives des ancêtres",
        "Verre transparent pour l'eau fraîche",
        "Bougies blanches (7 jours de préférence)",
        "Tissu blanc pour couvrir l'autel",
        "Café noir, rhum blanc ou gin (selon tradition familiale)",
        "Fleurs blanches fraîches",
        "Encens (oliban, copal ou sauge)"
      ],
      bestTiming: "Quotidien pour l'entretien de l'autel. Lundi (ouverture de semaine), vendredi (connexion spirituelle), ou dates anniversaires des défunts"
    },
    {
      id: 'meditations',
      title: 'Méditations Guidées',
      icon: <Sparkle className="w-5 h-5" />,
      description: "Méditations sacrées inspirées des traditions africaines pour l'éveil spirituel",
      introduction: "Les méditations africaines traditionnelles ne sont pas seulement assises silencieuses. Elles intègrent le mouvement (danse), le son (tambours, chants), la respiration (souffle de vie) et la visualisation pour atteindre des états de conscience élevés et la connexion avec le divin.",
      keyElements: [
        "Méditation de l'arbre (enracinement et expansion)",
        "Respiration du serpent (activation de la kundalini africaine)",
        "Voyage chamanique aux tambours pour rencontrer les guides",
        "Méditation des quatre éléments (Terre, Eau, Feu, Air)",
        "Chants sacrés et mantras en langues africaines",
        "Visualisation du fleuve de lumière (purification)",
        "Danse méditative extatique pour libération émotionnelle"
      ],
      detailedGuide: "La méditation de l'Arbre est fondamentale : debout, pieds écartés largeur des hanches, visualisez des racines sortant de vos pieds et plongeant profondément dans la Terre-Mère. Sentez sa force vitale remonter par vos racines, remplir vos jambes, votre bassin, votre torse. Imaginez vos bras comme des branches s'élevant vers le Ciel-Père. Vous êtes le pont entre Terre et Ciel. Cette méditation ancre et élève simultanément. La respiration du serpent : inspirez par le nez en gonflant le ventre (4 temps), retenez (4 temps), expirez par la bouche en contractant le ventre (4 temps), retenez poumons vides (4 temps). Visualisez une énergie serpentine rouge à la base de votre colonne qui monte vertèbre par vertèbre jusqu'au sommet du crâne. Cette pratique éveille votre force vitale dormante. Le voyage au tambour : allongé confortablement, écoutez un rythme de tambour constant (ou audio). Visualisez-vous descendant dans la Terre par un tunnel lumineux. Vous arrivez dans un monde intérieur où vous rencontrez vos animaux totems, guides ancestraux ou divinités. Demandez-leur un message ou une guérison. Quand le rythme change, revenez. Les chants sacrés (comme 'Kumbaya', 'Ashe Ashe' ou chants en Yoruba) élèvent la vibration et ouvrent les canaux spirituels.",
      benefits: [
        "Enracinement profond dans votre corps et la Terre",
        "Activation de votre force vitale (Kundalini/Ashé)",
        "Connexion directe avec vos guides spirituels et divinités",
        "Libération des blocages émotionnels et énergétiques",
        "États de conscience élargis et visions spirituelles",
        "Paix intérieure profonde et centrage"
      ],
      practicalSteps: [
        "Méditation quotidienne : 'L'Arbre' pendant 10 minutes chaque matin",
        "Pratiquez la respiration du serpent : 9 cycles avant les rituels pour vous préparer",
        "Écoutez un audio de tambours chamaniques 1x/semaine pour voyage intérieur",
        "Apprenez 1 chant sacré africain et chantez-le quotidiennement (ex: 'Ashe Ashe Ashe O')",
        "Dansez librement sur des rythmes africains pour libérer les émotions bloquées",
        "Méditez avec les quatre éléments : allumez une bougie (Feu), ayez de l'eau (Eau), touchez la terre (Terre), sentez l'air",
        "Tenez un journal de vos visions et messages reçus pendant les méditations"
      ],
      warnings: [
        "Si vous ressentez des vertiges pendant la respiration du serpent, ralentissez le rythme",
        "Les voyages au tambour peuvent révéler des vérités inconfortables : soyez prêt",
        "Ne pratiquez pas de méditations profondes en état de vulnérabilité psychologique sans accompagnement",
        "Certaines visions sont symboliques, pas littérales : apprenez le langage des symboles"
      ],
      affirmation: "Je suis l'Arbre sacré : mes racines plongent dans la sagesse de la Terre, mes branches touchent la lumière du Ciel. Je suis connecté(e) au Tout.",
      materials: [
        "Tapis ou natte naturelle",
        "Audio de tambours chamaniques (YouTube ou applications)",
        "Encens ou sauge pour purifier l'espace",
        "Bougie (élément Feu)",
        "Bol d'eau (élément Eau)",
        "Pierre ou cristal (élément Terre)",
        "Vêtements confortables, de préférence blancs ou naturels"
      ],
      bestTiming: "Tôt le matin au lever du soleil (énergie montante) ou tard le soir (connexion aux mondes invisibles). Les périodes de pleine lune amplifient les visions"
    }
  ];

  const activePractice = spiritualPractices.find(practice => practice.id === activeTab);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-amber-100"
      >
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Spiritualité Africaine
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Reconnectez-vous aux pratiques spirituelles ancestrales et rituels sacrés africains. 
              Découvrez la sagesse millénaire transmise de génération en génération.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation par onglets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {spiritualPractices.map((practice) => (
              <motion.button
                key={practice.id}
                layoutId={activeTab === practice.id ? "activeTab" : undefined}
                onClick={() => setActiveTab(practice.id)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  activeTab === practice.id
                    ? 'bg-gradient-to-br from-amber-600 to-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2">
                  {practice.icon}
                  <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                    {practice.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Contenu de l'onglet actif */}
        <AnimatePresence mode="wait">
          {activePractice && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
            >
              {/* En-tête de la pratique */}
              <div className="mb-8 pb-6 border-b border-amber-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    {activePractice.icon}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                    {activePractice.title}
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4">
                  {activePractice.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {activePractice.introduction}
                </p>
              </div>

              {/* Éléments clés */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  Éléments Clés de la Pratique
                </h3>
                <div className="grid gap-3">
                  {activePractice.keyElements.map((element, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{element}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Guide détaillé */}
              <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-700 mb-4">
                  📖 Guide Détaillé et Compréhension Profonde
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {activePractice.detailedGuide}
                </p>
              </div>

              {/* Matériaux nécessaires (si applicable) */}
              {activePractice.materials && (
                <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-2 border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
                    🛠️ Matériaux Nécessaires
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activePractice.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full" />
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meilleur timing (si applicable) */}
              {activePractice.bestTiming && (
                <div className="mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-lg font-bold text-indigo-700 mb-2">
                    ⏰ Meilleur Moment pour Pratiquer
                  </h3>
                  <p className="text-gray-700">{activePractice.bestTiming}</p>
                </div>
              )}

              {/* Bénéfices */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
                  ✨ Bénéfices de cette Pratique
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activePractice.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border-2 border-amber-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <p className="text-gray-700 leading-relaxed">🔥 {benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Étapes pratiques */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
                  🎯 Étapes Pratiques à Suivre
                </h3>
                <div className="space-y-3">
                  {activePractice.practicalSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Avertissements importants */}
              <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-4">
                  ⚠️ Avertissements Importants
                </h3>
                <div className="space-y-3">
                  {activePractice.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium">{warning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affirmation */}
              <div className="p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-xl border-2 border-amber-300 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
                  🔥 Affirmation Sacrée
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-semibold italic">
                  "{activePractice.affirmation}"
                </p>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => alert('Fonction de commande à implémenter avec votre backend')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  🔥 Obtenir un Accompagnement Personnalisé
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Guidance spirituelle adaptée à votre situation unique
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA flottant */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => alert('Fonction de commande globale à implémenter')}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          <Flame className="w-5 h-5" />
          <span className="hidden sm:inline">Guidance Complète</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SpiritualiteAfricainePage;

