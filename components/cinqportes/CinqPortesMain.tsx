import LoadingState from "@/components/carteduciel/LoadingState";
import ErrorState from "@/components/carteduciel/ErrorState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import CinqPortesSection from "@/app/secured/monprofil/CinqPortesSection";
import { ProcessedUserData } from "@/lib/types/carteduciel";

interface CinqPortesMainProps {
  user: any;
  processedData: ProcessedUserData | null;
  isLoading: boolean;
}

const CinqPortesMain = ({ user, processedData, isLoading }: CinqPortesMainProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!user || !processedData) {
    return <ErrorState />;
  }
  
  return (
    <main className=" bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader userData={processedData} />

        <br /><br />

        <CinqPortesSection
          carteDuCiel={
            processedData?.carteDuCiel && 'carteDuCiel' in processedData.carteDuCiel
              ? processedData.carteDuCiel.carteDuCiel
              : null
          }
          isPremium={user.premium}
        />
      </div>
    </main>
  );
};

export default CinqPortesMain;