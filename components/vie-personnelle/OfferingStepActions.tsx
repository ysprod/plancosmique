'use client';
import { ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface OfferingStepActionsProps {
  onNext: () => void;
  canProceed: boolean;
  consultationId?: string;
  categoryId?: string;
}

export default function OfferingStepActions({ onNext, canProceed, consultationId, categoryId }: OfferingStepActionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const effectiveConsultationId = consultationId || searchParams!.get('consultationId') || undefined;
  const effectiveCategoryId = categoryId || searchParams!.get('categoryId') || (typeof window !== 'undefined' ? window.location.pathname.split('/')[3] : undefined);

  const handleGoToMarket = useCallback(() => {
    const params = new URLSearchParams();
    if (effectiveConsultationId) params.set('consultationId', effectiveConsultationId);
    if (effectiveCategoryId) params.set('categoryId', effectiveCategoryId);
    const url = `/star/marcheoffrandes${params.toString() ? `?${params.toString()}` : ''}`;
    window.location.href = url;
  }, [router, effectiveConsultationId, effectiveCategoryId]);

  return (
    <div className="sticky bottom-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="w-full max-w-2xl mx-auto px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${canProceed ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
          >
            <span>Valider</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleGoToMarket}
          className="w-full h-10 rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-semibold text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Marché des offrandes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
