"use client";
import CinqPortesMain from "@/components/cinqportes/CinqPortesMain";
import { useCinqPortesPage } from "@/hooks/commons/useCinqPortesPage";

export default function CinqPortesPage() {
  const { user, processedData, isLoading } = useCinqPortesPage();
  return <CinqPortesMain user={user} processedData={processedData} isLoading={isLoading} />;
}