"use client";
import AnalyseFormEditor from '@/components/admin/genereanalyse/AnalyseFormEditor';
import { GenereAnalyseError } from '@/components/admin/genereanalyse/GenereAnalyseError';
import { GenereAnalyseHeader } from '@/components/admin/genereanalyse/GenereAnalyseHeader';
import { GenereAnalyseLoading } from '@/components/admin/genereanalyse/GenereAnalyseLoading';
import { useGenereAnalysePage } from '@/hooks/admin/useGenereAnalysePage';

export default function GenereAnalysePageClient() {
  const { step, error, consultation, isSaving, handleRetry, handleBack, saveAnalysis } = useGenereAnalysePage();

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <GenereAnalyseHeader
        onBack={handleBack}
        onPrint={() => window.print()}
        onShare={() => navigator.share?.({ title: 'Analyse', text: 'Découvrez mon analyse astrologique sur www.monetoile.org' })}
        showActions={step === 'success'}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {(step === 'loading') && (<GenereAnalyseLoading step={step} />)}
        {step === 'success' && consultation && (
          <AnalyseFormEditor
            analyseData={consultation}
            onSave={saveAnalysis}
            onCancel={handleBack}
            isSaving={isSaving}
          />
        )}
        {step === 'error' && (<GenereAnalyseError error={error} onRetry={handleRetry} />)}
      </div>
    </div>
  );
}