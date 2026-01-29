"use client";
import Slide4Section from "@/components/profil/cinqetoiles/Slide4Section";
import { memo } from "react";
import ProfileHeroNonPremium from "./ProfileHeroNonPremium";
import { useSlide4Section } from "@/hooks/cinqetoiles/useSlide4Section";
import { Slide4SectionSelection } from "@/components/cinqetoiles/Slide4SectionSelection";

const NonPremiumSection = memo(function NonPremiumSection({
  userdata, showToast, toastLevel, onCloseToast
}: {
  userdata: any;
  showToast: boolean;
  toastLevel: any;
  onCloseToast: () => void;
}) {
  const { choices, loading, handleSelect } = useSlide4Section();
  return (
    <section className="mx-auto mt-4 w-full max-w-3xl">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <ProfileHeroNonPremium user={userdata} showToast={showToast} toastLevel={toastLevel} onCloseToast={onCloseToast} />
        <Slide4SectionSelection
          loading={loading}
          choices={choices}
          handleSelect={handleSelect}
        />
      </div>
    </section>
  );
});

export default NonPremiumSection;