"use client";
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import CinqPortesSection from "./CinqPortesSection";
import { useMonProfil } from '@/hooks/carteduciel/useMonProfil';

export default function MonProfilPage() {
  const { user, processedData, isLoading } = useMonProfil();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!user || !processedData) {
    return <ErrorState />;
  }

  return (
    <main className=" bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 
                   p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader userData={processedData} />

        <br /><br />

        <CinqPortesSection
          carteDuCiel={processedData?.carteDuCiel?.carteDuCiel ?? null}
          isPremium={user.premium}
        />
        <SkyChart carteDuCiel={processedData.carteDuCiel} />
      </div>
    </main>
  );
}