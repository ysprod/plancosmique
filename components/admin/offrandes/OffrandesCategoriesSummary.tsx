'use client';

import React from 'react';

interface Category {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

interface OffrandesCategoriesSummaryProps {
  CATEGORIES: Category[];
  offerings: { category: string }[];
}

export default function OffrandesCategoriesSummary({ CATEGORIES, offerings }: OffrandesCategoriesSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {CATEGORIES.map(cat => {
        const count = offerings.filter(o => o.category === cat.value).length;
        return (
          <div key={cat.value} className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-2xl font-black">{count}</span>
            </div>
            <p className="text-sm font-bold opacity-90">{cat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
