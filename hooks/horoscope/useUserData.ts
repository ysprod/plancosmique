import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api/client';
import type { User } from '@/lib/interfaces';

const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    api.get<User>('/users/me')
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        console.error('👤 ❌ Erreur utilisateur:', err);
      })
      .finally(() => setLoadingUser(false));
  }, []);

  return { userData, loadingUser };
};

export default useUserData;
