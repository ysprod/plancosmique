'use client';
import { useAnalysesByChoice } from '@/hooks/consultations/useAnalysesByChoice';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { AnalysisList } from './AnalysisList';
import { ConsultationHistoryError } from './ConsultationHistoryError';
import { ConsultationHistoryLoading } from './ConsultationHistoryLoading';

export default function ConsultationHistoryPageClient() {
  const params = useParams();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const choiceId = useMemo(() => {
    const value = typeof rawId === 'string' ? rawId : String(rawId ?? '');
    return value.trim() ? value : null;
  }, [rawId]);

  const { loading, error, analyses, total } = useAnalysesByChoice(choiceId);

  return (
    <main className="w-full min-h-[60vh] flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Historique de consultation
      </h1>

      {loading && <ConsultationHistoryLoading />}

      {!loading && error && <ConsultationHistoryError error={error} />}

      {!loading && !error && <AnalysisList analyses={analyses} total={total} />}
    </main>
  );
}