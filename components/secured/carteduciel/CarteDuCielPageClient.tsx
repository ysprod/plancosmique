"use client";
import { AspectsMarkdown } from "@/components/carteduciel/AspectsMarkdown";
import LoadingState from "@/components/carteduciel/LoadingState";
import { useAuth } from "@/lib/hooks";

export default function CarteDuCielPageClient() {
  const { user, isLoading: authLoading } = useAuth();
  const aspectsTexte = user?.aspectsTexte;

  if (authLoading) return <LoadingState />;
  if (!aspectsTexte) return null;

  return (
    <div className="w-full mx-auto p-4">
      <AspectsMarkdown
        aspectsTexte={aspectsTexte}
        title="La carte du ciel au moment de votre naissance"
      />
    </div>
  );
}