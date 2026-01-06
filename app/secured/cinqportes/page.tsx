"use client";
import CinqPortesMain from "@/components/cinqportes/CinqPortesMain";
import { useCinqPortesPage } from "@/components/cinqportes/useCinqPortesPage";

export default function CinqPortesPage() {
  const { processedData, user, isLoading } = useCinqPortesPage();
  
  return <CinqPortesMain user={user} processedData={processedData} isLoading={isLoading} />;
}