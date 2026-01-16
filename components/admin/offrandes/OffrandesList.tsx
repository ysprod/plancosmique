'use client';

import { Offering } from '@/lib/interfaces';
import React from 'react';

interface Category {
  value: string;
  label: string;
  color: string;
  emoji: string;
} 

interface OffrandesListProps {
  offerings: Offering[];
  CATEGORIES: Category[];
  onEdit: (offering: Offering) => void;
  onDelete: (id: string) => void;
}

const OffrandesList: React.FC<OffrandesListProps> = ({ offerings, CATEGORIES, onEdit, onDelete }) => {
  if (!offerings || offerings.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offerings.map((offering, index) => {
        const category = CATEGORIES.find(c => c.value === offering.category);
        return (
          <div
            key={offering.id || index}
            className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl transition-all p-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${category?.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {offering.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-gray-900 dark:text-white text-sm truncate">{offering.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                    ${category?.value === 'animal' ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' :
                      category?.value === 'vegetal' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'}`}>
                    {category?.emoji} {category?.label}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(offering)}
                  className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                </button>
                <button
                  onClick={() => onDelete(offering.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </button>
              </div>
            </div>
            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{offering.description}</p>
            {/* Prix */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Prix</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{offering.price.toLocaleString()} F</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">USD</p>
                <p className="text-lg font-black text-violet-600 dark:text-violet-500">${offering.priceUSD}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OffrandesList;
