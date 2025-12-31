"use client";
import { useCinqPortesPage } from "@/components/cinqportes/useCinqPortesPage";
import CinqPortesMain from "@/components/cinqportes/CinqPortesMain";

export default function CinqPortesPage() {
  const { user, processedData, isLoading } = useCinqPortesPage();
  return <CinqPortesMain user={user} processedData={processedData} isLoading={isLoading} />;
}