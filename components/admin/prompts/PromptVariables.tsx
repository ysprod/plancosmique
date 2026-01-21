import React, { useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface PromptVariablesProps {
  variables: Record<string, string>;
  addVariable: (key: string, desc: string) => void;
  removeVariable: (key: string) => void;
}

export const PromptVariables: React.FC<PromptVariablesProps> = React.memo(({ variables, addVariable, removeVariable }) => {
  const keyRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-4 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Variables dynamiques</h2>
      <div className="space-y-2">
        {variables && Object.entries(variables).map(([key, desc]) => (
          <div key={key} className="flex gap-2 items-center">
            <input
              type="text"
              value={key}
              readOnly
              className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={desc}
              onChange={e => addVariable(key, e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"
            />
            <button type="button" onClick={() => removeVariable(key)} className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex gap-2 items-center mt-2">
          <input
            type="text"
            placeholder="Nom de la variable"
            ref={keyRef}
            className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Description"
            ref={descRef}
            className="w-2/3 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => {
              const key = keyRef.current?.value;
              const desc = descRef.current?.value;
              if (key && desc) {
                addVariable(key, desc);
                if (keyRef.current) keyRef.current.value = '';
                if (descRef.current) descRef.current.value = '';
              }
            }}
            className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
});