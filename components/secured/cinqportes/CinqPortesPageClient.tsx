"use client";
import CinqPortesMain from "@/components/cinqportes/CinqPortesMain";
import { useCinqPortesPage } from "@/hooks/commons/useCinqPortesPage";

export default function CinqPortesPageClient() {
  const { processedData, isLoading } = useCinqPortesPage();
  console.log("CinqPortesPageClient rendered with:", { processedData, isLoading });
  return <CinqPortesMain  processedData={processedData!} isLoading={isLoading} />;
}
