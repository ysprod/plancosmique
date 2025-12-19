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
  Zap
} from "lucide-react";
import Link from "next/link";

const mainCategories = [
  {
    id: "astrologie",
    title: "ASTROLOGIE",
    subtitle: "Découvre Ton Chemin de Vie",
    icon: Star,
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-500/10 to-pink-500/10",
    badge: "Populaire",
    badgeColor: "bg-purple-500",
    description: "Explore les influences cosmiques qui façonnent ta destinée",
    link: "/secured/astrologie",
    stats: "4 domaines",
  },
  {
    id: "numerologie",
    title: "NUMÉROLOGIE",
    subtitle: "Les Nombres Révèlent Ton Destin",
    icon: Hash,
    color: "from-indigo-600 to-purple-600",
    gradient: "from-indigo-500/10 to-purple-500/10",
    badge: "Mystique",
    badgeColor: "bg-indigo-500",
    description: "Décode les mystères cachés dans tes nombres personnels",
    link: "/secured/numerologie",
    stats: "5 analyses",
  },
  {
    id: "spiritualite",
    title: "SPIRITUALITÉ AFRICAINE",
    subtitle: "Sagesse Ancestrale",
    icon: Flame,
    color: "from-orange-600 to-red-600",
    gradient: "from-orange-500/10 to-red-500/10",
    badge: "Authentique",
    badgeColor: "bg-orange-500",
    description: "Connecte-toi aux forces invisibles et aux ancêtres",
    link: "/secured/spiritualite",
    stats: "Millénaire",
  },
  {
    id: "invocations",
    title: "RITUELS MAGIQUES",
    subtitle: "Manifeste Tes Intentions",
    icon: Sparkles,
    color: "from-amber-600 to-yellow-600",
    gradient: "from-amber-500/10 to-yellow-500/10",
    badge: "Puissant",
    badgeColor: "bg-amber-500",
    description: "Pratiques ésotériques pour manifester tes intentions",
    link: "/secured/astrologie-africaine",
    stats: "Garantis",
  },
  {
    id: "marche",
    title: "MARCHÉ DES OFFRANDES",
    subtitle: "Objets Sacrés & Rituels",
    icon: ShoppingCart,
    color: "from-green-600 to-emerald-600",
    gradient: "from-green-500/10 to-emerald-500/10",
    badge: "Nouveauté",
    badgeColor: "bg-green-500",
    description: "Découvre les offrandes sacrées authentiques",
    link: "/secured/marcheoffrandes",
    stats: "200+ produits",
  },
  {
    id: "librairie",
    title: "LIBRAIRIE ÉSOTÉRIQUE",
    subtitle: "Sagesse & Connaissance",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-600",
    gradient: "from-blue-500/10 to-cyan-500/10",
    badge: "Best-seller",
    badgeColor: "bg-blue-500",
    description: "Collection de livres sacrés et guides spirituels",
    link: "/secured/livres",
    stats: "50+ livres",
  },
];

export default function ProfilPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white   ">

      {/* Background subtil - Uniquement sur desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 hidden sm:block">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-pink-400 rounded-full blur-3xl"
        />
      </div>

      {/* Progress bar minimaliste */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 z-50"
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">

        {/* Hero Section Ultra-Compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          {/* Titre principal compact */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-black mb-2 text-center"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Bienvenue, {user?.username || 'Invité'}
            </span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block ml-1"
            >
              👋
            </motion.span>
          </motion.h1>

          {/* Sous-titre compact */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto leading-relaxed px-2"
          >
            Reconnecte-toi à ton étoile, guidé(e) par tes{' '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">génies tutélaires</span> et tes{' '}
            <span className="font-semibold text-pink-600 dark:text-pink-400">ancêtres</span>.
          </motion.p>
        </motion.div>

        {/* Grid ultra-compact et moderne */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          {mainCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <Link key={category.id} href={category.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl 
                           p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-slate-800
                           hover:border-purple-300 dark:hover:border-purple-700
                           shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
                >
                   
                  {/* Effet de brillance subtil */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/50 
                             dark:via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.7 }}
                  />

                  {/* Contenu */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icône compacte */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl 
                               bg-gradient-to-br ${category.color} 
                               flex items-center justify-center shadow-lg mb-3 sm:mb-4 
                               group-hover:shadow-xl transition-shadow`}
                    >
                      <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </motion.div>

                    {/* Titre compact */}
                    <h2 className={`text-xs sm:text-sm md:text-base font-bold 
                                  bg-gradient-to-r ${category.color} bg-clip-text text-transparent 
                                  mb-1 sm:mb-1.5 leading-tight`}>
                      {category.title}
                    </h2>

                    {/* Sous-titre (caché sur très petit écran) */}
                    <p className="hidden sm:block text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 
                                font-semibold mb-2 leading-tight">
                      {category.subtitle}
                    </p>

                    {/* Description compacte */}
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 
                                leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
                      {category.description}
                    </p>

                    {/* Stats + CTA */}
                    <div className="flex items-center justify-between mt-auto">
                      {/* Stats */}
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span className="font-semibold">{category.stats}</span>
                      </div>

                      {/* CTA animé */}
                      <motion.div
                        className="flex items-center gap-1 text-[10px] sm:text-xs font-bold 
                                 text-purple-600 dark:text-purple-400 
                                 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        whileHover={{ x: 2 }}
                      >
                        <span className="hidden sm:inline">Voir</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 
                                             group-hover:translate-x-0.5 transition-transform" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Dégradé de fond au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                rounded-xl sm:rounded-2xl`} />
                </motion.div>
              </Link>
            );
          })}
        </div> 
      </div>

      {/* Compteurs crédibilité */}
      <StatsCounter />

      {/* Espacement bottom */}
      <div className="h-16 sm:h-20" />
    </div>
  );
}