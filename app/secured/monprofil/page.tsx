"use client";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { formatDate } from "@/lib/functions";
import { MissionDeVie } from "@/lib/interfaces";
import { useEffect, useMemo, useState } from "react";
import ErrorState from "../carteduciel/ErrorState";
import LoadingState from "../carteduciel/LoadingState";
import ProfileHeader from "../carteduciel/ProfileHeader";
import SkyChart from "../carteduciel/SkyChart";
import CinqPortesSection from "./CinqPortesSection";

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
 
const processUserData = (userData: UserData | null): ProcessedUserData | null => {
  if (!userData) return null;

  return {
    prenoms: userData.prenoms || userData.username || "",
    nom: userData.nom || "",
    email: userData.email,
    phone: userData.phone || "",
    dateNaissance: formatDate(userData.dateNaissance!),
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
        <br />  <br />
        <CinqPortesSection
          carteDuCiel={processedData?.carteDuCiel?.carteDuCiel ?? null}
          isPremium={user.premium}
        />
        <SkyChart carteDuCiel={processedData.carteDuCiel} />
      </div>
    </main>
  );
}