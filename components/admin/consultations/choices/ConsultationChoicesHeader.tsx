import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ConsultationChoicesHeaderProps {
  total: number;
  withPrompt: number;
  withoutPrompt: number;
}

export const ConsultationChoicesHeader = ({ total, withPrompt, withoutPrompt }: ConsultationChoicesHeaderProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-3xl mx-auto">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Attribution des Prompts</h1>
      <p className="text-sm text-gray-600 dark:text-zinc-300 mt-1">
        {total} consultations • {withPrompt} avec prompt • {withoutPrompt} sans prompt
      </p>
    </div>
    <Link
      href="/admin/prompts/create"
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <Plus className="w-5 h-5" />
      Nouveau Prompt
    </Link>
  </div>
);
