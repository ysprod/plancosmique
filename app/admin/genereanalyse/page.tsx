"use client";
import { GenereAnalyseError } from '@/components/admin/genereanalyse/GenereAnalyseError';
import { GenereAnalyseHeader } from '@/components/admin/genereanalyse/GenereAnalyseHeader';
import { GenereAnalyseLoading } from '@/components/admin/genereanalyse/GenereAnalyseLoading';
import { GenereAnalyseSuccess } from '@/components/admin/genereanalyse/GenereAnalyseSuccess';
import { useGenereAnalysePage } from '@/hooks/admin/useGenereAnalysePage';

export default function GenereAnalysePage() {
  const { step, error, analyseData, handleRetry, handleBack, } = useGenereAnalysePage();

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <GenereAnalyseHeader
        onBack={handleBack}
        onPrint={() => window.print()}
        onShare={() => navigator.share?.({ title: 'Analyse', text: 'Découvrez mon analyse astrologique' })}
        showActions={step === 'success'}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {(step === 'loading' || step === 'fetching' || step === 'generating') && (
          <GenereAnalyseLoading step={step} />
        )}
        {step === 'success' && analyseData && (
          <GenereAnalyseSuccess analyseData={analyseData} />
        )}
        {step === 'error' && (
          <GenereAnalyseError error={error} onRetry={handleRetry} />
        )}
      </div>
    </div>
  );
}