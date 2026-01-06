"use client";
import { AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/auth/logout/AnimatedBackground";
import { StarField } from "@/components/auth/logout/StarField";
import { LoadingState } from "@/components/auth/logout/LoadingState";
import { SuccessState } from "@/components/auth/logout/SuccessState";
import { ErrorState } from "@/components/auth/logout/ErrorState";
import { SecurityBadge } from "@/components/auth/logout/SecurityBadge";
import { useLogoutPage } from "@/hooks/commons/useLogoutPage";

export default function LogoutPage() {
  const { status, progress } = useLogoutPage();

  const renderContent = (() => {
    switch (status) {
      case "loading": return <LoadingState progress={progress} />;
      case "success": return <SuccessState />;
      case "error": return <ErrorState />;
    }
  })();

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 relative overflow-hidden flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      <StarField />
      
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <AnimatePresence mode="wait">
          {renderContent}
        </AnimatePresence>
        <SecurityBadge />
      </div>
    </div>
  );
}