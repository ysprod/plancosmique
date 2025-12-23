"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Award
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";

// =====================================================
// TYPES & INTERFACES
// =====================================================
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
  lastLogin?: string;
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
}

// =====================================================
// CONSTANTS
// =====================================================
const PORTES = [
  { 
    id: 1, 
    nom: "Porte de l'Origine", 
    description: "Votre source profonde et racine spirituelle.",
    gradient: "from-purple-500 to-indigo-500",
    icon: "🌌"
  },
  { 
    id: 2, 
    nom: "Porte de la Mission", 
    description: "Votre vocation et mission de vie.",
    gradient: "from-pink-500 to-rose-500",
    icon: "🎯"
  },
  { 
    id: 3, 
    nom: "Porte de l'Expression", 
    description: "Votre manière unique de rayonner.",
    gradient: "from-amber-500 to-orange-500",
    icon: "✨"
  },
  { 
    id: 4, 
    nom: "Porte de l'Expansion", 
    description: "Votre potentiel d'évolution.",
    gradient: "from-cyan-500 to-blue-500",
    icon: "🚀"
  },
  { 
    id: 5, 
    nom: "Porte de la Réalisation", 
    description: "L'accomplissement de votre étoile.",
    gradient: "from-emerald-500 to-teal-500",
    icon: "🌟"
  },
] as const;

const SKY_CHART_URL = "/images/carte-du-ciel-demo.png";

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

const porteVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.05,
      type: "spring",
      stiffness: 250,
      damping: 25
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
    {/* Shimmer effect */}
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
    {/* Animated background */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: '200% 200%' }}
    />

    {/* Glow effect */}
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

    {/* Header content */}
    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-4">
      {/* Avatar with premium badge */}
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

      {/* User info */}
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

        {/* Role badge */}
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

    {/* Stats Grid */}
    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      <StatBadge 
        icon={Award} 
        label="Crédits" 
        value={userData.credits}
        gradient="from-amber-500 to-orange-500"
        index={0}
      />
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

    {/* Birth info Grid */}
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <InfoItem icon={Calendar} value={userData.dateNaissance} iconColor="text-amber-400" index={0} />
      <InfoItem icon={Clock} value={userData.heureNaissance} iconColor="text-blue-400" index={1} />
      <InfoItem icon={Map} value={userData.lieuNaissance} iconColor="text-pink-400" index={2} />
    </div>
  </motion.section>
));
ProfileHeader.displayName = 'ProfileHeader';

// =====================================================
// SKY CHART COMPONENT
// =====================================================
const SkyChart = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
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
        className="text-base sm:text-lg font-bold text-white mb-3 
                 flex items-center gap-2"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-5 h-5 text-indigo-400" />
        </motion.div>
        Carte du ciel
      </motion.h2>

      <div className="relative w-full flex justify-center">
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-full aspect-square max-w-sm bg-white/5 rounded-xl"
            />
          </div>
        )}

        {/* Image */}
        {!imageError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 0.9
            }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={SKY_CHART_URL}
              alt="Carte du ciel de naissance"
              width={400}
              height={400}
              className="rounded-xl border border-white/10 shadow-2xl 
                       object-contain bg-white/5 max-w-full h-auto"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
          </motion.div>
        )}

        {/* Error state */}
        {imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full aspect-square max-w-sm bg-white/5 rounded-xl 
                     flex flex-col items-center justify-center text-white/60"
          >
            <AlertCircle className="w-12 h-12 mb-2" />
            <p className="text-sm">Image non disponible</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
});
SkyChart.displayName = 'SkyChart';

// =====================================================
// PORTE ITEM COMPONENT
// =====================================================
const PorteItem = memo(({ 
  porte, 
  index 
}: { 
  porte: typeof PORTES[number]; 
  index: number;
}) => (
  <motion.li
    custom={index}
    variants={porteVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.02, x: 4 }}
    className="flex items-start gap-2.5 p-3 rounded-xl
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 hover:border-white/20
             transition-all shadow-md hover:shadow-lg"
  >
    {/* Badge numéro avec gradient */}
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full 
                bg-gradient-to-br ${porte.gradient} text-white font-bold text-sm 
                shadow-lg border border-white/30 flex-shrink-0`}
    >
      {porte.id}
    </motion.div>

    {/* Contenu */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-lg">{porte.icon}</span>
        <h3 className="font-bold text-white text-sm truncate">{porte.nom}</h3>
      </div>
      <p className="text-xs text-white/80 leading-relaxed">
        {porte.description}
      </p>
    </div>
  </motion.li>
));
PorteItem.displayName = 'PorteItem';

// =====================================================
// PORTES SECTION COMPONENT
// =====================================================
const PortesSection = memo(() => (
  <motion.section
    custom={2}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-gradient-to-br from-pink-900/20 to-indigo-900/10 
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
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-5 h-5 text-pink-400" />
      </motion.div>
      Les 5 portes de mon étoile
    </motion.h2>

    <ol className="space-y-2">
      {PORTES.map((porte, index) => (
        <PorteItem key={porte.id} porte={porte} index={index} />
      ))}
    </ol>
  </motion.section>
));
PortesSection.displayName = 'PortesSection';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function MonProfilPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Fetch user data
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

  // Process user data
  const processedData = useMemo(() => 
    processUserData(userData), 
    [userData]
  );

  // Combined loading state
  const isLoading = authLoading || isLoadingUser;

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (!user || !processedData) {
    return <ErrorState />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 
                   p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-3xl mx-auto">
        <ProfileHeader userData={processedData} />
        <SkyChart />
        <PortesSection />
      </div>
    </main>
  );
}
