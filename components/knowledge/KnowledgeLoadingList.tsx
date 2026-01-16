'use client';
export default function KnowledgeLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-gray-400">Chargement des connaissances...</p>
    </div>
  );
}
