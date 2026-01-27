"use client";
import ProfileHero from "@/components/secured/profil/ProfileHero";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilCategories from "@/components/profil/ProfilCategories";
import { memo } from "react";

const PremiumSection = memo(function PremiumSection({ user, showToast, toastLevel, onCloseToast }: any) {
  return (
    <section className="mx-auto mt-4 w-full max-w-5xl">
      <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-6 md:gap-8">
        {/* ProfileHero à gauche */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <ProfileHero user={user} />
        </div>
        {/* ProfilHighlightCards à droite */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <ProfilHighlightCards />
        </div>
      </div>
      {/* Catégories en dessous */}
      <div className="mt-6">
        <ProfilCategories />
      </div>
    </section>
  );
});

export default PremiumSection;
