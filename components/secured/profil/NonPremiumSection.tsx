"use client";
import Slide4Section from "@/components/profil/cinqetoiles/Slide4Section";
import { memo } from "react";
import ProfileHeroNonPremium from "./ProfileHeroNonPremium";

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
        <ProfileHeroNonPremium user={userdata} showToast={showToast} toastLevel={toastLevel} onCloseToast={onCloseToast} />
        <Slide4Section />
      </div>
    </section>
  );
});

export default NonPremiumSection;