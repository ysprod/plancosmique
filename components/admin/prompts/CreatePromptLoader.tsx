export function CreatePromptLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700 border-t-purple-600 dark:border-t-purple-400" />
        <p className="text-sm text-slate-600 dark:text-slate-400">Chargement...</p>
      </div>
    </div>
  );
}
