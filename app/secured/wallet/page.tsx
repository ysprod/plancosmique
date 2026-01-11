"use client";
import { Suspense } from "react";
import LoadingScreen from '@/components/wallet/LoadingScreen';
import WalletPageContent from '@/components/wallet/WalletPageContent';

export default function SecuredWalletPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletPageContent />
    </Suspense>
  );
}