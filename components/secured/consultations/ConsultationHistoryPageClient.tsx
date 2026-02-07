'use client';
import { useAnalysesByChoice } from '@/hooks/consultations/useAnalysesByChoice';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ConsultationHistoryPageClient() {
  const params = useParams();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const choiceId = useMemo(() => {
    const value = typeof rawId === 'string' ? rawId : String(rawId ?? '');
    return value.trim() ? value : null;
  }, [rawId]);

  const { loading, error, analyses, total } = useAnalysesByChoice(choiceId);

  return (
    <main className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Historique du choix de consultation</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
        Choice ID :{' '}
        <span className="font-mono text-purple-700 dark:text-purple-300">{choiceId ?? '—'}</span>
      </p>

      {loading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">Chargement des analyses…</div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200/40 bg-red-50/60 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="w-full max-w-3xl">
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {total} analyse{total > 1 ? 's' : ''} trouvée{total > 1 ? 's' : ''}
          </div>

          {analyses.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Aucune analyse disponible pour ce choix.
            </div>
          ) : (
            <ul className="space-y-3">
              {analyses.map((analysis: any) => {
                const title = analysis?.title || analysis?.titre || 'Analyse';
                const createdAt = analysis?.createdAt
                  ? new Date(analysis.createdAt).toLocaleDateString('fr-FR')
                  : '—';
                const texte = typeof analysis?.texte === 'string' ? analysis.texte : '';
                const excerpt = texte.length > 180 ? `${texte.slice(0, 180)}…` : texte;

                return (
                  <li
                    key={analysis?._id ?? `${title}-${createdAt}`}
                    className="rounded-xl border border-purple-100/60 bg-white/70 p-4 shadow-sm dark:border-purple-900/40 dark:bg-gray-900/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {createdAt}
                      </span>
                    </div>
                    {excerpt && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {excerpt}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
