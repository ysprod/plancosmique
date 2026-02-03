"use client";
import { AspectsMarkdown } from "@/components/carteduciel/AspectsMarkdown";
import LoadingState from "@/components/carteduciel/LoadingState";
import { useAuth } from "@/lib/hooks";

export default function CarteDuCielPageClient() {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading) return <LoadingState />;

  return (
    <main className="w-full mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
      {user?.aspectsTexte ? (
        <AspectsMarkdown
          aspectsTexte={user?.aspectsTexte}
          title="La carte du ciel au moment de votre naissance"
        />
      ) : null}
    </main>
  );
}