interface CreatePromptHeaderProps {
  title: string;
  rubriqueTitle?: string;
}

export function CreatePromptHeader({ title, rubriqueTitle }: CreatePromptHeaderProps) {
  return (
    <div className="mb-6 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 animate-fade-in flex flex-col items-center text-center">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Créer un nouveau prompt
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Pour la consultation : <span className="font-semibold text-purple-600 dark:text-purple-400">{title}</span>
        {rubriqueTitle && (
          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium">
            {rubriqueTitle}
          </span>
        )}
      </p>
    </div>
  );
}
