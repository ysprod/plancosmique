'use client';
import { api } from '@/lib/api/client';
import type { UserData } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award, Calculator, Calendar, Compass, Drama, Hash,
  Heart, Loader2, Sparkles, Target, User
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface NumerologyResult {
  lifePathNumber: number;
  expressionNumber: number;
  soulNumber: number;
  personalityNumber: number;
  birthNumber: number;
  interpretation: string;
}

interface SacredNumber {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  introduction: string;
  howToCalculate: string;
  meaningByNumber: { [key: number]: string };
  keyInsights: string[];
  practicalApplication: string;
  affirmation: string;
}

export default function NumerologiePage() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<UserData>('/users/me')
      .then(res => {
        const user = res.data;
        setFormData(prev => ({
          firstName: user.prenoms || user.firstName || '',
          lastName: user.nom || user.lastName || '',
          birthDate: user.dateNaissance || user.birthDate || '',
        }));
      })
      .catch(() => { });
  }, []);

  // Données des 5 nombres sacrés
  const sacredNumbers: SacredNumber[] = [
    {
      id: 'birth',
      title: 'Nombre de Naissance',
      icon: <Award className="w-5 h-5" />,
      description: "Révèle votre personnalité profonde et vos talents innés",
      introduction: "Le Nombre de Naissance est calculé à partir de votre jour de naissance. Il représente vos talents naturels, vos dons innés et les qualités que vous avez apportées dans cette incarnation.",
      howToCalculate: "Additionnez les chiffres de votre jour de naissance. Par exemple, si vous êtes né(e) le 25, additionnez 2 + 5 = 7. Votre nombre de naissance est 7.",
      meaningByNumber: {
        1: "Leader naturel, pionnier, indépendant. Vous possédez un esprit d'initiative exceptionnel et la capacité à ouvrir de nouvelles voies.",
        2: "Diplomate sensible, coopératif, intuitif. Vous excellez dans les relations humaines et la médiation. Votre force est dans l'harmonie.",
        3: "Créatif expressif, communicateur né, optimiste. Vous avez un don pour les arts, la parole et inspirer les autres avec votre joie de vivre.",
        4: "Bâtisseur pragmatique, organisé, fiable. Vous créez des structures solides et durables. Votre discipline est votre super-pouvoir.",
        5: "Esprit libre aventureux, adaptable, curieux. Vous êtes attiré par le changement, les voyages et l'exploration de nouvelles expériences.",
        6: "Âme nourricière, responsable, harmonieux. Vous êtes guidé par l'amour, la famille et le service aux autres. Votre cœur est votre boussole.",
        7: "Chercheur spirituel, analytique, sage. Vous êtes en quête de vérité profonde, de connaissance et de sagesse intérieure.",
        8: "Manifesteur puissant, ambitieux, stratège. Vous avez un don naturel pour la réussite matérielle, le leadership et l'abondance.",
        9: "Humaniste compassionnel, altruiste, visionnaire. Vous œuvrez pour le bien collectif et l'élévation de l'humanité entière.",
        11: "Maître illuminateur (nombre maître), canal spirituel, intuitif. Vous possédez une connexion exceptionnelle avec les dimensions supérieures.",
        22: "Maître bâtisseur (nombre maître), visionnaire pragmatique. Vous avez la capacité de matérialiser de grandes visions pour l'humanité.",
        33: "Maître guérisseur (nombre maître), amour universel. Vous incarnez la compassion la plus élevée et le sacrifice désintéressé."
      },
      keyInsights: [
        "Représente vos talents innés présents dès la naissance",
        "Indique vos forces naturelles et facilités dans la vie",
        "Révèle les dons que votre âme a choisi d'apporter",
        "Guide vers les domaines où vous excellez naturellement",
        "Montre comment vous êtes perçu spontanément par les autres"
      ],
      practicalApplication: "Utilisez votre nombre de naissance pour identifier vos talents naturels. Si vous êtes un 3, exploitez votre créativité dans votre carrière. Si vous êtes un 8, lancez-vous dans l'entrepreneuriat ou la finance. Alignez votre vie professionnelle avec vos dons innés pour un succès naturel et une satisfaction profonde.",
      affirmation: "J'honore mes talents innés et je les exprime pleinement dans ma vie. Je suis exactement qui je dois être."
    },
    {
      id: 'expression',
      title: 'Nombre d\'Expression',
      icon: <Target className="w-5 h-5" />,
      description: "Dévoile vos aspirations et votre potentiel créateur",
      introduction: "Le Nombre d'Expression (ou Nombre de Destinée) est calculé à partir de votre nom complet de naissance. Il révèle votre mission de vie, vos aspirations profondes et le potentiel que vous êtes destiné à manifester.",
      howToCalculate: "Convertissez chaque lettre de votre nom complet en nombre (A=1, B=2... Z=26), puis additionnez et réduisez. Par exemple, MARIE = 4+1+9+9+5 = 28 = 2+8 = 10 = 1+0 = 1.",
      meaningByNumber: {
        1: "Destiné à être un leader et innovateur. Votre mission est d'ouvrir de nouvelles voies, d'inspirer l'indépendance et d'initier le changement.",
        2: "Appelé à être un médiateur et harmoniseur. Votre destinée est de créer des ponts entre les personnes et de favoriser la coopération.",
        3: "Né pour être un créateur et communicateur. Votre mission est d'exprimer la beauté, la joie et d'inspirer les autres par vos mots ou vos créations.",
        4: "Destiné à être un bâtisseur et organisateur. Votre rôle est de créer des structures solides, stables et durables pour les générations futures.",
        5: "Appelé à être un explorateur et catalyseur de changement. Votre mission est d'apporter la liberté, l'aventure et la transformation.",
        6: "Né pour être un guérisseur et protecteur. Votre destinée est de servir, nourrir et créer l'harmonie dans votre communauté.",
        7: "Destiné à être un sage et enseignant spirituel. Votre mission est de chercher la vérité profonde et de partager la sagesse.",
        8: "Appelé à être un manifesteur et leader matériel. Votre rôle est de créer l'abondance et de gérer le pouvoir avec intégrité.",
        9: "Né pour être un humanitaire et inspirateur global. Votre destinée est d'œuvrer pour l'élévation collective de l'humanité.",
        11: "Destiné à être un illuminateur spirituel (maître). Votre mission est d'élever la conscience collective par votre lumière intérieure.",
        22: "Appelé à être un maître bâtisseur de rêves collectifs. Votre rôle est de matérialiser des visions qui transforment le monde.",
        33: "Né pour être un maître guérisseur universel. Votre destinée est d'incarner l'amour inconditionnel et de guérir à grande échelle."
      },
      keyInsights: [
        "Représente votre mission de vie et votre destinée",
        "Indique le potentiel que vous êtes venu manifester",
        "Révèle vos aspirations profondes et votre raison d'être",
        "Guide vers la carrière et le style de vie alignés",
        "Montre comment vous pouvez servir le monde de façon unique"
      ],
      practicalApplication: "Alignez votre carrière avec votre nombre d'expression. Si vous êtes un 6, envisagez les métiers du soin, de l'éducation ou du conseil. Si vous êtes un 11, explorez l'enseignement spirituel, la thérapie ou l'art inspirant. Votre expression est votre contribution unique au monde.",
      affirmation: "Je vis ma destinée pleinement. J'exprime mon potentiel unique et je contribue au monde de façon significative."
    },
    {
      id: 'lifepath',
      title: 'Chemin de Vie',
      icon: <Compass className="w-5 h-5" />,
      description: "Éclaire votre parcours et votre mission d'âme",
      introduction: "Le Chemin de Vie est LE nombre le plus important en numérologie. Calculé à partir de votre date de naissance complète, il révèle votre parcours de vie, les leçons à apprendre et la direction spirituelle de votre existence.",
      howToCalculate: "Additionnez tous les chiffres de votre date de naissance. Par exemple, né(e) le 15/07/1990 : 1+5+0+7+1+9+9+0 = 32 = 3+2 = 5. Votre chemin de vie est 5.",
      meaningByNumber: {
        1: "Chemin du Leader. Vous êtes venu apprendre l'autonomie, le courage et l'affirmation de soi. Votre leçon : développer la confiance en vous.",
        2: "Chemin du Diplomate. Vous apprenez la patience, la coopération et l'équilibre relationnel. Votre leçon : trouver l'harmonie dans la dualité.",
        3: "Chemin du Créateur. Vous explorez l'expression de soi, la communication et la joie créative. Votre leçon : libérer votre voix authentique.",
        4: "Chemin du Bâtisseur. Vous apprenez la discipline, le travail et la construction patiente. Votre leçon : créer des fondations solides.",
        5: "Chemin de l'Aventurier. Vous explorez la liberté, le changement et l'adaptabilité. Votre leçon : embrasser l'inconnu avec confiance.",
        6: "Chemin du Guérisseur. Vous apprenez la responsabilité, l'amour et le service. Votre leçon : équilibrer donner et recevoir.",
        7: "Chemin du Sage. Vous explorez la spiritualité, la connaissance et l'introspection. Votre leçon : faire confiance à votre sagesse intérieure.",
        8: "Chemin du Manifesteur. Vous apprenez le pouvoir, l'abondance et l'intégrité. Votre leçon : utiliser le pouvoir avec sagesse.",
        9: "Chemin de l'Humanitaire. Vous explorez la compassion, le lâcher-prise et le service global. Votre leçon : aimer sans conditions.",
        11: "Chemin du Maître Spirituel. Vous êtes venu élever la conscience collective. Votre leçon : incarner votre lumière sans ego.",
        22: "Chemin du Maître Architecte. Vous matérialisez des visions collectives. Votre leçon : ancrer le spirituel dans le matériel.",
        33: "Chemin du Maître Guérisseur. Vous incarnez l'amour universel. Votre leçon : servir l'humanité par votre présence aimante."
      },
      keyInsights: [
        "Nombre le plus important de votre profil numérologique",
        "Représente votre mission d'âme et votre parcours spirituel",
        "Indique les leçons majeures à intégrer dans cette vie",
        "Révèle les défis récurrents et leur signification profonde",
        "Guide vers votre épanouissement et accomplissement ultime"
      ],
      practicalApplication: "Comprenez que les défis de votre chemin de vie ne sont pas des obstacles mais des initiations. Si vous êtes en chemin 4, acceptez que la discipline soit votre maître. Si vous êtes en chemin 9, pratiquez le lâcher-prise et le pardon. Vos difficultés récurrentes sont vos plus grands enseignants.",
      affirmation: "J'accepte mon chemin de vie avec gratitude. Chaque défi est une opportunité de croissance. Je suis exactement où je dois être."
    },
    {
      id: 'personality',
      title: 'Nombre de Personnalité',
      icon: <Drama className="w-5 h-5" />,
      description: "Analyse votre image sociale et votre rayonnement",
      introduction: "Le Nombre de Personnalité est calculé à partir des consonnes de votre nom. Il révèle comment vous êtes perçu par les autres, votre masque social et l'énergie que vous projetez dans le monde extérieur.",
      howToCalculate: "Convertissez seulement les CONSONNES de votre nom en nombres, additionnez et réduisez. Par exemple, MARIE (M=4, R=9) = 4+9 = 13 = 1+3 = 4.",
      meaningByNumber: {
        1: "Vous êtes perçu comme confiant, indépendant et charismatique. Les autres vous voient comme un leader naturel qui dégage de l'autorité.",
        2: "Vous apparaissez comme doux, diplomate et accessible. Les gens vous trouvent rassurant, empathique et facile d'approche.",
        3: "Vous rayonnez la joie, la créativité et l'enthousiasme. On vous perçoit comme quelqu'un de lumineux, expressif et inspirant.",
        4: "Vous dégagez fiabilité, sérieux et pragmatisme. Les autres vous voient comme quelqu'un de stable, organisé et digne de confiance.",
        5: "Vous apparaissez comme dynamique, libre et intrigant. On vous perçoit comme quelqu'un d'aventureux, charismatique et imprévisible.",
        6: "Vous rayonnez chaleur, responsabilité et bienveillance. Les gens vous trouvent nurturant, harmonieux et profondément attentionné.",
        7: "Vous dégagez mystère, profondeur et sagesse. On vous perçoit comme quelqu'un d'intellectuel, spirituel et légèrement distant.",
        8: "Vous apparaissez comme puissant, ambitieux et imposant. Les autres vous voient comme quelqu'un d'autoritaire, compétent et prospère.",
        9: "Vous rayonnez compassion, altruisme et idéalisme. On vous perçoit comme quelqu'un de généreux, inspirant et universellement aimant.",
        11: "Vous dégagez une aura spirituelle et inspirante. Les gens sentent votre sensibilité élevée et votre connexion aux plans subtils.",
        22: "Vous apparaissez comme visionnaire et capable de grandes réalisations. On ressent votre potentiel exceptionnel et votre solidité.",
        33: "Vous rayonnez un amour et une présence quasi divins. Les autres se sentent guéris et élevés en votre présence."
      },
      keyInsights: [
        "Représente votre image sociale et première impression",
        "Indique comment les autres vous perçoivent spontanément",
        "Révèle votre 'masque' ou persona extérieure",
        "Guide pour comprendre vos interactions sociales",
        "Montre l'énergie que vous projetez dans le monde"
      ],
      practicalApplication: "Utilisez votre nombre de personnalité pour ajuster votre communication. Si vous êtes un 7 (perçu comme distant), faites un effort conscient pour être plus accessible si vous le souhaitez. Si vous êtes un 3 (perçu comme léger), montrez aussi votre profondeur. Votre personnalité n'est pas qui vous êtes, mais comment vous apparaissez.",
      affirmation: "J'accepte mon image sociale tout en restant authentique. Je montre au monde ma vraie nature avec confiance."
    },
    {
      id: 'soul',
      title: 'Nombre de l\'Âme',
      icon: <Heart className="w-5 h-5" />,
      description: "Révèle vos désirs les plus profonds et authentiques",
      introduction: "Le Nombre de l'Âme (ou Nombre du Désir) est calculé à partir des voyelles de votre nom. Il représente vos motivations profondes, vos désirs intérieurs et ce qui nourrit vraiment votre âme.",
      howToCalculate: "Convertissez seulement les VOYELLES (A, E, I, O, U, Y) de votre nom en nombres, additionnez et réduisez. Par exemple, MARIE (A=1, I=9, E=5) = 1+9+5 = 15 = 1+5 = 6.",
      meaningByNumber: {
        1: "Votre âme désire l'indépendance, l'innovation et le leadership. Vous avez besoin d'être autonome et de créer votre propre chemin.",
        2: "Votre âme aspire à l'harmonie, la paix et la connexion intime. Vous avez besoin de relations profondes et d'équilibre émotionnel.",
        3: "Votre âme désire l'expression créative, la joie et la communication. Vous avez besoin de créer, de vous exprimer et d'inspirer.",
        4: "Votre âme aspire à la stabilité, la sécurité et l'ordre. Vous avez besoin de structures solides et de sens pratique dans votre vie.",
        5: "Votre âme désire la liberté, l'aventure et la variété. Vous avez besoin de changement, d'exploration et d'expériences nouvelles.",
        6: "Votre âme aspire à l'amour, la famille et le service. Vous avez besoin de nourrir, protéger et créer l'harmonie autour de vous.",
        7: "Votre âme désire la connaissance, la vérité et la spiritualité. Vous avez besoin de comprendre les mystères profonds de l'existence.",
        8: "Votre âme aspire à l'abondance, le pouvoir et la réussite matérielle. Vous avez besoin de manifester et de gérer avec maîtrise.",
        9: "Votre âme désire servir l'humanité, aimer universellement et inspirer. Vous avez besoin de contribuer au bien collectif.",
        11: "Votre âme aspire à l'illumination spirituelle et à élever la conscience. Vous avez un besoin profond de connexion aux dimensions supérieures.",
        22: "Votre âme désire matérialiser de grandes visions pour le collectif. Vous avez besoin de construire quelque chose de significatif et durable.",
        33: "Votre âme aspire à guérir et aimer inconditionnellement. Vous avez un besoin profond de servir l'humanité avec compassion."
      },
      keyInsights: [
        "Représente vos motivations profondes et désirs authentiques",
        "Indique ce qui nourrit vraiment votre âme",
        "Révèle vos besoins émotionnels et spirituels fondamentaux",
        "Guide vers ce qui vous apporte satisfaction profonde",
        "Montre ce qui vous fait vous sentir vivant et aligné"
      ],
      practicalApplication: "Honorez votre nombre de l'âme dans vos choix de vie. Si vous êtes un 5, ne vous enfermez pas dans une routine étouffante. Si vous êtes un 6, créez un foyer aimant et servez votre communauté. Négliger votre nombre de l'âme crée un sentiment de vide existentiel. Le nourrir crée la plénitude.",
      affirmation: "J'écoute les désirs profonds de mon âme. Je crée une vie qui nourrit mon essence véritable. Je m'honore pleinement."
    }
  ];

  // Fonctions de calcul numérologique
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
  };

  const letterToNumber = (letter: string): number => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.indexOf(letter.toUpperCase()) + 1;
  };

  const calculateNumerology = (name: string, date: string): NumerologyResult => {
    // Chemin de vie
    const dateDigits = date.replace(/-/g, '').split('').map(Number);
    const lifePathSum = dateDigits.reduce((acc, digit) => acc + digit, 0);
    const lifePathNumber = reduceToSingleDigit(lifePathSum);

    // Nombre d'expression (nom complet)
    const fullName = name.replace(/\s/g, '').toUpperCase();
    const expressionSum = fullName.split('').reduce((acc, letter) => {
      return acc + letterToNumber(letter);
    }, 0);
    const expressionNumber = reduceToSingleDigit(expressionSum);

    // Nombre de l'âme (voyelles)
    const vowels = 'AEIOUY';
    const soulSum = fullName.split('').reduce((acc, letter) => {
      return vowels.includes(letter) ? acc + letterToNumber(letter) : acc;
    }, 0);
    const soulNumber = reduceToSingleDigit(soulSum);

    // Nombre de personnalité (consonnes)
    const personalitySum = fullName.split('').reduce((acc, letter) => {
      return !vowels.includes(letter) ? acc + letterToNumber(letter) : acc;
    }, 0);
    const personalityNumber = reduceToSingleDigit(personalitySum);

    // Nombre de naissance (jour de naissance)
    const day = parseInt(date.split('-')[2]);
    const birthNumber = reduceToSingleDigit(day);

    const interpretations: { [key: number]: string } = {
      1: "Leader naturel, indépendant et pionnier",
      2: "Diplomate sensible, coopératif et harmonieux",
      3: "Créatif expressif, communicateur inspirant",
      4: "Bâtisseur pragmatique, organisé et fiable",
      5: "Esprit libre aventureux, adaptable et curieux",
      6: "Âme nourricière, responsable et aimante",
      7: "Chercheur spirituel, analytique et sage",
      8: "Manifesteur puissant, ambitieux et prospère",
      9: "Humaniste compassionnel, altruiste et visionnaire",
      11: "Maître illuminateur, intuitif et spirituel",
      22: "Maître bâtisseur, visionnaire pragmatique",
      33: "Maître guérisseur, amour universel incarné"
    };

    return {
      lifePathNumber,
      expressionNumber,
      soulNumber,
      personalityNumber,
      birthNumber,
      interpretation: interpretations[lifePathNumber] || "Votre chemin unique révèle des potentiels extraordinaires."
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.birthDate) {
        throw new Error('Veuillez remplir tous les champs');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const fullName = `${formData.firstName} ${formData.lastName}`;
      const numerologyData = calculateNumerology(fullName, formData.birthDate);

      setResult(numerologyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const activeSacredNumber = sacredNumbers.find(num => num.id === activeTab);
  return (

    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
              <Hash className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
            NUMÉROLOGIE
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les secrets cachés dans vos nombres personnels et votre destinée chiffrée
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Onglet Calculateur */}
            <motion.button
              layoutId={activeTab === 'calculator' ? "activeTab" : undefined}
              onClick={() => setActiveTab('calculator')}
              className={`relative p-4 rounded-xl transition-all duration-300 ${activeTab === 'calculator'
                ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center gap-2">
                <Calculator className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                  Calculateur
                </span>
              </div>
            </motion.button>

            {/* Onglets Nombres Sacrés */}
            {sacredNumbers.map((number) => (
              <motion.button
                key={number.id}
                layoutId={activeTab === number.id ? "activeTab" : undefined}
                onClick={() => setActiveTab(number.id)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${activeTab === number.id
                  ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2">
                  {number.icon}
                  <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                    {number.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Contenu de l'onglet actif */}
        <AnimatePresence mode="wait">
          {activeTab === 'calculator' ? (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Formulaire */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Calculez votre profil numérologique</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Nom
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4" />
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                        required
                      />
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Calcul en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Découvrir mon profil
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Résultats */}
                <div>
                  {result ? (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Votre Profil Numérologique</h2>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
                          <div className="flex items-center gap-3 mb-2">
                            <Compass className="w-5 h-5 text-amber-700" />
                            <span className="font-semibold text-gray-700">Chemin de Vie</span>
                          </div>
                          <div className="text-4xl font-bold text-amber-700">
                            {result.lifePathNumber}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{result.interpretation}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-4 h-4 text-gray-700" />
                              <span className="font-semibold text-gray-700 text-sm">Naissance</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{result.birthNumber}</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-gray-700" />
                              <span className="font-semibold text-gray-700 text-sm">Expression</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{result.expressionNumber}</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-gray-700" />
                              <span className="font-semibold text-gray-700 text-sm">Âme</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{result.soulNumber}</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Drama className="w-4 h-4 text-gray-700" />
                              <span className="font-semibold text-gray-700 text-sm">Personnalité</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{result.personalityNumber}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col items-center justify-center h-full min-h-[400px]">
                      <Hash className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-center">
                        Remplissez le formulaire pour découvrir<br />votre profil numérologique complet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : activeSacredNumber && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
            >
              {/* En-tête du nombre sacré */}
              <div className="mb-8 pb-6 border-b border-amber-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    {activeSacredNumber.icon}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                    {activeSacredNumber.title}
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4">
                  {activeSacredNumber.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {activeSacredNumber.introduction}
                </p>
              </div>

              {/* Comment calculer */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Comment le Calculer
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activeSacredNumber.howToCalculate}
                </p>
              </div>

              {/* Significations par nombre */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
                  📖 Significations des Nombres
                </h3>
                <div className="space-y-4">
                  {Object.entries(activeSacredNumber.meaningByNumber).map(([num, meaning]) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: parseInt(num) * 0.05 }}
                      className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-xl font-bold">{num}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-2">{meaning}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Insights clés */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
                  ✨ Points Clés à Retenir
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeSacredNumber.keyInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border-2 border-amber-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <p className="text-gray-700 leading-relaxed">🔢 {insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Application pratique */}
              <div className="mb-8 p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200">
                <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-3">
                  🎯 Application Pratique
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {activeSacredNumber.practicalApplication}
                </p>
              </div>

              {/* Affirmation */}
              <div className="p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-xl border-2 border-amber-300 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
                  💫 Affirmation Numérologique
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-semibold italic">
                  "{activeSacredNumber.affirmation}"
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
                  onClick={() => setActiveTab('calculator')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  🔢 Calculer Mon Nombre {activeSacredNumber.title}
                </button>
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
          onClick={() => setActiveTab('calculator')}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          <span className="hidden sm:inline">Calculer</span>
        </button>
      </motion.div>
    </div>

  );
}
