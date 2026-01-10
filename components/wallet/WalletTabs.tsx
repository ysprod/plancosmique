import React from 'react';

interface WalletTabsProps {
  activeTab: 'transactions' | 'unused-offerings';
  setActiveTab: (tab: 'transactions' | 'unused-offerings') => void;
}

export default function WalletTabs({ activeTab, setActiveTab }: WalletTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${activeTab === 'unused-offerings' ? 'border-pink-500 text-pink-700 dark:text-pink-300 bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
        onClick={() => setActiveTab('unused-offerings')}
      >
        Offrandes disponibles
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${activeTab === 'transactions' ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
        onClick={() => setActiveTab('transactions')}
      >
        Dernières transactions
      </button>
    </div>
  );
}