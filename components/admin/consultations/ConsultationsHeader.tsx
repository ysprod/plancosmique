import { FileText, Zap } from 'lucide-react';
import React from 'react';

interface ConsultationsHeaderProps {
  total: number;
  onRefresh: () => void;
  isRefreshing: boolean;
  loading: boolean;
}

export const ConsultationsHeader: React.FC<ConsultationsHeaderProps> = ({ total, onRefresh, isRefreshing, loading }) => (
  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
    <div className="max-w-5xl mx-auto px-3 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-md">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">Consultations</h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {total} au total
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing || loading}
          className={`p-1.5 rounded-lg transition-all shadow-sm ${isRefreshing || loading
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          <svg className={`w-3.5 h-3.5 ${isRefreshing || loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5 19A9 9 0 0021 12.082M19 5A9 9 0 003 11.918" /></svg>
        </button>
      </div>
    </div>
  </div>
);
