"use client";
import ProfileHero from "@/components/secured/profil/ProfileHero";
import ProfilNonPremiumSection from "@/components/profil/ProfilNonPremiumSection";
import { memo } from "react";

const NonPremiumSection = memo(function NonPremiumSection({
  userdata, showToast, toastLevel, onCloseToast
}: {
  userdata: any;
  showToast: boolean;
  toastLevel: any;
  onCloseToast: () => void;
}) {
  return (
    <section className="mx-auto mt-4 w-full max-w-3xl">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <ProfileHero user={userdata} showToast={showToast} toastLevel={toastLevel} onCloseToast={onCloseToast} />
        <ProfilNonPremiumSection userdata={userdata} />
      </div>
    </section>
  );
});

export default NonPremiumSection;
