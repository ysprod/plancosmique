"use client";
import Slide4Section from "@/components/profil/cinqetoiles/Slide4Section";
import { memo } from "react";
import ProfileHeroNonPremium from "./ProfileHeroNonPremium";
import { useSlide4Section } from "@/hooks/cinqetoiles/useSlide4Section";
import { Slide4SectionSelection } from "@/components/cinqetoiles/Slide4SectionSelection";
import { User } from "@/lib/interfaces";

const NonPremiumSection = memo(function NonPremiumSection({ userdata }: { userdata: User; }) {
  const { choices, loading, handleSelect } = useSlide4Section();

  return (
    <section className="mt-4 w-full mx-auto max-w-5xl">
      <div className="flex flex-col items-center justify-center text-center">
        <ProfileHeroNonPremium user={userdata} />
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