import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/lib/functions";
import { ProcessedUserData } from "@/lib/interfaces";
import { User, CarteDuCielBase } from "@/lib/interfaces";

const processUserData = (userData: User | null): ProcessedUserData | null => {
  if (!userData) return null;
  return {
    _id: userData._id,
    name: `${userData.prenom || userData.username || ""} ${userData.nom || ""}`.trim(),
    birthDate: userData.dateNaissance
      ? formatDate(userData.dateNaissance)
      : "",
    prenoms: userData.prenoms || userData.username || "",
    nom: userData.nom || "",
    email: userData.email,
    phone: userData.phone || "",
    dateNaissance: formatDate(userData.dateNaissance!),
    lieuNaissance: userData.villeNaissance
      ? `${userData.villeNaissance}, ${userData.paysNaissance || userData.country}`
      : userData.country || "-",
    heureNaissance: userData.heureNaissance || "-",
    country: userData.country!,
    role: userData.role!,
    premium: userData.premium || false,
    credits: userData.credits || 0,
    totalConsultations: userData.totalConsultations || 0,
    rating: userData.rating || 0,
    emailVerified: userData.emailVerified || false,
    carteDuCiel: userData.carteDuCiel as CarteDuCielBase | undefined
  };
};

export function useCarteDuCielPage(): {
  user: User | null;
  processedData: ProcessedUserData | null;
  isLoading: boolean;
} {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (user?._id) {
      setIsLoadingUser(true);
      api.get(`/users/me`)
        .then(res => { setUserData(res.data); })
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

  const processedData = useMemo(() => processUserData(userData), [userData]);
  const isLoading = authLoading || isLoadingUser;

  return { user: userData, processedData, isLoading };
}
