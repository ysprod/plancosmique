"use client";
import { useCinqPortesPage } from "@/hooks/commons/useCinqPortesPage";
import CinqPortesMain from "@/components/cinqportes/CinqPortesMain";

export default function CinqPortesPage() {
  const { processedData, user, isLoading } = useCinqPortesPage();
  return <CinqPortesMain user={user} processedData={processedData} isLoading={isLoading} />;
}