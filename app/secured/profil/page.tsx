"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import ProfilCategories from "@/components/profil/ProfilCategories";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilNonPremiumSection from "@/components/profil/ProfilNonPremiumSection";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilCategories } from "@/hooks/profil/useProfilCategories";
import { useProfilHighlightCards } from "@/hooks/profil/useProfilHighlightCards";
import { useProfilUser } from "@/hooks/useProfilUser";

export default function ProfilPage() {
  const { userdata, loading } = useProfilUser();
  const highlightCards = useProfilHighlightCards();
  const categories = useProfilCategories();

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {userdata?.premium && (
          <ProfilHighlightCards cards={highlightCards} />
        )}

        {userdata?.premium && (
          <ProfilCategories categories={categories} />
        )}

        {!userdata?.premium && !loading && <ProfilNonPremiumSection />}
      </div>

      <StatsCounter />

      <div className="h-16 sm:h-20" />
    </div>
  );
}
