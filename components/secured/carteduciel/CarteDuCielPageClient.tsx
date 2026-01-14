"use client";
import CarteDuCielMain from "@/components/carteduciel/CarteDuCielMain";
import { useCarteDuCielPage } from "@/hooks/carteduciel/useCarteDuCielPage";

export default function CarteDuCielPageClient() {
  const { user, processedData, isLoading } = useCarteDuCielPage();
  return <CarteDuCielMain user={user} processedData={processedData} isLoading={isLoading} />;
}
