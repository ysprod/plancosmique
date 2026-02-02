"use client";
import { AspectsMarkdown } from "@/components/carteduciel/AspectsMarkdown";
import LoadingState from "@/components/carteduciel/LoadingState";
import { api } from "@/lib/api/client";
import { processUserData } from "@/lib/functions";
import { useAuth } from "@/lib/hooks";
import { User } from "@/lib/interfaces";
import { useEffect, useMemo, useState } from "react";

export default function CarteDuCielPageClient() {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (user?._id) {
      setLoading(true);
      api.get(`/users/me`)
        .then(res => { if (isMounted) setUserData(res.data); })
        .catch(err => {
          if (isMounted) setUserData(null);
          console.error('Erreur chargement utilisateur:', err);
        })
        .finally(() => { if (isMounted) setLoading(false); });
    } else {
      setLoading(false);
    }
    return () => { isMounted = false; };
  }, [user?._id]);

  const processedData = useMemo(() => processUserData(userData), [userData]);

  if (loading || authLoading) return <LoadingState />;

  return (
    <main className="w-full mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
      {processedData?.aspectsTexte ? (
        <AspectsMarkdown
          aspectsTexte={processedData.aspectsTexte}
          title="La carte du ciel au moment de votre naissance"
        />
      ) : null}
    </main>
  );
}