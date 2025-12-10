/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Baby,
  CheckCircle,
  Heart,
  Infinity,
  Lightbulb,
  Shield,
  Sparkles, Star,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type RelationTypeId = 'compatibilite' | 'synastrie' | 'karmique' | 'enfant' | 'evolution';

interface Tab {
  id: RelationTypeId;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}

interface RelationContent {
  title: string;
  description: string;
  whatYouDiscover: string[];
  howItWorks: string[];
  benefits: string[];
  idealFor: string[];
  testimonial: {
    text: string;
    author: string;
    relation: string;
  };
  pricing: string;
  duration: string;
}

// ============================================================================
// DONNÉES DE CONTENU DÉTAILLÉ
// ============================================================================

const getRelationContent = (relationId: RelationTypeId): RelationContent => {
  const contents: { [key: string]: RelationContent } = {
    compatibilite: {
      title: "Affinités & Compatibilités",
      description: "Découvrez la vérité énergétique de vos relations à travers une analyse astrologique approfondie. Que ce soit en amour, en amitié ou en famille, comprenez les dynamiques invisibles qui vous lient ou vous séparent. Cette étude révèle les affinités naturelles, les zones de friction et les chemins d'harmonie entre deux âmes.",
      whatYouDiscover: [
        "Votre compatibilité amoureuse globale (score détaillé)",
        "Les forces naturelles de votre connexion",
        "Les défis à anticiper et comment les transformer",
        "Votre langage d'amour astrologique respectif",
        "Les cycles favorables pour votre relation",
        "Conseils concrets pour renforcer l'harmonie"
      ],
      howItWorks: [
        "Analyse des signes solaires, lunaires et ascendants",
        "Étude des positions de Vénus (amour) et Mars (passion)",
        "Comparaison des éléments (Feu, Terre, Air, Eau)",
        "Évaluation des maisons relationnelles (5, 7, 8)",
        "Calcul des aspects planétaires entre vos thèmes",
        "Interprétation globale et recommandations personnalisées"
      ],
      benefits: [
        "Compréhension profonde des dynamiques relationnelles",
        "Anticipation et résolution des conflits",
        "Renforcement de la connexion émotionnelle",
        "Clarté sur la viabilité long-terme de la relation",
        "Outils concrets pour améliorer la communication",
        "Paix intérieure et confiance dans vos choix affectifs"
      ],
      idealFor: [
        "Couples en début de relation cherchant à comprendre leur potentiel",
        "Partenaires en crise souhaitant retrouver l'harmonie",
        "Célibataires voulant comprendre leurs schémas relationnels",
        "Amis désirant approfondir leur connexion",
        "Familles cherchant à améliorer leurs dynamiques"
      ],
      testimonial: {
        text: "L'analyse de compatibilité a sauvé notre couple. Nous comprenons enfin pourquoi nous nous déclenchons mutuellement et comment transformer nos différences en forces. Notre relation n'a jamais été aussi épanouie.",
        author: "Sophie & Marc",
        relation: "En couple depuis 5 ans"
      },
      pricing: "97€ pour une analyse complète",
      duration: "Rapport livré sous 48-72h"
    },
    synastrie: {
      title: "Synastrie de Couple",
      description: "Plongez dans l'intimité cosmique de votre union grâce à la synastrie, l'art ancien de superposer deux thèmes astraux. Cette analyse révèle comment vos planètes interagissent, créant une danse énergétique unique. Découvrez les liens d'âme, les contrats karmiques et le potentiel d'évolution de votre couple à travers les dimensions astrologiques.",
      whatYouDiscover: [
        "La carte énergétique complète de votre couple",
        "Les aspects planétaires majeurs entre vos thèmes",
        "Vos nœuds lunaires partagés (karma relationnel)",
        "L'attraction magnétique et la chimie astrologique",
        "Les zones d'évolution spirituelle commune",
        "Le potentiel d'engagement et de durabilité",
        "Votre mission de couple et contribution au monde"
      ],
      howItWorks: [
        "Superposition précise de vos deux thèmes astraux",
        "Analyse des conjonctions, oppositions et trigones",
        "Étude du composite (thème du couple lui-même)",
        "Examen des points de Vertex (rencontres du destin)",
        "Interprétation des parts arabes relationnelles",
        "Lecture des transits actuels affectant le couple"
      ],
      benefits: [
        "Vision transcendante de votre union",
        "Compréhension des leçons karmiques à deux",
        "Acceptation profonde de l'autre dans sa totalité",
        "Guidance pour les moments de crise",
        "Clarté sur le sens spirituel de votre rencontre",
        "Roadmap pour une relation consciente et évolutive"
      ],
      idealFor: [
        "Couples spirituels cherchant un sens plus profond",
        "Partenaires vivant une connexion inexplicable",
        "Unions karmiques nécessitant compréhension",
        "Couples en transformation spirituelle",
        "Âmes sœurs voulant honorer leur contrat sacré"
      ],
      testimonial: {
        text: "La synastrie nous a révélé que notre rencontre n'était pas le fruit du hasard. Nous avons compris notre mission commune et cela a donné un sens sacré à notre union. Nous ne sommes plus un couple, nous sommes une âme à deux corps.",
        author: "Léa & Thomas",
        relation: "Couple spirituel depuis 3 ans"
      },
      pricing: "147€ pour une synastrie complète",
      duration: "Rapport détaillé sous 5-7 jours"
    },
    karmique: {
      title: "Relations Karmiques",
      description: "Découvrez la nature véritable de votre connexion : âme sœur, flamme jumelle ou contrat karmique ? Cette analyse explore les dimensions invisibles de vos liens à travers les incarnations. Comprenez pourquoi certaines personnes entrent dans votre vie, les leçons que vous devez apprendre ensemble et comment transcender les schémas répétitifs pour évoluer spirituellement.",
      whatYouDiscover: [
        "Le type exact de votre connexion karmique",
        "Vos vies antérieures partagées (régression astrologique)",
        "Les dettes et contrats d'âme en cours",
        "Les leçons karmiques à intégrer dans cette vie",
        "Les patterns répétitifs à briser",
        "Le chemin de libération et de transcendance",
        "Si la relation est destinée à durer ou à évoluer"
      ],
      howItWorks: [
        "Analyse approfondie des nœuds lunaires (Nord et Sud)",
        "Étude de l'axe des nœuds dans les maisons",
        "Examen de Saturne (karma) et Pluton (transformation)",
        "Lecture des aspects karmiques (quinconce, carré, opposition)",
        "Interprétation des parts de fortune et d'esprit",
        "Guidance channelée pour la libération karmique"
      ],
      benefits: [
        "Libération des schémas toxiques et répétitifs",
        "Compréhension du 'pourquoi' de la rencontre",
        "Paix avec les séparations ou difficultés",
        "Clarté sur le chemin d'évolution à deux",
        "Outils pour transmuter le karma en dharma",
        "Sérénité face au destin relationnel"
      ],
      idealFor: [
        "Personnes vivant une connexion intense et inexplicable",
        "Couples traversant des cycles de séparation/réunion",
        "Relations toxiques dont on ne peut pas se défaire",
        "Chercheurs spirituels en quête de sens",
        "Âmes blessées cherchant la guérison karmique"
      ],
      testimonial: {
        text: "J'ai enfin compris pourquoi je n'arrivais pas à quitter cette relation toxique. C'était un contrat karmique de guérison. Une fois la leçon intégrée, je me suis libérée en paix. Cette analyse m'a sauvée.",
        author: "Isabelle",
        relation: "En processus de guérison karmique"
      },
      pricing: "197€ pour une analyse karmique profonde",
      duration: "Étude intensive livrée sous 7-10 jours"
    },
    enfant: {
      title: "Thème Astral de l'Enfant",
      description: "Offrez à votre enfant le plus beau des cadeaux : la compréhension de son âme unique. Cette analyse révèle ses talents innés, sa mission de vie, ses besoins émotionnels profonds et son mode d'apprentissage naturel. Découvrez comment l'accompagner avec sagesse dans son incarnation, respecter son essence et nourrir son potentiel exceptionnel.",
      whatYouDiscover: [
        "La personnalité profonde et l'essence de son âme",
        "Ses talents naturels et dons à cultiver",
        "Ses besoins émotionnels et affectifs prioritaires",
        "Son mode d'apprentissage idéal (visuel, kinesthésique, auditif)",
        "Ses défis karmiques et leçons de vie",
        "Sa mission d'âme et contribution au monde",
        "Comment l'accompagner selon son thème unique",
        "Les périodes clés de son développement"
      ],
      howItWorks: [
        "Analyse complète du thème natal de l'enfant",
        "Étude approfondie de la Lune (besoins émotionnels)",
        "Interprétation de Mercure (intellect et communication)",
        "Examen du Soleil (identité et rayonnement)",
        "Lecture des nœuds lunaires (mission d'âme)",
        "Recommandations éducatives personnalisées"
      ],
      benefits: [
        "Parentalité consciente et respectueuse de l'enfant",
        "Réduction des conflits et incompréhensions",
        "Soutien optimal du développement de l'enfant",
        "Renforcement du lien parent-enfant",
        "Guidance éducative sur-mesure",
        "Confiance dans le chemin unique de l'enfant"
      ],
      idealFor: [
        "Parents de nouveau-nés cherchant à comprendre leur bébé",
        "Familles avec enfants en difficulté scolaire ou émotionnelle",
        "Parents adoptifs désirant connaître l'âme de leur enfant",
        "Éducateurs cherchant à adapter leur pédagogie",
        "Grands-parents impliqués souhaitant mieux comprendre"
      ],
      testimonial: {
        text: "Cette analyse a révolutionné notre façon d'éduquer notre fille. Nous comprenons enfin ses tempêtes émotionnelles et savons comment la rassurer. Elle s'épanouit comme jamais. Merci infiniment.",
        author: "Julie & Pierre",
        relation: "Parents d'une fille de 6 ans"
      },
      pricing: "127€ pour un thème enfant complet",
      duration: "Guide parental livré sous 5 jours"
    },
    evolution: {
      title: "Chemin Amoureux",
      description: "Voyagez à travers le temps et l'évolution de votre relation grâce à l'astrologie prévisionnelle. Cette analyse révèle les cycles naturels de votre couple, les périodes de croissance, de crise et de renaissance. Anticipez les moments clés, comprenez les saisons de votre amour et naviguez consciemment dans les transits planétaires qui façonnent votre destinée à deux.",
      whatYouDiscover: [
        "Le cycle actuel de votre relation et sa signification",
        "Les prochains transits majeurs affectant votre couple",
        "Les périodes favorables pour engagement, mariage, conception",
        "Les moments de crise potentiels et comment les traverser",
        "Les phases de croissance et d'expansion à deux",
        "Votre calendrier amoureux pour les 12 prochains mois",
        "Les rituels et pratiques pour chaque période"
      ],
      howItWorks: [
        "Analyse des transits planétaires sur vos thèmes",
        "Étude des progressions (évolution interne)",
        "Calcul des révolutions solaires du couple",
        "Examen des éclipses dans vos maisons relationnelles",
        "Lecture des nouveaux aspects se formant",
        "Calendrier précis des moments clés avec guidance"
      ],
      benefits: [
        "Navigation consciente des cycles relationnels",
        "Anticipation et préparation aux défis",
        "Timing optimal pour décisions importantes",
        "Sérénité face aux périodes difficiles",
        "Utilisation maximale des périodes favorables",
        "Relation consciente et évolutive"
      ],
      idealFor: [
        "Couples planifiant mariage, achat immobilier ou conception",
        "Partenaires traversant une période de crise",
        "Relations en transition ou transformation",
        "Couples spirituels pratiquant l'évolution consciente",
        "Unions cherchant à grandir ensemble intentionnellement"
      ],
      testimonial: {
        text: "Grâce au chemin amoureux, nous avons su que novembre serait difficile. Nous nous sommes préparés, avons pratiqué les rituels suggérés et avons traversé cette période en paix. Cette guidance a sauvé notre couple.",
        author: "Emma & Lucas",
        relation: "Couple conscient depuis 4 ans"
      },
      pricing: "167€ pour une prévision annuelle",
      duration: "Calendrier détaillé sous 5-7 jours"
    }
  };

  return contents[relationId];
};

// ============================================================================
// COMPOSANT AFFICHAGE DÉTAILLÉ
// ============================================================================

const RelationDetailDisplay = ({ 
  content, 
  color 
}: { 
  content: RelationContent; 
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    {/* En-tête */}
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 sm:p-8 text-white`}>
      <h2 className="text-2xl sm:text-3xl font-black mb-3">{content.title}</h2>
      <p className="leading-relaxed text-white/90">{content.description}</p>
    </div>

    {/* Ce que vous découvrez */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Ce Que Vous Découvrez</h3>
      </div>
      <ul className="space-y-3">
        {content.whatYouDiscover.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Comment ça marche */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Comment Ça Marche</h3>
      </div>
      <div className="space-y-3">
        {content.howItWorks.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 text-xs font-bold">{idx + 1}</span>
            </div>
            <span className="text-gray-700 text-sm">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Bénéfices */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Bénéfices</h3>
      </div>
      <ul className="space-y-3">
        {content.benefits.map((benefit, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Idéal pour */}
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-amber-900">Idéal Pour</h3>
      </div>
      <ul className="space-y-2">
        {content.idealFor.map((target, idx) => (
          <li key={idx} className="text-amber-800 text-sm flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>{target}</span>
          </li>
        ))}
      </ul>
    </div>


    {/* CTA */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-gradient-to-r ${color} text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
    >
      <Heart className="w-5 h-5" />
      Commander Cette Analyse
    </motion.button>
  </motion.div>
);

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function RelationsPage() {
  const [activeTab, setActiveTab] = useState<RelationTypeId>('compatibilite');

  const tabs: Tab[] = [
    { 
      id: 'compatibilite', 
      icon: Users, 
      title: "Compatibilité", 
      subtitle: "Affinités",
      color: "from-rose-500 to-pink-600"
    },
    { 
      id: 'synastrie', 
      icon: Heart, 
      title: "Synastrie", 
      subtitle: "Couple",
      color: "from-red-500 to-rose-600"
    },
    { 
      id: 'karmique', 
      icon: Infinity, 
      title: "Karmique", 
      subtitle: "Âme sœur",
      color: "from-purple-500 to-pink-600"
    },
    { 
      id: 'enfant', 
      icon: Baby, 
      title: "Enfant", 
      subtitle: "Thème",
      color: "from-amber-500 to-orange-600"
    },
    { 
      id: 'evolution', 
      icon: TrendingUp, 
      title: "Évolution", 
      subtitle: "Chemin",
      color: "from-teal-500 to-emerald-600"
    },
  ];

  const getCurrentContent = () => getRelationContent(activeTab);
  const getCurrentColor = () => tabs.find(t => t.id === activeTab)?.color || "from-rose-500 to-pink-600";

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
         

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
            FAMILLE, AMITIÉ ET COUPLE
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
            Comprenez la vérité énergétique de vos relations et harmonisez vos liens affectifs
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-br ${tab.color} border-transparent text-white shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeRelationTab"
                    className={`absolute inset-0 bg-gradient-to-br ${tab.color} rounded-2xl`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <tab.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600'
                  }`} />
                  <div className={`font-bold text-xs sm:text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tab.title}
                  </div>
                  <div className={`text-xs mt-0.5 sm:mt-1 ${
                    activeTab === tab.id ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {tab.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contenu détaillé */}
        <AnimatePresence mode="wait">
          <RelationDetailDisplay 
            key={activeTab}
            content={getCurrentContent()} 
            color={getCurrentColor()}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
