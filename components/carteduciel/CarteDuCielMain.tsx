'use client';
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
 
import { User } from "@/lib/interfaces";
import { AspectsMarkdown } from "./AspectsMarkdown";
 
interface CarteDuCielMainProps {
  processedData: User | null;
  isLoading: boolean;
}

const CarteDuCielMain = ({ processedData, isLoading }: CarteDuCielMainProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!processedData) {
    return <ErrorState />;
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader userData={processedData} />
        {processedData.aspectsTexte && (
          <AspectsMarkdown aspectsTexte={processedData.aspectsTexte} />
        )}
      </div>
    </main>
  );
};

export default CarteDuCielMain;