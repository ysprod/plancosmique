"use client";
import ProfilCategories from "@/components/profil/ProfilCategories";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfileHero from "@/components/secured/profil/ProfileHero";
import { User } from "@/lib/interfaces";
import { memo } from "react";

const PremiumSection = memo(function PremiumSection({ user }: { user: User }) { 

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
