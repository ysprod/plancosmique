import { BookOpen } from 'lucide-react';

export default function KnowledgeEmpty({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <BookOpen className="w-20 h-20 text-gray-600 mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Aucune connaissance trouvée</h2>
      <p className="text-gray-400 text-center max-w-md">
        {searchQuery
          ? 'Essayez de modifier votre recherche ou de changer de catégorie.'
          : 'Aucune connaissance n\'a encore été partagée dans cette catégorie.'}
      </p>
    </div>
  );
}
