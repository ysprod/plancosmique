"use client";
import { AspectsMarkdown } from "@/components/carteduciel/AspectsMarkdown";
import LoadingState from "@/components/carteduciel/LoadingState";
import { useCinqPortesPage } from "@/hooks/commons/useCinqPortesPage"; 

export default function CarteDuCielPageClient() {
  const { processedData, isLoading } = useCinqPortesPage(); 

  if (isLoading ) return <LoadingState />;

  return (
    <main className="w-full mx-auto  p-3 sm:p-6 space-y-4 sm:space-y-6">   
      {processedData?.aspectsTexte  && (
        <AspectsMarkdown 
          aspectsTexte={processedData.aspectsTexte}
          title="La carte du ciel au moment de votre naissance"
        />
      )}    
    </main>
  );
}