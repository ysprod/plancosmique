"use client";
import AnalyseFormEditor from '@/components/admin/genereanalyse/AnalyseFormEditor';
import { GenereAnalyseError } from '@/components/admin/genereanalyse/GenereAnalyseError';
import { GenereAnalyseHeader } from '@/components/admin/genereanalyse/GenereAnalyseHeader';
import { GenereAnalyseLoading } from '@/components/admin/genereanalyse/GenereAnalyseLoading';
import { useGenereAnalysePage } from '@/hooks/admin/useGenereAnalysePage';

export default function GenereAnalysePageClient() {
  const { step, error, analyse, handleRetry, handleBack } = useGenereAnalysePage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <div className="w-full flex flex-col items-center">
        <GenereAnalyseHeader onBack={handleBack} />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center justify-center px-4 py-6 space-y-4 text-center">
        {(step === 'loading') && (<GenereAnalyseLoading step={step} />)}
        {step === 'success' && analyse && (
          <AnalyseFormEditor analyseData={analyse} />
        )}
        {step === 'error' && (<GenereAnalyseError error={error} onRetry={handleRetry} />)}
      </div>
    </div>
  );
}