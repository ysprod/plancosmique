'use client';

import { ArrowLeft, Download, Share2 } from 'lucide-react';
import React from 'react';

interface GenereAnalyseHeaderProps {
  onBack: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  showActions?: boolean;
}

export const GenereAnalyseHeader: React.FC<GenereAnalyseHeaderProps> = ({
  onBack,
  onPrint,
  onShare,
  showActions = false,
}) => (
  <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold text-sm">Retour</span>
      </button>
      {showActions && (
        <div className="flex gap-2">
          <button
            onClick={onPrint}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={onShare}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      )}
    </div>
  </div>
);
