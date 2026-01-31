"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilUser } from "@/hooks/commons/useProfilUser";
import { cx } from "@/lib/functions";
import NonPremiumSection from "./NonPremiumSection";
import PremiumSection from "./PremiumSection";

export default function ProfilPageClient() {
  const { userdata, loading } = useProfilUser();
  const isPremium = Boolean(userdata?.premium);

  return (
    <main
      className={cx(
        "w-full mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8",
        "bg-gradient-to-br from-white via-gray-50 to-gray-100",
        "dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
        "transition-colors duration-300"
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <AnimatedBackground />
      </div>
      <div className="flex-col items-center justify-center text-center">
        <TopProgressBar />
        {isPremium && (<PremiumSection user={userdata!} />)}
        {!isPremium && !loading && <NonPremiumSection userdata={userdata!} />}
        <div className="mt-6 w-full">
          <StatsCounter />
        </div>
        <div className="h-16 sm:h-20" />
      </div>
    </main>
  );
}