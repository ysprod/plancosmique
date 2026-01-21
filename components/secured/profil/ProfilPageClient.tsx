"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import ProfilCategories from "@/components/profil/ProfilCategories";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilNonPremiumSection from "@/components/profil/ProfilNonPremiumSection";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilUser } from "@/hooks/commons/useProfilUser";
import { InitiatiqueBadge } from "@/components/profil/InitiatiqueBadge";
import { ProfilWelcomeMessage, ProfilGradeCongrats, ProfilProgressTable, ProfilUserTypeBanner } from "@/components/profil/ProfilAutomatedSections";

export default function ProfilPageClient() {
  const { userdata, loading } = useProfilUser();

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {/* Badge initiatique affiché en haut de la page */}
        <div className="flex justify-center mb-6">
          <InitiatiqueBadge grade={userdata?.grade} />
        </div>
        {/* Message d’accueil */}
        {userdata && <ProfilWelcomeMessage user={userdata} />}
        {/* Félicitations grade */}
        {userdata && <ProfilGradeCongrats user={userdata} />}
        {/* Progression vers le prochain grade */}
        {userdata && <ProfilProgressTable user={userdata} />}
        {/* Bannière type de profil */}
        {userdata && <ProfilUserTypeBanner user={userdata} />}
        {userdata?.premium && (
          <>
            <ProfilHighlightCards/>
            <ProfilCategories />
          </>
        )}
        {!userdata?.premium && !loading && <ProfilNonPremiumSection userdata={userdata} />}
      </div>

      <StatsCounter />
      <div className="h-16 sm:h-20" />
    </div>
  );
}