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
  Star
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
          
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3"
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

   
      </div>

      {/* Compteurs crédibilité */}
      <StatsCounter />
    </div>
  );
}
