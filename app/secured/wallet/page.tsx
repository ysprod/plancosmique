import LoadingScreen from '@/components/wallet/LoadingScreen';
import WalletPageContent from '@/components/wallet/WalletPageContent';
import { Suspense } from "react";

export default function SecuredWalletPage() {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletPageContent />
    </Suspense>
  );
}
