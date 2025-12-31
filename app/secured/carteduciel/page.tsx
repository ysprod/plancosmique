"use client";
import { useCarteDuCielPage } from "@/components/carteduciel/useCarteDuCielPage";
import CarteDuCielMain from "@/components/carteduciel/CarteDuCielMain";

export default function MonProfilPage() {
  const { user, processedData, isLoading } = useCarteDuCielPage();

  return <CarteDuCielMain user={user} processedData={processedData} isLoading={isLoading} />;
}