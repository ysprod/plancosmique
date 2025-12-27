
"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import CategoryCard from "@/components/profil/CategoryCard";
import HighlightCard from "@/components/profil/HighlightCard";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilUser } from "@/hooks/useProfilUser";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Compass, Flame, Hash, ShoppingCart, Sparkles, Star, Stars } from "lucide-react";
import Slide4Section from "../cinqetoiles/Slide4Section";

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string;
  badge: string;
  badgeColor: string;
  description: string;
  link: string;
  stats: string;
}

interface HighlightCard {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string;
  link: string;
  badge?: string;
}

const HIGHLIGHT_CARDS: HighlightCard[] = [
  {
    id: "carte-du-ciel",
    title: "MA CARTE DU CIEL",
    subtitle: "Thème Astral Complet",
    icon: Compass,
    color: "from-blue-600 to-cyan-600",
    gradient: "from-blue-500/10 to-cyan-500/10",
    link: "/secured/carteduciel",
    badge: "Exclusif"
  },
  {
    id: "cinq-portes",
    title: "MES 5 PORTES",
    subtitle: "Forces de Mon Étoile",
    icon: Stars,
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-500/10 to-pink-500/10",
    link: "/secured/cinqportes",
    badge: "Premium"
  }
];

const MAIN_CATEGORIES: Category[] = [
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
    title: "TESTAMENT DE LA CONNAISSANCE",
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
  const { userdata, loading } = useProfilUser();

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {userdata?.premium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            {HIGHLIGHT_CARDS.map((card, index) => (
              <HighlightCard key={card.id} card={card} index={index} />
            ))}
          </motion.div>
        )}

        {userdata?.premium && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            {MAIN_CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        )}

        {!userdata?.premium && !loading && (
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key="consultation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Slide4Section />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      <StatsCounter />
      <div className="h-16 sm:h-20" />
    </div>
  );
}
