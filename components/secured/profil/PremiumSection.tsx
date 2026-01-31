"use client";
import ProfileHero from "@/components/secured/profil/ProfileHero";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilCategories from "@/components/profil/ProfilCategories";
import { memo, useEffect, useState } from "react";
import LoadingState from "@/components/carteduciel/LoadingState";
import { useRouter } from "next/navigation";
import { User } from "@/lib/interfaces";
import { set } from "date-fns";

const PremiumSection = memo(function PremiumSection({ user }: { user: User }) {
  const [userWithCarte, setUserWithCarte] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setUserWithCarte(user);
    if (user && user._id && !(user.carteDuCiel && user.carteDuCiel.length > 0)) {
      router.push("/secured/profil/generate");
    }
  }, [user, router]);

  if (isLoading || !userWithCarte) {
    return <LoadingState />;
  }

  return (
    <section className="mx-auto mt-4 w-full max-w-5xl">
      <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-6 md:gap-8">
        {/* ProfileHero à gauche */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <ProfileHero user={userWithCarte} />
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
