import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { User } from "@/lib/interfaces";

export function useProfilUser() {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setUserdata(undefined);
      setLoading(false);
      return;
    }
    api.get(`/users/me`)
      .then(res => setUserdata(res.data || undefined))
      .catch(() => setUserdata(undefined))
      .finally(() => setLoading(false));
  }, [user?._id]);

  return { user, userdata, loading };
}
