"use client";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Calendar, Heart, Star, Users } from "lucide-react";
import Link from "next/link";

const ICONS = { Heart, Users, Briefcase, Calendar };

// Les 4 sous-rubriques de l'astrologie
const astrologySections = [
  {
    id: "vie-personnelle",
    title: "Ma Vie Personnelle",
    icon: "Heart",
    description: "Découvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
    gradient: "from-rose-500 to-pink-600",
    color: "from-rose-600 to-pink-600",
    link: "/protected/vie-personnelle",
    stats: "Analyse complète"
  },
  {
    id: "famille-couple",
    title: "Famille, Amitié et Couple",
    icon: "Users",
    description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
    gradient: "from-emerald-500 to-teal-600",
    color: "from-emerald-600 to-teal-600",
    link: "/protected/relations",
    stats: "Relations harmonieuses"
  },
  {
    id: "professionnel",
    title: "Monde Professionnel",
    icon: "Briefcase",
    description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
    gradient: "from-blue-500 to-indigo-600",
    color: "from-blue-600 to-indigo-600",
    link: "/protected/professionnel",
    stats: "Réussite professionnelle"
  },
  {
    id: "horoscope",
    title: "Horoscope par Signe",
    icon: "Calendar",
    description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
    gradient: "from-cyan-500 to-blue-600",
    color: "from-cyan-600 to-blue-600",
    link: "/protected/horoscope",
    stats: "Mis à jour mensuellement"
  },
];

export default function AstrologiePage() {
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

      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icône principale */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl"
          >
            <Star className="w-12 h-12 text-white" />
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Astrologie
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-700 mb-2 max-w-3xl mx-auto"
          >
            Découvre Ton Chemin de Vie
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Explore les influences cosmiques qui façonnent ta destinée à travers 4 domaines essentiels de ta vie.
            Laisse les astres te guider vers ton véritable potentiel.
          </motion.p>
        </motion.div>

        {/* Grid des 4 sous-rubriques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {astrologySections.map((section, index) => {
            const Icon = ICONS[section.icon as keyof typeof ICONS];
            return (
              <Link key={section.id} href={section.link}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
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
                    {/* Icône */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-xl mb-4 sm:mb-6`}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>

                    {/* Titre */}
                    <h2 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent mb-3`}>
                      {section.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {section.description}
                    </p>

                    {/* Stats */}
                    {section.stats && (
                      <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold text-purple-700">
                        <Star className="w-4 h-4 fill-purple-500 text-purple-500" />
                        <span>{section.stats}</span>
                      </div>
                    )}

                    {/* CTA animé */}
                    <motion.div
                      className="flex items-center gap-2 text-sm sm:text-base font-bold text-purple-700 group-hover:text-purple-900 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <span>Découvrir</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>

                  {/* Dégradé de fond au survol */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl sm:rounded-3xl`} />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
