"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  Clock, 
  Loader2, 
  Mail, 
  Map, 
  Sparkles, 
  Star, 
  User,
  Shield,
  Calendar,
  Globe,
  Phone,
  Award,
  ChevronDown,
  ChevronUp,
  BookOpen,
  TrendingUp,
  Zap
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import CinqPortesSection from "./CinqPortesSection";

// =====================================================
// TYPES & INTERFACES
// =====================================================
interface Position {
  planete: string;
  signe: string;
  maison: number;
  retrograde: boolean;
}

interface CarteDuCielData {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
  aspectsTexte: string;
}

interface MissionDeVie {
  titre: string;
  contenu: string;
}

interface CarteDuCiel {
  sessionId: string;
  timestamp: string;
  carteDuCiel: CarteDuCielData;
  missionDeVie: MissionDeVie;
  metadata: {
    processingTime: number;
    tokensUsed: number;
    model: string;
  };
}

interface UserData {
  _id: string;
  username: string;
  gender: string;
  country: string;
  phone: string;
  email: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  rating: number;
  totalConsultations: number;
  credits: number;
  premium: boolean;
  dateNaissance?: string;
  genre?: string;
  heureNaissance?: string;
  nom?: string;
  prenoms?: string;
  paysNaissance?: string;
  villeNaissance?: string;
  carteDuCiel?: CarteDuCiel;
  [key: string]: any;
}

interface ProcessedUserData {
  prenoms: string;
  nom: string;
  email: string;
  phone: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
  country: string;
  role: string;
  premium: boolean;
  credits: number;
  totalConsultations: number;
  rating: number;
  emailVerified: boolean;
  carteDuCiel?: CarteDuCiel;
}

// =====================================================
// CONSTANTS
// =====================================================
const PLANET_ICONS: Record<string, string> = {
  'Soleil': '☉',
  'Lune': '☽',
  'Mercure': '☿',
  'Vénus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturne': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluton': '♇',
  'Ascendant': '↑',
  'Milieu du Ciel': 'MC',
  'Chiron': '⚷',
  'Nœud Nord': '☊',
  'Nœud Sud': '☋'
};

const PLANET_COLORS: Record<string, string> = {
  'Soleil': 'from-amber-500 to-orange-500',
  'Lune': 'from-slate-300 to-gray-400',
  'Mercure': 'from-sky-400 to-blue-500',
  'Vénus': 'from-pink-400 to-rose-500',
  'Mars': 'from-red-500 to-orange-600',
  'Jupiter': 'from-purple-400 to-indigo-500',
  'Saturne': 'from-gray-600 to-slate-700',
  'Uranus': 'from-cyan-400 to-teal-500',
  'Neptune': 'from-blue-500 to-indigo-600',
  'Pluton': 'from-purple-700 to-indigo-900',
  'Ascendant': 'from-emerald-400 to-green-500',
  'Milieu du Ciel': 'from-violet-400 to-purple-500'
};

// =====================================================
// ANIMATION VARIANTS
// =====================================================
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  })
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  })
};

const positionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.03,
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  })
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return "-";
  }
};

const processUserData = (userData: UserData | null): ProcessedUserData | null => {
  if (!userData) return null;

  return {
    prenoms: userData.prenoms || userData.username || "",
    nom: userData.nom || "",
    email: userData.email,
    phone: userData.phone || "",
    dateNaissance: formatDate(userData.dateNaissance),
    lieuNaissance: userData.villeNaissance 
      ? `${userData.villeNaissance}, ${userData.paysNaissance || userData.country}`
      : userData.country || "-",
    heureNaissance: userData.heureNaissance || "-",
    country: userData.country,
    role: userData.role,
    premium: userData.premium,
    credits: userData.credits,
    totalConsultations: userData.totalConsultations,
    rating: userData.rating,
    emailVerified: userData.emailVerified,
    carteDuCiel: userData.carteDuCiel
  };
};

// =====================================================
// LOADING COMPONENT
// =====================================================
const LoadingState = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4"
      >
        <Loader2 className="w-full h-full text-purple-400" />
      </motion.div>
      <p className="text-white font-semibold">Chargement du profil...</p>
      <p className="text-purple-300 text-sm mt-1">Préparation de votre thème céleste</p>
    </div>
  </motion.div>
));
LoadingState.displayName = 'LoadingState';

// =====================================================
// ERROR COMPONENT
// =====================================================
const ErrorState = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950"
  >
    <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/30 p-8 text-center max-w-md">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">Accès refusé</h3>
      <p className="text-red-200">Aucun utilisateur connecté. Veuillez vous connecter.</p>
    </div>
  </motion.div>
));
ErrorState.displayName = 'ErrorState';

// =====================================================
// INFO ITEM COMPONENT
// =====================================================
const InfoItem = memo(({ 
  icon: Icon, 
  value, 
  iconColor,
  index = 0
}: { 
  icon: any; 
  value: string; 
  iconColor: string;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-1.5 px-3 py-2 rounded-xl 
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 transition-all shadow-sm"
  >
    <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
    <span className="text-xs text-white/90 font-medium truncate">{value}</span>
  </motion.div>
));
InfoItem.displayName = 'InfoItem';

// =====================================================
// STAT BADGE COMPONENT
// =====================================================
const StatBadge = memo(({
  icon: Icon,
  label,
  value,
  gradient,
  index = 0
}: {
  icon: any;
  label: string;
  value: string | number;
  gradient: string;
  index?: number;
}) => (
  <motion.div
    custom={index}
    variants={statVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.05, y: -2 }}
    className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} 
               border border-white/20 shadow-lg overflow-hidden`}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
    
    <div className="relative z-10 flex items-center gap-2">
      <Icon className="w-4 h-4 text-white flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-white/80 font-medium">{label}</p>
        <p className="text-sm font-bold text-white truncate">{value}</p>
      </div>
    </div>
  </motion.div>
));
StatBadge.displayName = 'StatBadge';

// =====================================================
// PROFILE HEADER COMPONENT
// =====================================================
const ProfileHeader = memo(({ userData }: { userData: ProcessedUserData }) => (
  <motion.section
    custom={0}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
             rounded-3xl border border-white/20 p-5 sm:p-6 shadow-2xl 
             relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: '200% 200%' }}
    />

    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-4">
      <motion.div
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 
                     rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
        </div>
        {userData.premium && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-500 
                     text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg
                     flex items-center gap-1"
          >
            <Award className="w-3 h-3" />
            Premium
          </motion.div>
        )}
      </motion.div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white leading-tight truncate drop-shadow-lg"
        >
          {userData.prenoms} {userData.nom}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-2"
        >
          <div className="flex items-center gap-1.5 text-xs text-purple-200">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate font-medium">{userData.email}</span>
            {userData.emailVerified && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-emerald-400"
              >
                ✓
              </motion.span>
            )}
          </div>
          
          {userData.phone && (
            <div className="flex items-center gap-1.5 text-xs text-purple-200">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">{userData.phone}</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center sm:justify-start gap-2 mt-2"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                       bg-indigo-500/30 border border-indigo-400/50 text-xs font-bold text-white">
            <Shield className="w-3 h-3" />
            {userData.role}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                       bg-emerald-500/30 border border-emerald-400/50 text-xs font-bold text-white">
            <Globe className="w-3 h-3" />
            {userData.country}
          </span>
        </motion.div>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      <StatBadge 
        icon={Star} 
        label="Consultations" 
        value={userData.totalConsultations}
        gradient="from-purple-500 to-pink-500"
        index={1}
      />
      <StatBadge 
        icon={Sparkles} 
        label="Note" 
        value={`${userData.rating}/5`}
        gradient="from-blue-500 to-cyan-500"
        index={2}
      />
      <StatBadge 
        icon={Shield} 
        label="Statut" 
        value={userData.premium ? "Premium" : "Standard"}
        gradient="from-indigo-500 to-purple-500"
        index={3}
      />
    </div>

    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <InfoItem icon={Calendar} value={userData.dateNaissance} iconColor="text-amber-400" index={0} />
      <InfoItem icon={Clock} value={userData.heureNaissance} iconColor="text-blue-400" index={1} />
      <InfoItem icon={Map} value={userData.lieuNaissance} iconColor="text-pink-400" index={2} />
    </div>
  </motion.section>
));
ProfileHeader.displayName = 'ProfileHeader';

// =====================================================
// POSITION CARD COMPONENT (NOUVEAU)
// =====================================================
const PositionCard = memo(({ 
  position, 
  index 
}: { 
  position: Position; 
  index: number;
}) => {
  const gradient = PLANET_COLORS[position.planete] || 'from-gray-500 to-slate-600';
  const icon = PLANET_ICONS[position.planete] || '●';

  return (
    <motion.div
      custom={index}
      variants={positionVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-center gap-2 p-2.5 rounded-xl
               bg-white/5 backdrop-blur-sm border border-white/10
               hover:bg-white/10 hover:border-white/20
               transition-all shadow-sm"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient}
                 flex items-center justify-center text-white font-bold text-sm
                 shadow-md border border-white/20 flex-shrink-0`}
      >
        {icon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white truncate">{position.planete}</span>
          {position.retrograde && (
            <span className="text-[9px] text-amber-400 font-bold">℞</span>
          )}
        </div>
        <p className="text-[10px] text-white/70">
          {position.signe} • Maison {position.maison}
        </p>
      </div>
    </motion.div>
  );
});
PositionCard.displayName = 'PositionCard';

// =====================================================
// SKY CHART COMPONENT (AMÉLIORÉ)
// =====================================================
const SkyChart = memo(({ carteDuCiel }: { carteDuCiel?: CarteDuCiel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMission, setExpandedMission] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const toggleMission = useCallback(() => {
    setExpandedMission(prev => !prev);
  }, []);

  if (!carteDuCiel) {
    return (
      <motion.section
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 
                 backdrop-blur-xl rounded-2xl border border-white/15 
                 p-5 shadow-xl"
      >
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60 text-sm">Carte du ciel non disponible</p>
        </div>
      </motion.section>
    );
  }

  const positions = carteDuCiel.carteDuCiel.positions || [];
  const mainPositions = positions.slice(0, 6);
  const otherPositions = positions.slice(6);

  return (
    <>
      {/* Positions Planétaires */}
      <motion.section
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 
                 backdrop-blur-xl rounded-2xl border border-white/15 
                 p-4 sm:p-5 shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base sm:text-lg font-bold text-white mb-4 
                   flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-5 h-5 text-indigo-400" />
          </motion.div>
          Carte du Ciel • Positions Planétaires
          <span className="ml-auto text-xs text-white/60 font-normal">
            {positions.length} positions
          </span>
        </motion.h2>

        {/* Positions principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {mainPositions.map((position, index) => (
            <PositionCard key={index} position={position} index={index} />
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        {otherPositions.length > 0 && (
          <>
            <button
              onClick={toggleExpanded}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-white/5 border border-white/10 hover:bg-white/10
                       text-white text-xs font-semibold transition-all"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {isExpanded ? 'Masquer' : `Voir ${otherPositions.length} positions supplémentaires`}
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {otherPositions.map((position, index) => (
                      <PositionCard 
                        key={index + mainPositions.length} 
                        position={position} 
                        index={index + mainPositions.length} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Metadata */}
        {carteDuCiel.metadata && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {(carteDuCiel.metadata.processingTime / 1000).toFixed(1)}s
            </span>
            <span>{carteDuCiel.metadata.model}</span>
          </div>
        )}
      </motion.section>

      {/* Mission de Vie */}
      {carteDuCiel.missionDeVie && (
        <motion.section
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-pink-900/20 to-purple-900/10 
                   backdrop-blur-xl rounded-2xl border border-white/15 
                   p-4 sm:p-5 shadow-xl"
        >
          <button
            onClick={toggleMission}
            className="w-full flex items-center justify-between gap-2 mb-3"
          >
            <h2 className="text-base sm:text-lg font-bold text-white 
                         flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-5 h-5 text-pink-400" />
              </motion.div>
              {carteDuCiel.missionDeVie.titre}
            </h2>
            {expandedMission ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
          </button>

          <AnimatePresence>
            {expandedMission && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="prose prose-sm prose-invert max-w-none
                             bg-white/5 rounded-xl p-4 border border-white/10
                             max-h-96 overflow-y-auto scrollbar-thin
                             scrollbar-thumb-purple-500 scrollbar-track-transparent">
                  <pre className="text-xs text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                    {carteDuCiel.missionDeVie.contenu}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expandedMission && (
            <p className="text-xs text-white/60 line-clamp-2">
              {carteDuCiel.missionDeVie.contenu.substring(0, 150)}...
            </p>
          )}
        </motion.section>
      )}
    </>
  );
});
SkyChart.displayName = 'SkyChart';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function MonProfilPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (user?._id) {
      setIsLoadingUser(true);
      api.get(`/users/me`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => {
          console.error('Erreur chargement utilisateur:', err);
          setUserData(null);
        })
        .finally(() => {
          setIsLoadingUser(false);
        });
    } else {
      setIsLoadingUser(false);
    }
  }, [user?._id]);

  const processedData = useMemo(() => 
    processUserData(userData), 
    [userData]
  );

  const isLoading = authLoading || isLoadingUser;

  if (isLoading) {
    return <LoadingState />;
  }

  if (!user || !processedData) {
    return <ErrorState />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 
                   p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader userData={processedData} />
        {/* ✨ NOUVELLE SECTION: Les 5 Portes */}
        <CinqPortesSection 
          carteDuCiel={processedData?.carteDuCiel?.carteDuCiel ?? null}
          isPremium={user.premium}
        />
        <SkyChart carteDuCiel={processedData.carteDuCiel} />
      </div>
    </main>
  );
}
