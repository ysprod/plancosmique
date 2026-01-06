import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import { useEffect, useState } from "react";

export function useProfilUser() {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    api.get(`/users/me`)
      .then(res => setUserdata(res.data))
      .catch(() => setUserdata(null))
      .finally(() => setLoading(false));
  }, [user?._id]);

  return { user, userdata, loading };
}
