"use client";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useEffect, useMemo, useState } from "react";
import ErrorState from "../carteduciel/ErrorState";
import LoadingState from "../carteduciel/LoadingState";
import {  ProcessedUserData, UserData } from "../carteduciel/page";
import ProfileHeader from "../carteduciel/ProfileHeader";
import SkyChart from "../carteduciel/SkyChart";
import CinqPortesSection from "./CinqPortesSection"; 
import { formatDate } from "@/lib/functions";

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
        <CinqPortesSection
          carteDuCiel={processedData?.carteDuCiel?.carteDuCiel ?? null}
          isPremium={user.premium}
        />
      </div>
    </main>
  );
}