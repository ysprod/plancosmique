"use client";

import StatsCounter from "@/components/StatsCounter";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  BookOpen,
  Flame,
  Hash,
  ShoppingCart,
  Sparkles,
  Star,
  Gift,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import Link from "next/link";

// Structure organisée en 6 grandes boîtes principales
const mainCategories = [
  {
    id: "astrologie",
    title: "ASTROLOGIE",
    subtitle: "Découvre Ton Chemin de Vie",
    icon: Star,
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-500 to-pink-600",
    badge: "Populaire",
    badgeColor: "bg-purple-500",
    description: "Explore les influences cosmiques qui façonnent ta destinée et révèle ton véritable potentiel à travers les astres.",
    link: "/protected/astrologie",
    stats: "4 domaines de vie",
    hasSubmenu: true
  },
  {
    id: "numerologie",
    title: "NUMÉROLOGIE",
    subtitle: "Les Nombres Révèlent Ton Destin",
    icon: Hash,
    color: "from-indigo-600 to-purple-600",
    gradient: "from-indigo-500 to-purple-600",
    badge: "Mystique",
    badgeColor: "bg-indigo-500",
    description: "Décode les mystères cachés dans tes nombres personnels pour comprendre ton chemin de vie et ta mission d'âme.",
    link: "/protected/numerologie",
    stats: "5 types d'analyses",
    hasSubmenu: false
  },
  {
    id: "spiritualite",
    title: "SPIRITUALITÉ AFRICAINE",
    subtitle: "Sagesse Ancestrale",
    icon: Flame,
    color: "from-orange-600 to-red-600",
    gradient: "from-orange-500 to-red-600",
    badge: "Authentique",
    badgeColor: "bg-orange-500",
    description: "Connecte-toi aux forces invisibles, aux ancêtres et aux principes sacrés qui donnent sens et puissance à ta vie.",
    link: "/protected/spiritualite",
    stats: "Traditions millénaires",
    hasSubmenu: false
  },
  {
    id: "invocations",
    title: "INVOCATIONS ET RITUELS MAGIQUES",
    subtitle: "Manifeste Tes Intentions",
    icon: Sparkles,
    color: "from-amber-600 to-yellow-600",
    gradient: "from-amber-500 to-yellow-600",
    badge: "Puissant",
    badgeColor: "bg-amber-500",
    description: "Pratiques ésotériques et rituels sacrés pour manifester tes intentions et attirer les énergies bénéfiques dans ta vie.",
    link: "/protected/astrologie-africaine",
    stats: "Résultats garantis",
    hasSubmenu: false
  },
  {
    id: "marche",
    title: "LE MARCHÉ DES OFFRANDES",
    subtitle: "Objets Sacrés & Rituels",
    icon: ShoppingCart,
    color: "from-green-600 to-emerald-600",
    gradient: "from-green-500 to-emerald-600",
    badge: "Nouveauté",
    badgeColor: "bg-green-500",
    description: "Découvre les offrandes sacrées et objets rituels authentiques pour accompagner tes pratiques spirituelles.",
    link: "/protected/marcheoffrandes",
    stats: "200+ produits",
    hasSubmenu: false
  },
  {
    id: "librairie",
    title: "LIBRAIRIE ÉSOTÉRIQUE",
    subtitle: "Sagesse & Connaissance",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-600",
    gradient: "from-blue-500 to-cyan-600",
    badge: "Best-seller",
    badgeColor: "bg-blue-500",
    description: "Explore notre collection de livres sacrés, grimoires et guides spirituels pour approfondir tes connaissances.",
    link: "/protected/livres",
    stats: "50+ livres",
    hasSubmenu: false
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

        {/* Catégories principales - Grid de 6 boîtes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mainCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <Link key={category.id} href={category.link}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all h-full overflow-hidden"
                >
                  {/* Badge catégorie */}
                  {category.badge && (
                    <div className={`absolute top-4 right-4 ${category.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                      {category.badge}
                    </div>
                  )}

                  {/* Effet de brillance au survol */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Contenu */}
                  <div className="relative z-10">
                    {/* Icône large */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-xl mb-4 sm:mb-6 mx-auto`}
                    >
                      <CategoryIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>

                    {/* Titre */}
                    <h2 className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2 text-center`}>
                      {category.title}
                    </h2>

                    {/* Sous-titre */}
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-3 sm:mb-4 text-center">
                      {category.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 text-center">
                      {category.description}
                    </p>

                    {/* Stats */}
                    {category.stats && (
                      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold text-purple-700">
                        <Star className="w-4 h-4 fill-purple-500 text-purple-500" />
                        <span>{category.stats}</span>
                      </div>
                    )}

                    {/* CTA animé */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-sm font-bold text-purple-700 group-hover:text-purple-900 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <span>Explorer</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>

                  {/* Dégradé de fond au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl sm:rounded-3xl`} />
                </motion.div>
              </Link>
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
