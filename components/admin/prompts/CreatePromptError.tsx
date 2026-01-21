import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CreatePromptErrorProps {
  title: string;
  message: string;
  returnTo: string;
  buttonLabel?: string;
}

export function CreatePromptError({ title, message, returnTo, buttonLabel = "Retour à l'attribution des prompts" }: CreatePromptErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
        <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">{title}</h2>
              <p className="text-red-700 dark:text-red-300 mb-4">{message}</p>
              <Link
                href={returnTo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl transition-colors shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                {buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
