import { Suspense } from "react";
import WalletPageContent from '@/components/wallet/WalletPageContent';
import LoadingScreen from '@/components/wallet/LoadingScreen';

export default function SecuredWalletPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletPageContent />
    </Suspense>
  );
}
