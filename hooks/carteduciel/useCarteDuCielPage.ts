import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { processUserData } from "@/lib/functions";
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
