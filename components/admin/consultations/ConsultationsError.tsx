interface ConsultationsErrorProps {
  error: string;
  onRetry: () => void;
}

export function ConsultationsError({ error, onRetry }: ConsultationsErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="text-center max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="w-12 h-12 text-rose-500 mx-auto mb-3">⚠️</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
