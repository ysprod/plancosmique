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
  Users 
} from "lucide-react";
import Link from "next/link";

const ICONS = { Heart, Users, Briefcase, Sparkles, Flame, Hash, Calendar, Star, BookOpen, ShoppingCart };

// Structure organisée par grandes rubriques
const categories = [
  {
    id: "astrologie",
    title: "ASTROLOGIE",
    icon: Heart,
    color: "from-purple-600 to-pink-600",
    services: [
      {
        id: "vie-personnelle",
        title: "Ma vie personnelle",
        icon: "Heart",
        description: "Découvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
        gradient: "from-rose-500 to-pink-600",
        link: "/protected/vie-personnelle"
      },
      {
        id: "famille-couple",
        title: "Famille, Amitié et Couple",
        icon: "Users",
        description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
        gradient: "from-emerald-500 to-teal-600",
        link: "/protected/relations"
      },
      {
        id: "professionnel",
        title: "Monde Professionnel",
        icon: "Briefcase",
        description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
        gradient: "from-blue-500 to-indigo-600",
        link: "/protected/professionnel"
      },
      {
        id: "horoscope",
        title: "Horoscope par Signe",
        icon: "Calendar",
        description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
        gradient: "from-cyan-500 to-blue-600",
        link: "/protected/horoscope"
      },
    ]
  },
  {
    id: "numerologie",
    title: "NUMÉROLOGIE",
    icon: Hash,
    color: "from-indigo-600 to-purple-600",
    services: [
      {
        id: "numerologie",
        title: "Consultations Numérologiques",
        icon: "Hash",
        description: "Nombre de Naissance • Nombre d'Expression • Chemin de Vie • Nombre Personnel • Nombre de l'Âme",
        gradient: "from-purple-500 to-violet-600",
        link: "/protected/numerologie"
      },
    ]
  },
  {
    id: "spiritualite",
    title: "SPIRITUALITÉ AFRICAINE",
    icon: Flame,
    color: "from-orange-600 to-red-600",
    services: [
      {
        id: "spiritualite",
        title: "Spiritualité Africaine",
        icon: "Flame",
        description: "Connecte-toi aux forces invisibles, aux ancêtres et aux principes sacrés qui donnent sens et puissance à ta vie.",
        gradient: "from-orange-500 to-red-600",
        link: "/protected/spiritualite"
      },
    ]
  },
  {
    id: "invocations",
    title: "INVOCATIONS ET RITUELS MAGIQUES",
    icon: Sparkles,
    color: "from-amber-600 to-orange-600",
    services: [
      {
        id: "astrologie-africaine",
        title: "Invocations et Rituels Magiques",
        icon: "Sparkles",
        description: "Pratiques ésotériques et rituels pour manifester tes intentions et attirer les énergies bénéfiques.",
        gradient: "from-amber-500 to-orange-600",
        link: "/protected/astrologie-africaine"
      },
    ]
  },
  {
    id: "marche",
    title: "LE MARCHÉ DES OFFRANDES",
    icon: ShoppingCart,
    color: "from-green-600 to-emerald-600",
    services: [
      {
        id: "marche-offrandes",
        title: "Le Marché des Offrandes",
        icon: "ShoppingCart",
        description: "Découvre les offrandes sacrées et les objets rituels pour accompagner tes pratiques spirituelles.",
        gradient: "from-green-500 to-emerald-600",
        link: "/protected/marcheoffrandes"
      },
    ]
  },
  {
    id: "librairie",
    title: "LIBRAIRIE ÉSOTÉRIQUE",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-600",
    services: [
      {
        id: "livres",
        title: "Librairie Ésotérique",
        icon: "BookOpen",
        description: "Explore notre collection de livres sacrés et guides spirituels pour approfondir tes connaissances.",
        gradient: "from-blue-500 to-cyan-600",
        link: "/protected/livres"
      },
      {
        id: "mes-livres",
        title: "Ma Bibliothèque",
        icon: "Star",
        description: "Accède à tous tes livres et contenus ésotériques personnels.",
        gradient: "from-indigo-500 to-blue-600",
        link: "/protected/mes-livres"
      },
    ]
  },
];

export default function ProfilPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 z-50" />

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Bienvenue, {user?.username || 'Invité'} 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Dans ce temple virtuel dédié à te reconnecter à ton étoile, tu avances guidé(e) par la lumière de tes génies tutélaires et la présence bienveillante de tes ancêtres.
          </p>
        </motion.div>

        {/* Catégories organisées */}
        <div className="space-y-10">
          {categories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                className="space-y-4"
              >
                {/* En-tête de catégorie */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h2>
                </div>

                {/* Services de la catégorie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, i) => {
                    const Icon = ICONS[service.icon as keyof typeof ICONS];
                    return (
                      <Link key={service.id} href={service.link}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className="group bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md hover:shadow-xl transition-all h-full"
                        >
                          {/* Icone + Titre */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                              {service.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                            {service.description}
                          </p>

                          {/* CTA */}
                          <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:gap-2 transition-all">
                            <span>Accéder</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Compteurs crédibilité */}
      <StatsCounter />
    </div>
  );
}
