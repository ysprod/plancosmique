'use client';
import LoadingState from "@/components/carteduciel/LoadingState";
import ErrorState from "@/components/carteduciel/ErrorState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import { ProcessedUserData } from "@/lib/interfaces";
 
interface CarteDuCielMainProps {
  user: any;
  processedData: ProcessedUserData | null;
  isLoading: boolean;
}

const CarteDuCielMain = ({ user, processedData, isLoading }: CarteDuCielMainProps) => {
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
        <SkyChart carteDuCiel={processedData.carteDuCiel} />
      </div>
    </main>
  );
};

export default CarteDuCielMain;