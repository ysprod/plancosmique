
'use client';
import { useParams } from 'next/navigation';

export default function ConsultationHistoryPageClient() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  return (
    <main className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Historique de la consultation</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">Consultation ID : <span className="font-mono text-purple-700 dark:text-purple-300">{id}</span></p>
      {/* TODO: Afficher la liste des consultations précédentes pour ce choix, ou le détail */}
      <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
        (Page d'historique à compléter selon la logique métier)
      </div>
    </main>
  );
}
