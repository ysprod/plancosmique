"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import { useAuth } from "@/lib/auth/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Hash,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
  Compass,
  Stars
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { api } from "@/lib/api/client";
import Slide4Section from "../cinqetoiles/Slide4Section";

// =====================================================
// TYPES & INTERFACES
// =====================================================
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

// =====================================================
// CONSTANTS
// =====================================================
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

// =====================================================
// ANIMATED BACKGROUND (Mémorisé)
// =====================================================
const AnimatedBackground = memo(() => (
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
));
AnimatedBackground.displayName = 'AnimatedBackground';

// =====================================================
// TOP PROGRESS BAR (Mémorisé)
// =====================================================
const TopProgressBar = memo(() => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 z-50"
    animate={{ scaleX: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{ transformOrigin: 'left' }}
  />
));
TopProgressBar.displayName = 'TopProgressBar';

// =====================================================
// HIGHLIGHT CARD (Nouveau composant)
// =====================================================
const HighlightCard = memo(({ 
  card, 
  index 
}: { 
  card: HighlightCard; 
  index: number;
}) => {
  const CardIcon = card.icon;
  
  return (
    <Link href={card.link}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative bg-gradient-to-br from-white to-gray-50 
                 dark:from-slate-900 dark:to-slate-800
                 rounded-xl sm:rounded-2xl p-4 sm:p-5 
                 border-2 border-purple-200 dark:border-purple-800
                 hover:border-purple-400 dark:hover:border-purple-600
                 shadow-lg hover:shadow-2xl transition-all duration-300 
                 overflow-hidden h-full"
      >
        {/* Badge Premium */}
        {card.badge && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full 
                     bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white text-[9px] sm:text-[10px] font-bold shadow-md"
          >
            {card.badge}
          </motion.div>
        )}

        {/* Effet de brillance */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent 
                   via-purple-200/30 dark:via-purple-700/20 to-transparent 
                   opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          {/* Icône animée */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl 
                     bg-gradient-to-br ${card.color} 
                     flex items-center justify-center shadow-xl mb-3 
                     group-hover:shadow-2xl transition-shadow`}
          >
            <CardIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </motion.div>

          {/* Titre */}
          <h3 className={`text-sm sm:text-base font-black 
                       bg-gradient-to-r ${card.color} bg-clip-text text-transparent 
                       mb-1 leading-tight`}>
            {card.title}
          </h3>

          {/* Sous-titre */}
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 
                      font-semibold mb-3 leading-tight">
            {card.subtitle}
          </p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-1 text-[10px] sm:text-xs font-bold 
                     text-purple-600 dark:text-purple-400 mt-auto"
            whileHover={{ x: 3 }}
          >
            <span>Découvrir</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </motion.div>
        </div>

        {/* Dégradé de fond */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      rounded-xl sm:rounded-2xl`} />
      </motion.div>
    </Link>
  );
});
HighlightCard.displayName = 'HighlightCard';

// =====================================================
// CATEGORY CARD (Mémorisé)
// =====================================================
const CategoryCard = memo(({ 
  category, 
  index 
}: { 
  category: Category; 
  index: number;
}) => {
  const CategoryIcon = category.icon;
  
  return (
    <Link href={category.link}>
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
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/50 
                   dark:via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.7 }}
        />

        <div className="relative z-10 flex flex-col h-full">
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

          <h2 className={`text-xs sm:text-sm md:text-base font-bold 
                        bg-gradient-to-r ${category.color} bg-clip-text text-transparent 
                        mb-1 sm:mb-1.5 leading-tight`}>
            {category.title}
          </h2>

          <p className="hidden sm:block text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 
                      font-semibold mb-2 leading-tight">
            {category.subtitle}
          </p>

          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 
                      leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
            {category.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="font-semibold">{category.stats}</span>
            </div>

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

        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      rounded-xl sm:rounded-2xl`} />
      </motion.div>
    </Link>
  );
});
CategoryCard.displayName = 'CategoryCard';

// =====================================================
// HEADER COMPONENT (Mémorisé)
// =====================================================
const Header = memo(({ username }: { username?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6 sm:mb-8"
  >
    <motion.h1
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl sm:text-2xl md:text-3xl font-black mb-2 text-center"
    >
      <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
        Bienvenue, {username || 'Invité'}
      </span>
      <motion.span
        animate={{ rotate: [0, 14, -8, 14, 0] }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="inline-block ml-1"
      >
        👋
      </motion.span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 
               text-center max-w-2xl mx-auto leading-relaxed px-2"
    >
      Reconnecte-toi à ton étoile, guidé(e) par tes{' '}
      <span className="font-semibold text-purple-600 dark:text-purple-400">génies tutélaires</span> et tes{' '}
      <span className="font-semibold text-pink-600 dark:text-pink-400">ancêtres</span>.
    </motion.p>
  </motion.div>
));
Header.displayName = 'Header';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function ProfilPage() {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    api.get(`/users/me`)
      .then(res => {
        setUserdata(res.data);
      })
      .catch(err => {
        console.error('❌ Erreur chargement user:', err);
        setUserdata(null);
      })
      .finally(() => setLoading(false));
  }, [user?._id]);

  // Mémoisation
  const isPremium = useMemo(() => userdata?.premium, [userdata?.premium]);
  const username = useMemo(() => user?.username, [user?.username]);

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
         {!userdata?.premium && (
         <Header username={username} />
        )}
        
        

        {/* HIGHLIGHT CARDS (Carte du Ciel + 5 Portes) */}
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

        {/* MAIN CATEGORIES */}
        {userdata?.premium && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            {MAIN_CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        )}

        {/* NON-PREMIUM: CONSULTATION SECTION */}
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
