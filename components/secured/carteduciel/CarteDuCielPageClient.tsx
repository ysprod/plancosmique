"use client";
import CarteDuCielMain from "@/components/carteduciel/CarteDuCielMain";
import { useCarteDuCielPage } from "@/hooks/carteduciel/useCarteDuCielPage";

export default function CarteDuCielPageClient() {
  const { processedData, isLoading } = useCarteDuCielPage();
  console.log("CarteDuCielPageClient rendered with:", { processedData, isLoading });
  return <CarteDuCielMain  processedData={processedData} isLoading={isLoading} />;
}
