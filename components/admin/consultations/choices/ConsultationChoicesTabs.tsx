import { AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react';

interface ConsultationChoicesTabsProps {
  tab: 'sans' | 'avec' | 'tout';
  setTab: (tab: 'sans' | 'avec' | 'tout') => void;
}

export const ConsultationChoicesTabs = React.memo(function ConsultationChoicesTabs({ tab, setTab }: ConsultationChoicesTabsProps) {
  return (
    <div className="flex justify-center gap-2 my-4 w-full">
      <button
        className={`px-4 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${tab === 'sans' ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-white dark:bg-zinc-900' : 'border-transparent text-gray-500 dark:text-zinc-400 bg-transparent'}`}
        onClick={() => setTab('sans')}
        type="button"
        aria-selected={tab === 'sans'}
      >
        <AlertCircle className="inline w-5 h-5 mr-1 align-text-bottom" />
        Sans prompt
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${tab === 'avec' ? 'border-green-600 text-green-700 dark:text-green-300 bg-white dark:bg-zinc-900' : 'border-transparent text-gray-500 dark:text-zinc-400 bg-transparent'}`}
        onClick={() => setTab('avec')}
        type="button"
        aria-selected={tab === 'avec'}
      >
        <CheckCircle className="inline w-5 h-5 mr-1 align-text-bottom" />
        Avec prompt
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${tab === 'tout' ? 'border-blue-600 text-blue-700 dark:text-blue-300 bg-white dark:bg-zinc-900' : 'border-transparent text-gray-500 dark:text-zinc-400 bg-transparent'}`}
        onClick={() => setTab('tout')}
        type="button"
        aria-selected={tab === 'tout'}
      >
        Tout
      </button>
    </div>
  );
});
