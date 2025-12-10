/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Brain,
  Building2,
  CheckCircle,
  Lightbulb,
  Sparkles,
  Star,
  Target,
  UserCheck,
  UsersRound
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type ServiceTypeId = 'talent' | 'synergie' | 'team-building' | 'leadership';

interface Tab {
  id: ServiceTypeId;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}

interface ServiceContent {
  title: string;
  description: string;
  benefits: string[];
  methodology: string[];
  deliverables: string[];
  pricing: string;
  duration: string;
  testimonial: {
    text: string;
    author: string;
    company: string;
  };
}

// ============================================================================
// DONNÉES DE CONTENU DÉTAILLÉ
// ============================================================================

const getServiceContent = (serviceId: ServiceTypeId): ServiceContent => {
  const contents: { [key: string]: ServiceContent } = {
    talent: {
      title: "Évaluation Talent & Potentiel",
      description: "Découvrez le véritable potentiel de vos candidats et collaborateurs grâce à une analyse astrologique approfondie. Notre méthode unique combine numérologie, thème astral et profil psychologique pour révéler les forces cachées, les talents naturels et les zones de développement de chaque individu.",
      benefits: [
        "Identification précise des forces et compétences naturelles",
        "Détection des talents cachés et potentiels inexploités",
        "Compréhension profonde de la personnalité et du style de travail",
        "Anticipation des défis et zones de fragilité",
        "Conseils sur l'intégration et le management personnalisé",
        "Réduction des erreurs de recrutement jusqu'à 70%"
      ],
      methodology: [
        "Analyse du thème astral natal complet",
        "Calcul des nombres numérologiques professionnels",
        "Évaluation des compatibilités avec la culture d'entreprise",
        "Identification du style de leadership et de communication",
        "Analyse des cycles de performance et motivation",
        "Rapport détaillé avec recommandations managériales"
      ],
      deliverables: [
        "Rapport d'analyse complet (15-20 pages)",
        "Fiche synthèse managériale",
        "Recommandations d'intégration personnalisées",
        "Plan de développement des compétences",
        "Session de débriefing avec RH (1h)",
        "Suivi à 3 mois inclus"
      ],
      pricing: "À partir de 350€ par candidat",
      duration: "Délai de livraison : 5 jours ouvrés",
      testimonial: {
        text: "Grâce à l'analyse astrologique, nous avons découvert des talents insoupçonnés chez nos candidats. Le taux de rétention a augmenté de 40% depuis que nous utilisons cette approche dans nos recrutements.",
        author: "Marie Dubois",
        company: "DRH, TechCorp France"
      }
    },
    synergie: {
      title: "Analyse de Synergie d'Équipe",
      description: "Optimisez la collaboration et la performance de vos équipes en identifiant les affinités naturelles, les zones de tension potentielles et les complémentarités astrologiques. Notre analyse révèle les dynamiques invisibles qui influencent la cohésion et la productivité collective.",
      benefits: [
        "Cartographie complète des dynamiques d'équipe",
        "Identification des leaders naturels et facilitateurs",
        "Détection précoce des conflits potentiels",
        "Optimisation de la communication interpersonnelle",
        "Renforcement de la cohésion et de l'esprit d'équipe",
        "Amélioration de la productivité collective jusqu'à 35%"
      ],
      methodology: [
        "Collecte des données astrologiques de chaque membre",
        "Analyse des compatibilités inter-personnelles",
        "Cartographie des rôles naturels et complémentarités",
        "Identification des canaux de communication optimaux",
        "Évaluation des cycles collectifs de performance",
        "Recommandations d'organisation et de collaboration"
      ],
      deliverables: [
        "Cartographie interactive de l'équipe",
        "Analyse détaillée des synergies et tensions",
        "Matrice de compatibilité complète",
        "Guide de communication personnalisé",
        "Recommandations d'organisation du travail",
        "Workshop de présentation (2h) avec l'équipe"
      ],
      pricing: "À partir de 1 200€ pour une équipe de 6-10 personnes",
      duration: "Délai de livraison : 7-10 jours ouvrés",
      testimonial: {
        text: "L'analyse de synergie a transformé notre équipe. Nous avons réorganisé les binômes en fonction des compatibilités révélées et les tensions ont disparu. La collaboration n'a jamais été aussi fluide.",
        author: "Thomas Martin",
        company: "Manager, DigitalBoost"
      }
    },
    'team-building': {
      title: "Team Building Astrologique",
      description: "Créez des équipes hautement performantes en composant des groupes basés sur les complémentarités astrologiques. Notre approche scientifique de l'intelligence collective vous permet de former des équipes où chaque membre apporte une valeur unique et complémentaire.",
      benefits: [
        "Constitution d'équipes équilibrées et complémentaires",
        "Maximisation des synergies naturelles",
        "Répartition optimale des rôles et responsabilités",
        "Réduction des conflits et amélioration de l'harmonie",
        "Augmentation de la créativité et de l'innovation",
        "Performance collective supérieure de 45%"
      ],
      methodology: [
        "Analyse des profils astrologiques disponibles",
        "Identification des archétypes et rôles naturels",
        "Simulation de différentes configurations d'équipe",
        "Optimisation des complémentarités élémentaires (Feu, Eau, Air, Terre)",
        "Équilibrage des énergies masculines et féminines",
        "Validation par modélisation prédictive"
      ],
      deliverables: [
        "Proposition de 3 configurations d'équipe optimales",
        "Justification astrologique de chaque composition",
        "Fiches de rôle pour chaque membre",
        "Plan d'intégration et de lancement d'équipe",
        "Rituel de cohésion astrologique (optionnel)",
        "Support continu pendant les 3 premiers mois"
      ],
      pricing: "À partir de 2 000€ par équipe créée",
      duration: "Délai de livraison : 10-14 jours ouvrés",
      testimonial: {
        text: "Notre projet le plus ambitieux a été confié à une équipe composée selon les principes astrologiques. Résultat : livraison en avance, qualité exceptionnelle et zéro conflit. C'était magique.",
        author: "Sophie Bernard",
        company: "Chef de Projet, Innovation Lab"
      }
    },
    leadership: {
      title: "Analyse Leadership",
      description: "Révélez la capacité innée d’une personne à diriger, influencer, inspirer et prendre les bonnes décisions. Cette analyse aide à identifier le style de leadership naturel, la manière de gérer une équipe, la relation au pouvoir, la résistance au stress, la prise d’initiative, ainsi que le potentiel réel d’une personne à assumer des responsabilités élevées.",
      benefits: [
        "Identification du style de leadership naturel",
        "Évaluation de la capacité à inspirer et influencer",
        "Analyse de la gestion du stress et de la prise de décision",
        "Compréhension de la relation au pouvoir et à l'autorité",
        "Conseils personnalisés pour développer le leadership",
        "Détection du potentiel à assumer des responsabilités élevées"
      ],
      methodology: [
        "Analyse du thème astral axée sur les maisons et planètes du leadership",
        "Étude des aspects liés à l'autorité, l'initiative et la gestion d'équipe",
        "Évaluation de la résistance au stress et de la prise de décision",
        "Profilage du style de communication et d'inspiration",
        "Synthèse des points forts et axes d'amélioration",
        "Rapport détaillé avec recommandations de développement"
      ],
      deliverables: [
        "Rapport d'analyse leadership (10-15 pages)",
        "Fiche synthèse des compétences clés",
        "Plan de développement personnalisé",
        "Session de restitution (1h) avec le bénéficiaire",
        "Suivi à 3 mois inclus"
      ],
      pricing: "À partir de 500€ par personne",
      duration: "Délai de livraison : 5-7 jours ouvrés",
      testimonial: {
        text: "L'analyse leadership a permis à nos managers de prendre conscience de leur potentiel et d'adapter leur style. Les résultats sont visibles sur la motivation des équipes.",
        author: "Claire Lefèvre",
        company: "Directrice RH, Groupe Nova"
      }
    }
  };

  return contents[serviceId];
};

// ============================================================================
// COMPOSANT AFFICHAGE DÉTAILLÉ
// ============================================================================

const ServiceDetailDisplay = ({ 
  content, 
  color 
}: { 
  content: ServiceContent; 
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

    {/* Bénéfices */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Bénéfices Clés</h3>
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
            <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Méthodologie */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Notre Méthodologie</h3>
      </div>
      <div className="space-y-3">
        {content.methodology.map((step, idx) => (
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


    {/* CTA */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-gradient-to-r ${color} text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
    >
      <Sparkles className="w-5 h-5" />
      Demander un Devis Personnalisé
    </motion.button>
  </motion.div>
);

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function ProfessionnelPage() {
  const [activeTab, setActiveTab] = useState<ServiceTypeId>('talent');

  const tabs: Tab[] = [
    { 
      id: 'talent', 
      icon: UserCheck, 
      title: "Talent", 
      subtitle: "Potentiel",
      color: "from-cyan-500 to-teal-600"
    },
    { 
      id: 'synergie', 
      icon: UsersRound, 
      title: "Synergie", 
      subtitle: "Équipe",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: 'team-building', 
      icon: Target, 
      title: "Team Building", 
      subtitle: "Formation",
      color: "from-emerald-500 to-green-600"
    },
    { 
      id: 'leadership', 
      icon: Brain, 
      title: "Leadership", 
      subtitle: "Diriger",
      color: "from-purple-500 to-pink-600"
    },
  ];

  const getCurrentContent = () => getServiceContent(activeTab);
  const getCurrentColor = () => tabs.find(t => t.id === activeTab)?.color || "from-cyan-500 to-teal-600";

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 z-50 origin-left"
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
            MONDE PROFESSIONNEL
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
            Optimisez vos équipes, recrutements et dynamiques collectives grâce à l'intelligence astrologique
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-br ${tab.color} border-transparent text-white shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeProfTab"
                    className={`absolute inset-0 bg-gradient-to-br ${tab.color} rounded-2xl`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <tab.icon className={`w-6 h-6 mx-auto mb-2 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600'
                  }`} />
                  <div className={`font-bold text-xs sm:text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tab.title}
                  </div>
                  <div className={`text-xs mt-1 ${
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
          <ServiceDetailDisplay 
            key={activeTab}
            content={getCurrentContent()} 
            color={getCurrentColor()}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
