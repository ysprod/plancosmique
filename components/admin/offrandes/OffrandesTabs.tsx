'use client';

import React from "react";

interface TabProps {
  activeTab: 'gestion' | 'stats';
  setActiveTab: (tab: 'gestion' | 'stats') => void;
}

const OffrandesTabs: React.FC<TabProps> = ({ activeTab, setActiveTab }) => (
  <nav className="flex justify-center items-center gap-1 mb-4 sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur rounded-xl shadow-sm p-1 border border-gray-100 dark:border-gray-800">
    <button
      className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none whitespace-nowrap
      ${activeTab === 'gestion' ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      onClick={() => setActiveTab('gestion')}
      aria-selected={activeTab === 'gestion'}
      tabIndex={0}
    >
      <span className="text-lg sm:text-xl">🛍️</span>
      <span>Gestion</span>
    </button>
    <button
      className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none whitespace-nowrap
      ${activeTab === 'stats' ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      onClick={() => setActiveTab('stats')}
      aria-selected={activeTab === 'stats'}
      tabIndex={0}
    >
      <span className="text-lg sm:text-xl">📊</span>
      <span>Statistiques</span>
    </button>
  </nav>
);

export default OffrandesTabs;
