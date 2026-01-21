"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import ProfilCategories from "@/components/profil/ProfilCategories";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilNonPremiumSection from "@/components/profil/ProfilNonPremiumSection";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilUser } from "@/hooks/commons/useProfilUser";
import { useAutoGrade } from "@/hooks/commons/useAutoGrade";
import { InitiatiqueBadge } from "@/components/profil/InitiatiqueBadge";
import { ProfilWelcomeMessage, ProfilGradeCongrats, ProfilProgressTable, ProfilUserTypeBanner } from "@/components/profil/ProfilAutomatedSections";
import { useGradeToast, GradeToast } from "@/components/profil/useGradeToast";

export default function ProfilPageClient() {
  const { userdata, loading } = useProfilUser();
  const { show, level, close } = useGradeToast(userdata);
  const { triggerAutoGrade, loading: autoGradeLoading, error: autoGradeError } = useAutoGrade(userdata?._id, () => window.location.reload());

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <GradeToast show={show} level={level} close={close} />

      {/* Bouton d’automatisation du grade (admin/demo)
      {userdata?._id && (
        <div className="flex justify-center mb-4">
          <button
            onClick={triggerAutoGrade}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition"
            disabled={autoGradeLoading}
          >
            {autoGradeLoading ? 'Mise à jour du grade...' : 'Automatiser le grade (démo)'}
          </button>
          {autoGradeError && <span className="ml-4 text-red-600 text-sm">{autoGradeError}</span>}
        </div>
      )} */}

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
            <ProfilHighlightCards />
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