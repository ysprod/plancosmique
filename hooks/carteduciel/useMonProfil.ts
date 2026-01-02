import { useAuth } from '@/lib/auth/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api/client';
import { UserData } from '@/lib/types/carteduciel';
import { processUserData } from '@/lib/carteduciel/processUserData';

export function useMonProfil() {
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
        .catch(() => {
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

  return {
    user,
    processedData,
    isLoading,
  };
}
