"use client";

import StatsCounter from "@/components/StatsCounter";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Flame, 
  Hash, 
  Heart, 
  ShoppingCart, 
  Sparkles,
  Star,
  Users,
  Zap,
  Gift,
  TrendingUp,
  Shield
} from "lucide-react";
import Link from "next/link";

const ICONS = { 
  Heart, 
  Users, 
  Briefcase, 
  Sparkles, 
  Flame, 
  Hash, 
  Calendar, 
  Star, 
  BookOpen, 
  ShoppingCart,
  Zap,
  Gift
};

// Structure organisée par grandes rubriques avec badges
const categories = [
  {
    id: "marche",
    title: "LE MARCHÉ DES OFFRANDES",
    subtitle: "Objets Sacrés & Rituels",
    icon: ShoppingCart,
    color: "from-green-600 to-emerald-600",
    badge: "Nouveauté",
    badgeColor: "bg-green-500",
    services: [
      {
        id: "marche-offrandes",
        title: "Le Marché des Offrandes",
        icon: "ShoppingCart",
        description: "Découvre les offrandes sacrées et les objets rituels pour accompagner tes pratiques spirituelles.",
        gradient: "from-green-500 to-emerald-600",
        link: "/protected/marcheoffrandes",
        badge: "Popular",
        stats: "200+ produits"
      },
    ]
  },
  {
    id: "librairie",
    title: "LIBRAIRIE ÉSOTÉRIQUE",
    subtitle: "Sagesse & Connaissance",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-600",
    badge: "Best-seller",
    badgeColor: "bg-blue-500",
    services: [
      {
        id: "livres",
        title: "Librairie Ésotérique",
        icon: "BookOpen",
        description: "Explore notre collection de livres sacrés et guides spirituels pour approfondir tes connaissances.",
        gradient: "from-blue-500 to-cyan-600",
        link: "/protected/livres",
        stats: "50+ livres"
      },
      {
        id: "mes-livres",
        title: "Ma Bibliothèque",
        icon: "Star",
        description: "Accède à tous tes livres et contenus ésotériques personnels.",
        gradient: "from-indigo-500 to-blue-600",
        link: "/protected/mes-livres",
        badge: "Premium"
      },
    ]
  },
  {
    id: "astrologie",
    title: "ASTROLOGIE",
    subtitle: "Découvre Ton Chemin de Vie",
    icon: Heart,
    color: "from-purple-600 to-pink-600",
    badge: "Populaire",
    badgeColor: "bg-purple-500",
    services: [
      {
        id: "vie-personnelle",
        title: "Ma Vie Personnelle",
        icon: "Heart",
        description: "Découvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
        gradient: "from-rose-500 to-pink-600",
        link: "/protected/vie-personnelle",
        badge: "Essentiel",
        stats: "Analyse complète"
      },
      {
        id: "famille-couple",
        title: "Famille, Amitié et Couple",
        icon: "Users",
        description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
        gradient: "from-emerald-500 to-teal-600",
        link: "/protected/relations",
        stats: "Relations harmonieuses"
      },
      {
        id: "professionnel",
        title: "Monde Professionnel",
        icon: "Briefcase",
        description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
        gradient: "from-blue-500 to-indigo-600",
        link: "/protected/professionnel",
        stats: "Réussite professionnelle"
      },
      {
        id: "horoscope",
        title: "Horoscope par Signe",
        icon: "Calendar",
        description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
        gradient: "from-cyan-500 to-blue-600",
        link: "/protected/horoscope",
        badge: "Gratuit",
        stats: "Mis à jour mensuellement"
      },
    ]
  },
  {
    id: "numerologie",
    title: "NUMÉROLOGIE",
    subtitle: "Les Nombres Révèlent Ton Destin",
    icon: Hash,
    color: "from-indigo-600 to-purple-600",
    badge: "Mystique",
    badgeColor: "bg-indigo-500",
    services: [
      {
        id: "numerologie",
        title: "Consultations Numérologiques",
        icon: "Hash",
        description: "Nombre de Naissance • Nombre d'Expression • Chemin de Vie • Nombre Personnel • Nombre de l'Âme",
        gradient: "from-purple-500 to-violet-600",
        link: "/protected/numerologie",
        stats: "5 types d'analyses"
      },
    ]
  },
  {
    id: "spiritualite",
    title: "SPIRITUALITÉ AFRICAINE",
    subtitle: "Sagesse Ancestrale",
    icon: Flame,
    color: "from-orange-600 to-red-600",
    badge: "Authentique",
    badgeColor: "bg-orange-500",
    services: [
      {
        id: "spiritualite",
        title: "Spiritualité Africaine",
        icon: "Flame",
        description: "Connecte-toi aux forces invisibles, aux ancêtres et aux principes sacrés qui donnent sens et puissance à ta vie.",
        gradient: "from-orange-500 to-red-600",
        link: "/protected/spiritualite",
        stats: "Traditions millénaires"
      },
    ]
  },
  {
    id: "invocations",
    title: "INVOCATIONS ET RITUELS MAGIQUES",
    subtitle: "Manifeste Tes Intentions",
    icon: Sparkles,
    color: "from-amber-600 to-orange-600",
    badge: "Puissant",
    badgeColor: "bg-amber-500",
    services: [
      {
        id: "astrologie-africaine",
        title: "Invocations et Rituels Magiques",
        icon: "Sparkles",
        description: "Pratiques ésotériques et rituels pour manifester tes intentions et attirer les énergies bénéfiques.",
        gradient: "from-amber-500 to-orange-600",
        link: "/protected/astrologie-africaine",
        stats: "Résultats garantis"
      },
    ]
  },
];

// Bénéfices clés (nouveauté)
const benefits = [
  {
    icon: Shield,
    title: "100% Confidentiel",
    description: "Tes données sont sécurisées"
  },
  {
    icon: Zap,
    title: "Résultats Rapides",
    description: "Analyse en quelques minutes"
  },
  {
    icon: Gift,
    title: "Bonus Exclusifs",
    description: "Contenu gratuit chaque mois"
  },
  {
    icon: TrendingUp,
    title: "Accompagnement",
    description: "Suivi personnalisé"
  }
];

export default function ProfilPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-500 rounded-full blur-3xl"
        />
      </div>

      {/* Progress bar animée */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 z-50"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

      <div className="relative z-10 px-3 sm:px-4 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Hero Section Ultra-Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Badge de bienvenue */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700">
              Espace Personnel Premium
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Bienvenue, {user?.username || 'Invité'}
            </span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block ml-2"
            >
              👋
            </motion.span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Dans ce <span className="font-semibold text-purple-700">temple virtuel</span> dédié à te reconnecter à ton étoile, 
            tu avances guidé(e) par la lumière de tes{' '}
            <span className="font-semibold text-pink-700">génies tutélaires</span> et la présence bienveillante de tes{' '}
            <span className="font-semibold text-violet-700">ancêtres</span>.
          </motion.p>

          {/* Bénéfices clés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Catégories organisées */}
        <div className="space-y-8 sm:space-y-12">
          {categories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + catIndex * 0.1, duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* En-tête de catégorie ultra-premium */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-lg"
                >
                  {/* Badge catégorie */}
                  {category.badge && (
                    <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${category.badgeColor} text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full`}>
                      {category.badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icône de catégorie */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                    >
                      <CategoryIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>

                    {/* Titre + Sous-titre */}
                    <div className="flex-1">
                      <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-0.5 sm:mb-1`}>
                        {category.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Services de la catégorie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {category.services.map((service, i) => {
                    const Icon = ICONS[service.icon as keyof typeof ICONS];
                    return (
                      <Link key={service.id} href={service.link}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                          whileHover={{ y: -6, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all h-full overflow-hidden"
                        >
                          {/* Effet de brillance au survol */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />

                          {/* Badge service */}
                          {service.badge && (
                            <div className="absolute top-3 right-3 bg-purple-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {service.badge}
                            </div>
                          )}

                          {/* Contenu */}
                          <div className="relative z-10">
                            {/* Icône + Titre */}
                            <div className="flex items-start gap-3 mb-3 sm:mb-4">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}
                              >
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </motion.div>
                              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
                                {service.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                              {service.description}
                            </p>

                            {/* Stats (si présent) */}
                            {service.stats && (
                              <div className="flex items-center gap-2 mb-3 text-[10px] sm:text-xs text-purple-700 font-semibold">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-purple-500 text-purple-500" />
                                <span>{service.stats}</span>
                              </div>
                            )}

                            {/* CTA animé */}
                            <motion.div
                              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-purple-700 group-hover:text-purple-900 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              <span>Découvrir</span>
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </div>

                          {/* Dégradé de fond au survol */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl sm:rounded-2xl`} />
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call-to-Action final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Prêt(e) à Transformer Ta Vie ?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Rejoins des milliers de personnes qui ont déjà découvert leur véritable destinée
            </p>
            <Link href="/protected/marcheoffrandes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-700 font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Aller au marché des offrandes✨
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Compteurs crédibilité */}
      <StatsCounter />
    </div>
  );
}
