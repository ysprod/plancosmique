"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Map, Sparkles, Star, User, Clock, Mail, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { memo, useMemo, useCallback, useState } from "react";

import { useAuth } from "@/lib/auth/AuthContext";

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

// =====================================================
// LOADING COMPONENT
// =====================================================
const LoadingState = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-screen"
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
    className="flex items-center justify-center min-h-screen p-4"
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
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg 
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 transition-all"
  >
    <Icon className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0`} />
    <span className="text-xs text-white/90 font-medium truncate">{value}</span>
  </motion.div>
));
InfoItem.displayName = 'InfoItem';

// =====================================================
// PROFILE HEADER COMPONENT
// =====================================================
const ProfileHeader = memo(({ 
  prenoms, 
  nom, 
  email, 
  dateNaissance, 
  lieuNaissance, 
  heureNaissance 
}: {
  prenoms: string;
  nom: string;
  email: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
}) => (
  <motion.section
    custom={0}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-5 sm:p-8 shadow-2xl relative overflow-hidden"
  >
    {/* Fond animé subtil */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-pink-600/10 to-blue-700/20 animate-gradient-move"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: '200% 200%' }}
    />

    {/* Glow effet */}
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

    {/* Contenu */}
    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-2">
      {/* Avatar avec effet glow */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 relative"
      >
        <User className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
        <span className="absolute -bottom-2 right-2 bg-white/80 text-xs text-purple-700 font-bold px-2 py-0.5 rounded-full shadow">Profil</span>
      </motion.div>
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white leading-tight truncate drop-shadow"
        >
          {prenoms} {nom}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center sm:justify-start gap-2 text-sm text-purple-200 mt-1"
        >
          <Mail className="w-4 h-4" />
          <span className="truncate font-medium">{email}</span>
        </motion.div>
      </div>
    </div>

    {/* Informations - Grid responsive, badges stylés */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
      <InfoItem icon={Sparkles} value={dateNaissance} iconColor="text-amber-400" index={0} />
      <InfoItem icon={Clock} value={heureNaissance} iconColor="text-blue-400" index={1} />
      <InfoItem icon={Map} value={lieuNaissance} iconColor="text-pink-400" index={2} />
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
    className="flex items-start gap-2.5 p-2.5 rounded-xl
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 hover:border-white/20
             transition-all shadow-md hover:shadow-lg"
  >
    {/* Badge numéro avec gradient */}
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full 
                bg-gradient-to-br ${porte.gradient} text-white font-bold text-xs 
                shadow-lg border border-white/30 flex-shrink-0`}
    >
      {porte.id}
    </motion.div>

    {/* Contenu */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-base">{porte.icon}</span>
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
      className="text-base sm:text-lg font-bold text-white mb-3 
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
  const { user, isLoading } = useAuth();

  // Mémoisation des données utilisateur
  const userData = useMemo(() => {
    if (!user) return null;

    return {
      prenoms: user.firstName || user.username || "",
      nom: user.lastName || "",
      email: user.email,
      dateNaissance: user.dateOfBirth 
        ? new Date(user.dateOfBirth).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : "-",
      lieuNaissance: "-", // À adapter si disponible
      heureNaissance: "-" // À adapter si disponible
    };
  }, [user]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (!user || !userData) {
    return <ErrorState />;
  }

  return (
    <main className="max-w-2xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6 min-h-screen">
      <ProfileHeader {...userData} />
      <SkyChart />
      <PortesSection />
    </main>
  );
}
