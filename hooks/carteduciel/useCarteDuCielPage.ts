import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { processUserData } from "@/lib/functions";
import { generateCarteDuCiel } from "@/lib/api/services/carteduciel.service";
import { User } from "@/lib/interfaces";
import { useEffect, useMemo, useState } from "react";

export function useCarteDuCielPage(): {
  user: User | null;
  processedData: User | null;
  isLoading: boolean;
} {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUserAndGenerateCarteDuCiel() {
      if (user?._id) {
        setIsLoadingUser(true);
        try {
          const res = await api.get(`/users/me`);
          let userFetched = res.data;
          // Si pas de carte du ciel, on la génère
          if (!userFetched.carteDuCiel || userFetched.carteDuCiel.length === 0) {
            userFetched = await generateCarteDuCiel();
          } 
          setUserData(userFetched);
        } catch (err) {
          console.error('Erreur chargement utilisateur:', err);
          setUserData(null);
        } finally {
          setIsLoadingUser(false);
        }
      } else {
        setIsLoadingUser(false);
      }
    }
    fetchUserAndGenerateCarteDuCiel();
  }, [user?._id]);

  const processedData = useMemo(() => processUserData(userData), [userData]);
  const isLoading = authLoading || isLoadingUser;

  return { user: userData, processedData, isLoading };
}
