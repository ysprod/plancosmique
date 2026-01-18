interface RubriqueLoadingStateProps {
  isCreating?: boolean;
}

export default function RubriqueLoadingState({ isCreating = false }: RubriqueLoadingStateProps) {
  return (
    <div className="mt-6 flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {isCreating ? 'Préparation de la consultation...' : 'Chargement des consultations...'}
        </p>
      </div>
    </div>
  );
}
